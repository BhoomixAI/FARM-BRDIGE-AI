import React, { useState } from 'react';
import { 
  ChevronDown, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Plus, 
  Minus, 
  ShoppingBasket, 
  ArrowUpRight 
} from 'lucide-react';

const productsData = [
  {
    id: 1,
    name: 'Desi Farm Fresh Tomatoes',
    farm: 'Kisan Organic Farms',
    distance: '12 km away',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80',
    badges: ['Zero Pesticides', '100% Organic'],
    pluckTime: 'Today, 6:00 AM',
    standard: '100% Organic',
    price: 40,
    unit: '/kg',
    minOrder: 'Min. 2 kg',
    initialQty: 2,
  },
  {
  id: 2,
  name: 'Fresh Hydroponic Lettuce',
  farm: 'City Green Farms',
  distance: '18 km away',
  image: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=600&auto=format&fit=crop&q=80',
  badges: ['Zero Pesticide', '2.8°C Telemetry'],
  pluckTime: 'Today, 5:30 AM',
  standard: 'Zero Pesticides',
  price: 60,
  unit: '/pack',
  minOrder: 'Min. 1 pack',
  initialQty: 1,
},
  {
    id: 3,
    name: 'Organic Beetroot (Chukandar)',
    farm: 'Desi Mitti Farms',
    distance: '10 km away',
    image: 'https://images.unsplash.com/photo-1593105544559-ecb03bf76f82?w=600&auto=format&fit=crop&q=80',
    badges: ['Zero Pesticides', '100% Organic'],
    pluckTime: 'Today, 7:15 AM',
    standard: '100% Organic',
    price: 50,
    unit: '/kg',
    minOrder: 'Min. 1 kg',
    initialQty: 2,
  },
  {
    id: 4,
    name: 'Shimla Royal Apples',
    farm: 'Himachal Orchards',
    distance: 'Direct Fresh',
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=600&auto=format&fit=crop&q=80',
    badges: ['Zero Pesticides', 'Grade-A Mandi'],
    pluckTime: 'Yesterday, 4:00 PM',
    standard: 'Natural Farm',
    price: 150,
    unit: '/kg',
    minOrder: 'Min. 2 kg',
    initialQty: 2,
  },
 {
  id: 5,
  name: 'Pure Wild Raw Honey',
  farm: 'Natural Forest Apiary',
  distance: '100% Raw',
  image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600&auto=format&fit=crop&q=80',
  badges: ['Single-Origin', 'Raw Unheated'],
  pluckTime: 'This Week (Batch #048)',
  standard: '100% Pure',
  price: 380,
  unit: '/500g',
  minOrder: 'Min. 1 jar',
  initialQty: 1,
},
];

export default function ProductGrid() {
  const [quantities, setQuantities] = useState(
    productsData.reduce((acc, p) => ({ ...acc, [p.id]: p.initialQty }), {})
  );

  const updateQuantity = (id, delta) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta),
    }));
  };

  return (
    <div className="space-y-4">
      {/* Top Filter & Result Summary Bar */}
      <div className="bg-white border border-gray-100 rounded-2xl px-5 py-3 flex flex-wrap items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-center gap-2.5 text-xs text-gray-500">
          <span className="font-bold text-gray-900 text-sm">34 Lots Found</span>
          <span className="text-gray-300">|</span>
          <span className="text-emerald-700 font-medium">Dispatched within 24 hours of harvest</span>
        </div>

        {/* Sort dropdown */}
        <div className="flex items-center gap-1.5 text-xs text-gray-600">
          <span className="text-gray-400">Sort by:</span>
          <button className="flex items-center gap-1 font-bold text-gray-800 hover:text-emerald-800 transition-colors cursor-pointer">
            <span>Harvest Freshness (Earliest)</span>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {productsData.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              {/* Product Image & Badges */}
              <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5">
                  {item.badges.map((badge, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white/95 text-emerald-800 backdrop-blur-xs shadow-xs"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Details */}
              <div className="p-4 space-y-3">
                {/* Farm Origin */}
                <div className="flex items-center gap-1 text-[11px] text-gray-500">
                  <MapPin className="w-3 h-3 text-emerald-700 shrink-0" />
                  <span className="font-medium text-gray-700">{item.farm}</span>
                  <span>•</span>
                  <span>{item.distance}</span>
                </div>

                {/* Name */}
                <h4 className="font-serif font-bold text-gray-900 text-sm leading-snug">
                  {item.name}
                </h4>

                {/* Metadata details box */}
                <div className="bg-[#f8fafc] rounded-xl p-2.5 space-y-1.5 text-[11px] text-gray-600 border border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-gray-500">
                      <Clock className="w-3 h-3 text-emerald-700" />
                      Fresh Pluck:
                    </span>
                    <span className="font-semibold text-gray-800">{item.pluckTime}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-gray-500">
                      <ShieldCheck className="w-3 h-3 text-emerald-700" />
                      Standards:
                    </span>
                    <span className="font-semibold text-gray-800">{item.standard}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions: Price, Stepper, Add to Basket */}
            <div className="p-4 pt-0 space-y-3">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="font-bold text-gray-900 text-lg">₹{item.price}</span>
                  <span className="text-xs text-gray-500">{item.unit}</span>
                </div>
                <span className="text-[10px] text-gray-400 font-medium">{item.minOrder}</span>
              </div>

              <div className="flex items-center gap-2">
                {/* Counter Stepper */}
                <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50/50 px-1 py-1">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-white rounded transition-colors cursor-pointer"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-6 text-center text-xs font-bold text-gray-800">
                    {quantities[item.id] || 1}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-white rounded transition-colors cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>

                {/* Add to Basket CTA */}
                <button className="flex-1 bg-[#144230] hover:bg-[#0b281d] text-white text-xs font-semibold py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-colors shadow-2xs cursor-pointer active:scale-98">
                  <ShoppingBasket className="w-3.5 h-3.5" />
                  <span>Add to Basket</span>
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* 6th Tile: Promotional Kisan Mandi Partner Card */}
        <div className="bg-[#144230] text-white rounded-2xl p-5 flex flex-col justify-between shadow-xs border border-emerald-950">
          <div className="space-y-4">
            <span className="inline-block px-2.5 py-1 rounded-full bg-[#1b533e] border border-emerald-600/30 text-emerald-300 text-[10px] font-semibold tracking-wide">
              Kisan Direct Mandi
            </span>

            <h3 className="font-serif text-xl font-bold leading-snug">
              Sell Directly on Our Mandi
            </h3>

            <p className="text-emerald-100/80 text-xs font-light leading-relaxed">
              Are you a local farmer or bulk buyer? Connect directly with verified local growers, cut middleman costs, and get guaranteed fair prices.
            </p>

            <div className="space-y-2 pt-2 text-[11px] border-t border-emerald-800/60">
              <div className="flex justify-between text-emerald-200">
                <span>Cold-chain uptime:</span>
                <span className="font-bold text-white">99.98%</span>
              </div>
              <div className="flex justify-between text-emerald-200">
                <span>Average field-to-cooler:</span>
                <span className="font-bold text-white">48 minutes</span>
              </div>
            </div>
          </div>

          <button className="w-full mt-5 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 text-xs font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-sm cursor-pointer">
            <span>Register as a Farmer / Seller</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}