import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES, PRODUCTS } from '../data/mockProducts';

export const CatalogScreen: React.FC = () => {
  const {
    selectedCategory,
    setSelectedCategory,
    addToBag,
    toggleWishlist,
    isWishlisted,
    openQuickView,
  } = useApp();

  const [sortOption, setSortOption] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [selectedSizeFilter, setSelectedSizeFilter] = useState<string>('all');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS];

    // Filter by Category
    if (selectedCategory && selectedCategory !== 'all') {
      if (selectedCategory === 'mens') {
        list = list.filter((p) => p.department === "Men's" || p.department === 'Unisex');
      } else if (selectedCategory === 'womens') {
        list = list.filter((p) => p.department === "Women's" || p.department === 'Unisex');
      } else if (selectedCategory === 'tees') {
        list = list.filter((p) => p.category === 'Tops');
      } else if (selectedCategory === 'hoodies') {
        list = list.filter((p) => p.category === 'Hoodies');
      } else if (selectedCategory === 'denim') {
        list = list.filter((p) => p.category === 'Denim & Pants' || p.category === 'Trousers');
      } else if (selectedCategory === 'gear') {
        list = list.filter((p) => p.category === 'Outerwear' || p.category === 'Knitwear');
      }
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // Filter by Size
    if (selectedSizeFilter !== 'all') {
      list = list.filter((p) => p.sizes.includes(selectedSizeFilter));
    }

    // In Stock
    if (inStockOnly) {
      list = list.filter((p) => p.inStock);
    }

    // Sort
    if (sortOption === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [selectedCategory, searchQuery, selectedSizeFilter, inStockOnly, sortOption]);

  return (
    <div className="flex flex-col w-full px-4 pt-4 pb-24 max-w-7xl mx-auto">
      {/* Editorial Title Banner */}
      <div className="border-b border-[#1d1b17]/10 pb-4 mb-4">
        <span className="font-inter text-[10px] text-[#605e5a] uppercase tracking-widest font-semibold block">
          Editorial Catalog // Collection Archive
        </span>
        <h1 className="font-syne text-2xl sm:text-3xl uppercase tracking-tight text-[#1d1b17] font-bold mt-1">
          Apparatus Vault
        </h1>
        <p className="font-inter text-xs text-[#444748] mt-1 max-w-lg">
          Monolithic streetwear silhouettes engineered from heavy organic combed cotton and Japanese
          tactical hardware.
        </p>
      </div>

      {/* Category Pills Bar (Horizontal scrollable) */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-3 border-b border-[#1d1b17]/10 -mx-4 px-4 sm:mx-0 sm:px-0">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`font-inter text-xs uppercase tracking-wider px-3.5 py-1.5 transition-colors whitespace-nowrap shrink-0 border ${
                isActive
                  ? 'bg-[#000000] text-white border-black font-semibold'
                  : 'bg-white text-[#1d1b17] border-[#1d1b17]/10 hover:border-black'
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* Utility Controls: Search, Sort, Size, Counts */}
      <div className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[#1d1b17]/10">
        {/* Search Input */}
        <div className="flex items-center bg-white px-3 py-2 border border-[#1d1b17]/10 flex-1 max-w-md">
          <span className="material-symbols-outlined text-[18px] text-[#747878] mr-2">search</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="FILTER PIECES BY KEYWORD OR SILHOUETTE..."
            className="w-full bg-transparent font-inter text-[11px] uppercase tracking-wider text-[#1d1b17] placeholder:text-[#747878] focus:outline-none"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="text-[#747878] hover:text-black"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          )}
        </div>

        {/* Filter controls */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Size Select */}
          <div className="flex items-center gap-1">
            <span className="font-inter text-[10px] text-[#605e5a] uppercase font-semibold">Size:</span>
            <select
              value={selectedSizeFilter}
              onChange={(e) => setSelectedSizeFilter(e.target.value)}
              className="bg-white border border-[#1d1b17]/15 px-2 py-1.5 font-inter text-xs uppercase tracking-wider focus:outline-none focus:border-black"
            >
              <option value="all">All Sizes</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="XXL">XXL</option>
            </select>
          </div>

          {/* Sort Select */}
          <div className="flex items-center gap-1">
            <span className="font-inter text-[10px] text-[#605e5a] uppercase font-semibold">Sort:</span>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as any)}
              className="bg-white border border-[#1d1b17]/15 px-2 py-1.5 font-inter text-xs uppercase tracking-wider focus:outline-none focus:border-black"
            >
              <option value="featured">Featured Drops</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>

          {/* Pieces Count */}
          <span className="font-inter text-[11px] text-[#605e5a] uppercase font-semibold ml-auto">
            {filteredProducts.length} Items Found
          </span>
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="py-20 flex flex-col items-center justify-center text-center">
          <span className="material-symbols-outlined text-4xl text-[#605e5a] mb-2">style</span>
          <h3 className="font-syne text-lg uppercase font-bold text-[#1d1b17]">
            No Archive Pieces Found
          </h3>
          <p className="font-inter text-xs text-[#605e5a] mt-1 max-w-xs">
            Try adjusting your search criteria or reset filters to explore the full collection.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
              setSelectedSizeFilter('all');
            }}
            className="mt-4 px-5 py-2.5 bg-black text-white font-inter text-xs uppercase tracking-widest font-bold"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-6 pt-6">
          {filteredProducts.map((product) => {
            const wishlisted = isWishlisted(product.id);
            return (
              <div
                key={product.id}
                className="flex flex-col group relative bg-[#ffffff] border border-[#1d1b17]/5 hover:shadow-lg transition-shadow"
              >
                {/* Image plate */}
                <div
                  className="relative w-full aspect-[4/5] bg-[#f2ede6] overflow-hidden cursor-pointer"
                  onClick={() => openQuickView(product)}
                >
                  <img
                    src={product.image}
                    alt={product.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {product.badge && (
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      <span
                        className={`px-2 py-0.5 font-inter text-[9px] uppercase tracking-wider font-semibold text-white ${
                          product.badgeType === 'sale'
                            ? 'bg-[#d3623a]'
                            : product.badgeType === 'neutral'
                            ? 'bg-[#e6e2dd] text-[#1d1b17]'
                            : 'bg-[#000000]'
                        }`}
                      >
                        {product.badge}
                      </span>
                    </div>
                  )}

                  <button
                    type="button"
                    aria-label={`Wishlist ${product.name}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product.id, product.name);
                    }}
                    className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-[#1d1b17] transition-transform active:scale-90 hover:bg-white"
                  >
                    <span
                      className={`material-symbols-outlined text-[18px] ${
                        wishlisted ? 'text-[#d3623a]' : 'text-[#1d1b17]'
                      }`}
                      style={{ fontVariationSettings: wishlisted ? "'FILL' 1" : "'FILL' 0" }}
                    >
                      favorite
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToBag(product);
                    }}
                    className="absolute bottom-0 inset-x-0 h-10 bg-[#000000]/95 text-white font-inter text-[10px] uppercase tracking-widest flex items-center justify-center gap-1 active:bg-black transition-colors hover:bg-black"
                  >
                    <span className="material-symbols-outlined text-[16px]">add</span> Add To Bag
                  </button>
                </div>

                {/* Metadata */}
                <div
                  className="p-2.5 flex flex-col gap-1 bg-[#ffffff] cursor-pointer"
                  onClick={() => openQuickView(product)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-[11px] font-inter text-[#605e5a]">
                      <span
                        className="material-symbols-outlined text-[13px] text-black"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                      <span className="font-semibold text-[#1d1b17]">{product.rating}</span>
                      <span>({product.reviewCount})</span>
                    </div>

                    <div className="flex items-center gap-1">
                      {product.colors.map((c) => (
                        <span
                          key={c.name}
                          className="w-2.5 h-2.5 rounded-full border border-black/10"
                          style={{ backgroundColor: c.hex }}
                          title={c.name}
                        />
                      ))}
                    </div>
                  </div>

                  <h3 className="font-syne text-[13px] uppercase tracking-tight text-[#1d1b17] font-bold truncate">
                    {product.name}
                  </h3>

                  <div className="flex items-center gap-2">
                    <span className="font-inter text-[14px] font-bold text-[#1d1b17]">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    {product.originalPrice && (
                      <span className="font-inter text-[11px] text-[#605e5a] line-through">
                        ₹{product.originalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
