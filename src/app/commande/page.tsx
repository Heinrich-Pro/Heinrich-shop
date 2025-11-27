'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronRight, Check, MapPin, Truck, CreditCard, ShieldCheck } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import { createClient } from '@/lib/supabase/client';
import { toast, Toaster } from 'sonner';

const steps = [
  { id: 1, name: 'Livraison', icon: MapPin },
  { id: 2, name: 'Mode', icon: Truck },
  { id: 3, name: 'Paiement', icon: CreditCard },
  { id: 4, name: 'Confirmation', icon: Check },
];

export default function CheckoutPage() {
  const router = useRouter();
  const cart = useCart();
  const supabase = createClient();
  
  const [step, setStep] = useState(1);
  const [processing, setProcessing] = useState(false);
  const [user, setUser] = useState<any>(null);
  
  // Shipping address
  const [shippingAddress, setShippingAddress] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    phone: '',
  });
  
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
    
    if (!user && cart.items.length > 0) {
      // Allow guest checkout but suggest login
      toast.info('Connectez-vous pour un checkout plus rapide!');
    }
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shippingAddress.firstName || !shippingAddress.lastName || !shippingAddress.address) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }
    setStep(2);
  };

  const handlePayment = async () => {
    if (!acceptTerms) {
      toast.error('Vous devez accepter les conditions générales');
      return;
    }

    setProcessing(true);

    try {
      // Create order
      const response = await fetch('/api/orders/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart.items,
          shippingAddress,
          shippingMethod,
          promoCode: cart.promoCode?.code,
          total: cart.getTotal(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de la création de la commande');
      }

      setOrderId(data.orderNumber);
      
      // Clear cart
      cart.clearCart();
      
      // redirect to payment or show confirmation
      if (data.paymentUrl) {
        window.location.href = data.paymentUrl;
      } else {
        setStep(4);
        toast.success('Commande créée avec succès!');
      }
    } catch (error: any) {
      toast.error(error.message || 'Une erreur est survenue');
      console.error('Payment error:', error);
    } finally {
      setProcessing(false);
    }
  };

  const subtotal = cart.getSubtotal();
  const shipping = shippingMethod === 'express' ? 9.99 : cart.getShipping();
  const tax = cart.getTax();
  const discount = cart.getDiscount();
  const total = subtotal + shipping + tax - discount;

  // Redirect if cart is empty
  if (cart.items.length === 0 && step < 4) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-md text-center">
          <div className="bg-white rounded-lg border p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Panier vide</h2>
            <p className="text-gray-600 mb-6">Ajoutez des produits avant de passer commande</p>
            <Link
              href="/produits"
              className="inline-block bg-primary-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-600"
            >
              Découvrir nos produits
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-right" richColors />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-5xl">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Finaliser la commande</h1>

          {/* Progress Steps */}
          <div className="bg-white rounded-lg border p-6 mb-8">
            <div className="flex items-center justify-between">
              {steps.map((s, index) => (
                <div key={s.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        step >= s.id ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      <s.icon className="w-6 h-6" />
                    </div>
                    <span
                      className={`text-sm mt-2 font-medium ${
                        step >= s.id ? 'text-primary-600' : 'text-gray-500'
                      }`}
                    >
                      {s.name}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <ChevronRight className={`w-5 h-5 mx-2 ${step > s.id ? 'text-primary-500' : 'text-gray-300'}`} />
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
                  <form onSubmit={handleShippingSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Prénom <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={shippingAddress.firstName}
                          onChange={(e) => setShippingAddress({ ...shippingAddress, firstName: e.target.value })}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Nom <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={shippingAddress.lastName}
                          onChange={(e) => setShippingAddress({ ...shippingAddress, lastName: e.target.value })}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Adresse <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={shippingAddress.address}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Code postal <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={shippingAddress.postalCode}
                          onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Ville <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={shippingAddress.city}
                          onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Téléphone <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        value={shippingAddress.phone}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
                      />
                    </div>
                    <button
                      type="submit"
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
                    <label
                      className={`block p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                        shippingMethod === 'standard' ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
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
                        <span className="text-lg font-bold text-green-600">
                          {subtotal >= 50 ? 'GRATUIT' : '€5.99'}
                        </span>
                      </div>
                    </label>
                    <label
                      className={`block p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                        shippingMethod === 'express' ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
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
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Récapitulatif & Paiement</h2>
                  
                  {/* Address Summary */}
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Adresse de livraison</h3>
                    <p className="text-sm text-gray-700">
                      {shippingAddress.firstName} {shippingAddress.lastName}<br />
                      {shippingAddress.address}<br />
                      {shippingAddress.postalCode} {shippingAddress.city}<br />
                      {shippingAddress.phone}
                    </p>
                    <button onClick={() => setStep(1)} className="text-sm text-primary-600 hover:text-primary-700 mt-2">
                      Modifier
                    </button>
                  </div>

                  {/* Shipping Summary */}
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Mode de livraison</h3>
                    <p className="text-sm text-gray-700">
                      {shippingMethod === 'standard' ? 'Livraison Standard (3-5 jours)' : 'Livraison Express (24-48h)'}
                    </p>
                    <button onClick={() => setStep(2)} className="text-sm text-primary-600 hover:text-primary-700 mt-2">
                      Modifier
                    </button>
                  </div>

                  {/* Terms */}
                  <div className="mb-6">
                    <label className="flex items-start gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={acceptTerms}
                        onChange={(e) => setAcceptTerms(e.target.checked)}
                        className="w-4 h-4 mt-1 text-primary-600 rounded focus:ring-primary-500"
                      />
                      <span className="text-sm text-gray-700">
                        J'accepte les{' '}
                        <Link href="/cgv" className="text-primary-600 hover:text-primary-700" target="_blank">
                          conditions générales de vente
                        </Link>
                        {' '}et la{' '}
                        <Link href="/confidentialite" className="text-primary-600 hover:text-primary-700" target="_blank">
                          politique de confidentialité
                        </Link>
                      </span>
                    </label>
                  </div>

                  {/* Payment Info */}
                  <div className="mb-6 p-4 border-2 border-blue-200 bg-blue-50 rounded-lg">
                    <div className="flex items-start gap-3">
                      <ShieldCheck className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold text-blue-900 mb-1">Paiement sécurisé</p>
                        <p className="text-sm text-blue-700">
                          En cliquant sur "Passer la commande", vous serez redirigé vers FusionPay pour finaliser votre paiement de manière sécurisée.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep(2)}
                      className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50"
                    >
                      Retour
                    </button>
                    <button
                      onClick={handlePayment}
                      disabled={processing || !acceptTerms}
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
                  <p className="text-gray-600 mb-4">
                    Numéro de commande : <span className="font-semibold">{orderId}</span>
                  </p>
                  <p className="text-sm text-gray-600 mb-6">
                    Un email de confirmation a été envoyé à votre adresse.
                  </p>
                  <div className="flex gap-3 justify-center">
                    {user && (
                      <Link
                        href="/compte/commandes"
                        className="px-6 py-3 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600"
                      >
                        Voir mes commandes
                      </Link>
                    )}
                    <Link
                      href="/"
                      className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50"
                    >
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
                
                {/* Items */}
                <div className="space-y-3 mb-4 pb-4 border-b max-h-64 overflow-y-auto">
                  {cart.items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="relative w-16 h-16 rounded bg-gray-100 flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded" />
                        <span className="absolute -top-2 -right-2 w-6 h-6 bg-gray-900 text-white rounded-full flex items-center justify-center text-xs">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                        <p className="text-sm text-gray-600">€{(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="space-y-3 mb-6 pb-6 border-b">
                  <div className="flex justify-between text-gray-700">
                    <span>Sous-total</span>
                    <span>€{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Livraison</span>
                    <span>{shipping === 0 ? 'GRATUIT' : `€${shipping.toFixed(2)}`}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600 font-semibold">
                      <span>Réduction</span>
                      <span>-€{discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-700">
                    <span>TVA</span>
                    <span>€{tax.toFixed(2)}</span>
                  </div>
                </div>
                <div className="flex justify-between text-xl font-bold text-gray-900">
                  <span>Total</span>
                  <span>€{total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
