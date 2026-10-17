import React from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/mockProducts';

export const NavDrawer: React.FC = () => {
  const { navOpen, setNavOpen, setScreen, setSelectedCategory } = useApp();

  if (!navOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-start animate-fade-in">
      <div className="bg-[#fef9f1] w-[85%] max-w-[360px] h-full shadow-2xl flex flex-col justify-between overflow-y-auto p-6 pt-safe border-r border-[#1d1b17]/10">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-[#1d1b17]/10">
            <img
              src="https://lh3.googleusercontent.com/aida/AEtjO1Xv-C9CV2oRsMfeBj1DjGPEK7rBTQwe--KAE9G-xSwgxk4dVCCYyKbZdFdaFhx6WN5yO3JAXzCwbesXgktdI_hYIraIUUO1zLeyJ6xlBC2FFDJP_5QbwQ97xyaV9r73Cd4L95vh3ItauygADf2PvTTkUDtZe57OwxlQumO0q73p4LI1_oCisRTVpbYqX_qKs6aQIT5UciKUQut8OIXpXe2vixWwgIN33m0BXRyBnuaDDGbLn9qfqw-dWbag"
              alt="VYBE Logo"
              className="h-7 w-auto object-contain"
            />
            <button
              type="button"
              onClick={() => setNavOpen(false)}
              className="w-10 h-10 flex items-center justify-center text-[#1d1b17] hover:opacity-60"
            >
              <span className="material-symbols-outlined text-[24px]">close</span>
            </button>
          </div>

          {/* Navigation Items */}
          <div className="py-6 flex flex-col gap-6">
            <div>
              <span className="font-inter text-[10px] uppercase tracking-widest text-[#605e5a] font-semibold block mb-3">
                Editorial Curation
              </span>
              <ul className="flex flex-col gap-3 font-syne text-lg font-bold uppercase tracking-tight text-[#1d1b17]">
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory('all');
                      setScreen('catalog');
                      setNavOpen(false);
                    }}
                    className="hover:translate-x-1.5 transition-transform flex items-center justify-between w-full"
                  >
                    <span>Full Archive (12)</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </li>
                {CATEGORIES.filter((c) => c.id !== 'all').map((cat) => (
                  <li key={cat.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCategory(cat.id);
                        setScreen('catalog');
                        setNavOpen(false);
                      }}
                      className="hover:translate-x-1.5 transition-transform flex items-center justify-between w-full text-left"
                    >
                      <span>{cat.name}</span>
                      <span className="font-inter text-xs text-[#605e5a] font-normal">
                        ({cat.count.toString().padStart(2, '0')})
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-[#1d1b17]/10">
              <span className="font-inter text-[10px] uppercase tracking-widest text-[#605e5a] font-semibold block mb-3">
                Concierge & Studio
              </span>
              <ul className="flex flex-col gap-2.5 font-inter text-xs uppercase tracking-wider text-[#1d1b17]">
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      setScreen('home');
                      setNavOpen(false);
                      setTimeout(() => {
                        document.getElementById('brand-story')?.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }}
                    className="hover:text-[#d3623a] transition-colors"
                  >
                    Mumbai Atelier Philosophy
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      setScreen('profile');
                      setNavOpen(false);
                    }}
                    className="hover:text-[#d3623a] transition-colors"
                  >
                    Orders & Tracking
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      setScreen('profile');
                      setNavOpen(false);
                    }}
                    className="hover:text-[#d3623a] transition-colors"
                  >
                    Garment Specs & Size Guide
                  </button>
                </li>
                <li>
                  <span className="text-[#605e5a]">Express Shipping (PAN-INDIA COD)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="pt-6 border-t border-[#1d1b17]/10 flex flex-col gap-2">
          <p className="font-syne text-xs uppercase font-bold text-[#1d1b17]">
            VYBE COUTURE APPARATUS
          </p>
          <p className="font-inter text-[10px] text-[#605e5a]">
            Engineered in Mumbai & Milan. Monolithic street silhouettes.
          </p>
          <div className="flex gap-4 pt-2 font-inter text-[10px] text-[#1d1b17] uppercase tracking-wider">
            <span>Instagram</span>
            <span>•</span>
            <span>Pinterest</span>
            <span>•</span>
            <span>Spotify</span>
          </div>
        </div>
      </div>
    </div>
  );
};
