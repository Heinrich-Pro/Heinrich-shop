import Link from 'next/link';
import { Package, User, MapPin, Heart, Settings } from 'lucide-react';

export default function AccountPage() {
  const recentOrders = [
    { id: 'CMD-001', date: '2024-01-15', status: 'Livrée', total: 89.99 },
    { id: 'CMD-002', date: '2024-01-20', status: 'En cours', total: 156.50 },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Mon Compte</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <nav className="bg-white rounded-lg border p-4 space-y-1">
              <Link href="/compte" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary-50 text-primary-700 font-medium">
                <User className="w-5 h-5" />
                Dashboard
              </Link>
              <Link href="/compte/commandes" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 text-gray-700">
                <Package className="w-5 h-5" />
                Mes commandes
              </Link>
              <Link href="/compte/adresses" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 text-gray-700">
                <MapPin className="w-5 h-5" />
                Mes adresses
              </Link>
              <Link href="/compte/favoris" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 text-gray-700">
                <Heart className="w-5 h-5" />
                Ma liste de souhaits
              </Link>
              <Link href="/compte/profil" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 text-gray-700">
                <Settings className="w-5 h-5" />
                Paramètres
              </Link>
            </nav>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Welcome Card */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-2">Bienvenue, Jean !</h2>
              <p className="text-white/90">Gérez votre compte et consultez vos commandes</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg border p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-gray-600 text-sm font-medium">Commandes</h3>
                  <Package className="w-5 h-5 text-gray-400" />
                </div>
                <p className="text-3xl font-bold text-gray-900">12</p>
              </div>
              <div className="bg-white rounded-lg border p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-gray-600 text-sm font-medium">Favoris</h3>
                  <Heart className="w-5 h-5 text-gray-400" />
                </div>
                <p className="text-3xl font-bold text-gray-900">8</p>
              </div>
              <div className="bg-white rounded-lg border p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-gray-600 text-sm font-medium">Total dépensé</h3>
                  <span className="text-gray-400">€</span>
                </div>
                <p className="text-3xl font-bold text-gray-900">€542</p>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-lg border">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-900">Commandes récentes</h3>
                  <Link href="/compte/commandes" className="text-primary-600 hover:text-primary-700 text-sm font-semibold">
                    Voir tout
                  </Link>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{order.id}</p>
                        <p className="text-sm text-gray-600">{order.date}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">€{order.total.toFixed(2)}</p>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            order.status === 'Livrée'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                        <Link href={`/compte/commandes/${order.id}`} className="text-primary-600 hover:text-primary-700 text-sm font-semibold">
                          Détails →
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
