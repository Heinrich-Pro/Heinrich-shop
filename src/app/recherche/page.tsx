'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search as SearchIcon } from 'lucide-react';
import ProductCard from '@/components/products/ProductCard';
import { products } from '@/lib/data';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchInput, setSearchInput] = useState(query);

  // Filter products based on search query
  const searchResults = products.filter(product =>
    product.name.toLowerCase().includes(query.toLowerCase()) ||
    product.description.toLowerCase().includes(query.toLowerCase())
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      window.location.href = `/recherche?q=${encodeURIComponent(searchInput)}`;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Résultats de recherche</h1>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl">
            <div className="relative">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Rechercher des produits..."
                className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary-500"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 bottom-0 px-4 bg-primary-500 text-white rounded-r-lg hover:bg-primary-600"
              >
                <SearchIcon className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>

        {/* Results Info */}
        {query && (
          <div className="mb-6">
            <p className="text-gray-600">
              Recherche pour <span className="font-semibold text-gray-900">"{query}"</span>
              {' '}· <span className="font-semibold">{searchResults.length}</span> résultat{searchResults.length !== 1 ? 's' : ''}
            </p>
          </div>
        )}

        {/* Results or Empty State */}
        {searchResults.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {searchResults.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg border p-12 text-center">
            <SearchIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Aucun résultat trouvé</h2>
            <p className="text-gray-600 mb-6">
              Essayez avec d'autres mots-clés ou parcourez nos catégories
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              <span className="text-sm text-gray-600">Suggestions :</span>
              <a href="/produits?categorie=electronique" className="text-sm text-primary-600 hover:text-primary-700 font-semibold">
                Électronique
              </a>
              <span className="text-gray-300">•</span>
              <a href="/produits?categorie=mode" className="text-sm text-primary-600 hover:text-primary-700 font-semibold">
                Mode
              </a>
              <span className="text-gray-300">•</span>
              <a href="/produits?categorie=maison-jardin" className="text-sm text-primary-600 hover:text-primary-700 font-semibold">
                Maison
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
