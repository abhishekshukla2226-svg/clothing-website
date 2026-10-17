import React from 'react';
import { useApp } from '../context/AppContext';

export const Header: React.FC = () => {
  const {
    screen,
    setScreen,
    wishlistIds,
    cartCount,
    setSearchOpen,
    setNavOpen,
  } = useApp();

  return (
    <header className="fixed top-0 inset-x-0 z-50 pt-safe bg-[#fef9f1]/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.03)] border-b border-[#1d1b17]/5">
      {/* Announcement Bar */}
      <div className="bg-[#000000] text-[#ffffff] py-1 px-4 overflow-hidden whitespace-nowrap text-center">
        <p className="font-inter text-[9px] uppercase tracking-widest leading-tight font-medium">
          FREE EXPRESS SHIPPING ON ORDERS OVER ₹1,999 • CASH ON DELIVERY AVAILABLE
        </p>
      </div>

      {/* Main Header Row */}
      <div className="h-16 px-4 flex items-center justify-between gap-1 max-w-7xl mx-auto">
        {/* Left Actions: Menu & Search */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Open navigation drawer"
            onClick={() => setNavOpen(true)}
            className="w-11 h-11 flex items-center justify-center text-[#1d1b17] hover:opacity-70 transition-opacity active:scale-95"
          >
            <span className="material-symbols-outlined text-[24px]">menu</span>
          </button>
          <button
            type="button"
            aria-label="Search catalog"
            onClick={() => setSearchOpen(true)}
            className="w-11 h-11 flex items-center justify-center text-[#1d1b17] hover:opacity-70 transition-opacity active:scale-95"
          >
            <span className="material-symbols-outlined text-[22px]">search</span>
          </button>
        </div>

        {/* Center: Brand Logo */}
        <div className="flex items-center justify-center">
          <button
            type="button"
            onClick={() => setScreen('home')}
            aria-label="VYBE Home"
            className="flex items-center gap-1 group"
          >
            <img
              src="https://lh3.googleusercontent.com/aida/AEtjO1Xv-C9CV2oRsMfeBj1DjGPEK7rBTQwe--KAE9G-xSwgxk4dVCCYyKbZdFdaFhx6WN5yO3JAXzCwbesXgktdI_hYIraIUUO1zLeyJ6xlBC2FFDJP_5QbwQ97xyaV9r73Cd4L95vh3ItauygADf2PvTTkUDtZe57OwxlQumO0q73p4LI1_oCisRTVpbYqX_qKs6aQIT5UciKUQut8OIXpXe2vixWwgIN33m0BXRyBnuaDDGbLn9qfqw-dWbag"
              alt="VYBE Editorial Logo"
              className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
            />
          </button>
        </div>

        {/* Right Actions: Wishlist, Cart, Profile */}
        <div className="flex items-center gap-1">
          {/* Wishlist Link */}
          <button
            type="button"
            aria-label={`Wishlist (${wishlistIds.length} items)`}
            onClick={() => setScreen('wishlist')}
            className={`relative w-11 h-11 flex items-center justify-center transition-colors active:scale-95 ${
              screen === 'wishlist' ? 'text-[#000000]' : 'text-[#1d1b17]'
            }`}
          >
            <span
              className={`material-symbols-outlined text-[22px] ${
                wishlistIds.length > 0 ? 'text-[#d3623a]' : ''
              }`}
              style={{
                fontVariationSettings: wishlistIds.length > 0 ? "'FILL' 1" : "'FILL' 0",
              }}
            >
              favorite
            </span>
            {wishlistIds.length > 0 && (
              <span className="absolute top-2 right-2 min-w-[15px] h-[15px] px-1 bg-[#390c00] text-[#ffffff] font-inter text-[9px] font-bold rounded-full flex items-center justify-center leading-none">
                {wishlistIds.length}
              </span>
            )}
          </button>

          {/* Shopping Bag Link */}
          <button
            type="button"
            aria-label={`Shopping Bag (${cartCount} items)`}
            onClick={() => setScreen('bag')}
            className={`relative w-11 h-11 flex items-center justify-center transition-colors active:scale-95 ${
              screen === 'bag' ? 'text-[#000000]' : 'text-[#1d1b17]'
            }`}
          >
            <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
            {cartCount > 0 && (
              <span className="absolute top-2 right-2 min-w-[15px] h-[15px] px-1 bg-[#000000] text-[#ffffff] font-inter text-[9px] font-bold rounded-full flex items-center justify-center leading-none">
                {cartCount}
              </span>
            )}
          </button>

          {/* User Profile */}
          <button
            type="button"
            aria-label="User Profile"
            onClick={() => setScreen('profile')}
            className="w-11 h-11 flex items-center justify-center pl-1 group"
          >
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjG-o22nrCNyjLHhy92-uWQyGmaGlPuWeE2y_v3vDB1TwOqF3kNefUh3mFFor1jzYh-mNaVcJUnmz-S6yyoz0vzrJgqoMqBDH1JWVgq_SM7gIMpHVmMMtpASevKIbfHEOJLnJtVBjQqcuLIYMrHnxvG20RplZGRBJUavlwh6Pd4BSTC5EWn1ptGkc0Oie_vzl62l1HQVXZGdYn_kC3L0Qz4RK-v6D_14kiO7qtshQcmj4TfcqXVddv7Q"
              alt="Abhishek S. Profile"
              className={`w-8 h-8 rounded-full object-cover ring-1 transition-all ${
                screen === 'profile'
                  ? 'ring-2 ring-black scale-105'
                  : 'ring-[#c4c7c7]/40 group-hover:ring-black'
              }`}
            />
          </button>
        </div>
      </div>
    </header>
  );
};
