import { Category, Product } from '@/types';

// Mock Categories
export const categories: Category[] = [
  {
    id: '1',
    name: 'Électronique',
    slug: 'electronique',
    description: 'Smartphones, ordinateurs, et accessoires',
    image: '/categories/electronics.jpg',
  },
  {
    id: '2',
    name: 'Mode',
    slug: 'mode',
    description: 'Vêtements, chaussures, et accessoires',
    image: '/categories/fashion.jpg',
  },
  {
    id: '3',
    name: 'Maison & Jardin',
    slug: 'maison-jardin',
    description: 'Décoration, meubles, et outils',
    image: '/categories/home.jpg',
  },
  {
    id: '4',
    name: 'Beauté & Santé',
    slug: 'beaute-sante',
    description: 'Cosmétiques, soins, et bien-être',
    image: '/categories/beauty.jpg',
  },
  {
    id: '5',
    name: 'Sports & Loisirs',
    slug: 'sports-loisirs',
    description: 'Équipements sportifs et activités',
    image: '/categories/sports.jpg',
  },
  {
    id: '6',
    name: 'Jouets & Enfants',
    slug: 'jouets-enfants',
    description: 'Jouets, vêtements, et accessoires enfants',
    image: '/categories/toys.jpg',
  },
];

// Mock Products
export const products: Product[] = [
  {
    id: '1',
    name: 'Bande LED RGB Bluetooth USB 5V',
    slug: 'bande-led-rgb-bluetooth',
    description: 'Bande lumineuse LED RGB avec contrôle Bluetooth, idéale pour éclairage de fond TV',
    price: 15.99,
    compareAtPrice: 24.99,
    sku: 'LED-RGB-BT-001',
    stock: 150,
    images: [
      'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=800',
      'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=800',
    ],
    categoryId: '1',
    published: true,
    featured: true,
    rating: 4.5,
    reviewCount: 234,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'Casque Bluetooth Sans Fil',
    slug: 'casque-bluetooth-sans-fil',
    description: 'Casque audio Bluetooth avec réduction de bruit active, autonomie 30h',
    price: 49.99,
    compareAtPrice: 79.99,
    sku: 'AUDIO-BT-002',
    stock: 85,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
    ],
    categoryId: '1',
    published: true,
    featured: true,
    rating: 4.8,
    reviewCount: 1567,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
  },
  {
    id: '3',
    name: 'Montre Connectée Smartwatch',
    slug: 'montre-connectee-smartwatch',
    description: 'Montre connectée avec suivi santé, notifications, étanche IP68',
    price: 89.99,
    compareAtPrice: 129.99,
    sku: 'WATCH-SM-003',
    stock: 42,
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800',
    ],
    categoryId: '1',
    published: true,
    featured: true,
    rating: 4.3,
    reviewCount: 892,
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05'),
  },
  {
    id: '4',
    name: 'Chargeur Sans Fil Rapide',
    slug: 'chargeur-sans-fil-rapide',
    description: 'Station de charge sans fil 15W compatible iPhone et Android',
    price: 19.99,
    sku: 'CHARGE-WL-004',
    stock: 200,
    images: [
      'https://images.unsplash.com/photo-1591290619762-2b8a6e9b6783?w=800',
    ],
    categoryId: '1',
    published: true,
    featured: false,
    rating: 4.6,
    reviewCount: 445,
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-12'),
  },
  {
    id: '5',
    name: 'Clavier Mécanique RGB',
    slug: 'clavier-mecanique-rgb',
    description: 'Clavier gaming mécanique avec rétroéclairage RGB personnalisable',
    price: 69.99,
    compareAtPrice: 99.99,
    sku: 'KEY-MECH-005',
    stock: 67,
    images: [
      'https://images.unsplash.com/photo-1595225476474-87563907a212?w=800',
    ],
    categoryId: '1',
    published: true,
    featured: true,
    rating: 4.7,
    reviewCount: 723,
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-08'),
  },
  {
    id: '6',
    name: 'T-Shirt Coton Bio',
    slug: 't-shirt-coton-bio',
    description: 'T-shirt unisexe en coton biologique, coupe confortable',
    price: 24.99,
    sku: 'SHIRT-BIO-006',
    stock: 320,
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800',
    ],
    categoryId: '2',
    published: true,
    featured: false,
    rating: 4.4,
    reviewCount: 156,
    createdAt: new Date('2024-01-14'),
    updatedAt: new Date('2024-01-14'),
  },
];

// Helper function to get product by slug
export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

// Helper function to get products by category
export function getProductsByCategory(categoryId: string): Product[] {
  return products.filter(p => p.categoryId === categoryId);
}

// Helper function to get featured products
export function getFeaturedProducts(): Product[] {
  return products.filter(p => p.featured);
}
