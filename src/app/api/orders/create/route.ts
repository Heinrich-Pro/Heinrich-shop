import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, shippingAddress, shippingMethod, promoCode, total } = body;

    // Validate request
    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'Le panier est vide' },
        { status: 400 }
      );
    }

    if (!shippingAddress || !shippingAddress.firstName || !shippingAddress.address) {
      return NextResponse.json(
        { error: 'Adresse de livraison invalide' },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    
    // Get user (optional for guest checkout)
    const { data: { user } } = await supabase.auth.getUser();
    
    // Generate order number
    const orderNumber = `CMD-${Date.now()}-${Math.random().toString(36).substring(7).toUpperCase()}`;

    // Calculate totals server-side for security
    const calculatedSubtotal = items.reduce(
      (sum: number, item: any) => sum + item.price * item.quantity,
      0
    );
    
    const calculatedShipping = shippingMethod === 'express' ? 9.99 : (calculatedSubtotal >= 50 ? 0 : 5.99);
    const calculatedTax = calculatedSubtotal * 0.2; // 20% TVA
    const calculatedTotal = calculatedSubtotal + calculatedShipping + calculatedTax;

    // Verify total matches (with small margin for float precision)
    if (Math.abs(calculatedTotal - total) > 0.10) {
      return NextResponse.json(
        { error: 'Erreur de calcul du total' },
        { status: 400 }
      );
    }

    // Create order in database
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        order_number: orderNumber,
        user_id: user?.id || null, // null for guest checkout
        status: 'pending',
        total_amount: calculatedTotal,
        shipping_method: shippingMethod,
        shipping_address: shippingAddress,
        promo_code: promoCode || null,
      })
      .select()
      .single();

    if (orderError) {
      console.error('Order creation error:', orderError);
      return NextResponse.json(
        { error: 'Erreur lors de la création de la commande' },
        { status: 500 }
      );
    }

    // Create order items
    const orderItems = items.map((item: any) => ({
      order_id: order.id,
      product_id: item.productId,
      quantity: item.quantity,
      price: item.price,
      variant: item.variant || null,
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) {
      console.error('Order items error:', itemsError);
      // Rollback: delete the order
      await supabase.from('orders').delete().eq('id', order.id);
      return NextResponse.json(
        { error: 'Erreur lors de la création des articles' },
        { status: 500 }
      );
    }

    // Create FusionPay payment
    let paymentUrl = null;
    
    try {
      const fusionPayResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/payment/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: calculatedTotal,
          orderId: order.id,
          orderNumber: orderNumber,
        }),
      });

      if (fusionPayResponse.ok) {
        const paymentData = await fusionPayResponse.json();
        paymentUrl = paymentData.paymentUrl;
      }
    } catch (paymentError) {
      console.error('Payment creation error:', paymentError);
      // Continue anyway, order is created
    }

    // TODO: Send confirmation email

    return NextResponse.json({
      success: true,
      orderId: order.id,
      orderNumber: order.order_number,
      paymentUrl,
    });

  } catch (error: any) {
    console.error('Order creation error:', error);
    return NextResponse.json(
      { error: error.message || 'Une erreur est survenue' },
      { status: 500 }
    );
  }
}
