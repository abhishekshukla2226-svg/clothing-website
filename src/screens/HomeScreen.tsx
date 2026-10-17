import React, { useRef, useState } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES, PRODUCTS } from '../data/mockProducts';

export const HomeScreen: React.FC = () => {
  const {
    setScreen,
    setSelectedCategory,
    addToBag,
    toggleWishlist,
    isWishlisted,
    openQuickView,
    applyPromoCode,
    showToast,
  } = useApp();

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterActivated, setNewsletterActivated] = useState(false);
  const [footerEmail, setFooterEmail] = useState('');
  const carouselRef = useRef<HTMLDivElement>(null);

  // Trending items (first 8 items)
  const trendingProducts = PRODUCTS.slice(0, 8);
  // New arrivals items (next 4 items)
  const newArrivals = PRODUCTS.filter((p) => p.isNewArrival);

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -260 : 260;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterActivated(true);
      applyPromoCode('VYBE10');
      setNewsletterEmail('');
    }
  };

  const handleFooterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (footerEmail) {
      showToast('Exclusive Dispatch Access Granted');
      setFooterEmail('');
    }
  };

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setScreen('catalog');
  };

  return (
    <div className="flex flex-col w-full pb-20">
      {/* SECTION 1: EDITORIAL CAMPAIGN HERO */}
      <section className="relative w-full overflow-hidden bg-[#ece7e0]">
        <div className="relative w-full h-[540px] sm:h-[620px] flex flex-col justify-end p-4 sm:p-8 pb-10 max-w-7xl mx-auto">
          {/* Background Image */}
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBJqdQijwEpZBk_UQpDd9pnLR2SFwB1DWTMIWpk6Qxwtn7ObqnjuEBM1SzDXJjmNGTspze14iz7dmCv-DDDqNpq9SHq5zXPDsd5C1hdwYD1aoIx8UM2_rPybak-ulaPQB0vxHqjy1txn5RN61nWxzwzDmJQ_VKm6Sksj4-N-KrTXKvoVv47nAtJOZzIY4SbfepTmq8ZYBLCOQ393yV-tigtNd43oW15weee7mtRfbF1LHnI5lKCcR64MA')`,
            }}
          />
          {/* Scrim Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

          {/* Hero Content */}
          <div className="relative z-10 flex flex-col gap-2 text-white max-w-xl">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-2.5 py-1 bg-white/20 backdrop-blur-md rounded-full font-inter text-[10px] tracking-widest text-white uppercase font-semibold">
                AUTUMN/WINTER '25 // VOL. 04
              </span>
              <span className="w-2 h-2 rounded-full bg-[#d3623a] animate-pulse" />
            </div>

            <h1 className="font-syne text-[40px] sm:text-[56px] uppercase tracking-tight text-white leading-none font-extrabold mt-1">
              DEFINE YOUR<br />OWN STYLE.
            </h1>

            <p className="font-inter text-sm text-[#f5f0e9]/90 max-w-sm mt-1 leading-relaxed">
              Discover the latest trends. Wear what defines you with uncompromising cut and silhouette.
            </p>

            <div className="flex items-center gap-3 pt-3">
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('all');
                  setScreen('catalog');
                }}
                className="flex-1 h-12 bg-white text-black font-inter text-[13px] uppercase tracking-wider flex items-center justify-center font-bold active:opacity-80 transition-opacity hover:bg-neutral-100"
              >
                Shop Now
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('tees');
                  setScreen('catalog');
                }}
                className="flex-1 h-12 bg-transparent text-white font-inter text-[13px] uppercase tracking-wider flex items-center justify-center font-semibold bg-white/10 backdrop-blur-md hover:bg-white/20 active:opacity-80 transition-all border border-white/20"
              >
                Explore Collection
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* LUXURY TRUST BADGES STRIP */}
      <section className="w-full bg-[#f8f3ec] py-4 px-4 overflow-x-auto no-scrollbar border-b border-[#1d1b17]/10">
        <div className="flex items-center justify-between gap-4 min-w-[580px] max-w-5xl mx-auto">
          <div className="flex items-center gap-2.5 text-[#1d1b17]">
            <span className="material-symbols-outlined text-[20px] text-[#605e5a]">local_shipping</span>
            <div className="flex flex-col">
              <span className="font-inter text-[10px] tracking-wider uppercase font-semibold">
                Free Shipping
              </span>
              <span className="font-inter text-[10px] text-[#605e5a]">Orders over ₹1,999</span>
            </div>
          </div>
          <div className="h-6 w-[1px] bg-[#c4c7c7]/40" />

          <div className="flex items-center gap-2.5 text-[#1d1b17]">
            <span className="material-symbols-outlined text-[20px] text-[#605e5a]">sync_alt</span>
            <div className="flex flex-col">
              <span className="font-inter text-[10px] tracking-wider uppercase font-semibold">
                7-Day Returns
              </span>
              <span className="font-inter text-[10px] text-[#605e5a]">Instant door exchange</span>
            </div>
          </div>
          <div className="h-6 w-[1px] bg-[#c4c7c7]/40" />

          <div className="flex items-center gap-2.5 text-[#1d1b17]">
            <span className="material-symbols-outlined text-[20px] text-[#605e5a]">eco</span>
            <div className="flex flex-col">
              <span className="font-inter text-[10px] tracking-wider uppercase font-semibold">
                100% Cotton
              </span>
              <span className="font-inter text-[10px] text-[#605e5a]">Ethically harvested</span>
            </div>
          </div>
          <div className="h-6 w-[1px] bg-[#c4c7c7]/40" />

          <div className="flex items-center gap-2.5 text-[#1d1b17]">
            <span className="material-symbols-outlined text-[20px] text-[#605e5a]">payments</span>
            <div className="flex flex-col">
              <span className="font-inter text-[10px] tracking-wider uppercase font-semibold">
                Pan-India COD
              </span>
              <span className="font-inter text-[10px] text-[#605e5a]">Pay on inspection</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: SHOP BY CATEGORY */}
      <section className="w-full px-4 pt-10 flex flex-col gap-4 max-w-7xl mx-auto">
        <div className="flex items-end justify-between">
          <div className="flex flex-col">
            <span className="font-inter text-[10px] text-[#605e5a] tracking-widest uppercase font-semibold">
              The Archive
            </span>
            <h2 className="font-syne text-2xl uppercase tracking-tight text-[#1d1b17] font-bold">
              Shop By Category
            </h2>
          </div>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('all');
              setScreen('catalog');
            }}
            className="font-inter text-[10px] uppercase text-[#605e5a] hover:text-[#000000] tracking-wider flex items-center gap-1 font-semibold group"
          >
            All Arch (06){' '}
            <span className="material-symbols-outlined text-[14px] group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </button>
        </div>

        {/* Category horizontal scrollable grid cards */}
        <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          {CATEGORIES.filter((c) => c.image).map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className="group relative flex-none w-[200px] h-[280px] bg-[#f2ede6] overflow-hidden flex flex-col justify-end p-4 cursor-pointer"
            >
              <div
                className="absolute inset-0 w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                style={{ backgroundImage: `url('${cat.image}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="relative z-10 flex flex-col text-white">
                <span className="font-syne text-lg uppercase font-bold text-white leading-tight">
                  {cat.name}
                </span>
                <span className="font-inter text-[10px] text-white/80 uppercase tracking-widest mt-1 flex items-center gap-1 font-semibold">
                  Shop Now{' '}
                  <span className="material-symbols-outlined text-[12px] group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: TRENDING PRODUCTS GRID (Responsive 2-column) */}
      <section className="w-full px-4 pt-14 flex flex-col gap-4 max-w-7xl mx-auto">
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <span className="font-inter text-[10px] text-[#d3623a] tracking-widest uppercase font-bold">
              Trending Drops
            </span>
            <span className="font-inter text-[10px] text-[#605e5a] uppercase font-semibold">
              8 Curated Pieces
            </span>
          </div>
          <h2 className="font-syne text-2xl uppercase tracking-tight text-[#1d1b17] font-bold">
            Current Essentials
          </h2>
        </div>

        {/* 2-Column Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-3 gap-y-6">
          {trendingProducts.map((product) => {
            const wishlisted = isWishlisted(product.id);
            return (
              <div
                key={product.id}
                className="flex flex-col group relative bg-[#ffffff] border border-[#1d1b17]/5 hover:shadow-lg transition-shadow"
              >
                {/* Image plate with buttons */}
                <div
                  className="relative w-full aspect-[4/5] bg-[#f2ede6] overflow-hidden cursor-pointer"
                  onClick={() => openQuickView(product)}
                >
                  <img
                    src={product.image}
                    alt={product.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Badge */}
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

                  {/* Wishlist Button */}
                  <button
                    type="button"
                    aria-label={`Wishlist ${product.name}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product.id, product.name);
                    }}
                    className="absolute top-2 right-2 w-8 h-8 rounded-full bg-[#fef9f1]/80 backdrop-blur-md flex items-center justify-center text-[#1d1b17] transition-transform active:scale-90 hover:bg-white"
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

                  {/* Add To Bag bottom bar */}
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

                    {/* Color Swatches */}
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
      </section>

      {/* SECTION 4: BOLD PROMOTIONAL BANNER */}
      <section className="w-full px-4 pt-14 max-w-7xl mx-auto">
        <div className="relative w-full bg-[#000000] text-white p-6 sm:p-10 overflow-hidden flex flex-col justify-between min-h-[300px]">
          {/* Background image & overlay */}
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center opacity-30 mix-blend-luminosity"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCTh9YswFP2zREjD9R4xXPi2tKKknlJQEK7akrkGdL_qpcG_EO-aFYPF578pqV8ifwUqxIza-QXlpN6f4ihRxZHinl7grLMJ3ae9uXV6uB9QPXFC0XslZNzpGpgWMwVWlZ7iMqqme1M4FLxODRxdEh8_6gRCUygoO-Grk68oGSURa5La-n-kM8MuG9dipOgNGaDuPD0NH1LCPoSwAlExykG9W7AE8pB-BRfToNn7b7NwNp0dzGzrJJ93w')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-transparent" />

          <div className="relative z-10 flex flex-col gap-1">
            <span className="font-inter text-[10px] tracking-widest uppercase text-[#ffb59c] font-bold">
              COLLECTION CAPSULE // 2025
            </span>
            <h2 className="font-syne text-[32px] sm:text-[44px] uppercase tracking-tight text-white leading-none font-bold mt-1">
              YOUR STYLE.<br />YOUR RULES.
            </h2>
          </div>

          <div className="relative z-10 flex flex-col gap-4 pt-4">
            <p className="font-inter text-sm text-[#c9c6c5] max-w-sm leading-relaxed">
              Upgrade your wardrobe with our latest limited drop. Crafted with organic Indian heavy
              cotton and bespoke urban forms.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setScreen('catalog');
              }}
              className="self-start inline-flex items-center gap-2 h-12 px-6 bg-white text-black font-inter text-[12px] uppercase tracking-wider font-bold hover:bg-[#f2ede6] active:opacity-90 transition-colors"
            >
              Explore New Arrivals{' '}
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 5: NEW ARRIVALS HORIZONTAL CAROUSEL */}
      <section className="w-full px-4 pt-14 flex flex-col gap-4 max-w-7xl mx-auto">
        <div className="flex items-end justify-between">
          <div className="flex flex-col">
            <span className="font-inter text-[10px] text-[#605e5a] tracking-widest uppercase font-semibold">
              Fresh From Studio
            </span>
            <h2 className="font-syne text-2xl uppercase tracking-tight text-[#1d1b17] font-bold">
              New Arrivals
            </h2>
          </div>

          {/* Scroll Navigation Controls */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Previous items"
              onClick={() => scrollCarousel('left')}
              className="w-9 h-9 bg-[#ece7e0] flex items-center justify-center text-[#1d1b17] active:bg-[#e6e2dd] hover:bg-[#ded9d2] transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">chevron_left</span>
            </button>
            <button
              type="button"
              aria-label="Next items"
              onClick={() => scrollCarousel('right')}
              className="w-9 h-9 bg-[#ece7e0] flex items-center justify-center text-[#1d1b17] active:bg-[#e6e2dd] hover:bg-[#ded9d2] transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </div>
        </div>

        {/* Carousel Cards Container */}
        <div
          ref={carouselRef}
          className="flex gap-3 overflow-x-auto no-scrollbar scroll-smooth -mx-4 px-4 sm:mx-0 sm:px-0 pb-2"
        >
          {newArrivals.map((item) => {
            const wishlisted = isWishlisted(item.id);
            return (
              <div
                key={item.id}
                className="flex-none w-[220px] sm:w-[240px] flex flex-col bg-[#ffffff] border border-[#1d1b17]/5"
              >
                <div
                  className="relative w-full aspect-[4/5] bg-[#f2ede6] overflow-hidden cursor-pointer group"
                  onClick={() => openQuickView(item)}
                >
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <button
                    type="button"
                    aria-label={`Wishlist ${item.name}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(item.id, item.name);
                    }}
                    className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-[#1d1b17] active:scale-90"
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
                </div>

                <div className="p-3 flex flex-col gap-1">
                  <span className="font-inter text-[10px] text-[#605e5a] uppercase tracking-widest font-semibold">
                    {item.category}
                  </span>
                  <h3
                    className="font-syne text-[13px] uppercase tracking-tight text-[#1d1b17] font-bold truncate cursor-pointer hover:underline"
                    onClick={() => openQuickView(item)}
                  >
                    {item.name}
                  </h3>
                  <div className="flex items-center justify-between pt-1">
                    <span className="font-inter text-sm font-bold text-[#1d1b17]">
                      ₹{item.price.toLocaleString('en-IN')}
                    </span>
                    <button
                      type="button"
                      onClick={() => addToBag(item)}
                      className="font-inter text-[10px] text-[#000000] uppercase font-bold tracking-wider hover:opacity-70 transition-opacity bg-[#f2ede6] px-2 py-1"
                    >
                      + ADD
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 6: BRAND STORY SECTION */}
      <section id="brand-story" className="w-full px-4 pt-14 max-w-7xl mx-auto">
        <div className="relative bg-[#f2ede6] p-6 sm:p-10 flex flex-col gap-6 overflow-hidden">
          <div className="flex flex-col gap-1">
            <span className="font-inter text-[10px] text-[#605e5a] tracking-widest uppercase font-semibold">
              The Philosophy
            </span>
            <h2 className="font-syne text-2xl uppercase tracking-tight text-[#1d1b17] font-bold leading-snug">
              MORE THAN JUST<br />CLOTHING.
            </h2>
          </div>

          <div className="relative w-full aspect-[16/10] bg-[#ece7e0] overflow-hidden">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXkd619HQ2z1ZcKFObxAGe257Y1B-3DSbB7oWXGyRk-sQichCVUD8wyGAcaymXa8RgBkrmi0CCBHck15VVkuOoEkGLB0rPj23LVoaFhI3W2u-DwVMrJejeXY3jEelTuB6sWEvSJeMdnoCaUs8KUhJS-jgPAefy6d9uAiurH3GDosWraVSCYtI8PseRI2WF3D6R5JFjpuUDEDu4ZPl6T2YS6C8LZ2ApHH8btEyEHBNV-ddFet4cKSZNLA"
              alt="Intimate editorial documentary photograph inside a high-end streetwear atelier in Mumbai"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-2 left-2 bg-[#000000]/80 backdrop-blur-md px-2.5 py-1 text-white font-inter text-[9px] uppercase tracking-widest font-semibold">
              STUDIO VYBE // MUMBAI
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-inter text-sm text-[#444748] leading-relaxed">
              We create everyday essentials and statement pieces for people who express themselves
              through fashion. Crafted in India with ethically sourced organic cotton and bespoke
              silhouettes that challenge the traditional luxury status quo.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setScreen('catalog');
              }}
              className="self-start inline-flex items-center gap-1 font-inter text-xs uppercase tracking-wider text-[#000000] font-bold pt-2 group"
            >
              Our Story{' '}
              <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 7: VIP NEWSLETTER SECTION */}
      <section className="w-full px-4 pt-14 max-w-7xl mx-auto">
        <div className="bg-[#ffffff] p-6 sm:p-8 shadow-sm flex flex-col gap-4 border border-[#1d1b17]/10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#d3623a] rounded-full animate-ping" />
            <span className="font-inter text-[10px] text-[#d3623a] uppercase tracking-widest font-bold">
              VIP Syndicate
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <h2 className="font-syne text-xl sm:text-2xl uppercase tracking-tight text-[#1d1b17] font-bold">
              GET 10% OFF YOUR FIRST ORDER
            </h2>
            <p className="font-inter text-xs text-[#605e5a]">
              Subscribe for exclusive drops, VIP secret sales, and insider lookbooks before the public
              launch.
            </p>
          </div>

          <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-2">
            <div className="flex items-center bg-[#f8f3ec] px-4 py-3 shadow-[0_1px_4px_rgba(0,0,0,0.02)]">
              <span className="material-symbols-outlined text-[18px] text-[#747878] mr-2">mail</span>
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="ENTER YOUR EMAIL ADDRESS"
                className="w-full bg-transparent font-inter text-[11px] placeholder:text-[#747878] text-[#1d1b17] focus:outline-none uppercase tracking-wider"
              />
              <button
                type="submit"
                className="font-inter text-[11px] text-[#000000] uppercase font-bold tracking-widest pl-2 hover:opacity-70 transition-opacity whitespace-nowrap"
              >
                Subscribe
              </button>
            </div>

            {newsletterActivated && (
              <p className="font-inter text-[11px] text-[#d3623a] font-medium pt-1">
                Welcome to the syndicate. Use code <span className="font-bold underline">VYBE10</span>{' '}
                for 10% off at checkout.
              </p>
            )}
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full bg-[#f8f3ec] text-[#1d1b17] pt-14 pb-20 px-4 mt-16 border-t border-[#1d1b17]/10">
        <div className="flex flex-col gap-10 max-w-lg mx-auto">
          {/* Editorial Dispatch */}
          <div className="flex flex-col gap-2">
            <span className="font-inter text-[10px] text-[#605e5a] tracking-widest uppercase font-semibold">
              Editorial Dispatch
            </span>
            <h4 className="font-syne text-lg uppercase tracking-tight text-[#1d1b17] font-bold">
              Join the Vybe Syndicate
            </h4>
            <p className="font-inter text-xs text-[#444748]">
              Receive capsule lookbooks, private salon invites, and priority drop notifications straight
              to your terminal.
            </p>

            <form onSubmit={handleFooterSubmit} className="flex flex-col gap-2 mt-2">
              <div className="flex items-center bg-white px-4 py-3 shadow-[0_1px_4px_rgba(0,0,0,0.03)] border border-[#1d1b17]/10">
                <input
                  type="email"
                  required
                  value={footerEmail}
                  onChange={(e) => setFooterEmail(e.target.value)}
                  placeholder="ENTER EMAIL FOR EXCLUSIVE ACCESS"
                  className="w-full bg-transparent font-inter text-[11px] placeholder:text-[#747878] focus:outline-none uppercase tracking-wider"
                />
                <button
                  type="submit"
                  className="font-inter text-[11px] text-[#000000] uppercase font-bold tracking-widest pl-2 hover:opacity-70 transition-opacity"
                >
                  JOIN
                </button>
              </div>
              <p className="font-inter text-[10px] text-[#605e5a]">
                By subscribing, you agree to our Terms of Service & Privacy Protocol.
              </p>
            </form>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 gap-8 pt-2">
            <div className="flex flex-col gap-2">
              <h5 className="font-inter text-xs uppercase tracking-wider text-[#1d1b17] font-bold">
                Curation
              </h5>
              <ul className="flex flex-col gap-2 font-inter text-xs text-[#444748]">
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory('all');
                      setScreen('catalog');
                    }}
                    className="hover:text-black transition-colors"
                  >
                    New Arrivals
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory('mens');
                      setScreen('catalog');
                    }}
                    className="hover:text-black transition-colors"
                  >
                    Men's Architecture
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory('womens');
                      setScreen('catalog');
                    }}
                    className="hover:text-black transition-colors"
                  >
                    Women's Form
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory('hoodies');
                      setScreen('catalog');
                    }}
                    className="hover:text-black transition-colors"
                  >
                    Capsule Run 04
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory('all');
                      setScreen('catalog');
                    }}
                    className="text-[#d3623a] font-medium hover:opacity-80 transition-opacity"
                  >
                    Archive Sale
                  </button>
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-2">
              <h5 className="font-inter text-xs uppercase tracking-wider text-[#1d1b17] font-bold">
                Concierge
              </h5>
              <ul className="flex flex-col gap-2 font-inter text-xs text-[#444748]">
                <li>
                  <button
                    type="button"
                    onClick={() => setScreen('profile')}
                    className="hover:text-black transition-colors"
                  >
                    Shipping & Express
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setScreen('profile')}
                    className="hover:text-black transition-colors"
                  >
                    Returns & Exchange
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setScreen('profile')}
                    className="hover:text-black transition-colors"
                  >
                    Garment Spec & Guide
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setScreen('profile')}
                    className="hover:text-black transition-colors"
                  >
                    Delivery PIN Lookup
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setScreen('profile')}
                    className="hover:text-black transition-colors"
                  >
                    Client Care Desk
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Socials & Payments */}
          <div className="flex flex-col gap-3 pt-2">
            <div className="flex items-center justify-between">
              <span className="font-inter text-[10px] uppercase text-[#605e5a] tracking-widest font-semibold">
                Follow Studio
              </span>
              <div className="flex items-center gap-3">
                <span className="font-inter text-[10px] uppercase text-[#1d1b17] tracking-wider cursor-pointer hover:opacity-60">
                  Instagram
                </span>
                <span className="text-[#c4c7c7]">•</span>
                <span className="font-inter text-[10px] uppercase text-[#1d1b17] tracking-wider cursor-pointer hover:opacity-60">
                  Pinterest
                </span>
                <span className="text-[#c4c7c7]">•</span>
                <span className="font-inter text-[10px] uppercase text-[#1d1b17] tracking-wider cursor-pointer hover:opacity-60">
                  Spotify
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-1 pt-2 text-[#605e5a] font-inter text-[10px]">
              <span>SECURE TRANSACTIONS VIA</span>
              <span className="font-semibold text-black">UPI • RUPAY • VISA • NETBANKING</span>
            </div>
          </div>

          {/* Brand Manifesto Tag */}
          <div className="pt-4 text-center flex flex-col gap-1.5 border-t border-[#1d1b17]/10">
            <p className="font-syne text-sm uppercase tracking-tight text-[#1d1b17] font-bold">
              VYBE COUTURE APPARATUS
            </p>
            <p className="font-inter text-[11px] text-[#605e5a] max-w-xs mx-auto leading-relaxed">
              Engineered in Mumbai & Milan. Monolithic street silhouettes produced under limited run
              protocols.
            </p>
            <p className="font-inter text-[9px] text-[#747878] tracking-widest uppercase pt-2">
              © 2025 VYBE CORP. ALL RIGHTS RESERVED.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
