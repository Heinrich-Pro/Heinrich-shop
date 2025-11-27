import { PromoCode } from '@/stores/cart-store';

// Static promo codes - In production, this would be from database
export const PROMO_CODES: Record<string, PromoCode> = {
  'BIENVENUE10': {
    code: 'BIENVENUE10',
    type: 'percentage',
    value: 10,
    minPurchase: 30,
  },
  'FRAIS GRATUIT': {
    code: 'FRAISGRATUIT',
    type: 'free_shipping',
    value: 0,
  },
  'NOEL2024': {
    code: 'NOEL2024',
    type: 'fixed',
    value: 15,
    minPurchase: 50,
  },
  'NOUVEAU5': {
    code: 'NOUVEAU5',
    type: 'fixed',
    value: 5,
    minPurchase: 25,
  },
};

export function validatePromoCode(
  code: string,
  subtotal: number
): { valid: boolean; promo?: PromoCode; error?: string } {
  const normalizedCode = code.toUpperCase().replace(/\s/g, '');
  
  const promo = PROMO_CODES[normalizedCode];
  
  if (!promo) {
    return { valid: false, error: 'Code promo invalide' };
  }

  if (promo.minPurchase && subtotal < promo.minPurchase) {
    return {
      valid: false,
      error: `Montant minimum requis: €${promo.minPurchase.toFixed(2)}`,
    };
  }

  return { valid: true, promo };
}

export function getPromoDescription(promo: PromoCode): string {
  if (promo.type === 'percentage') {
    return `-${promo.value}% de réduction`;
  } else if (promo.type === 'fixed') {
    return `-€${promo.value.toFixed(2)}`;
  } else if (promo.type === 'free_shipping') {
    return 'Livraison gratuite';
  }
  return '';
}
