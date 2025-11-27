import Link from 'next/link';
import { Package, Truck, CheckCircle, XCircle } from 'lucide-react';

export default function OrdersPage() {
  const orders = [
    {
      id: 'CMD-001',
      date: '2024-01-15',
      status: 'delivered',
      items: 3,
      total: 89.99,
      trackingNumber: 'FR123456789',
    },
    {
      id: 'CMD-002',
      date: '2024-01-20',
      status: 'shipped',
      items: 2,
      total: 156.50,
      trackingNumber: 'FR987654321',
    },
    {
      id: 'CMD-003',
      date: '2024-01-25',
      status: 'processing',
      items: 1,
      total: 45.00,
      trackingNumber: null,
    },
  ];

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'delivered':
        return { label: 'Livrée', color: 'bg-green-100 text-green-700', icon: CheckCircle };
      case 'shipped':
        return { label: 'Expédiée', color: 'bg-blue-100 text-blue-700', icon: Truck };
      case 'processing':
        return { label: 'En préparation', color: 'bg-yellow-100 text-yellow-700', icon: Package };
      case 'canceled':
        return { label: 'Annulée', color: 'bg-red-100 text-red-700', icon: XCircle };
      default:
        return { label: 'En attente', color: 'bg-gray-100 text-gray-700', icon: Package };
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Mes commandes</h1>

        <div className="space-y-4">
          {orders.map((order) => {
            const statusInfo = getStatusInfo(order.status);
            const StatusIcon = statusInfo.icon;

            return (
              <div key={order.id} className="bg-white rounded-lg border">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{order.id}</h3>
                      <p className="text-sm text-gray-600">Passée le {order.date}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${statusInfo.color}`}>
                        <StatusIcon className="w-4 h-4" />
                        {statusInfo.label}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 pb-4 border-b">
                    <div>
                      <p className="text-sm text-gray-600">Articles</p>
                      <p className="font-semibold text-gray-900">{order.items} produit{order.items > 1 ? 's' : ''}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total</p>
                      <p className="font-semibold text-gray-900">€{order.total.toFixed(2)}</p>
                    </div>
                    {order.trackingNumber && (
                      <div className="col-span-2">
                        <p className="text-sm text-gray-600">Numéro de suivi</p>
                        <p className="font-semibold text-gray-900">{order.trackingNumber}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Link
                      href={`/compte/commandes/${order.id}`}
                      className="px-4 py-2 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 transition-colors"
                    >
                      Voir les détails
                    </Link>
                    {order.trackingNumber && (
                      <button className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                        Suivre ma commande
                      </button>
                    )}
                    {order.status === 'delivered' && (
                      <button className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                        Télécharger la facture
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {orders.length === 0 && (
          <div className="bg-white rounded-lg border p-12 text-center">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Aucune commande</h2>
            <p className="text-gray-600 mb-6">Vous n'avez pas encore passé de commande</p>
            <Link
              href="/produits"
              className="inline-block px-8 py-3 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600"
            >
              Découvrir nos produits
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
