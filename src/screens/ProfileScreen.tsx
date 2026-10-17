import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const ProfileScreen: React.FC = () => {
  const { orders, setScreen, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'addresses' | 'concierge'>('orders');

  return (
    <div className="flex flex-col w-full px-4 pt-4 pb-24 max-w-4xl mx-auto">
      {/* Profile Header Hero Card */}
      <div className="bg-[#f2ede6] p-6 border border-[#1d1b17]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjG-o22nrCNyjLHhy92-uWQyGmaGlPuWeE2y_v3vDB1TwOqF3kNefUh3mFFor1jzYh-mNaVcJUnmz-S6yyoz0vzrJgqoMqBDH1JWVgq_SM7gIMpHVmMMtpASevKIbfHEOJLnJtVBjQqcuLIYMrHnxvG20RplZGRBJUavlwh6Pd4BSTC5EWn1ptGkc0Oie_vzl62l1HQVXZGdYn_kC3L0Qz4RK-v6D_14kiO7qtshQcmj4TfcqXVddv7Q"
            alt="Abhishek S."
            className="w-16 h-16 rounded-full object-cover ring-2 ring-black"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-syne text-xl font-bold uppercase tracking-tight text-black">
                Abhishek Shukla
              </span>
              <span className="px-2 py-0.5 bg-[#d3623a] text-white font-inter text-[9px] uppercase tracking-wider font-bold">
                VIP SYNDICATE
              </span>
            </div>
            <p className="font-inter text-xs text-[#605e5a] mt-0.5">
              Member ID: <span className="font-mono text-black font-semibold">VYBE-MUM-9842</span> • Mumbai Atelier
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-white px-3 py-2 border border-[#1d1b17]/10 text-center">
            <span className="font-syne text-sm font-bold text-black block">10% OFF</span>
            <span className="font-inter text-[9px] text-[#605e5a] uppercase tracking-wider">
              Code: VYBE10
            </span>
          </div>
          <button
            type="button"
            onClick={() => showToast('Syndicate VIP Pass Active')}
            className="h-10 px-4 bg-black text-white font-inter text-xs uppercase tracking-wider font-bold hover:bg-[#222]"
          >
            VIP Perks
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#1d1b17]/10 gap-2 overflow-x-auto no-scrollbar pb-1 mb-6">
        <button
          type="button"
          onClick={() => setActiveTab('orders')}
          className={`font-inter text-xs uppercase tracking-wider px-4 py-2 border-b-2 font-semibold transition-all whitespace-nowrap ${
            activeTab === 'orders'
              ? 'border-black text-black'
              : 'border-transparent text-[#605e5a] hover:text-black'
          }`}
        >
          Dispatches & Orders ({orders.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('profile')}
          className={`font-inter text-xs uppercase tracking-wider px-4 py-2 border-b-2 font-semibold transition-all whitespace-nowrap ${
            activeTab === 'profile'
              ? 'border-black text-black'
              : 'border-transparent text-[#605e5a] hover:text-black'
          }`}
        >
          Measurements & Fit Profile
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('addresses')}
          className={`font-inter text-xs uppercase tracking-wider px-4 py-2 border-b-2 font-semibold transition-all whitespace-nowrap ${
            activeTab === 'addresses'
              ? 'border-black text-black'
              : 'border-transparent text-[#605e5a] hover:text-black'
          }`}
        >
          Saved Havens (Addresses)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('concierge')}
          className={`font-inter text-xs uppercase tracking-wider px-4 py-2 border-b-2 font-semibold transition-all whitespace-nowrap ${
            activeTab === 'concierge'
              ? 'border-black text-black'
              : 'border-transparent text-[#605e5a] hover:text-black'
          }`}
        >
          Client Concierge
        </button>
      </div>

      {/* Tab 1: Orders */}
      {activeTab === 'orders' && (
        <div className="flex flex-col gap-4">
          {orders.length === 0 ? (
            <div className="py-16 text-center bg-white border border-[#1d1b17]/10 p-6">
              <p className="font-syne text-base uppercase font-bold text-black">
                No Capsule Dispatches Yet
              </p>
              <button
                type="button"
                onClick={() => setScreen('catalog')}
                className="mt-4 px-6 h-10 bg-black text-white font-inter text-xs uppercase tracking-wider font-bold"
              >
                Browse Archive
              </button>
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className="bg-white border border-[#1d1b17]/10 p-5 flex flex-col gap-4 shadow-sm"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#1d1b17]/10 pb-3">
                  <div>
                    <span className="font-inter text-[10px] text-[#605e5a] uppercase tracking-widest font-semibold block">
                      Order Reference
                    </span>
                    <span className="font-syne text-base font-bold text-black">{order.id}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 bg-[#f2ede6] text-black font-inter text-[10px] uppercase tracking-wider font-bold">
                      {order.status}
                    </span>
                    <span className="font-inter text-xs text-[#605e5a]">{order.date}</span>
                  </div>
                </div>

                {/* Tracking sequence timeline */}
                <div className="bg-[#f8f3ec] p-3 border border-[#1d1b17]/10 flex flex-col gap-2">
                  <div className="flex items-center justify-between text-xs font-inter">
                    <span className="text-[#605e5a]">Carrier Tracking ID:</span>
                    <span className="font-mono font-bold text-black">{order.trackingNumber}</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center pt-2">
                    <div className="flex flex-col items-center">
                      <div className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center text-[10px] mb-1">
                        ✓
                      </div>
                      <span className="font-inter text-[10px] uppercase font-bold text-black">
                        Confirmed
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center text-[10px] mb-1">
                        ✓
                      </div>
                      <span className="font-inter text-[10px] uppercase font-bold text-black">
                        In Atelier
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-5 h-5 rounded-full bg-[#d3623a] text-white flex items-center justify-center text-[10px] mb-1 animate-pulse">
                        ●
                      </div>
                      <span className="font-inter text-[10px] uppercase font-bold text-[#d3623a]">
                        BlueDart Air
                      </span>
                    </div>
                  </div>
                </div>

                {/* Items in order */}
                <div className="flex flex-col gap-2">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between gap-3 py-1">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-14 object-cover bg-[#f2ede6]"
                        />
                        <div>
                          <span className="font-syne text-xs uppercase font-bold text-black block">
                            {item.name}
                          </span>
                          <span className="font-inter text-[11px] text-[#605e5a]">
                            Size: {item.size} • Color: {item.color} • Qty: {item.quantity}
                          </span>
                        </div>
                      </div>
                      <span className="font-inter text-xs font-bold text-black">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between border-t border-[#1d1b17]/10 pt-3 text-xs font-inter">
                  <span className="text-[#605e5a]">
                    Paid via <strong className="text-black">{order.paymentMethod}</strong> to {order.shippingAddress.city}
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-[#605e5a]">Total:</span>
                    <span className="font-bold text-black text-sm">
                      ₹{order.total.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 2: Fit Profile */}
      {activeTab === 'profile' && (
        <div className="bg-white border border-[#1d1b17]/10 p-6 flex flex-col gap-5">
          <h3 className="font-syne text-sm uppercase tracking-tight text-black font-bold">
            Atelier Silhouette Calibration
          </h3>
          <p className="font-inter text-xs text-[#605e5a]">
            Our proprietary sizing engine adapts our oversized architectural cuts to your build.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-inter">
            <div className="bg-[#f8f3ec] p-3 border border-[#1d1b17]/10">
              <span className="text-[#605e5a] text-[10px] uppercase block">Height</span>
              <span className="font-bold text-black text-sm">6'1" (185 cm)</span>
            </div>
            <div className="bg-[#f8f3ec] p-3 border border-[#1d1b17]/10">
              <span className="text-[#605e5a] text-[10px] uppercase block">Chest</span>
              <span className="font-bold text-black text-sm">40.5 in</span>
            </div>
            <div className="bg-[#f8f3ec] p-3 border border-[#1d1b17]/10">
              <span className="text-[#605e5a] text-[10px] uppercase block">Waist</span>
              <span className="font-bold text-black text-sm">32 in</span>
            </div>
            <div className="bg-[#f8f3ec] p-3 border border-[#1d1b17]/10">
              <span className="text-[#605e5a] text-[10px] uppercase block">Ideal Tops Fit</span>
              <span className="font-bold text-black text-sm">Large (Boxy)</span>
            </div>
          </div>

          <div className="p-4 bg-[#ece7e0] border-l-2 border-black flex flex-col gap-1">
            <span className="font-inter text-[10px] uppercase font-bold text-black tracking-wider">
              Stylist Note:
            </span>
            <p className="font-inter text-xs text-[#1d1b17]">
              VYBE garments are cut with intentional drop-shoulder drape and broad chest widths. If you
              prefer a traditional slim tailored fit, consider sizing down one level.
            </p>
          </div>
        </div>
      )}

      {/* Tab 3: Saved Addresses */}
      {activeTab === 'addresses' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white p-5 border-2 border-black flex flex-col justify-between gap-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="px-2 py-0.5 bg-black text-white font-inter text-[9px] uppercase font-bold">
                  DEFAULT HAVEN
                </span>
                <span className="font-inter text-xs text-[#605e5a]">Mumbai Studio</span>
              </div>
              <h4 className="font-syne text-sm font-bold uppercase text-black mt-1">
                Abhishek Shukla
              </h4>
              <p className="font-inter text-xs text-[#444748] mt-1 leading-relaxed">
                402, Signature Towers, Lower Parel
                <br />
                Mumbai, Maharashtra — 400013
                <br />
                +91 98201 44820
              </p>
            </div>
            <button
              type="button"
              onClick={() => showToast('Address set as primary')}
              className="text-xs font-inter text-black font-bold uppercase tracking-wider underline text-left"
            >
              Edit Coordinates
            </button>
          </div>

          <div className="bg-white p-5 border border-[#1d1b17]/15 flex flex-col justify-between gap-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="px-2 py-0.5 bg-[#ece7e0] text-[#1d1b17] font-inter text-[9px] uppercase font-bold">
                  RESIDENCE
                </span>
                <span className="font-inter text-xs text-[#605e5a]">Bengaluru</span>
              </div>
              <h4 className="font-syne text-sm font-bold uppercase text-black mt-1">
                Abhishek Shukla
              </h4>
              <p className="font-inter text-xs text-[#444748] mt-1 leading-relaxed">
                18, Indiranagar 100ft Road, HAL 2nd Stage
                <br />
                Bengaluru, Karnataka — 560038
                <br />
                +91 98201 44820
              </p>
            </div>
            <button
              type="button"
              onClick={() => showToast('Address updated')}
              className="text-xs font-inter text-black font-bold uppercase tracking-wider underline text-left"
            >
              Select As Default
            </button>
          </div>
        </div>
      )}

      {/* Tab 4: Client Concierge */}
      {activeTab === 'concierge' && (
        <div className="bg-white border border-[#1d1b17]/10 p-6 flex flex-col gap-4">
          <h3 className="font-syne text-sm uppercase tracking-tight text-black font-bold">
            Direct Concierge Desk
          </h3>
          <p className="font-inter text-xs text-[#605e5a]">
            Connect with our garment specialists in Mumbai for exchange requests, bespoke fittings,
            or express delivery adjustments.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-4 bg-[#f8f3ec] border border-[#1d1b17]/10 flex flex-col gap-2">
              <span className="font-syne text-xs uppercase font-bold text-black flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px]">chat</span>
                WhatsApp Atelier Desk
              </span>
              <p className="font-inter text-[11px] text-[#605e5a]">
                Live stylist response within 15 minutes (10:00 AM — 8:00 PM IST).
              </p>
              <button
                type="button"
                onClick={() => showToast('Connecting to Mumbai Concierge WhatsApp...')}
                className="mt-1 h-9 bg-black text-white font-inter text-[10px] uppercase font-bold tracking-wider hover:bg-[#222]"
              >
                Initiate Chat (+91 98200 VYBE)
              </button>
            </div>

            <div className="p-4 bg-[#f8f3ec] border border-[#1d1b17]/10 flex flex-col gap-2">
              <span className="font-syne text-xs uppercase font-bold text-black flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px]">sync_alt</span>
                7-Day Doorstep Exchange
              </span>
              <p className="font-inter text-[11px] text-[#605e5a]">
                Reverse pickup arranged within 24 hours across 18,000+ PIN codes.
              </p>
              <button
                type="button"
                onClick={() => showToast('Exchange request portal opened')}
                className="mt-1 h-9 bg-white text-black border border-black font-inter text-[10px] uppercase font-bold tracking-wider hover:bg-[#ece7e0]"
              >
                Request Exchange / Size Swap
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
