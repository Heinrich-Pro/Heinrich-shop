import { FusionPay } from 'fusionpay';

// Types pour FusionPay
export interface OrderData {
  orderId: string;
  customerEmail: string;
  customerName: string;
  customerPhone: string;
}

export interface PaymentResponse {
  statut: boolean;
  token: string;
  message: string;
  url: string;
}

export interface PaymentStatusResponse {
  statut: boolean;
  message: string;
  data: {
    _id: string;
    tokenPay: string;
    numeroSend: string;
    nomclient: string;
    personal_Info: OrderData[];
    numeroTransaction: string;
    Montant: number;
    frais: number;
    statut: 'pending' | 'paid' | 'failed';
    moyen: string;
    return_url: string;
    createdAt: string;
  };
}

/**
 * Initialise une instance FusionPay
 * @returns Instance configurée de FusionPay
 */
export function createFusionPayInstance() {
  const apiUrl = process.env.FUSIONPAY_API_URL;
  
  if (!apiUrl) {
    throw new Error('FUSIONPAY_API_URL n\'est pas définie dans les variables d\'environnement');
  }

  return new FusionPay<OrderData>(apiUrl);
}

/**
 * Crée une session de paiement FusionPay
 * @param params Paramètres de paiement
 * @returns Promesse avec la réponse de paiement
 */
export async function createPayment(params: {
  totalPrice: number;
  items: { name: string; price: number }[];
  orderData: OrderData;
  clientName: string;
  clientNumber: string;
}): Promise<PaymentResponse> {
  try {
    const fusionPay = createFusionPayInstance();

    // Configuration du paiement
    fusionPay
      .totalPrice(params.totalPrice)
     
.clientName(params.clientName)
      .clientNumber(params.clientNumber)
      .returnUrl(process.env.FUSIONPAY_RETURN_URL || '')
      .webhookUrl(process.env.FUSIONPAY_WEBHOOK_URL || '')
      .addInfo(params.orderData);

    // Ajouter les articles
    params.items.forEach(item => {
      fusionPay.addArticle(item.name, item.price);
    });

    // Effectuer le paiement
    const response = await fusionPay.makePayment();
    return response as PaymentResponse;
  } catch (error) {
    console.error('Erreur lors de la création du paiement:', error);
    throw new Error('Impossible de créer le paiement FusionPay');
  }
}

/**
 * Vérifie le statut d'un paiement
 * @param token Token de paiement
 * @returns Promesse avec le statut du paiement
 */
export async function checkPaymentStatus(token: string): Promise<PaymentStatusResponse> {
  try {
    const fusionPay = createFusionPayInstance();
    const status = await fusionPay.checkPaymentStatus(token);
    return status as PaymentStatusResponse;
  } catch (error) {
    console.error('Erreur lors de la vérification du paiement:', error);
    throw new Error('Impossible de vérifier le statut du paiement');
  }
}

/**
 * Vérifie si un paiement est réussi
 * @param token Token de paiement
 * @returns Promesse avec un booléen et les données de paiement
 */
export async function verifyPayment(token: string): Promise<{
  success: boolean;
  data?: PaymentStatusResponse['data'];
}> {
  try {
    const status = await checkPaymentStatus(token);
    
    if (status.statut && status.data.statut === 'paid') {
      return {
        success: true,
        data: status.data,
      };
    }

    return { success: false };
  } catch (error) {
    console.error('Erreur lors de la vérification du paiement:', error);
    return { success: false };
  }
}
