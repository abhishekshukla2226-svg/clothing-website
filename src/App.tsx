import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { Toast } from './components/Toast';
import { SearchModal } from './components/SearchModal';
import { NavDrawer } from './components/NavDrawer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { HomeScreen } from './screens/HomeScreen';
import { CatalogScreen } from './screens/CatalogScreen';
import { WishlistScreen } from './screens/WishlistScreen';
import { BagScreen } from './screens/BagScreen';
import { ProfileScreen } from './screens/ProfileScreen';

const MainContent: React.FC = () => {
  const { screen } = useApp();

  return (
    <div className="min-h-screen bg-[#fef9f1] text-[#1d1b17] flex flex-col font-inter selection:bg-black selection:text-white">
      {/* Top Header */}
      <Header />

      {/* Main Screen Viewport (with top padding for fixed header) */}
      <main className="flex-1 w-full pt-20">
        {screen === 'home' && <HomeScreen />}
        {screen === 'catalog' && <CatalogScreen />}
        {screen === 'wishlist' && <WishlistScreen />}
        {screen === 'bag' && <BagScreen />}
        {screen === 'profile' && <ProfileScreen />}
      </main>

      {/* Fixed Bottom Navigation */}
      <BottomNav />

      {/* Global Modals & Drawers */}
      <ProductDetailModal />
      <SearchModal />
      <NavDrawer />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
