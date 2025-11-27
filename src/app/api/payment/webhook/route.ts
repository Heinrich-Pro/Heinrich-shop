import { NextRequest, NextResponse } from 'next/server';
import { verifyPayment } from '@/lib/fusionpay';
import { prisma } from '@/lib/prisma';

/**
 * Webhook FusionPay
 * Appelé automatiquement par FusionPay après un paiement
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const token = body.token || body.tokenPay;

    if (!token) {
      return NextResponse.json(
        { error: 'Token manquant' },
        { status: 400 }
      );
    }

    // Vérifier le paiement
    const paymentResult = await verifyPayment(token);

    if (paymentResult.success && paymentResult.data) {
      const paymentData = paymentResult.data;
      const orderData = paymentData.personal_Info[0];

      // Mettre à jour la commande dans la base de données
      if (orderData?.orderId) {
        await prisma.order.update({
          where: { id: orderData.orderId },
          data: {
            status: 'PAID',
            updatedAt: new Date(),
          },
        });

        console.log(`Commande ${orderData.orderId} mise à jour : PAID`);
      }

      return NextResponse.json({
        success: true,
        message: 'Paiement traité avec succès',
      });
    }

    return NextResponse.json(
      { error: 'Paiement non validé' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Erreur webhook FusionPay:', error);
    return NextResponse.json(
      { error: 'Erreur lors du traitement du webhook' },
      { status: 500 }
    );
  }
}
