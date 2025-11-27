import Link from 'next/link';
import { Package, Users, DollarSign, TrendingUp, ShoppingBag, UserCircle } from 'lucide-react';

export default function AdminDashboardPage() {
  const stats = [
    { label: 'Chiffre d\'affaires', value: '€12,542', icon: DollarSign, change: '+12%', color: 'text-green-600' },
    { label: 'Commandes', value: '143', icon: ShoppingBag, change: '+8%', color: 'text-blue-600' },
    { label: 'Produits', value: '256', icon: Package, change: '+3', color: 'text-purple-600' },
    { label: 'Clients', value: '1,234', icon: Users, change: '+24', color: 'text-orange-600' },
  ];

  const recentOrders = [
    { id: 'CMD-143', customer: 'Jean Dupont', date: '2024-01-27', status: 'pending', total: 89.99 },
    { id: 'CMD-142', customer: 'Marie Martin', date: '2024-01-27', status: 'paid', total: 156.50 },
    { id: 'CMD-141', customer: 'Pierre Durand', date: '2024-01-26', status: 'shipped', total: 234.00 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-gray-900 text-white py-4 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold">Heinrich Shop Admin</h1>
              <nav className="hidden md:flex items-center gap-6 ml-8">
                <Link href="/admin/dashboard" className="hover:text-primary-400">Dashboard</Link>
                <Link href="/admin/produits" className="hover:text-primary-400">Produits</Link>
                <Link href="/admin/commandes" className="hover:text-primary-400">Commandes</Link>
                <Link href="/admin/clients" className="hover:text-primary-400">Clients</Link>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/" className="text-sm hover:text-primary-400">← Retour au site</Link>
              <UserCircle className="w-8 h-8" />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg border p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <span className="text-sm font-semibold text-green-600 flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Orders */}
          <div className="lg:col-span-2 bg-white rounded-lg border">
            <div className="p-6 border-b">
              <h2 className="text-lg font-bold text-gray-900">Commandes récentes</h2>
            </div>
            < div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 text-sm font-semibold text-gray-900">Commande</th>
                      <th className="text-left py-3 text-sm font-semibold text-gray-900">Client</th>
                      <th className="text-left py-3 text-sm font-semibold text-gray-900">Date</th>
                      <th className="text-left py-3 text-sm font-semibold text-gray-900">Statut</th>
                      <th className="text-right py-3 text-sm font-semibold text-gray-900">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="border-b last:border-0">
                        <td className="py-4 text-sm font-medium text-gray-900">{order.id}</td>
                        <td className="py-4 text-sm text-gray-600">{order.customer}</td>
                        <td className="py-4 text-sm text-gray-600">{order.date}</td>
                        <td className="py-4">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            order.status === 'paid' ? 'bg-green-100 text-green-700' :
                            order.status === 'shipped' ? 'bg-blue-100 text-blue-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                            {order.status === 'paid' ? 'Payée' :
                             order.status === 'shipped' ? 'Expédiée' : 'En attente'}
                          </span>
                        </td>
                        <td className="py-4 text-sm font-semibold text-gray-900 text-right">
                          €{order.total.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-lg border p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Actions rapides</h3>
              <div className="space-y-3">
                <Link href="/admin/produits/nouveau" className="block w-full bg-primary-500 text-white text-center py-2 rounded-lg font-semibold hover:bg-primary-600">
                  + Nouveau produit
                </Link>
                <Link href="/admin/commandes" className="block w-full border-2 border-gray-300 text-gray-700 text-center py-2 rounded-lg font-semibold hover:bg-gray-50">
                  Gérer les commandes
                </Link>
                <Link href="/admin/clients" className="block w-full border-2 border-gray-300 text-gray-700 text-center py-2 rounded-lg font-semibold hover:bg-gray-50">
                  Voir les clients
                </Link>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h4 className="font-semibold text-yellow-900 mb-2">⚠️ Alertes</h4>
              <ul className="text-sm text-yellow-800 space-y-1">
                <li>• 3 produits en rupture de stock</li>
                <li>• 5 commandes en attente</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
