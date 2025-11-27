'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, X, Tag, ArrowRight } from 'lucide-react';
import ProductCard from '@/components/products/ProductCard';
import { products } from '@/lib/data';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    { product: products[0], quantity: 2 },
    { product: products[1], quantity: 1 },
  ]);
  const [promoCode, setPromoCode] = useState('');

  const updateQuantity = (index: number, newQuantity: number) => {
    const updated = [...cartItems];
    updated[index].quantity = Math.max(1, Math.min(newQuantity, updated[index].product.stock));
    setCartItems(updated);
  };

  const removeItem = (index: number) => {
    setCartItems(cartItems.filter((_, i) => i !== index));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const shipping = subtotal >= 50 ? 0 : 5.99;
  const tax = subtotal * 0.2; // 20% TVA
  const total = subtotal + shipping + tax;

  const recommendedProducts = products.filter(p => !cartItems.some(item => item.product.id === p.id)).slice(0, 4);

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Panier d'achat</h1>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-lg border p-12 text-center">
            <p className="text-xl text-gray-600 mb-4">Votre panier est vide</p>
            <Link
              href="/produits"
              className="inline-flex items-center gap-2 bg-primary-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors"
            >
              Continuer mes achats
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item, index) => (
                <div key={item.product.id} className="bg-white rounded-lg border p-4">
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <Link href={`/produits/${item.product.slug}`} className="flex-shrink-0">
                      <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-gray-100">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </Link>

                    {/* Product Info */}
                    <div className="flex-1">
                      <div className="flex justify-between mb-2">
                        <Link
                          href={`/produits/${item.product.slug}`}
                          className="font-semibold text-gray-900 hover:text-primary-600"
                        >
                          {item.product.name}
                        </Link>
                        <button
                          onClick={() => removeItem(index)}
                          className="text-gray-400 hover:text-red-600 transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      <p className="text-sm text-gray-600 mb-3">SKU: {item.product.sku}</p>

                      <div className="flex items-center justify-between">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(index, item.quantity - 1)}
                            className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(index, parseInt(e.target.value) || 1)}
                            className="w-16 h-8 text-center border border-gray-300 rounded focus:outline-none focus:border-primary-500"
                          />
                          <button
                            onClick={() => updateQuantity(index, item.quantity + 1)}
                            className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-900">
                            €{(item.product.price * item.quantity).toFixed(2)}
                          </p>
                          <p className="text-sm text-gray-600">
                            €{item.product.price.toFixed(2)} / unité
                          </p>
                        </div>
                      </div>

                      {/* Stock Warning */}
                      {item.quantity >= item.product.stock && (
                        <p className="text-sm text-red-600 mt-2">
                          Stock limité: {item.product.stock} disponibles
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Continue Shopping */}
              <Link
                href="/produits"
                className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold"
              >
                ← Continuer mes achats
              </Link>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg border p-6 sticky top-24">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Récapitulatif</h2>

                {/* Promo Code */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Code promo
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Entrez votre code"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
                    />
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                      <Tag className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 mb-6 pb-6 border-b">
                  <div className="flex justify-between text-gray-700">
                    <span>Sous-total</span>
                    <span>€{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Livraison</span>
                    <span>{shipping === 0 ? 'GRATUIT' : `€${shipping.toFixed(2)}`}</span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-sm text-primary-600">
                      Plus que €{(50 - subtotal).toFixed(2)} pour la livraison gratuite !
                    </p>
                  )}
                  <div className="flex justify-between text-gray-700">
                    <span>TVA (20%)</span>
                    <span>€{tax.toFixed(2)}</span>
                  </div>
                </div>

                {/* Total */}
                <div className="flex justify-between text-xl font-bold text-gray-900 mb-6">
                  <span>Total</span>
                  <span>€{total.toFixed(2)}</span>
                </div>

                {/* Checkout Button */}
                <Link
                  href="/commande"
                  className="block w-full bg-primary-500 text-white text-center py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors mb-3"
                >
                  Passer la commande
                </Link>

                <p className="text-xs text-gray-600 text-center">
                  Paiement sécurisé • Satisfait ou remboursé
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Recommended Products */}
        {recommendedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Vous aimerez aussi</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {recommendedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
