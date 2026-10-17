import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const ProductDetailModal: React.FC = () => {
  const {
    quickViewProduct,
    closeQuickView,
    addToBag,
    toggleWishlist,
    isWishlisted,
    setScreen,
  } = useApp();

  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [pinCode, setPinCode] = useState<string>('');
  const [deliveryStatus, setDeliveryStatus] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'specs' | 'shipping' | 'care'>('specs');

  if (!quickViewProduct) return null;

  const currentSize = selectedSize || quickViewProduct.sizes[0] || 'L';
  const currentColor = selectedColor || quickViewProduct.colors[0]?.name || '';
  const wishlisted = isWishlisted(quickViewProduct.id);

  const handleCheckPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinCode.length >= 6) {
      setDeliveryStatus(
        `Express Delivery guaranteed by ${new Date(Date.now() + 2 * 86400000).toLocaleDateString(
          'en-IN',
          { weekday: 'short', month: 'short', day: 'numeric' }
        )} to PIN ${pinCode}`
      );
    } else {
      setDeliveryStatus('Please enter a valid 6-digit PIN code');
    }
  };

  const handleInstantBuy = () => {
    addToBag(quickViewProduct, currentSize, currentColor);
    closeQuickView();
    setScreen('bag');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-[#fef9f1] w-full sm:max-w-xl max-h-[90vh] sm:max-h-[85vh] overflow-y-auto no-scrollbar shadow-2xl border border-[#1d1b17]/10 flex flex-col relative animate-slide-up sm:rounded-none">
        {/* Sticky Close Header */}
        <div className="sticky top-0 z-20 bg-[#fef9f1]/90 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-[#1d1b17]/10">
          <div className="flex items-center gap-2">
            <span className="font-inter text-[10px] uppercase tracking-widest text-[#605e5a] font-semibold">
              Editorial Specimen
            </span>
            <span className="text-[#c4c7c7]">•</span>
            <span className="font-inter text-[10px] uppercase tracking-wider text-[#d3623a] font-bold">
              {quickViewProduct.category}
            </span>
          </div>
          <button
            type="button"
            onClick={closeQuickView}
            className="w-8 h-8 flex items-center justify-center text-[#1d1b17] hover:opacity-60 transition-opacity"
            aria-label="Close product view"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Product Media */}
        <div className="relative w-full aspect-[4/5] bg-[#ffffff] overflow-hidden">
          <img
            src={quickViewProduct.image}
            alt={quickViewProduct.alt}
            className="w-full h-full object-cover"
          />

          {quickViewProduct.badge && (
            <div className="absolute top-3 left-3">
              <span
                className={`px-2.5 py-1 font-inter text-[9px] uppercase tracking-widest font-bold text-white ${
                  quickViewProduct.badgeType === 'sale'
                    ? 'bg-[#d3623a]'
                    : quickViewProduct.badgeType === 'neutral'
                    ? 'bg-[#e7e2db] text-[#1d1b17]'
                    : 'bg-[#000000]'
                }`}
              >
                {quickViewProduct.badge}
              </span>
            </div>
          )}

          <button
            type="button"
            onClick={() => toggleWishlist(quickViewProduct.id, quickViewProduct.name)}
            aria-label="Save to wishlist"
            className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#1d1b17] shadow-md transition-transform active:scale-90"
          >
            <span
              className={`material-symbols-outlined text-[20px] ${
                wishlisted ? 'text-[#d3623a]' : 'text-[#1d1b17]'
              }`}
              style={{ fontVariationSettings: wishlisted ? "'FILL' 1" : "'FILL' 0" }}
            >
              favorite
            </span>
          </button>
        </div>

        {/* Details Content */}
        <div className="p-5 flex flex-col gap-4">
          <div>
            <div className="flex items-center justify-between text-xs text-[#605e5a] mb-1">
              <div className="flex items-center gap-1 font-inter">
                <span
                  className="material-symbols-outlined text-[14px] text-black"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
                <span className="font-semibold text-[#1d1b17]">
                  {quickViewProduct.rating}
                </span>
                <span>({quickViewProduct.reviewCount} reviews)</span>
              </div>
              <span className="font-inter text-[10px] tracking-wider uppercase text-[#1d1b17] font-semibold">
                In Stock // Atelier Mumbai
              </span>
            </div>

            <h2 className="font-syne text-xl sm:text-2xl uppercase tracking-tight text-[#1d1b17] font-bold">
              {quickViewProduct.name}
            </h2>

            <div className="flex items-baseline gap-2.5 mt-1">
              <span className="font-inter text-xl font-bold text-[#1d1b17]">
                ₹{quickViewProduct.price.toLocaleString('en-IN')}
              </span>
              {quickViewProduct.originalPrice && (
                <span className="font-inter text-sm text-[#605e5a] line-through">
                  ₹{quickViewProduct.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
              {quickViewProduct.originalPrice && (
                <span className="font-inter text-[11px] font-bold text-[#d3623a] uppercase">
                  (Save ₹{(quickViewProduct.originalPrice - quickViewProduct.price).toLocaleString('en-IN')})
                </span>
              )}
            </div>
          </div>

          <p className="font-inter text-xs text-[#444748] leading-relaxed">
            {quickViewProduct.description}
          </p>

          {/* Color Swatches */}
          {quickViewProduct.colors.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-inter text-[10px] uppercase tracking-widest text-[#605e5a] font-semibold">
                  Colorway: <span className="text-[#1d1b17]">{currentColor}</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                {quickViewProduct.colors.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setSelectedColor(c.name)}
                    className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                      currentColor === c.name
                        ? 'ring-2 ring-black ring-offset-2'
                        : 'hover:scale-105'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Size Selector */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-inter text-[10px] uppercase tracking-widest text-[#605e5a] font-semibold">
                Select Size: <span className="text-[#1d1b17] font-bold">{currentSize}</span>
              </span>
              <span className="font-inter text-[10px] uppercase text-[#605e5a] underline cursor-pointer">
                True To Size / Boxy Fit
              </span>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {quickViewProduct.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSelectedSize(s)}
                  className={`h-11 font-inter text-xs font-semibold uppercase tracking-wider transition-all border ${
                    currentSize === s
                      ? 'bg-[#000000] text-white border-black'
                      : 'bg-white text-[#1d1b17] border-[#1d1b17]/20 hover:border-black'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={() => {
                addToBag(quickViewProduct, currentSize, currentColor);
              }}
              className="flex-1 h-12 bg-[#000000] text-white font-inter text-xs uppercase tracking-widest font-bold hover:bg-[#222] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
              Add To Bag
            </button>
            <button
              type="button"
              onClick={handleInstantBuy}
              className="flex-1 h-12 bg-[#ffffff] text-[#000000] border-2 border-[#000000] font-inter text-xs uppercase tracking-widest font-bold hover:bg-[#f2ede6] active:scale-[0.99] transition-all flex items-center justify-center gap-1"
            >
              Instant Buy
            </button>
          </div>

          {/* Delivery PIN Code Checker */}
          <div className="bg-[#f8f3ec] p-3 border border-[#1d1b17]/10 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="font-inter text-[10px] uppercase tracking-widest text-[#1d1b17] font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-[#605e5a]">local_shipping</span>
                Check PIN Code Delivery
              </span>
              <span className="font-inter text-[9px] uppercase text-[#d3623a] font-bold">
                Free Over ₹1,999
              </span>
            </div>
            <form onSubmit={handleCheckPin} className="flex gap-2">
              <input
                type="text"
                maxLength={6}
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value.replace(/\D/g, ''))}
                placeholder="ENTER 6-DIGIT PIN (E.G. 400001)"
                className="flex-1 bg-white px-3 py-2 text-xs font-inter uppercase tracking-wider border border-[#1d1b17]/10 focus:outline-none focus:border-black"
              />
              <button
                type="submit"
                className="px-4 bg-[#1d1b17] text-white font-inter text-[10px] uppercase tracking-wider font-bold hover:bg-black"
              >
                Check
              </button>
            </form>
            {deliveryStatus && (
              <p className="font-inter text-[11px] text-[#1d1b17] font-medium pt-1">
                {deliveryStatus}
              </p>
            )}
          </div>

          {/* Technical Specs Tab Accordion */}
          <div className="border-t border-[#1d1b17]/10 pt-4">
            <div className="flex border-b border-[#1d1b17]/10 pb-2 gap-4">
              <button
                type="button"
                onClick={() => setActiveTab('specs')}
                className={`font-inter text-[11px] uppercase tracking-widest pb-1 transition-all ${
                  activeTab === 'specs'
                    ? 'border-b-2 border-black font-bold text-black'
                    : 'text-[#605e5a]'
                }`}
              >
                Garment Specs
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('shipping')}
                className={`font-inter text-[11px] uppercase tracking-widest pb-1 transition-all ${
                  activeTab === 'shipping'
                    ? 'border-b-2 border-black font-bold text-black'
                    : 'text-[#605e5a]'
                }`}
              >
                Shipping & Returns
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('care')}
                className={`font-inter text-[11px] uppercase tracking-widest pb-1 transition-all ${
                  activeTab === 'care'
                    ? 'border-b-2 border-black font-bold text-black'
                    : 'text-[#605e5a]'
                }`}
              >
                Care & Origin
              </button>
            </div>

            <div className="pt-3 font-inter text-xs text-[#444748] leading-relaxed">
              {activeTab === 'specs' && (
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="text-[#605e5a] block">Weight / Density:</span>
                    <span className="font-semibold text-black">
                      {quickViewProduct.specs.gsm || 'Heavyweight Spec'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#605e5a] block">Composition:</span>
                    <span className="font-semibold text-black">
                      {quickViewProduct.specs.material}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#605e5a] block">Silhouette:</span>
                    <span className="font-semibold text-black">{quickViewProduct.specs.fit}</span>
                  </div>
                  <div>
                    <span className="text-[#605e5a] block">Atelier Run:</span>
                    <span className="font-semibold text-black">Vol. 04 / 2025</span>
                  </div>
                </div>
              )}

              {activeTab === 'shipping' && (
                <div className="text-[11px] flex flex-col gap-1.5">
                  <p>• Complimentary Express Shipping on all prepaid & COD orders over ₹1,999.</p>
                  <p>• Dispatched within 24-48 hours via BlueDart Air Express.</p>
                  <p>• 7-day hassle-free door exchange and refund protocol.</p>
                </div>
              )}

              {activeTab === 'care' && (
                <div className="text-[11px] flex flex-col gap-1.5">
                  <p>
                    <strong className="text-black">Origin:</strong> {quickViewProduct.specs.origin}
                  </p>
                  <p>
                    <strong className="text-black">Care:</strong> {quickViewProduct.specs.care}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
