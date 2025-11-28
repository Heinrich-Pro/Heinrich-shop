'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

export default function PaymentConfirmationPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  
  const [status, setStatus] = useState<'loading' | 'success' | 'failed'>('loading');
  const [paymentData, setPaymentData] = useState<any>(null);

  useEffect(() => {
    async function verifyPayment() {
      if (!token) {
        setStatus('failed');
        return;
      }

      try {
        const response = await fetch(`/api/payment/verify?token=${token}`);
        const data = await response.json();

        if (data.success && data.data?.statut === 'paid') {
          setStatus('success');
          setPaymentData(data.data);
        } else {
          setStatus('failed');
        }
      } catch (error) {
        console.error('Erreur de vérification:', error);
        setStatus('failed');
      }
    }

    verifyPayment();
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        {status === 'loading' && (
          <div className="bg-white rounded-lg border p-12 text-center">
            <Loader2 className="w-16 h-16 text-primary-600 mx-auto mb-4 animate-spin" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Vérification du paiement...
            </h2>
            <p className="text-gray-600">Veuillez patienter</p>
          </div>
        )}

        {status === 'success' && (
          <div className="bg-white rounded-lg border p-12 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Paiement réussi !
            </h2>
            <p className="text-gray-600 mb-6">
              Votre commande a été confirmée et sera traitée dans les plus brefs délais.
            </p>

            {paymentData && (
              <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
                <h3 className="font-semibold text-gray-900 mb-4">Détails du paiement</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Transaction :</span>
                    <span className="font-medium">{paymentData.numeroTransaction}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Montant :</span>
                    <span className="font-medium">
                      €{paymentData.Montant?.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Moyen de paiement :</span>
                    <span className="font-medium">{paymentData.moyen}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date :</span>
                    <span className="font-medium">
                      {new Date(paymentData.createdAt).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/compte/commandes"
                className="px-6 py-3 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600"
              >
                Voir mes commandes
              </Link>
              <Link
                href="/"
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50"
              >
                Retour à l'accueil
              </Link>
            </div>
          </div>
        )}

        {status === 'failed' && (
          <div className="bg-white rounded-lg border p-12 text-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <XCircle className="w-12 h-12 text-red-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Paiement échoué
            </h2>
            <p className="text-gray-600 mb-6">
              Une erreur s'est produite lors du traitement de votre paiement.
              Veuillez réessayer ou contacter le support.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/panier"
                className="px-6 py-3 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600"
              >
                Retour au panier
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50"
              >
                Contacter le support
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
