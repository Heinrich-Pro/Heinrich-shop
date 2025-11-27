'use client';

import Link from 'next/link';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { name: 'Électronique', slug: 'electronique' },
    { name: 'Mode', slug: 'mode' },
    { name: 'Maison & Jardin', slug: 'maison-jardin' },
    { name: 'Beauté & Santé', slug: 'beaute-sante' },
    { name: 'Sports & Loisirs', slug: 'sports-loisirs' },
    { name: 'Jouets & Enfants', slug: 'jouets-enfants' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/recherche?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-500 text-white py-2">
        <div className="container mx-auto px-4 text-center text-sm">
          🎉 Livraison gratuite dès 50€ d'achat !
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <h1 className="text-2xl md:text-3xl font-bold text-primary-600">
              Heinrich Shop
            </h1>
          </Link>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher des produits..."
                className="w-full px-4 py-2.5 pr-12 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary-500 transition-colors"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 bottom-0 px-4 bg-primary-500 text-white rounded-r-lg hover:bg-primary-600 transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </form>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* User Account - Desktop */}
            <Link
              href="/auth/connexion"
              className="hidden md:flex items-center gap-2 px-4 py-2 hover:text-primary-600 transition-colors"
            >
              <User className="w-5 h-5" />
              <span className="text-sm">Mon Compte</span>
            </Link>

            {/* Cart */}
            <Link
              href="/panier"
              className="relative flex items-center gap-2 px-4 py-2 hover:text-primary-600 transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              <span className="hidden md:inline text-sm">Panier</span>
              <span className="absolute -top-1 -right-1 bg-accent text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                0
              </span>
            </Link>
          </div>
        </div>

        {/* Search Bar - Mobile */}
        <form onSubmit={handleSearch} className="md:hidden mt-3">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher..."
              className="w-full px-4 py-2 pr-12 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary-500"
            />
            <button
              type="submit"
              className="absolute right-0 top-0 bottom-0 px-4 bg-primary-500 text-white rounded-r-lg"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>

      {/* Categories Navigation - Desktop */}
      <nav className="hidden md:block border-t border-gray-200 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-6 py-3 overflow-x-auto">
            <Link
              href="/produits"
              className="text-sm font-medium hover:text-primary-600 transition-colors whitespace-nowrap"
            >
              Tous les produits
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/produits?categorie=${cat.slug}`}
                className="text-sm hover:text-primary-600 transition-colors whitespace-nowrap"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <nav className="container mx-auto px-4 py-4">
            <div className="space-y-3">
              <Link
                href="/auth/connexion"
                className="flex items-center gap-2 py-2 text-sm hover:text-primary-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                <User className="w-4 h-4" />
                Mon Compte
              </Link>
              <div className="border-t pt-3 space-y-2">
                <Link
                  href="/produits"
                  className="block py-2 text-sm font-medium hover:text-primary-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Tous les produits
                </Link>
                {categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/produits?categorie=${cat.slug}`}
                    className="block py-2 text-sm hover:text-primary-600"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
