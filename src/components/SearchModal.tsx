import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../data/mockProducts';

export const SearchModal: React.FC = () => {
  const { searchOpen, setSearchOpen, openQuickView, addToBag } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const popularTags = [
    'Oversized Tee',
    'Hoodie',
    'Denim',
    'Cargo Pants',
    'Bomber',
    'Heavyweight 450GSM',
    'Acid Wash',
  ];

  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const term = searchTerm.toLowerCase();
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term)
    );
  }, [searchTerm]);

  if (!searchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex flex-col justify-start">
      <div className="bg-[#fef9f1] w-full border-b border-[#1d1b17]/10 p-4 pt-safe max-w-2xl mx-auto shadow-2xl">
        {/* Search Input Box */}
        <div className="flex items-center gap-3">
          <div className="flex-1 flex items-center bg-[#f2ede6] px-3.5 py-2.5">
            <span className="material-symbols-outlined text-[20px] text-[#747878] mr-2">
              search
            </span>
            <input
              type="text"
              autoFocus
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="SEARCH CATALOG OR SPEC (E.G. HOODIE, CARGO, GSM)..."
              className="w-full bg-transparent font-inter text-xs tracking-wider uppercase text-[#1d1b17] placeholder:text-[#747878] focus:outline-none"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="text-[#747878] hover:text-[#1d1b17]"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            )}
          </div>
          <button
            type="button"
            onClick={() => {
              setSearchOpen(false);
              setSearchTerm('');
            }}
            className="font-inter text-xs uppercase tracking-wider font-bold text-[#1d1b17] px-2 py-2 hover:opacity-60"
          >
            Cancel
          </button>
        </div>

        {/* Popular Tags */}
        {!searchTerm && (
          <div className="mt-4 pt-2">
            <span className="font-inter text-[10px] uppercase tracking-widest text-[#605e5a] font-semibold block mb-2">
              Trending Inquiries
            </span>
            <div className="flex flex-wrap gap-1.5">
              {popularTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSearchTerm(tag)}
                  className="font-inter text-[11px] px-3 py-1 bg-[#ece7e0] hover:bg-[#1d1b17] hover:text-white transition-colors uppercase tracking-wider text-[#1d1b17]"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Results */}
        {searchTerm && (
          <div className="mt-4 max-h-[60vh] overflow-y-auto no-scrollbar divide-y divide-[#1d1b17]/5">
            <div className="text-[11px] uppercase tracking-widest font-inter text-[#605e5a] pb-2 font-semibold flex justify-between">
              <span>Results ({filteredProducts.length})</span>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="py-8 text-center text-[#605e5a]">
                <p className="font-inter text-sm">No items found matching "{searchTerm}"</p>
                <p className="font-inter text-xs text-[#747878] mt-1">
                  Try searching for "tee", "hoodie", "pants", or "jacket"
                </p>
              </div>
            ) : (
              filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="py-3 flex items-center justify-between gap-3 group cursor-pointer hover:bg-[#f2ede6]/60 px-2 transition-colors"
                  onClick={() => {
                    openQuickView(product);
                    setSearchOpen(false);
                  }}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-14 object-cover bg-white"
                    />
                    <div>
                      <span className="font-inter text-[9px] uppercase tracking-widest text-[#605e5a] block">
                        {product.category}
                      </span>
                      <h4 className="font-syne text-xs uppercase font-bold text-[#1d1b17] group-hover:underline">
                        {product.name}
                      </h4>
                      <span className="font-inter text-xs font-semibold text-[#1d1b17]">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToBag(product);
                    }}
                    className="px-3 py-1.5 bg-[#000000] text-white font-inter text-[10px] uppercase font-bold tracking-widest hover:bg-[#333] transition-colors"
                  >
                    + Add
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
