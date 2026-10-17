export interface ProductColor {
  name: string;
  hex: string;
}

export interface ProductSpecs {
  gsm?: string;
  material: string;
  fit: string;
  origin: string;
  care: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  department: "Men's" | "Women's" | 'Unisex';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  badge?: string;
  badgeType?: 'primary' | 'sale' | 'neutral';
  image: string;
  additionalImages?: string[];
  alt: string;
  colors: ProductColor[];
  sizes: string[];
  description: string;
  specs: ProductSpecs;
  inStock: boolean;
  isTrending?: boolean;
  isNewArrival?: boolean;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  subtotal: number;
  discount: number;
  shipping: number;
  status: 'In Atelier Mumbai' | 'Shipped via BlueDart' | 'Delivered';
  trackingNumber: string;
  shippingAddress: {
    fullName: string;
    street: string;
    city: string;
    state: string;
    pinCode: string;
    phone: string;
  };
  paymentMethod: string;
}

export type ScreenType = 'home' | 'catalog' | 'wishlist' | 'bag' | 'profile';
