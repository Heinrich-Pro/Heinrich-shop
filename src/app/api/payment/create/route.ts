import { NextRequest, NextResponse } from 'next/server';
import { createPayment } from '@/lib/fusionpay';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { orderData, items, totalPrice, clientName, clientNumber } = body;

    // Validation des données
    if (!orderData || !items || !totalPrice || !clientName || !clientNumber) {
      return NextResponse.json(
        { error: 'Données de paiement manquantes' },
        { status: 400 }
      );
    }

    // Créer le paiement avec FusionPay
    const paymentResponse = await createPayment({
      totalPrice,
      items,
      orderData,
      clientName,
      clientNumber,
    });

    return NextResponse.json({
      success: true,
      ...paymentResponse,
    });
  } catch (error) {
    console.error('Erreur API create payment:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création du paiement' },
      { status: 500 }
    );
  }
}
