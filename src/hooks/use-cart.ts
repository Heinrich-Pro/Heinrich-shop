import { useEffect } from 'react';
import { useCartStore } from '@/stores/cart-store';
import { createClient } from '@/lib/supabase/client';

export function useCart() {
  const cart = useCartStore();
  const supabase = createClient();

  // Load cart from Supabase when user logs in
  useEffect(() => {
    const loadCart = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // Load cart from Supabase
        const { data, error } = await supabase
          .from('carts')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (data && !error) {
          // Merge with local cart if exists
          const localItems = cart.items;
          const serverItems = data.items || [];
          
          // Combine items, preferring server version
          const mergedItems = [...serverItems];
          localItems.forEach((localItem) => {
            const existsOnServer = serverItems.find(
              (si: any) => si.productId === localItem.productId
            );
            if (!existsOnServer) {
              mergedItems.push(localItem);
            }
          });

          // Update store
          cart.items.forEach(() => cart.removeItem(cart.items[0]?.productId));
          mergedItems.forEach((item: any) => {
            cart.addItem(item);
          });

          if (data.promo_code) {
            // Parse and apply promo code
            try {
              const promoData = JSON.parse(data.promo_code);
              cart.applyPromoCode(promoData);
            } catch (e) {
              console.error('Failed to parse promo code:', e);
            }
          }

          // Save merged cart back to server
          await saveCartToSupabase(user.id, mergedItems, data.promo_code);
        }
      }
    };

    loadCart();
  }, []);

  // Save cart to Supabase when it changes (for logged-in users)
  useEffect(() => {
    const saveCart = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        await saveCartToSupabase(
          user.id,
          cart.items,
          cart.promoCode ? JSON.stringify(cart.promoCode) : null
        );
      }
    };

    // Debounce save
    const timer = setTimeout(saveCart, 1000);
    return () => clearTimeout(timer);
  }, [cart.items, cart.promoCode]);

  return cart;
}

async function saveCartToSupabase(
  userId: string,
  items: any[],
  promoCode: string | null
) {
  const supabase = createClient();
  
  const { error } = await supabase
    .from('carts')
    .upsert({
      user_id: userId,
      items: items,
      promo_code: promoCode,
      updated_at: new Date().toISOString(),
    });

  if (error) {
    console.error('Failed to save cart:', error);
  }
}
