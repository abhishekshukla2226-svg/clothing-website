import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Order } from '../types';

export const BagScreen: React.FC = () => {
  const {
    cartItems,
    removeFromBag,
    updateCartQuantity,
    updateCartSize,
    cartSubtotal,
    promoCode,
    promoDiscount,
    applyPromoCode,
    removePromoCode,
    setScreen,
    placeOrder,
  } = useApp();

  const [inputCoupon, setInputCoupon] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  // Address form
  const [address, setAddress] = useState({
    fullName: 'Abhishek Shukla',
    street: '402, Signature Towers, Lower Parel',
    city: 'Mumbai',
    state: 'Maharashtra',
    pinCode: '400013',
    phone: '+91 98201 44820',
  });

  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod'>('upi');

  const discountAmount = Math.round(cartSubtotal * promoDiscount);
  const eligibleForFreeShipping = cartSubtotal - discountAmount >= 1999 || cartSubtotal === 0;
  const shippingFee = eligibleForFreeShipping ? 0 : 150;
  const grandTotal = cartSubtotal - discountAmount + shippingFee;
  const amountNeededForFreeShipping = Math.max(0, 1999 - (cartSubtotal - discountAmount));

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCoupon.trim()) {
      applyPromoCode(inputCoupon);
      setInputCoupon('');
    }
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const order = placeOrder(
      address,
      paymentMethod === 'upi' ? 'UPI (Instant)' : paymentMethod === 'card' ? 'RuPay / Credit Card' : 'Cash On Delivery'
    );
    setConfirmedOrder(order);
    setIsCheckingOut(false);
  };

  if (confirmedOrder) {
    return (
      <div className="flex flex-col w-full px-4 pt-8 pb-24 max-w-xl mx-auto">
        <div className="bg-white border border-[#1d1b17]/10 p-6 sm:p-8 text-center flex flex-col items-center shadow-lg">
          <div className="w-16 h-16 rounded-full bg-[#f2ede6] text-black flex items-center justify-center mb-3">
            <span
              className="material-symbols-outlined text-3xl text-[#d3623a]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              check_circle
            </span>
          </div>

          <span className="font-inter text-[10px] uppercase tracking-widest text-[#d3623a] font-bold">
            Order Confirmed // Limited Capsule Run
          </span>
          <h2 className="font-syne text-2xl uppercase tracking-tight text-[#1d1b17] font-bold mt-1">
            Dispatch Sequence Initiated
          </h2>
          <p className="font-inter text-xs text-[#605e5a] mt-2">
            Order Reference: <strong className="text-black">{confirmedOrder.id}</strong>
          </p>

          <div className="w-full bg-[#f8f3ec] p-4 my-6 text-left border border-[#1d1b17]/10 flex flex-col gap-2">
            <div className="flex justify-between text-xs font-inter">
              <span className="text-[#605e5a]">Estimated Delivery:</span>
              <span className="font-bold text-black">
                {new Date(Date.now() + 2 * 86400000).toLocaleDateString('en-IN', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
            </div>
            <div className="flex justify-between text-xs font-inter">
              <span className="text-[#605e5a]">Carrier & Protocol:</span>
              <span className="font-semibold text-black">{confirmedOrder.trackingNumber}</span>
            </div>
            <div className="flex justify-between text-xs font-inter">
              <span className="text-[#605e5a]">Destination:</span>
              <span className="font-semibold text-black">
                {confirmedOrder.shippingAddress.city}, {confirmedOrder.shippingAddress.pinCode}
              </span>
            </div>
            <div className="flex justify-between text-xs font-inter border-t border-[#1d1b17]/10 pt-2 font-bold">
              <span>Total Paid:</span>
              <span>₹{confirmedOrder.total.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="flex gap-3 w-full">
            <button
              type="button"
              onClick={() => {
                setConfirmedOrder(null);
                setScreen('profile');
              }}
              className="flex-1 h-12 bg-black text-white font-inter text-xs uppercase tracking-widest font-bold hover:bg-[#222]"
            >
              Track in Profile
            </button>
            <button
              type="button"
              onClick={() => {
                setConfirmedOrder(null);
                setScreen('catalog');
              }}
              className="flex-1 h-12 bg-white text-black border border-black font-inter text-xs uppercase tracking-widest font-bold hover:bg-[#f2ede6]"
            >
              Back to Catalog
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full px-4 pt-4 pb-24 max-w-4xl mx-auto">
      {/* Title */}
      <div className="border-b border-[#1d1b17]/10 pb-4 mb-4 flex items-end justify-between">
        <div>
          <span className="font-inter text-[10px] text-[#605e5a] uppercase tracking-widest font-semibold block">
            Review Bag
          </span>
          <h1 className="font-syne text-2xl sm:text-3xl uppercase tracking-tight text-[#1d1b17] font-bold mt-1">
            Shopping Bag
          </h1>
        </div>
        <span className="font-inter text-xs uppercase tracking-wider text-[#605e5a] font-semibold">
          {cartItems.length} {cartItems.length === 1 ? 'Specimen' : 'Specimens'}
        </span>
      </div>

      {cartItems.length === 0 ? (
        <div className="py-24 flex flex-col items-center justify-center text-center max-w-sm mx-auto">
          <div className="w-16 h-16 rounded-full bg-[#f2ede6] flex items-center justify-center mb-4 text-[#605e5a]">
            <span className="material-symbols-outlined text-3xl">shopping_bag</span>
          </div>
          <h3 className="font-syne text-xl uppercase font-bold text-[#1d1b17]">
            Your Bag is Empty
          </h3>
          <p className="font-inter text-xs text-[#605e5a] mt-2 leading-relaxed">
            Explore our latest autumn/winter drops and heavy cotton essentials crafted in Mumbai.
          </p>
          <button
            type="button"
            onClick={() => setScreen('catalog')}
            className="mt-6 px-8 h-12 bg-black text-white font-inter text-xs uppercase tracking-widest font-bold hover:bg-[#222] transition-colors"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Left Column: Items & Free Shipping Progress */}
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            {/* Free Shipping Alert & Meter */}
            <div className="bg-[#f8f3ec] p-3.5 border border-[#1d1b17]/10">
              <div className="flex items-center justify-between text-xs font-inter mb-2">
                <span className="flex items-center gap-1.5 font-semibold text-[#1d1b17]">
                  <span className="material-symbols-outlined text-[18px] text-[#605e5a]">local_shipping</span>
                  {eligibleForFreeShipping ? (
                    <span className="text-[#000000] font-bold">
                      Unlocked: Complimentary Express Shipping
                    </span>
                  ) : (
                    <span>
                      Add <strong className="text-black">₹{amountNeededForFreeShipping}</strong> more for Free Shipping
                    </span>
                  )}
                </span>
                <span className="text-[10px] uppercase font-bold text-[#605e5a]">₹1,999 Min</span>
              </div>
              <div className="w-full bg-[#ded9d2] h-1.5 overflow-hidden">
                <div
                  className="bg-[#000000] h-full transition-all duration-500"
                  style={{
                    width: `${Math.min(100, ((cartSubtotal - discountAmount) / 1999) * 100)}%`,
                  }}
                />
              </div>
            </div>

            {/* Cart Items List */}
            <div className="divide-y divide-[#1d1b17]/10 bg-white border border-[#1d1b17]/10">
              {cartItems.map((item) => (
                <div key={item.id} className="p-4 flex gap-4 items-start sm:items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-24 sm:w-24 sm:h-28 object-cover bg-[#f2ede6] shrink-0"
                  />

                  <div className="flex-1 flex flex-col justify-between h-full gap-2">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <h4 className="font-syne text-sm font-bold uppercase tracking-tight text-[#1d1b17]">
                          {item.name}
                        </h4>
                        <div className="flex items-center gap-3 mt-1 font-inter text-xs text-[#605e5a]">
                          <span>Color: {item.color}</span>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <span>Size:</span>
                            <select
                              value={item.size}
                              onChange={(e) => updateCartSize(item.id, e.target.value)}
                              className="bg-transparent border border-gray-300 font-bold px-1 text-black text-xs"
                            >
                              <option value="S">S</option>
                              <option value="M">M</option>
                              <option value="L">L</option>
                              <option value="XL">XL</option>
                              <option value="XXL">XXL</option>
                              <option value="30">30</option>
                              <option value="32">32</option>
                              <option value="34">34</option>
                              <option value="36">36</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromBag(item.id)}
                        className="text-[#747878] hover:text-[#ba1a1a] p-1"
                        title="Remove item"
                      >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </div>

                    <div className="flex justify-between items-center mt-2">
                      {/* Quantity stepper */}
                      <div className="flex items-center border border-[#1d1b17]/20 bg-white">
                        <button
                          type="button"
                          onClick={() => updateCartQuantity(item.id, -1)}
                          className="w-8 h-7 flex items-center justify-center text-xs text-black hover:bg-neutral-100 font-bold"
                        >
                          -
                        </button>
                        <span className="w-8 text-center text-xs font-semibold font-inter">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateCartQuantity(item.id, 1)}
                          className="w-8 h-7 flex items-center justify-center text-xs text-black hover:bg-neutral-100 font-bold"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-inter text-sm font-bold text-[#1d1b17]">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Checkout / Order Summary */}
          <div className="w-full lg:w-[360px] flex flex-col gap-4 shrink-0">
            {/* Promo Code Box */}
            <div className="bg-white p-4 border border-[#1d1b17]/10">
              <span className="font-inter text-[10px] uppercase tracking-widest text-[#605e5a] font-bold block mb-2">
                Promotional Voucher
              </span>

              {promoCode ? (
                <div className="flex items-center justify-between bg-[#f8f3ec] px-3 py-2 border border-[#d3623a]/30">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-[#d3623a]">
                      local_offer
                    </span>
                    <span className="font-inter text-xs font-bold text-black uppercase">
                      {promoCode} (-10%)
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={removePromoCode}
                    className="text-xs text-[#605e5a] hover:text-black underline font-inter"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={inputCoupon}
                    onChange={(e) => setInputCoupon(e.target.value)}
                    placeholder="ENTER CODE (TRY: VYBE10)"
                    className="flex-1 bg-[#f8f3ec] px-3 py-2 text-xs font-inter uppercase tracking-wider border border-[#1d1b17]/10 focus:outline-none focus:border-black"
                  />
                  <button
                    type="submit"
                    className="px-4 bg-black text-white font-inter text-[10px] uppercase font-bold tracking-wider hover:bg-[#222]"
                  >
                    Apply
                  </button>
                </form>
              )}
            </div>

            {/* Bill Breakdown */}
            <div className="bg-white p-5 border border-[#1d1b17]/10 flex flex-col gap-3">
              <h3 className="font-syne text-sm uppercase tracking-tight text-[#1d1b17] font-bold border-b border-[#1d1b17]/10 pb-2">
                Order Summary
              </h3>

              <div className="flex justify-between text-xs font-inter text-[#444748]">
                <span>Bag Subtotal</span>
                <span className="text-black font-semibold">
                  ₹{cartSubtotal.toLocaleString('en-IN')}
                </span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-xs font-inter text-[#d3623a]">
                  <span>VIP Syndicate Discount (10%)</span>
                  <span className="font-semibold">-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="flex justify-between text-xs font-inter text-[#444748]">
                <span>Express Shipping</span>
                <span className="text-black font-semibold">
                  {shippingFee === 0 ? (
                    <span className="text-green-700 font-bold uppercase text-[11px]">Free</span>
                  ) : (
                    `₹${shippingFee}`
                  )}
                </span>
              </div>

              <div className="border-t border-[#1d1b17]/10 pt-3 flex justify-between items-baseline">
                <span className="font-syne text-base font-bold uppercase text-black">
                  Estimated Total
                </span>
                <span className="font-inter text-lg font-bold text-black">
                  ₹{grandTotal.toLocaleString('en-IN')}
                </span>
              </div>

              {!isCheckingOut ? (
                <button
                  type="button"
                  onClick={() => setIsCheckingOut(true)}
                  className="w-full mt-2 h-12 bg-black text-white font-inter text-xs uppercase tracking-widest font-bold hover:bg-[#222] transition-colors flex items-center justify-center gap-2"
                >
                  Proceed to Checkout
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              ) : null}
            </div>

            {/* Checkout Expansion */}
            {isCheckingOut && (
              <form
                onSubmit={handleCompleteOrder}
                className="bg-white p-5 border border-[#1d1b17]/10 flex flex-col gap-4 animate-fade-in"
              >
                <div className="flex items-center justify-between border-b border-[#1d1b17]/10 pb-2">
                  <h4 className="font-syne text-xs uppercase font-bold text-black">
                    Delivery & Payment Protocol
                  </h4>
                  <button
                    type="button"
                    onClick={() => setIsCheckingOut(false)}
                    className="text-xs text-[#747878] hover:text-black font-inter underline"
                  >
                    Edit Bag
                  </button>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-inter text-[10px] uppercase font-semibold text-[#605e5a]">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={address.fullName}
                    onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                    className="bg-[#f8f3ec] px-3 py-2 text-xs font-inter border border-[#1d1b17]/10 focus:outline-none focus:border-black"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-inter text-[10px] uppercase font-semibold text-[#605e5a]">
                    Street Address & Suite
                  </label>
                  <input
                    type="text"
                    required
                    value={address.street}
                    onChange={(e) => setAddress({ ...address, street: e.target.value })}
                    className="bg-[#f8f3ec] px-3 py-2 text-xs font-inter border border-[#1d1b17]/10 focus:outline-none focus:border-black"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col gap-1">
                    <label className="font-inter text-[10px] uppercase font-semibold text-[#605e5a]">
                      City
                    </label>
                    <input
                      type="text"
                      required
                      value={address.city}
                      onChange={(e) => setAddress({ ...address, city: e.target.value })}
                      className="bg-[#f8f3ec] px-3 py-2 text-xs font-inter border border-[#1d1b17]/10 focus:outline-none focus:border-black"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-inter text-[10px] uppercase font-semibold text-[#605e5a]">
                      PIN Code
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={address.pinCode}
                      onChange={(e) => setAddress({ ...address, pinCode: e.target.value })}
                      className="bg-[#f8f3ec] px-3 py-2 text-xs font-inter border border-[#1d1b17]/10 focus:outline-none focus:border-black"
                    />
                  </div>
                </div>

                {/* Payment Option */}
                <div className="flex flex-col gap-2 pt-2 border-t border-[#1d1b17]/10">
                  <label className="font-inter text-[10px] uppercase font-bold text-[#1d1b17]">
                    Payment Gateway
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('upi')}
                      className={`p-2.5 text-center border font-inter text-[10px] uppercase font-semibold flex flex-col items-center justify-center gap-1 ${
                        paymentMethod === 'upi'
                          ? 'border-black bg-black text-white'
                          : 'border-neutral-200 bg-white text-black'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[16px]">qr_code_2</span>
                      UPI (GPay/PhonePe)
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-2.5 text-center border font-inter text-[10px] uppercase font-semibold flex flex-col items-center justify-center gap-1 ${
                        paymentMethod === 'card'
                          ? 'border-black bg-black text-white'
                          : 'border-neutral-200 bg-white text-black'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[16px]">credit_card</span>
                      Card / Netbanking
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cod')}
                      className={`p-2.5 text-center border font-inter text-[10px] uppercase font-semibold flex flex-col items-center justify-center gap-1 ${
                        paymentMethod === 'cod'
                          ? 'border-black bg-black text-white'
                          : 'border-neutral-200 bg-white text-black'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[16px]">payments</span>
                      Cash On Delivery
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 h-12 bg-black text-white font-inter text-xs uppercase tracking-widest font-bold hover:bg-[#222] transition-colors"
                >
                  Authorize Order (₹{grandTotal.toLocaleString('en-IN')})
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
