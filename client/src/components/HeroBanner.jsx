import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Search, 
  Navigation, 
  Sprout, 
  Clock, 
  ChevronDown, 
  SlidersHorizontal 
} from 'lucide-react';

export default function HeroBanner() {
  const [distance, setDistance] = useState(25);
  const [farmingType, setFarmingType] = useState('Jaivik / 100% Organic');
  const [deliverySlot, setDeliverySlot] = useState('Morning Delivery (6 AM - 9 AM)');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <section className="relative bg-[#144230] text-white pt-10 pb-16 px-4 md:px-8 overflow-hidden">
      {/* Subtle dotted background overlay */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none" 
        style={{
          backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      />

      <div className="relative max-w-7xl mx-auto flex flex-col items-start gap-4">
        
        {/* Top Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1b533e] border border-emerald-500/30 text-emerald-200 text-xs font-medium tracking-wide shadow-sm">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>100% Farm Fresh • Direct from Kisans</span>
        </div>

        {/* Main Headline */}
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white max-w-3xl leading-[1.15]">
          Khet Se Ghar Tak – Fresh Produce Direct from Local Farmers
        </h1>

        {/* Subtext */}
        <p className="text-emerald-100/80 text-xs sm:text-sm max-w-2xl font-light leading-relaxed mb-4">
          Order fresh seasonal harvest plucked at sunrise. Directly supporting local farmers with guaranteed mandi-fresh quality delivered within 24 hours.
        </p>

        {/* Floating Search & Filter Dock */}
        <div className="w-full bg-white text-gray-800 rounded-2xl p-2.5 sm:p-3.5 shadow-xl border border-emerald-900/10 grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          
          {/* Segment 1: Search Field */}
          <div className="md:col-span-4 px-3 py-1 flex flex-col justify-center border-b md:border-b-0 md:border-r border-gray-100">
            <label className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
              <Search className="w-3 h-3 text-emerald-700" />
              Search Vegetables & Fruits
            </label>
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="e.g., Fresh Palak, Aloo, Mangoes"
              className="w-full text-xs font-medium text-gray-800 placeholder-gray-400 bg-transparent focus:outline-none pt-1"
            />
          </div>

          {/* Segment 2: Distance Range Slider */}
          <div className="md:col-span-3 px-3 py-1 flex flex-col justify-center border-b md:border-b-0 md:border-r border-gray-100">
            <div className="flex items-center justify-between text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
              <span className="flex items-center gap-1.5">
                <Navigation className="w-3 h-3 text-emerald-700" />
                Distance
              </span>
              <span className="text-gray-900 font-bold lowercase">{distance} km</span>
            </div>
            <div className="pt-2 flex items-center">
              <input 
                type="range" 
                min="5" 
                max="100" 
                step="5"
                value={distance} 
                onChange={(e) => setDistance(e.target.value)}
                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#144230]"
              />
            </div>
          </div>

          {/* Segment 3: Farming Type Selector */}
          <div className="md:col-span-2 px-3 py-1 flex flex-col justify-center border-b md:border-b-0 md:border-r border-gray-100">
            <label className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
              <Sprout className="w-3 h-3 text-emerald-700" />
              Farming Type
            </label>
            <div className="relative pt-1">
              <select 
                value={farmingType}
                onChange={(e) => setFarmingType(e.target.value)}
                className="w-full text-xs font-semibold text-gray-800 bg-transparent appearance-none pr-5 focus:outline-none cursor-pointer truncate"
              >
                <option value="Jaivik / 100% Organic">Jaivik / 100% Organic</option>
                <option value="Prakritik Kheti (ZBNF)">Prakritik Kheti (ZBNF)</option>
                <option value="Hydroponic Fresh">Hydroponic Fresh</option>
                <option value="Conventional Mandi">Conventional Mandi</option>
              </select>
              <ChevronDown className="absolute right-0 top-2.5 w-3 h-3 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Segment 4: Delivery Slot */}
          <div className="md:col-span-2 px-3 py-1 flex flex-col justify-center">
            <label className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
              <Clock className="w-3 h-3 text-emerald-700" />
              Delivery Slot
            </label>
            <div className="relative pt-1">
              <select 
                value={deliverySlot}
                onChange={(e) => setDeliverySlot(e.target.value)}
                className="w-full text-xs font-semibold text-gray-800 bg-transparent appearance-none pr-5 focus:outline-none cursor-pointer truncate"
              >
                <option value="Morning Delivery (6 AM - 9 AM)">Morning (6 AM - 9 AM)</option>
                <option value="Evening Delivery (5 PM - 8 PM)">Evening (5 PM - 8 PM)</option>
                <option value="Express 2-Hour Dispatch">Express 2-Hour</option>
              </select>
              <ChevronDown className="absolute right-0 top-2.5 w-3 h-3 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Segment 5: Filter Button CTA */}
          <div className="md:col-span-1 flex justify-end md:justify-center">
            <button 
              title="Apply Filters"
              className="w-full md:w-11 h-11 rounded-xl bg-[#0e3b2e] hover:bg-[#08261e] text-white flex items-center justify-center transition-all shadow-md active:scale-95"
            >
              <SlidersHorizontal className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}