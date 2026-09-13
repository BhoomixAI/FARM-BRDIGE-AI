import React, { useState } from 'react';
import { 
  Sparkles, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Plus, 
  Minus, 
  ShoppingBasket, 
  ChevronDown, 
  ArrowUpRight 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

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
    price: 50,
    unit: '/kg',
    minOrder: 'Min. 1 kg',
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
    pluckTime: 'Yesterday, 5:00 PM',
    standard: '100% Organic',
    price: 45,
    unit: '/kg',
    minOrder: 'Min. 1 kg',
    initialQty: 1,
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
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&auto=format&fit=crop&q=80',
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
  const { t } = useLanguage();

  const [quantities, setQuantities] = useState(
    productsData.reduce((acc, p) => ({ ...acc, [p.id]: p.initialQty }), {})
  );

  const handleIncrement = (id) => {
    setQuantities((prev) => ({ ...prev, [id]: (prev[id] || 1) + 1 }));
  };

  const handleDecrement = (id) => {
    setQuantities((prev) => ({ ...prev, [id]: Math.max(1, (prev[id] || 1) - 1) }));
  };

  return (
    <div className="space-y-4">
      {/* Sub-bar: Count, Telemetry tag, and Sorting */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-gray-500 pb-1">
        <div className="flex items-center gap-2">
          <span className="font-bold text-gray-900">{t('lotsFound')}</span>
          <span className="text-gray-300">|</span>
          <span className="text-emerald-700 font-medium">{t('dispatchedNote')}</span>
        </div>

        <div className="flex items-center gap-1.5 cursor-pointer hover:text-gray-900">
          <span>{t('sortBy')}</span>
          <span className="font-semibold text-gray-800 flex items-center gap-0.5">
            {t('harvestFreshness')}
            <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
          </span>
        </div>
      </div>

      {/* Grid of Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {productsData.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-3xl border border-gray-100/90 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden group"
          >
            {/* Image & Floating Badges */}
            <div className="relative aspect-4/3 overflow-hidden bg-gray-50">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 z-10">
                {product.badges.map((badge, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/95 text-emerald-900 backdrop-blur-xs shadow-2xs"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            {/* Produce Information */}
            <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-[11px] text-gray-500 font-medium">
                  <MapPin className="w-3 h-3 text-emerald-700 shrink-0" />
                  <span>{product.farm}</span>
                  <span>•</span>
                  <span>{product.distance}</span>
                </div>

                <h3 className="font-serif font-bold text-gray-900 text-sm sm:text-base mt-1 group-hover:text-emerald-900 transition-colors">
                  {product.name}
                </h3>

                {/* Harvesting details box */}
                <div className="mt-2.5 p-2 rounded-xl bg-gray-50/80 border border-gray-100/80 space-y-1 text-[11px]">
                  <div className="flex items-center justify-between text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-emerald-600" />
                      {t('freshPluck')}
                    </span>
                    <span className="font-medium text-gray-800">{product.pluckTime}</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-500">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      {t('standards')}
                    </span>
                    <span className="font-medium text-gray-800">{product.standard}</span>
                  </div>
                </div>
              </div>

              {/* Price and Cart Controls */}
              <div className="pt-2 border-t border-gray-50 space-y-3">
                <div className="flex items-baseline justify-between">
                  <div className="flex items-baseline gap-0.5">
                    <span className="text-base sm:text-lg font-bold text-gray-900">₹{product.price}</span>
                    <span className="text-xs text-gray-400 font-normal">{product.unit}</span>
                  </div>
                  <span className="text-[10px] text-gray-400 font-medium">{product.minOrder}</span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-gray-200 rounded-xl bg-white px-2 py-1.5 shadow-2xs">
                    <button
                      onClick={() => handleDecrement(product.id)}
                      className="text-gray-400 hover:text-gray-800 p-0.5 cursor-pointer"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-bold text-gray-800 px-2 min-w-5 text-center">
                      {quantities[product.id]}
                    </span>
                    <button
                      onClick={() => handleIncrement(product.id)}
                      className="text-gray-400 hover:text-gray-800 p-0.5 cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Add to Basket CTA */}
                  <button className="flex-1 bg-[#144230] hover:bg-[#0c2b1f] text-white py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-2xs active:scale-98 cursor-pointer">
                    <ShoppingBasket className="w-3.5 h-3.5" />
                    <span>{t('addToBasket')}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Kisan Sell Directly CTA Card */}
        <div className="bg-[#144230] text-white rounded-3xl p-6 flex flex-col justify-between shadow-sm relative overflow-hidden">
          <div className="space-y-3 relative z-10">
            <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-emerald-300 bg-[#1e5841] px-2.5 py-1 rounded-md">
              {t('kisanDirectMandi')}
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold leading-snug">
              {t('sellDirectlyTitle')}
            </h3>
            <p className="text-xs text-emerald-100/75 leading-relaxed font-light">
              {t('sellDirectlyDesc')}
            </p>
          </div>

          <div className="space-y-4 pt-4 border-t border-white/10 relative z-10">
            <div className="text-[11px] space-y-1 text-emerald-200/80">
              <div className="flex justify-between">
                <span>{t('coldChainUptime')}</span>
                <span className="font-bold text-white">99.98%</span>
              </div>
              <div className="flex justify-between">
                <span>{t('avgFieldToCooler')}</span>
                <span className="font-bold text-white">48 minutes</span>
              </div>
            </div>

            <button className="w-full py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-emerald-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm cursor-pointer">
              <span>{t('registerSellerBtn')}</span>
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}