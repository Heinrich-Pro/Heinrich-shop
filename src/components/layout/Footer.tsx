import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Newsletter Section */}
      <div className="bg-gray-800 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-white text-lg font-semibold mb-1">
                Inscrivez-vous à notre newsletter
              </h3>
              <p className="text-sm text-gray-400">
                Recevez les dernières offres et nouveautés
              </p>
            </div>
            <form className="flex w-full md:w-auto gap-2">
              <input
                type="email"
                placeholder="Votre email"
                className="px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-primary-500 w-full md:w-64"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 transition-colors whitespace-nowrap"
              >
                S'inscrire
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Heinrich Shop</h4>
            <p className="text-sm mb-4">
              Votre boutique en ligne pour découvrir les meilleurs produits à des prix imbattables.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary-500 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary-500 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary-500 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary-500 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Liens rapides</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/produits" className="hover:text-white transition-colors">
                  Tous les produits
                </Link>
              </li>
              <li>
                <Link href="/compte" className="hover:text-white transition-colors">
                  Mon compte
                </Link>
              </li>
              <li>
                <Link href="/compte/commandes" className="hover:text-white transition-colors">
                  Mes commandes
                </Link>
              </li>
              <li>
                <Link href="/panier" className="hover:text-white transition-colors">
                  Panier
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Service client</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/aide" className="hover:text-white transition-colors">
                  Centre d'aide
                </Link>
              </li>
              <li>
                <Link href="/livraison" className="hover:text-white transition-colors">
                  Livraison
                </Link>
              </li>
              <li>
                <Link href="/retours" className="hover:text-white transition-colors">
                  Retours & Remboursements
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Nous contacter
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Informations légales</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/cgv" className="hover:text-white transition-colors">
                  CGV
                </Link>
              </li>
              <li>
                <Link href="/cgu" className="hover:text-white transition-colors">
                  CGU
                </Link>
              </li>
              <li>
                <Link href="/confidentialite" className="hover:text-white transition-colors">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link href="/mentions-legales" className="hover:text-white transition-colors">
                  Mentions légales
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Payment Methods & Copyright */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
            <p className="text-gray-400">
              © {new Date().getFullYear()} Heinrich Shop. Tous droits réservés.
            </p>
            <div className="flex items-center gap-4">
              <span className="text-gray-400">Moyens de paiement:</span>
              <div className="flex gap-2">
                <div className="w-12 h-8 bg-white rounded flex items-center justify-center text-xs font-bold text-gray-900">
                  VISA
                </div>
                <div className="w-12 h-8 bg-white rounded flex items-center justify-center text-xs font-bold text-gray-900">
                  MC
                </div>
                <div className="w-12 h-8 bg-white rounded flex items-center justify-center text-xs font-bold text-blue-600">
                  PayPal
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
