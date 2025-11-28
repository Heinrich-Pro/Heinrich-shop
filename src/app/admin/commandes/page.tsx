'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Package, Search, Filter, Eye } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { toast, Toaster } from 'sonner';

export default function AdminOrdersPage() {
  const router = useRouter();
  const supabase = createClient();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  useEffect(() => {
    checkAdmin();
    loadOrders();
  }, [statusFilter]);

  const checkAdmin = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push('/auth/connexion');
      return;
    }

    const { data: profile } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single() as { data: { role: string } | null };

    if (profile?.role !== 'admin') {
      router.push('/');
    }
  };

  const loadOrders = async () => {
    let query = supabase
      .from('orders')
      .select(`
        *,
        users (name, email),
        order_items (
          id,
          quantity,
          price
        )
      `)
      .order('created_at', { ascending: false });

    if (statusFilter) {
      query = query.eq('status', statusFilter);
    }

    const { data, error } = await query;

    if (error) {
      toast.error('Erreur lors du chargement des commandes');
    } else {
      setOrders(data || []);
    }

    setLoading(false);
  };

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    // @ts-ignore - Supabase typing issue with dynamic status update
    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', orderId);

    if (error) {
      toast.error('Erreur lors de la mise à jour');
    } else {
      toast.success('Statut mis à jour');
      loadOrders();
    }
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
      <span className={`text-xs px-2 py-1 rounded-full font-semibold ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  const filteredOrders = orders.filter((order) =>
    order.order_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.users?.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-64"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-right" richColors />
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b sticky top-0 z-10">
          <div className="px-8 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">Gestion des Commandes</h1>
              <nav className="flex items-center gap-4">
                <Link href="/admin/dashboard" className="text-gray-600 hover:text-gray-900">
                  Dashboard
                </Link>
                <Link href="/admin/produits" className="text-gray-600 hover:text-gray-900">
                  Produits
                </Link>
                <Link href="/admin/commandes" className="text-primary-600 font-semibold">
                  Commandes
                </Link>
              </nav>
            </div>
          </div>
        </div>

        <div className="p-8">
          {/* Filters */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher par numéro ou email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setStatusFilter(null)}
                className={`px-4 py-2 rounded-lg font-medium ${
                  statusFilter === null ? 'bg-primary-500 text-white' : 'bg-white border text-gray-700'
                }`}
              >
                Toutes
              </button>
              <button
                onClick={() => setStatusFilter('pending')}
                className={`px-4 py-2 rounded-lg font-medium ${
                  statusFilter === 'pending' ? 'bg-primary-500 text-white' : 'bg-white border text-gray-700'
                }`}
              >
                En attente
              </button>
              <button
                onClick={() => setStatusFilter('processing')}
                className={`px-4 py-2 rounded-lg font-medium ${
                  statusFilter === 'processing' ? 'bg-primary-500 text-white' : 'bg-white border text-gray-700'
                }`}
              >
                En préparation
              </button>
              <button
                onClick={() => setStatusFilter('shipped')}
                className={`px-4 py-2 rounded-lg font-medium ${
                  statusFilter === 'shipped' ? 'bg-primary-500 text-white' : 'bg-white border text-gray-700'
                }`}
              >
                Expédiées
              </button>
            </div>
          </div>

          {/* Orders Table */}
          <div className="bg-white rounded-lg border overflow-hidden">
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
                      Articles
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                      Total
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                      Statut
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredOrders.length > 0 ? (
                    filteredOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <p className="font-medium text-gray-900">{order.order_number}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-gray-900">{order.users?.name || 'Invité'}</p>
                          <p className="text-sm text-gray-600">{order.users?.email || '-'}</p>
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {new Date(order.created_at).toLocaleDateString('fr-FR')}
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {order.order_items?.length || 0} article(s)
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900">
                          €{order.total_amount.toFixed(2)}
                        </td>
                        <td className="px-6 py-4">
                          <select
                            value={order.status}
                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                            className="text-xs px-2 py-1 rounded-lg border border-gray-300 focus:outline-none focus:border-primary-500"
                          >
                            <option value="pending">En attente</option>
                            <option value="paid">Payée</option>
                            <option value="processing">En préparation</option>
                            <option value="shipped">Expédiée</option>
                            <option value="delivered">Livrée</option>
                            <option value="canceled">Annulée</option>
                          </select>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end">
                            <Link
                              href={`/admin/commandes/${order.id}`}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg flex items-center gap-1 text-sm font-semibold"
                            >
                              <Eye className="w-4 h-4" />
                              Détails
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center text-gray-600">
                        {searchQuery ? 'Aucune commande trouvée' : 'Aucune commande'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Summary */}
          <div className="mt-4 text-sm text-gray-600">
            {filteredOrders.length} commande(s) affichée(s)
          </div>
        </div>
      </div>
    </>
  );
}
