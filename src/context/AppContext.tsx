import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, ScreenType } from '../types';
import { PRODUCTS } from '../data/mockProducts';

interface ToastState {
  visible: boolean;
  message: string;
}

interface AppContextType {
  screen: ScreenType;
  setScreen: (screen: ScreenType) => void;
  selectedCategory: string;
  setSelectedCategory: (catId: string) => void;
  // Wishlist
  wishlistIds: string[];
  toggleWishlist: (productId: string, productName?: string) => void;
  isWishlisted: (productId: string) => boolean;
  wishlistProducts: Product[];
  // Bag / Cart
  cartItems: CartItem[];
  addToBag: (product: Product, size?: string, color?: string) => void;
  removeFromBag: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, delta: number) => void;
  updateCartSize: (cartItemId: string, newSize: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  // Promo code
  promoCode: string;
  promoDiscount: number;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;
  // Detail Modal
  quickViewProduct: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
  // Search & Nav drawers
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  navOpen: boolean;
  setNavOpen: (open: boolean) => void;
  // Toast
  toast: ToastState;
  showToast: (message: string) => void;
  // Orders
  orders: Order[];
  placeOrder: (shippingAddress: Order['shippingAddress'], paymentMethod: string) => Order;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [screen, setScreenState] = useState<ScreenType>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Pre-populate with items to match initial badge counts from the design (Wishlist: 2, Bag: 1)
  const [wishlistIds, setWishlistIds] = useState<string[]>(['vybe-01', 'vybe-03']);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'vybe-01-L-Charcoal',
      productId: 'vybe-01',
      name: 'Oversized Graphic T-Shirt',
      price: 799,
      image: PRODUCTS[0].image,
      size: 'L',
      color: 'Charcoal',
      quantity: 1,
    },
  ]);

  const [promoCode, setPromoCode] = useState<string>('');
  const [promoDiscount, setPromoDiscount] = useState<number>(0);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [navOpen, setNavOpen] = useState<boolean>(false);
  const [toast, setToast] = useState<ToastState>({ visible: false, message: '' });

  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'VYBE-8942-IN',
      date: 'Oct 14, 2026',
      items: [
        {
          id: 'vybe-05-32-DarkOlive',
          productId: 'vybe-05',
          name: 'Classic Cargo Pants',
          price: 1499,
          image: PRODUCTS[4].image,
          size: '32',
          color: 'Dark Olive',
          quantity: 1,
        },
      ],
      total: 1499,
      subtotal: 1499,
      discount: 0,
      shipping: 0,
      status: 'Shipped via BlueDart',
      trackingNumber: 'BD-8829-4102-IN',
      shippingAddress: {
        fullName: 'Abhishek Shukla',
        street: '402, Signature Towers, Lower Parel',
        city: 'Mumbai',
        state: 'Maharashtra',
        pinCode: '400013',
        phone: '+91 98201 44820',
      },
      paymentMethod: 'UPI (Google Pay)',
    },
  ]);

  const setScreen = (newScreen: ScreenType) => {
    setScreenState(newScreen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showToast = (message: string) => {
    setToast({ visible: true, message });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 2800);
  };

  const toggleWishlist = (productId: string, productName?: string) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast(`Removed from Wishlist`);
        return prev.filter((id) => id !== productId);
      } else {
        const prod = PRODUCTS.find((p) => p.id === productId);
        showToast(`Saved ${productName || prod?.name || 'Item'} to Wishlist`);
        return [...prev, productId];
      }
    });
  };

  const isWishlisted = (productId: string) => wishlistIds.includes(productId);

  const wishlistProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  const addToBag = (product: Product, size?: string, color?: string) => {
    const chosenSize = size || product.sizes[0] || 'L';
    const chosenColor = color || product.colors[0]?.name || 'Standard';
    const cartItemId = `${product.id}-${chosenSize}-${chosenColor}`;

    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          size: chosenSize,
          color: chosenColor,
          quantity: 1,
        },
      ];
    });

    showToast(`Added ${product.name} (₹${product.price.toLocaleString('en-IN')})`);
  };

  const removeFromBag = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== cartItemId));
    showToast('Removed from Bag');
  };

  const updateCartQuantity = (cartItemId: string, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((item) => {
          if (item.id === cartItemId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const updateCartSize = (cartItemId: string, newSize: string) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, size: newSize } : item))
    );
  };

  const clearCart = () => setCartItems([]);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const cartSubtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const applyPromoCode = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    if (clean === 'VYBE10') {
      setPromoCode('VYBE10');
      setPromoDiscount(0.1);
      showToast('VIP Code VYBE10 Applied (-10%)');
      return true;
    }
    showToast('Invalid Coupon Code');
    return false;
  };

  const removePromoCode = () => {
    setPromoCode('');
    setPromoDiscount(0);
    showToast('Promo Code Removed');
  };

  const openQuickView = (product: Product) => setQuickViewProduct(product);
  const closeQuickView = () => setQuickViewProduct(null);

  const placeOrder = (
    shippingAddress: Order['shippingAddress'],
    paymentMethod: string
  ): Order => {
    const subtotal = cartSubtotal;
    const discountAmount = Math.round(subtotal * promoDiscount);
    const shipping = subtotal - discountAmount >= 1999 || subtotal === 0 ? 0 : 150;
    const total = subtotal - discountAmount + shipping;

    const newOrder: Order = {
      id: `VYBE-${Math.floor(1000 + Math.random() * 9000)}-IN`,
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      items: [...cartItems],
      total,
      subtotal,
      discount: discountAmount,
      shipping,
      status: 'In Atelier Mumbai',
      trackingNumber: `BD-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}-IN`,
      shippingAddress,
      paymentMethod,
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    setPromoCode('');
    setPromoDiscount(0);
    return newOrder;
  };

  return (
    <AppContext.Provider
      value={{
        screen,
        setScreen,
        selectedCategory,
        setSelectedCategory,
        wishlistIds,
        toggleWishlist,
        isWishlisted,
        wishlistProducts,
        cartItems,
        addToBag,
        removeFromBag,
        updateCartQuantity,
        updateCartSize,
        clearCart,
        cartCount,
        cartSubtotal,
        promoCode,
        promoDiscount,
        applyPromoCode,
        removePromoCode,
        quickViewProduct,
        openQuickView,
        closeQuickView,
        searchOpen,
        setSearchOpen,
        searchQuery,
        setSearchQuery,
        navOpen,
        setNavOpen,
        toast,
        showToast,
        orders,
        placeOrder,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
