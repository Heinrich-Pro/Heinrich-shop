import { Heart } from 'lucide-react';
import ProductCard from '@/components/products/ProductCard';
import { products } from '@/lib/data';

export default function WishlistPage() {
  // Mock wishlist - in reality this would come from database/state
  const wishlistProducts = products.slice(0, 3);

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Ma liste de souhaits</h1>

        {wishlistProducts.length > 0 ? (
          <>
            <p className="text-gray-600 mb-6">
              Vous avez {wishlistProducts.length} produit{wishlistProducts.length > 1 ? 's' : ''} dans votre liste
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {wishlistProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        ) : (
          <div className="bg-white rounded-lg border p-12 text-center">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Liste de souhaits vide</h2>
            <p className="text-gray-600 mb-6">
              Ajoutez des produits à votre liste pour les retrouver facilement
            </p>
            <a
              href="/produits"
              className="inline-block px-8 py-3 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600"
            >
              Découvrir nos produits
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
