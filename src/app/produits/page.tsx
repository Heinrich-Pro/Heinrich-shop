'use client';

import { useState } from 'react';
import { Filter, X, ChevronDown } from 'lucide-react';
import ProductCard from '@/components/products/ProductCard';
import { products } from '@/lib/data';

export default function ProductsPage() {
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('featured');

  const categories = [
    { id: '1', name: 'Électronique' },
    { id: '2', name: 'Mode' },
    { id: '3', name: 'Maison & Jardin' },
    { id: '4', name: 'Beauté & Santé' },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm mb-6">
          <ol className="flex items-center gap-2 text-gray-600">
            <li><a href="/" className="hover:text-primary-600">Accueil</a></li>
            <li>/</li>
            <li className="text-gray-900">Produits</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Tous les produits</h1>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg"
          >
            <Filter className="w-4 h-4" />
            Filtres
          </button>
        </div>

        <div className="flex gap-6">
          {/* Sidebar Filters - Desktop */}
          <aside className={`${showFilters ? 'fixed inset-0 z-50 bg-white p-4 overflow-y-auto' : 'hidden'} md:block md:w-64 md:flex-shrink-0`}>
            {/* Mobile close button */}
            <div className="md:hidden flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Filtres</h2>
              <button onClick={() => setShowFilters(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Categories */}
              <div className="bg-white md:bg-transparent p-4 md:p-0 rounded-lg border md:border-0">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center justify-between">
                  Catégories
                  <ChevronDown className="w-4 h-4" />
                </h3>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <label key={cat.id} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedCategories([...selectedCategories, cat.id]);
                          } else {
                            setSelectedCategories(selectedCategories.filter(id => id !== cat.id));
                          }
                        }}
                        className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                      />
                      <span className="text-sm text-gray-700">{cat.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="bg-white md:bg-transparent p-4 md:p-0 rounded-lg border md:border-0">
                <h3 className="font-semibold text-gray-900 mb-3">Prix</h3>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="0"
                    max="500"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>€0</span>
                    <span>€{priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div className="bg-white md:bg-transparent p-4 md:p-0 rounded-lg border md:border-0">
                <h3 className="font-semibold text-gray-900 mb-3">Note minimale</h3>
                <div className="space-y-2">
                  {[4, 3, 2, 1].map((rating) => (
                    <label key={rating} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="rating"
                        checked={minRating === rating}
                        onChange={() => setMinRating(rating)}
                        className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-sm text-gray-700">{rating}★ et plus</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              <button
                onClick={() => {
                  setSelectedCategories([]);
                  setPriceRange([0, 500]);
                  setMinRating(0);
                }}
                className="w-full px-4 py-2 text-sm text-primary-600 border border-primary-600 rounded-lg hover:bg-primary-50 transition-colors"
              >
                Réinitialiser les filtres
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Sort & View Options */}
            <div className="bg-white p-4 rounded-lg border mb-6">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  {products.length} produits trouvés
                </p>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-primary-500"
                >
                  <option value="featured">Recommandés</option>
                  <option value="price-asc">Prix croissant</option>
                  <option value="price-desc">Prix décroissant</option>
                  <option value="newest">Nouveautés</option>
                  <option value="rating">Meilleures notes</option>
                </select>
              </div>
            </div>

            {/* Active Filters */}
            {(selectedCategories.length > 0 || minRating > 0) && (
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                <span className="text-sm text-gray-600">Filtres actifs:</span>
                {selectedCategories.map((catId) => (
                  <span
                    key={catId}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
                  >
                    {categories.find(c => c.id === catId)?.name}
                    <button
                      onClick={() => setSelectedCategories(selectedCategories.filter(id => id !== catId))}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                {minRating > 0 && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                    {minRating}★+
                    <button onClick={() => setMinRating(0)}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>
            )}

            {/* Products Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex items-center justify-center gap-2">
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50">
                Précédent
              </button>
              <button className="px-4 py-2 bg-primary-500 text-white rounded-lg">1</button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">2</button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">3</button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                Suivant
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
