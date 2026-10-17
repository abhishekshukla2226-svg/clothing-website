import React from 'react';
import { useApp } from '../context/AppContext';
import { ScreenType } from '../types';

export const BottomNav: React.FC = () => {
  const { screen, setScreen, wishlistIds, cartCount } = useApp();

  const navItems: {
    id: ScreenType;
    label: string;
    icon: string;
    badge?: number;
  }[] = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'catalog', label: 'Catalog', icon: 'grid_view' },
    { id: 'wishlist', label: 'Wishlist', icon: 'favorite', badge: wishlistIds.length },
    { id: 'bag', label: 'Bag', icon: 'shopping_bag', badge: cartCount },
    { id: 'profile', label: 'Profile', icon: 'person' },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 pb-safe bg-[#fef9f1]/95 backdrop-blur-xl border-t border-[#1d1b17]/10 shadow-[0_-1px_12px_rgba(0,0,0,0.04)]">
      <div className="flex items-center justify-around h-16 px-1 max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = screen === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setScreen(item.id)}
              className={`relative flex flex-col items-center justify-center flex-1 h-full gap-1 transition-all active:scale-95 ${
                isActive
                  ? 'text-[#000000] font-semibold'
                  : 'text-[#605e5a] hover:text-[#1d1b17]'
              }`}
            >
              <div className="relative flex items-center justify-center">
                <span
                  className="material-symbols-outlined text-[22px] transition-transform"
                  style={{
                    fontVariationSettings: isActive ? "'FILL' 1, 'wght' 500" : "'FILL' 0, 'wght' 300",
                  }}
                >
                  {item.icon}
                </span>

                {Boolean(item.badge && item.badge > 0) && (
                  <span
                    className={`absolute -top-1.5 -right-2.5 min-w-[14px] h-[14px] px-0.5 text-[8px] font-bold font-inter rounded-full flex items-center justify-center leading-none text-white ${
                      item.id === 'wishlist' ? 'bg-[#d3623a]' : 'bg-[#000000]'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="font-inter text-[10px] tracking-widest uppercase text-center">
                {item.label}
              </span>
              {isActive && (
                <span className="absolute bottom-1 w-4 h-[2px] bg-black rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
