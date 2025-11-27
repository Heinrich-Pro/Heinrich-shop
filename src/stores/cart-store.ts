import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  sku: string;
  quantity: number;
  variant?: {
    size?: string;
    color?: string;
  };
  stock: number;
}

export interface PromoCode {
  code: string;
  type: 'percentage' | 'fixed' | 'free_shipping';
  value: number; // Percentage (10 for 10%) or fixed amount
  minPurchase?: number;
}

interface CartState {
  items: CartItem[];
  promoCode: PromoCode | null;
  
  // Actions
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  applyPromoCode: (promo: PromoCode) => void;
  removePromoCode: () => void;
  
  // Computed
  getItemCount: () => number;
  getSubtotal: () => number;
  getShipping: () => number;
  getTax: () => number;
  getDiscount: () => number;
  getTotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      promoCode: null,

      addItem: (item) => {
        set((state) => {
          const existingItem = state.items.find(
            (i) => i.productId === item.productId && 
            JSON.stringify(i.variant) === JSON.stringify(item.variant)
          );

          if (existingItem) {
            // Update quantity of existing item
            const newQuantity = Math.min(
              existingItem.quantity + item.quantity,
              item.stock
            );
            
            return {
              items: state.items.map((i) =>
                i.id === existingItem.id
                  ? { ...i, quantity: newQuantity }
                  : i
              ),
            };
          }

          // Add new item
          return {
            items: [
              ...state.items,
              {
                ...item,
                id: `${item.productId}-${Date.now()}`,
              },
            ],
          };
        });
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId),
        }));
      },

      updateQuantity: (productId, quantity) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.productId === productId
              ? { ...item, quantity: Math.max(1, Math.min(quantity, item.stock)) }
              : item
          ),
        }));
      },

      clearCart: () => {
        set({ items: [], promoCode: null });
      },

      applyPromoCode: (promo) => {
        set({ promoCode: promo });
      },

      removePromoCode: () => {
        set({ promoCode: null });
      },

      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getSubtotal: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },

      getShipping: () => {
        const { promoCode } = get();
        const subtotal = get().getSubtotal();
        
        // Free shipping if promo code or subtotal >= 50
        if (promoCode?.type === 'free_shipping' || subtotal >= 50) {
          return 0;
        }
        
        return 5.99;
      },

      getTax: () => {
        const subtotal = get().getSubtotal();
        return subtotal * 0.2; // 20% TVA
      },

      getDiscount: () => {
        const { promoCode } = get();
        if (!promoCode) return 0;

        const subtotal = get().getSubtotal();
        
        // Check minimum purchase
        if (promoCode.minPurchase && subtotal < promoCode.minPurchase) {
          return 0;
        }

        if (promoCode.type === 'percentage') {
          return subtotal * (promoCode.value / 100);
        } else if (promoCode.type === 'fixed') {
          return Math.min(promoCode.value, subtotal);
        }
        
        return 0;
      },

      getTotal: () => {
        const subtotal = get().getSubtotal();
        const shipping = get().getShipping();
        const tax = get().getTax();
        const discount = get().getDiscount();
        
        return subtotal + shipping + tax - discount;
      },
    }),
    {
      name: 'cart-storage', // localStorage key
      partialize: (state) => ({
        items: state.items,
        promoCode: state.promoCode,
      }),
    }
  )
);
