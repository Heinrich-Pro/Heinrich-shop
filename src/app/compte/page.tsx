'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Package, User, MapPin, Heart, Settings, TrendingUp } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function AccountPage() {
  const router = useRouter();
  const supabase = createClient();
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState({
    ordersCount: 0,
    favoritesCount: 0,
    totalSpent: 0,
  });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
    loadData();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push('/auth/connexion');
      return;
    }
    setUser(user);

    // Load user profile
    const { data: profile } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();
    
    if (profile) {
      setUser({ ...user, ...profile });
    }
  };

  const loadData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // Load orders
    const { data: orders } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(3);

    if (orders) {
      setRecentOrders(orders);
      const total = orders.reduce((sum, order) => sum + order.total_amount, 0);
      setStats(prev => ({ ...prev, ordersCount: orders.length, totalSpent: total }));
    }

    // TODO: Load favorites count when wishlist implemented
    
    setLoading(false);
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-700',
      paid: 'bg-blue-100 text-blue-700',
      processing: 'bg-purple-100 text-purple-700',
      shipped: 'bg-indigo-100 text-indigo-700',
      delivered: 'bg-green-100 text-green-700',
      canceled: 'bg-red-100 text-red-700',
    };
    
    const labels = {
      pending: 'En attente',
      paid: 'Payée',
      processing: 'En préparation',
      shipped: 'Expédiée',
      delivered: 'Livrée',
      canceled: 'Annulée',
    };

    return (
      <span className={`text-xs px-2 py-1 rounded-full ${styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-700'}`}>
        {labels[status as keyof typeof labels] || status}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="container mx-auto px-4">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-48"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Mon Compte</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <nav className="bg-white rounded-lg border p-4 space-y-1">
              <Link
                href="/compte"
                className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary-50 text-primary-700 font-medium"
              >
                <User className="w-5 h-5" />
                Dashboard
              </Link>
              <Link
                href="/compte/commandes"
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 text-gray-700"
              >
                <Package className="w-5 h-5" />
                Mes commandes
              </Link>
              <Link
                href="/compte/adresses"
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 text-gray-700"
              >
                <MapPin className="w-5 h-5" />
                Mes adresses
              </Link>
              <Link
                href="/compte/favoris"
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 text-gray-700"
              >
                <Heart className="w-5 h-5" />
                Ma liste de souhaits
              </Link>
              <Link
                href="/compte/profil"
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 text-gray-700"
              >
                <Settings className="w-5 h-5" />
                Paramètres
              </Link>
            </nav>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Welcome Card */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-2">
                Bienvenue, {user?.name || user?.email?.split('@')[0]} !
              </h2>
              <p className="text-white/90">Gérez votre compte et consultez vos commandes</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg border p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-gray-600 text-sm font-medium">Commandes</h3>
                  <Package className="w-5 h-5 text-gray-400" />
                </div>
                <p className="text-3xl font-bold text-gray-900">{stats.ordersCount}</p>
                <Link
                  href="/compte/commandes"
                  className="text-sm text-primary-600 hover:text-primary-700 mt-2 inline-block"
                >
                  Voir tout →
                </Link>
              </div>
              <div className="bg-white rounded-lg border p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-gray-600 text-sm font-medium">Favoris</h3>
                  <Heart className="w-5 h-5 text-gray-400" />
                </div>
                <p className="text-3xl font-bold text-gray-900">{stats.favoritesCount}</p>
                <Link
                  href="/compte/favoris"
                  className="text-sm text-primary-600 hover:text-primary-700 mt-2 inline-block"
                >
                  Voir tout →
                </Link>
              </div>
              <div className="bg-white rounded-lg border p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-gray-600 text-sm font-medium">Total dépensé</h3>
                  <TrendingUp className="w-5 h-5 text-gray-400" />
                </div>
                <p className="text-3xl font-bold text-gray-900">
                  €{stats.totalSpent.toFixed(2)}
                </p>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-lg border">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-900">Commandes récentes</h3>
                  <Link
                    href="/compte/commandes"
                    className="text-primary-600 hover:text-primary-700 text-sm font-semibold"
                  >
                    Voir tout
                  </Link>
                </div>
              </div>
              <div className="p-6">
                {recentOrders.length > 0 ? (
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div
                        key={order.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                      >
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">{order.order_number}</p>
                          <p className="text-sm text-gray-600">
                            {new Date(order.created_at).toLocaleDateString('fr-FR')}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">
                              €{order.total_amount.toFixed(2)}
                            </p>
                            {getStatusBadge(order.status)}
                          </div>
                          <Link
                            href={`/compte/commandes/${order.id}`}
                            className="text-primary-600 hover:text-primary-700 text-sm font-semibold"
                          >
                            Détails →
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-600">Aucune commande pour le moment</p>
                    <Link
                      href="/produits"
                      className="text-primary-600 hover:text-primary-700 text-sm font-semibold mt-2 inline-block"
                    >
                      Découvrir nos produits →
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
