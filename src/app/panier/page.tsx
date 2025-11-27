'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, X, Tag, ArrowRight, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/hooks/use-cart';
import { validatePromoCode, getPromoDescription } from '@/lib/promo-codes';
import { toast, Toaster } from 'sonner';

export default function CartPage() {
  const cart = useCart();
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  const handleApplyPromo = () => {
    const result = validatePromoCode(promoInput, cart.getSubtotal());
    
    if (result.valid && result.promo) {
      cart.applyPromoCode(result.promo);
      toast.success(`Code promo "${result.promo.code}" appliqué!`);
      setPromoInput('');
      setPromoError('');
    } else {
      setPromoError(result.error || 'Code invalide');
      toast.error(result.error || 'Code promo invalide');
    }
  };

  const handleRemovePromo = () => {
    cart.removePromoCode();
    toast.info('Code promo retiré');
    setPromoError('');
  };

  const subtotal = cart.getSubtotal();
  const shipping = cart.getShipping();
  const tax = cart.getTax();
  const discount = cart.getDiscount();
  const total = cart.getTotal();

  return (
    <>
      <Toaster position="top-right" richColors />
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Panier d'achat ({cart.getItemCount()} articles)
          </h1>

          {cart.items.length === 0 ? (
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
                {cart.items.map((item) => (
                  <div key={item.id} className="bg-white rounded-lg border p-4">
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <Link href={`/produits/${item.slug}`} className="flex-shrink-0">
                        <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-gray-100">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </Link>

                      {/* Product Info */}
                      <div className="flex-1">
                        <div className="flex justify-between mb-2">
                          <Link
                            href={`/produits/${item.slug}`}
                            className="font-semibold text-gray-900 hover:text-primary-600"
                          >
                            {item.name}
                          </Link>
                          <button
                            onClick={() => {
                              cart.removeItem(item.productId);
                              toast.success('Article retiré du panier');
                            }}
                            className="text-gray-400 hover:text-red-600 transition-colors"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>

                        <p className="text-sm text-gray-600 mb-3">SKU: {item.sku}</p>

                        {item.variant && (
                          <div className="flex gap-2 mb-3">
                            {item.variant.size && (
                              <span className="text-xs px-2 py-1 bg-gray-100 rounded">
                                Taille: {item.variant.size}
                              </span>
                            )}
                            {item.variant.color && (
                              <span className="text-xs px-2 py-1 bg-gray-100 rounded">
                                Couleur: {item.variant.color}
                              </span>
                            )}
                          </div>
                        )}

                        <div className="flex items-center justify-between">
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => cart.updateQuantity(item.productId, item.quantity - 1)}
                              className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => cart.updateQuantity(item.productId, parseInt(e.target.value) || 1)}
                              className="w-16 h-8 text-center border border-gray-300 rounded focus:outline-none focus:border-primary-500"
                              min="1"
                              max={item.stock}
                            />
                            <button
                              onClick={() => cart.updateQuantity(item.productId, item.quantity + 1)}
                              className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50"
                              disabled={item.quantity >= item.stock}
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Price */}
                          <div className="text-right">
                            <p className="text-lg font-bold text-gray-900">
                              €{(item.price * item.quantity).toFixed(2)}
                            </p>
                            <p className="text-sm text-gray-600">
                              €{item.price.toFixed(2)} / unité
                            </p>
                          </div>
                        </div>

                        {/* Stock Warning */}
                        {item.quantity >= item.stock && (
                          <div className="flex items-center gap-2 text-sm text-red-600 mt-2">
                            <AlertCircle className="w-4 h-4" />
                            <span>Stock limité: {item.stock} disponibles</span>
                          </div>
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
                    {cart.promoCode ? (
                      <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div>
                          <p className="font-semibold text-green-700">{cart.promoCode.code}</p>
                          <p className="text-sm text-green-600">{getPromoDescription(cart.promoCode)}</p>
                        </div>
                        <button
                          onClick={handleRemovePromo}
                          className="text-green-600 hover:text-green-700"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={promoInput}
                            onChange={(e) => {
                              setPromoInput(e.target.value.toUpperCase());
                              setPromoError('');
                            }}
                            placeholder="Entrez votre code"
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
                            onKeyPress={(e) => e.key === 'Enter' && handleApplyPromo()}
                          />
                          <button
                            onClick={handleApplyPromo}
                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                          >
                            <Tag className="w-5 h-5" />
                          </button>
                        </div>
                        {promoError && (
                          <p className="text-sm text-red-600 mt-2">{promoError}</p>
                        )}
                      </>
                    )}
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
                    {shipping > 0 && subtotal < 50 && (
                      <p className="text-sm text-primary-600">
                        Plus que €{(50 - subtotal).toFixed(2)} pour la livraison gratuite !
                      </p>
                    )}
                    {discount > 0 && (
                      <div className="flex justify-between text-green-600 font-semibold">
                        <span>Réduction</span>
                        <span>-€{discount.toFixed(2)}</span>
                      </div>
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
        </div>
      </div>
    </>
  );
}
