'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Star, Heart, ShoppingCart, Minus, Plus, Shield, Truck, RotateCcw } from 'lucide-react';
import ProductCard from '@/components/products/ProductCard';
import { getProductBySlug, products } from '@/lib/data';
import { notFound } from 'next/navigation';

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  
  if (!product) {
    notFound();
  }

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  const relatedProducts = products.filter(p => p.id !== product.id).slice(0, 4);

  const discount = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm mb-6">
          <ol className="flex items-center gap-2 text-gray-600">
            <li><a href="/" className="hover:text-primary-600">Accueil</a></li>
            <li>/</li>
            <li><a href="/produits" className="hover:text-primary-600">Produits</a></li>
            <li>/</li>
            <li className="text-gray-900">{product.name}</li>
          </ol>
        </nav>

        {/* Product Main Section */}
        <div className="bg-white rounded-lg border p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Images Gallery */}
            <div>
              {/* Main Image */}
              <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
                <Image
                  src={product.images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
                {discount > 0 && (
                  <span className="absolute top-4 left-4 bg-accent text-white text-sm font-bold px-3 py-1 rounded">
                    -{discount}%
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 ${
                      selectedImage === idx ? 'border-primary-500' : 'border-gray-200'
                    }`}
                  >
                    <Image src={img} alt={`${product.name} ${idx + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>

              {/* Rating */}
              {product.rating && (
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating!)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.rating} ({product.reviewCount} avis)
                  </span>
                </div>
              )}

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-4xl font-bold text-gray-900">
                    €{product.price.toFixed(2)}
                  </span>
                  {product.compareAtPrice && (
                    <span className="text-xl text-gray-500 line-through">
                      €{product.compareAtPrice.toFixed(2)}
                    </span>
                  )}
                </div>
                {discount > 0 && (
                  <p className="text-sm text-green-600 font-semibold">
                    Économisez €{(product.compareAtPrice! - product.price).toFixed(2)} ({discount}%)
                  </p>
                )}
              </div>

              {/* Stock Status */}
              {product.stock > 0 ? (
                <div className="bg-green-50 text-green-700 px-4 py-2 rounded-lg mb-6">
                  <p className="font-semibold">En stock</p>
                  <p className="text-sm">{product.stock} unités disponibles</p>
                </div>
              ) : (
                <div className="bg-red-50 text-red-700 px-4 py-2 rounded-lg mb-6">
                  <p className="font-semibold">Rupture de stock</p>
                  <button className="text-sm underline">Me prévenir quand disponible</button>
                </div>
              )}

              {/* Description */}
              <p className="text-gray-700 mb-6">{product.description}</p>

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Quantité
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-20 h-10 text-center border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
                  />
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mb-6">
                <button
                  disabled={product.stock === 0}
                  className="flex-1 bg-primary-500 text-white py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Ajouter au panier
                </button>
                <button className="w-12 h-12 rounded-lg border-2 border-gray-300 flex items-center justify-center hover:border-accent hover:bg-accent/10 transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
              </div>

              {/* Buy Now */}
              <button
                disabled={product.stock === 0}
                className="w-full bg-accent text-white py-3 rounded-lg font-semibold hover:bg-accent-dark transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed mb-6"
              >
                Acheter maintenant
              </button>

              {/* Guarantees */}
              <div className="border-t pt-6 space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <Truck className="w-5 h-5 text-primary-600" />
                  <span>Livraison gratuite dès 50€</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <RotateCcw className="w-5 h-5 text-primary-600" />
                  <span>Retour gratuit sous 30 jours</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <Shield className="w-5 h-5 text-primary-600" />
                  <span>Garantie 2 ans</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bg-white rounded-lg border mb-8">
          {/* Tab Headers */}
          <div className="border-b">
            <div className="flex gap-8 px-6">
              <button
                onClick={() => setActiveTab('description')}
                className={`py-4 border-b-2 font-semibold transition-colors ${
                  activeTab === 'description'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab('specs')}
                className={`py-4 border-b-2 font-semibold transition-colors ${
                  activeTab === 'specs'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Caractéristiques
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`py-4 border-b-2 font-semibold transition-colors ${
                  activeTab === 'reviews'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Avis ({product.reviewCount})
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
                <h3 className="text-lg font-semibold mt-4 mb-2">Points forts</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Qualité premium garantie</li>
                  <li>Design moderne et élégant</li>
                  <li>Facile à utiliser</li>
                  <li>Compatible avec tous les appareils</li>
                </ul>
              </div>
            )}

            {activeTab === 'specs' && (
              <div>
                <table className="w-full">
                  <tbody className="divide-y">
                    <tr>
                      <td className="py-3 text-gray-600 font-medium">SKU</td>
                      <td className="py-3 text-gray-900">{product.sku}</td>
                    </tr>
                    <tr>
                      <td className="py-3 text-gray-600 font-medium">Disponibilité</td>
                      <td className="py-3 text-gray-900">
                        {product.stock > 0 ? `${product.stock} en stock` : 'Rupture de stock'}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 text-gray-600 font-medium">Garantie</td>
                      <td className="py-3 text-gray-900">2 ans</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <div className="mb-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-5xl font-bold text-gray-900">{product.rating}</div>
                    <div>
                      <div className="flex mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < Math.floor(product.rating!)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-gray-600">{product.reviewCount} avis</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-gray-600">Les avis clients seront affichés ici.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Produits similaires</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
