'use client';

import { useState } from 'react';
import Link from 'next/link';
        {/* Progress Steps */}
        <div className="bg-white rounded-lg border p-6 mb-8">
          <div className="flex items-center justify-between">
            {steps.map((s, index) => (
              <div key={s.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    step >= s.id ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    <s.icon className="w-6 h-6" />
                  </div>
                  <span className={`text-sm mt-2 font-medium ${
                    step >= s.id ? 'text-primary-600' : 'text-gray-500'
                  }`}>
                    {s.name}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <ChevronRight className={`w-5 h-5 mx-2 ${
                    step > s.id ? 'text-primary-500' : 'text-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Shipping Address */}
            {step === 1 && (
              <div className="bg-white rounded-lg border p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Adresse de livraison</h2>
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">Prénom</label>
                      <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">Nom</label>
                      <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Adresse</label>
                    <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">Code postal</label>
                      <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">Ville</label>
                      <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Téléphone</label>
                    <input type="tel" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500" />
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="w-full bg-primary-500 text-white py-3 rounded-lg font-semibold hover:bg-primary-600"
                  >
                    Continuer vers la livraison
                  </button>
                </form>
              </div>
            )}

            {/* Step 2: Shipping Method */}
            {step === 2 && (
              <div className="bg-white rounded-lg border p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Mode de livraison</h2>
                <div className="space-y-3">
                  <label className={`block p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                    shippingMethod === 'standard' ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <input
                      type="radio"
                      name="shipping"
                      value="standard"
                      checked={shippingMethod === 'standard'}
                      onChange={(e) => setShippingMethod(e.target.value)}
                      className="sr-only"
                    />
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-900">Livraison Standard</p>
                        <p className="text-sm text-gray-600">3-5 jours ouvrés</p>
                      </div>
                      <span className="text-lg font-bold text-green-600">GRATUIT</span>
                    </div>
                  </label>
                  <label className={`block p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                    shippingMethod === 'express' ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <input
                      type="radio"
                      name="shipping"
                      value="express"
                      checked={shippingMethod === 'express'}
                      onChange={(e) => setShippingMethod(e.target.value)}
                      className="sr-only"
                    />
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-900">Livraison Express</p>
                        <p className="text-sm text-gray-600">24-48 heures</p>
                      </div>
                      <span className="text-lg font-bold text-gray-900">€9.99</span>
                    </div>
                  </label>
                </div>
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50"
                  >
                    Retour
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="flex-1 bg-primary-500 text-white py-3 rounded-lg font-semibold hover:bg-primary-600"
                  >
                    Continuer vers le paiement
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Payment */}
            {step === 3 && (
              <div className="bg-white rounded-lg border p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Mode de paiement</h2>
                <p className="text-sm text-gray-600 mb-6">
                  En cliquant sur "Passer la commande", vous serez redirigé vers FusionPay pour finaliser votre paiement de manière sécurisée.
                </p>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setStep(2)}
                    className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50"
                  >
                    Retour
                  </button>
                  <button
                    onClick={handlePayment}
                    disabled={processing}
                    className="flex-1 bg-primary-500 text-white py-3 rounded-lg font-semibold hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {processing ? 'Traitement...' : 'Passer la commande'}
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Confirmation */}
            {step === 4 && (
              <div className="bg-white rounded-lg border p-8 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Commande confirmée !</h2>
                <p className="text-gray-600 mb-4">Numéro de commande : <span className="font-semibold">CMD-20241127-001</span></p>
                <p className="text-sm text-gray-600 mb-6">
                  Un email de confirmation a été envoyé à votre adresse.
                </p>
                <div className="flex gap-3 justify-center">
                  <Link href="/compte/commandes" className="px-6 py-3 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600">
                    Voir mes commandes
                  </Link>
                  <Link href="/" className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50">
                    Retour à l'accueil
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border p-6 sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Récapitulatif</h3>
              <div className="space-y-3 mb-6 pb-6 border-b">
                <div className="flex justify-between text-gray-700">
                  <span>Sous-total</span>
                  <span>€{orderSummary.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Livraison</span>
                  <span>{orderSummary.shipping === 0 ? 'GRATUIT' : `€${orderSummary.shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>TVA</span>
                  <span>€{orderSummary.tax.toFixed(2)}</span>
                </div>
              </div>
              <div className="flex justify-between text-xl font-bold text-gray-900">
                <span>Total</span>
                <span>€{orderSummary.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
