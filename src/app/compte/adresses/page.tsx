'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, Plus, Edit2, Trash2, Check } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { toast, Toaster } from 'sonner';

interface Address {
  id: string;
  first_name: string;
  last_name: string;
  address: string;
  city: string;
  postal_code: string;
  country: string;
  phone: string;
  is_default: boolean;
}

export default function AddressesPage() {
  const router = useRouter();
  const supabase = createClient();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    address: '',
    city: '',
    postal_code: '',
    country: 'France',
    phone: '',
    is_default: false,
  });

  useEffect(() => {
    loadAddresses();
  }, []);

  const loadAddresses = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push('/auth/connexion');
      return;
    }

    const { data, error } = await supabase
      .from('addresses')
      .select('*')
      .eq('user_id', user.id)
      .order('is_default', { ascending: false})
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Erreur lors du chargement des adresses');
    } else {
      setAddresses(data || []);
    }
    
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    try {
      if (editingId) {
        // Update existing address
        const { error } = await supabase
          .from('addresses')
          .update(formData)
          .eq('id', editingId);

        if (error) throw error;
        toast.success('Adresse mise à jour!');
      } else {
        // Create new address
        const { error } = await supabase
          .from('addresses')
          .insert({ ...formData, user_id: user.id });

        if (error) throw error;
        toast.success('Adresse ajoutée!');
      }

      // If this is set as default, update others
      if (formData.is_default) {
        await supabase
          .from('addresses')
          .update({ is_default: false })
          .eq('user_id', user.id)
          .neq('id', editingId || '');
      }

      resetForm();
      loadAddresses();
    } catch (error: any) {
      toast.error(error.message || 'Erreur lors de l\'enregistrement');
    }
  };

  const handleEdit = (address: Address) => {
    setFormData(address);
    setEditingId(address.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette adresse ?')) {
      return;
    }

    const { error } = await supabase
      .from('addresses')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error('Erreur lors de la suppression');
    } else {
      toast.success('Adresse supprimée');
      loadAddresses();
    }
  };

  const handleSetDefault = async (id: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from('addresses')
      .update({ is_default: false })
      .eq('user_id', user.id);

    if (!error) {
      await supabase
        .from('addresses')
        .update({ is_default: true })
        .eq('id', id);

      toast.success('Adresse par défaut définie');
      loadAddresses();
    }
  };

  const resetForm = () => {
    setFormData({
      first_name: '',
      last_name: '',
      address: '',
      city: '',
      postal_code: '',
      country: 'France',
      phone: '',
      is_default: false,
    });
    setEditingId(null);
    setShowForm(false);
  };

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-48"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-right" richColors />
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Mes Adresses</h1>
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600"
            >
              <Plus className="w-5 h-5" />
              Ajouter une adresse
            </button>
          </div>

          {/* Form */}
          {showForm && (
            <div className="bg-white rounded-lg border p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                {editingId ? 'Modifier l\'adresse' : 'Nouvelle adresse'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Prénom *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.first_name}
                      onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Nom *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.last_name}
                      onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Adresse *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Code postal *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.postal_code}
                      onChange={(e) => setFormData({ ...formData, postal_code: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Ville *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Téléphone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.is_default}
                      onChange={(e) => setFormData({ ...formData, is_default: e.target.checked })}
                      className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">Définir comme adresse par défaut</span>
                  </label>
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="flex-1 border-2 border-gray-300 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-50"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-primary-500 text-white py-2 rounded-lg font-semibold hover:bg-primary-600"
                  >
                    {editingId ? 'Modifier' : 'Ajouter'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Addresses List */}
          <div className="space-y-4">
            {addresses.length > 0 ? (
              addresses.map((address) => (
                <div
                  key={address.id}
                  className={`bg-white rounded-lg border-2 p-6 ${
                    address.is_default ? 'border-primary-500' : 'border-gray-200'
                  }`}
                >
                  <div className="flex justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <MapPin className="w-5 h-5 text-gray-400" />
                        <h3 className="font-semibold text-gray-900">
                          {address.first_name} {address.last_name}
                        </h3>
                        {address.is_default && (
                          <span className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full font-semibold flex items-center gap-1">
                            <Check className="w-3 h-3" />
                            Par défaut
                          </span>
                        )}
                      </div>
                      <p className="text-gray-700">{address.address}</p>
                      <p className="text-gray-700">
                        {address.postal_code} {address.city}
                      </p>
                      <p className="text-gray-600 text-sm mt-2">{address.phone}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      {!address.is_default && (
                        <button
                          onClick={() => handleSetDefault(address.id)}
                          className="text-sm text-primary-600 hover:text-primary-700 font-semibold"
                        >
                          Définir par défaut
                        </button>
                      )}
                      <button
                        onClick={() => handleEdit(address)}
                        className="flex items-center gap-1 text-gray-600 hover:text-gray-900"
                      >
                        <Edit2 className="w-4 h-4" />
                        <span className="text-sm">Modifier</span>
                      </button>
                      <button
                        onClick={() => handleDelete(address.id)}
                        className="flex items-center gap-1 text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span className="text-sm">Supprimer</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-lg border p-12 text-center">
                <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-600 mb-4">Aucune adresse enregistrée</p>
                <button
                  onClick={() => setShowForm(true)}
                  className="text-primary-600 hover:text-primary-700 font-semibold"
                >
                  Ajouter votre première adresse →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
