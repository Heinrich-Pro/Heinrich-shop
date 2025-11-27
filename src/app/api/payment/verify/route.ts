import { NextRequest, NextResponse } from 'next/server';
import { checkPaymentStatus } from '@/lib/fusionpay';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        { error: 'Token de paiement manquant' },
        { status: 400 }
      );
    }

    // Vérifier le statut du paiement
    const status = await checkPaymentStatus(token);

    return NextResponse.json({
      success: true,
      ...status,
    });
  } catch (error) {
    console.error('Erreur API verify payment:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la vérification du paiement' },
      { status: 500 }
    );
  }
}
