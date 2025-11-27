import Link from 'next/link';
import Image from 'next/image';
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { products } from '@/lib/data';

export default function AdminProductsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-gray-900 text-white py-4 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Gestion des Produits</h1>
            <Link href="/admin/dashboard" className="text-sm hover:text-primary-400">← Retour au dashboard</Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Actions Bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Rechercher un produit..."
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 w-64"
            />
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500">
              <option>Toutes les catégories</option>
              <option>Électronique</option>
              <option>Mode</option>
              <option>Maison</option>
            </select>
          </div>
          <Link
            href="/admin/produits/nouveau"
            className="inline-flex items-center gap-2 bg-primary-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-600"
          >
            <Plus className="w-5 h-5" />
            Nouveau produit
          </Link>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-lg border overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Produit</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">SKU</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Prix</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Stock</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Statut</th>
                <th className="text-right py-4 px-6 text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded overflow-hidden bg-gray-100 flex-shrink-0">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{product.name}</p>
                        <p className="text-sm text-gray-600">{product.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600 font-mono">{product.sku}</td>
                  <td className="py-4 px-6 text-sm font-semibold text-gray-900">
                    €{product.price.toFixed(2)}
                  </td>
                  <td className="py-4 px-6">
                    <span className={`text-sm font-semibold ${
                      product.stock > 10 ? 'text-green-600' :
                      product.stock > 0 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {product.stock} unités
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                      <Eye className="w-3 h-3" />
                      Publié
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded" title="Modifier">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-600 hover:bg-gray-100 rounded" title="Dépublier">
                        <EyeOff className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded" title="Supprimer">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-gray-600">{products.length} produits trouvés</p>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Précédent</button>
            <button className="px-4 py-2 bg-primary-500 text-white rounded-lg">1</button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">2</button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Suivant</button>
          </div>
        </div>
      </div>
    </div>
  );
}
