'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ShoppingBag,
  Package,
  Users,
  TrendingUp,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function AdminDashboard() {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    totalRevenue: 0,
    totalCustomers: 0,
    totalProducts: 0,
    lowStock: 0,
  });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);

  useEffect(() => {
    checkAdmin();
    loadStats();
    loadRecentOrders();
  }, []);

  const checkAdmin = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push('/admin/login');
      return;
    }

    // Check if user is admin
    const { data: profile } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profile?.role !== 'admin') {
      await supabase.auth.signOut();
      router.push('/admin/login');
      return;
    }
  };

  const loadStats = async () => {
    // Total Orders
    const { count: ordersCount } = await supabase
      .from('orders')
      .select('*', { count: 'exact', head: true });

    // Pending Orders
    const { count: pendingCount } = await supabase
      .from('orders')
      .select('*', { count: 'exact', head: true })
      .in('status', ['pending', 'paid']);

    // Total Revenue
    const { data: orders } = await supabase
      .from('orders')
      .select('total_amount')
      .eq('status', 'delivered');

    const revenue = orders?.reduce((sum, order) => sum + order.total_amount, 0) || 0;

    // Total Customers
    const { count: customersCount } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })
      .eq('role', 'customer');

    // Total Products
    const { count: productsCount } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true });

    // Low Stock (< 10)
    const { count: lowStockCount } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true })
      .lt('stock', 10)
      .eq('is_active', true);

    setStats({
      totalOrders: ordersCount || 0,
      pendingOrders: pendingCount || 0,
      totalRevenue: revenue,
      totalCustomers: customersCount || 0,
      totalProducts: productsCount || 0,
      lowStock: lowStockCount || 0,
    });

    setLoading(false);
  };

  const loadRecentOrders = async () => {
    const { data } = await supabase
      .from('orders')
      .select(`
        *,
        users (name, email)
      `)
      .order('created_at', { ascending: false })
      .limit(5);

    setRecentOrders(data || []);
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
      <span className={`text-xs px-2 py-1 rounded-full ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-64"></div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard Admin</h1>
            <nav className="flex items-center gap-4">
              <Link
                href="/admin/dashboard"
                className="text-primary-600 font-semibold"
              >
                Dashboard
              </Link>
              <Link
                href="/admin/produits"
                className="text-gray-600 hover:text-gray-900"
              >
                Produits
              </Link>
              <Link
                href="/admin/commandes"
                className="text-gray-600 hover:text-gray-900"
              >
                Commandes
              </Link>
              <Link href="/" className="text-gray-600 hover:text-gray-900">
                Retour au site
              </Link>
            </nav>
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Revenue */}
          <div className="bg-white rounded-lg border p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">Chiffre d'affaires</h3>
            <p className="text-3xl font-bold text-gray-900">€{stats.totalRevenue.toFixed(2)}</p>
            <p className="text-sm text-gray-600 mt-2">Commandes livrées</p>
          </div>

          {/* Total Orders */}
          <div className="bg-white rounded-lg border p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-blue-600" />
              </div>
              {stats.pendingOrders > 0 && (
                <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full font-semibold">
                  {stats.pendingOrders} en attente
                </span>
              )}
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">Total Commandes</h3>
            <p className="text-3xl font-bold text-gray-900">{stats.totalOrders}</p>
            <Link
              href="/admin/commandes"
              className="text-sm text-primary-600 hover:text-primary-700 mt-2 inline-block"
            >
              Gérer →
            </Link>
          </div>

          {/* Total Products */}
          <div className="bg-white rounded-lg border p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-purple-600" />
              </div>
              {stats.lowStock > 0 && (
                <AlertCircle className="w-5 h-5 text-red-600" />
              )}
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">Produits</h3>
            <p className="text-3xl font-bold text-gray-900">{stats.totalProducts}</p>
            {stats.lowStock > 0 && (
              <p className="text-sm text-red-600 mt-2">{stats.lowStock} stock faible</p>
            )}
          </div>

          {/* Total Customers */}
          <div className="bg-white rounded-lg border p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">Clients</h3>
            <p className="text-3xl font-bold text-gray-900">{stats.totalCustomers}</p>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-lg border">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Commandes récentes</h2>
              <Link
                href="/admin/commandes"
                className="text-primary-600 hover:text-primary-700 text-sm font-semibold"
              >
                Voir toutes
              </Link>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Numéro
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Statut
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <Link
                        href={`/admin/commandes/${order.id}`}
                        className="font-medium text-primary-600 hover:text-primary-700"
                      >
                        {order.order_number}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-gray-900">
                      {order.users?.name || order.users?.email || 'Invité'}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {new Date(order.created_at).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900">
                      €{order.total_amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">{getStatusBadge(order.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
