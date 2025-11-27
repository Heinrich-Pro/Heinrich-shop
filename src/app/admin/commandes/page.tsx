import Link from 'next/link';
import { Eye, Download, CheckCircle, XCircle, Package, Truck } from 'lucide-react';

export default function AdminOrdersPage() {
  const orders = [
    {
      id: 'CMD-143',
      customer: 'Jean Dupont',
      email: 'jean@email.com',
      date: '2024-01-27 14:30',
      status: 'pending',
      items: 3,
      total: 89.99,
    },
    {
      id: 'CMD-142',
      customer: 'Marie Martin',
      email: 'marie@email.com',
      date: '2024-01-27 10:15',
      status: 'paid',
      items: 2,
      total: 156.50,
    },
    {
      id: 'CMD-141',
      customer: 'Pierre Durand',
      email: 'pierre@email.com',
      date: '2024-01-26 16:45',
      status: 'shipped',
      items: 1,
      total: 234.00,
    },
    {
      id: 'CMD-140',
      customer: 'Sophie Laurent',
      email: 'sophie@email.com',
      date: '2024-01-25 09:20',
      status: 'delivered',
      items: 4,
      total: 312.75,
    },
  ];

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'pending':
        return { label: 'En attente', color: 'bg-yellow-100 text-yellow-700', icon: Package };
      case 'paid':
        return { label: 'Payée', color: 'bg-green-100 text-green-700', icon: CheckCircle };
      case 'shipped':
        return { label: 'Expédiée', color: 'bg-blue-100 text-blue-700', icon: Truck };
      case 'delivered':
        return { label: 'Livrée', color: 'bg-gray-100 text-gray-700', icon: CheckCircle };
      case 'canceled':
        return { label: 'Annulée', color: 'bg-red-100 text-red-700', icon: XCircle };
      default:
        return { label: 'Inconnu', color: 'bg-gray-100 text-gray-700', icon: Package };
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-gray-900 text-white py-4 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Gestion des Commandes</h1>
            <Link href="/admin/dashboard" className="text-sm hover:text-primary-400">← Retour au dashboard</Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Filters Bar */}
        <div className="flex items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Rechercher par numéro ou client..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
          />
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500">
            <option>Tous les statuts</option>
            <option>En attente</option>
            <option>Payée</option>
            <option>Expédiée</option>
            <option>Livrée</option>
            <option>Annulée</option>
          </select>
          <button className="px-6 py-2 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600">
            <Download className="w-5 h-5 inline mr-2" />
            Exporter
          </button>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg border overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Commande</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Client</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Date</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Articles</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Total</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Statut</th>
                <th className="text-right py-4 px-6 text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {orders.map((order) => {
                const statusInfo = getStatusInfo(order.status);
                const StatusIcon = statusInfo.icon;

                return (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <p className="font-semibold text-gray-900">{order.id}</p>
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-medium text-gray-900">{order.customer}</p>
                        <p className="text-sm text-gray-600">{order.email}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600">{order.date}</td>
                    <td className="py-4 px-6 text-sm text-gray-900">{order.items} produit{order.items > 1 ? 's' : ''}</td>
                    <td className="py-4 px-6 text-sm font-semibold text-gray-900">€{order.total.toFixed(2)}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${statusInfo.color}`}>
                        <StatusIcon className="w-3 h-3" />
                        {statusInfo.label}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded" title="Voir détails">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded" title="Télécharger facture">
                          <Download className="w-4 h-4" />
                        </button>
                        {order.status === 'pending' && (
                          <button className="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700">
                            Traiter
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
          <div className="bg-white rounded-lg border p-6">
            <p className="text-sm text-gray-600 mb-1">En attente</p>
            <p className="text-2xl font-bold text-yellow-600">5</p>
          </div>
          <div className="bg-white rounded-lg border p-6">
            <p className="text-sm text-gray-600 mb-1">Payées</p>
            <p className="text-2xl font-bold text-green-600">12</p>
          </div>
          <div className="bg-white rounded-lg border p-6">
            <p className="text-sm text-gray-600 mb-1">Expédiées</p>
            <p className="text-2xl font-bold text-blue-600">8</p>
          </div>
          <div className="bg-white rounded-lg border p-6">
            <p className="text-sm text-gray-600 mb-1">Livrées</p>
            <p className="text-2xl font-bold text-gray-600">143</p>
          </div>
        </div>
      </div>
    </div>
  );
}
