import Link from 'next/link';
import { ArrowRight, Zap, Package, ShieldCheck } from 'lucide-react';
import ProductCard from '@/components/products/ProductCard';
import { getFeaturedProducts, categories } from '@/lib/data';

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 via-primary-500 to-orange-400 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              Découvrez les meilleurs produits
            </h1>
            <p className="text-lg md:text-xl mb-8 text-white/90">
              Des milliers de produits de qualité à des prix imbattables.
              Livraison rapide et paiement sécurisé.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/produits"
                className="inline-flex items-center gap-2 bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Découvrir
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/produits?promo=1"
                className="inline-flex items-center gap-2 bg-accent text-white px-8 py-3 rounded-lg font-semibold hover:bg-accent-dark transition-colors"
              >
                <Zap className="w-5 h-5" />
                Offres Flash
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center flex-shrink-0">
                <Package className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Livraison rapide</h3>
                <p className="text-sm text-gray-600">Gratuite dès 50€</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Paiement sécurisé</h3>
                <p className="text-sm text-gray-600">Protection des données</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center flex-shrink-0">
                <Zap className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Service client 24/7</h3>
                <p className="text-sm text-gray-600">Assistance rapide</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
            Parcourir par catégorie
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/produits?categorie=${category.slug}`}
                className="group bg-white rounded-lg border-2 border-gray-200 p-6 hover:border-primary-500 hover:shadow-md transition-all text-center"
              >
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="text-2xl">📦</span>
                </div>
                <h3 className="font-semibold text-gray-900 text-sm group-hover:text-primary-600 transition-colors">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Flash Deals */}
      <section className="py-12 bg-gradient-to-br from-accent/10 to-primary-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Zap className="w-8 h-8 text-accent" />
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Offres Flash
              </h2>
            </div>
            <div className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg">
              <span className="text-sm">Se termine dans</span>
              <span className="font-bold text-lg">14:23:45</span>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Produits recommandés
            </h2>
            <Link
              href="/produits"
              className="text-primary-600 hover:text-primary-700 font-semibold flex items-center gap-1"
            >
              Voir tout
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ne manquez aucune offre !
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Inscrivez-vous à notre newsletter et recevez les meilleures offres directement dans votre boîte mail.
          </p>
          <form className="max-w-md mx-auto flex gap-3">
            <input
              type="email"
              placeholder="Votre adresse email"
              className="flex-1 px-6 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              S'inscrire
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
