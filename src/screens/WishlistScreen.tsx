import React from 'react';
import { useApp } from '../context/AppContext';

export const WishlistScreen: React.FC = () => {
  const { wishlistProducts, toggleWishlist, addToBag, setScreen, openQuickView } = useApp();

  return (
    <div className="flex flex-col w-full px-4 pt-4 pb-24 max-w-7xl mx-auto">
      {/* Header */}
      <div className="border-b border-[#1d1b17]/10 pb-4 mb-4 flex items-end justify-between">
        <div>
          <span className="font-inter text-[10px] text-[#605e5a] uppercase tracking-widest font-semibold block">
            Curated Selections
          </span>
          <h1 className="font-syne text-2xl sm:text-3xl uppercase tracking-tight text-[#1d1b17] font-bold mt-1">
            Wishlist Archive
          </h1>
        </div>
        <span className="font-inter text-xs uppercase tracking-wider text-[#605e5a] font-semibold">
          {wishlistProducts.length} Saved {wishlistProducts.length === 1 ? 'Piece' : 'Pieces'}
        </span>
      </div>

      {wishlistProducts.length === 0 ? (
        <div className="py-24 flex flex-col items-center justify-center text-center max-w-sm mx-auto">
          <div className="w-16 h-16 rounded-full bg-[#f2ede6] flex items-center justify-center mb-4 text-[#605e5a]">
            <span className="material-symbols-outlined text-3xl">favorite</span>
          </div>
          <h3 className="font-syne text-xl uppercase font-bold text-[#1d1b17]">
            Your Vault is Empty
          </h3>
          <p className="font-inter text-xs text-[#605e5a] mt-2 leading-relaxed">
            Save your favorite monolithic silhouettes and limited runway drops to review them here.
          </p>
          <button
            type="button"
            onClick={() => setScreen('catalog')}
            className="mt-6 px-8 h-12 bg-black text-white font-inter text-xs uppercase tracking-widest font-bold hover:bg-[#222] transition-colors"
          >
            Explore Catalog
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-6">
          {wishlistProducts.map((product) => (
            <div
              key={product.id}
              className="flex flex-col group relative bg-[#ffffff] border border-[#1d1b17]/5"
            >
              {/* Product Media */}
              <div
                className="relative w-full aspect-[4/5] bg-[#f2ede6] overflow-hidden cursor-pointer"
                onClick={() => openQuickView(product)}
              >
                <img
                  src={product.image}
                  alt={product.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Remove from wishlist */}
                <button
                  type="button"
                  aria-label="Remove from wishlist"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(product.id, product.name);
                  }}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#d3623a] transition-transform active:scale-90 shadow-sm"
                >
                  <span
                    className="material-symbols-outlined text-[18px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    favorite
                  </span>
                </button>

                {/* Move to bag */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToBag(product);
                  }}
                  className="absolute bottom-0 inset-x-0 h-10 bg-[#000000]/95 text-white font-inter text-[10px] uppercase tracking-widest flex items-center justify-center gap-1 active:bg-black transition-colors hover:bg-black"
                >
                  <span className="material-symbols-outlined text-[16px]">shopping_bag</span>
                  Move To Bag
                </button>
              </div>

              {/* Metadata */}
              <div
                className="p-3 flex flex-col gap-1 bg-[#ffffff] cursor-pointer"
                onClick={() => openQuickView(product)}
              >
                <span className="font-inter text-[9px] uppercase tracking-widest text-[#605e5a]">
                  {product.category}
                </span>
                <h3 className="font-syne text-[13px] uppercase tracking-tight text-[#1d1b17] font-bold truncate">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2 pt-1">
                  <span className="font-inter text-sm font-bold text-[#1d1b17]">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  {product.originalPrice && (
                    <span className="font-inter text-xs text-[#605e5a] line-through">
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
