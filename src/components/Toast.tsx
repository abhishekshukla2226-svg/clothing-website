import React from 'react';
import { useApp } from '../context/AppContext';

export const Toast: React.FC = () => {
  const { toast, setScreen } = useApp();

  return (
    <div
      className={`fixed bottom-20 left-4 right-4 max-w-md mx-auto z-50 transition-all duration-300 transform ${
        toast.visible
          ? 'translate-y-0 opacity-100 pointer-events-auto'
          : 'translate-y-12 opacity-0 pointer-events-none'
      }`}
    >
      <div className="bg-[#000000] text-[#ffffff] px-4 py-3 shadow-2xl flex items-center justify-between border border-white/10">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <span
            className="material-symbols-outlined text-[18px] text-[#d3623a] shrink-0"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            check_circle
          </span>
          <span className="font-inter text-[11px] uppercase tracking-wider font-semibold truncate">
            {toast.message}
          </span>
        </div>
        <button
          type="button"
          onClick={() => setScreen('bag')}
          className="font-inter text-[10px] underline uppercase tracking-widest text-[#ffffff] hover:text-[#d3623a] transition-colors ml-3 shrink-0"
        >
          View Bag
        </button>
      </div>
    </div>
  );
};
