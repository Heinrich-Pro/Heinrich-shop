// Product Type
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  sku: string;
  stock: number;
  images: string[];
  categoryId: string;
  category?: Category;
  published: boolean;
  featured: boolean;
  rating?: number;
  reviewCount?: number;
  createdAt: Date;
  updatedAt: Date;
}

// Category Type
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId?: string;
  children?: Category[];
}

// User Type
export interface User {
  id: string;
  email: string;
  name?: string;
  role: 'customer' | 'admin';
  createdAt: Date;
}

// Order Type
export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  status: 'pending' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'canceled';
  subtotal: number;
  shippingCost: number;
  tax: number;
  total: number;
  items: OrderItem[];
  createdAt: Date;
}

// Order Item Type
export interface OrderItem {
  id: string;
  productId: string;
  product?: Product;
  quantity: number;
  price: number;
}

// Cart Item Type (for client-side cart)
export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: ProductVariant;
}

// Product Variant Type
export interface ProductVariant {
  id: string;
  productId: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
}

// Review Type
export interface Review {
  id: string;
  productId: string;
  userId: string;
  user?: User;
  rating: number;
  title?: string;
  comment: string;
  verified: boolean;
  createdAt: Date;
}

// Address Type
export interface Address {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
}
