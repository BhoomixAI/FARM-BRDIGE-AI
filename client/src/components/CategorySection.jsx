import React, { useState, useRef } from 'react';
import { 
  Salad, 
  Sprout, 
  Tractor, 
  TreePine, 
  Apple, 
  Milk, 
  Wheat, 
  Flame, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';

const categories = [
  {
    id: 'leafy',
    name: 'Green Leafy Veggies',
    subtitle: 'Palak, Methi & Fresh Greens',
    icon: Salad,
  },
  {
    id: 'tomatoes',
    name: 'Tomatoes & Daily Veggies',
    subtitle: 'Desi Tamatar, Bhindi, Mirchi',
    icon: Sprout,
  },
  {
    id: 'roots',
    name: 'Potatoes & Root Veggies',
    subtitle: 'Aloo, Pyaaz, Gajar & Ginger',
    icon: Tractor,
  },
  {
    id: 'fruits',
    name: 'Fresh Farm Fruits',
    subtitle: 'Seasonal apples, bananas & citrus',
    icon: TreePine,
  },
  {
    id: 'exotic',
    name: 'Exotic & Summer Fruits',
    subtitle: 'Mangoes, Melons & Berries',
    icon: Apple,
  },
  {
    id: 'dairy',
    name: 'Desi Dairy & Eggs',
    subtitle: 'Fresh Milk, Paneer, Pure Ghee & Eggs',
    icon: Milk,
  },
  {
    id: 'grains',
    name: 'Organic Grains & Pulses',
    subtitle: 'Atta, Desi Dal, Basmati Rice',
    icon: Wheat,
  },
  {
    id: 'spices',
    name: 'Desi Spices & Herbs',
    subtitle: 'Haldi, Jeera, Dhaniya & Mirch',
    icon: Flame,
  },
];

export default function CategorySection() {
  const [selectedCategory, setSelectedCategory] = useState('tomatoes');
  const scrollContainerRef = useRef(null);

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      // Scrolls by roughly 2 cards width per click
      const scrollOffset = direction === 'left' ? -350 : 350;
      scrollContainerRef.current.scrollBy({
        left: scrollOffset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 pt-8 pb-4">
      {/* Section Header with Navigation Buttons */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#144230] tracking-tight">
            Shop Fresh by Category
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Direct from local farms • Fresh morning harvest
          </p>
        </div>

        {/* Carousel Arrow Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleScroll('left')}
            aria-label="Previous categories"
            className="w-8 h-8 rounded-full border border-gray-200 bg-white text-gray-700 hover:bg-gray-100 hover:border-gray-300 flex items-center justify-center transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => handleScroll('right')}
            aria-label="Next categories"
            className="w-8 h-8 rounded-full border border-gray-200 bg-white text-gray-700 hover:bg-gray-100 hover:border-gray-300 flex items-center justify-center transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Scrolling Card Container */}
      <div 
        ref={scrollContainerRef}
        className="flex items-center gap-4 overflow-x-auto pb-4 pt-1 scroll-smooth select-none"
        style={{ 
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isSelected = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`shrink-0 w-48 h-36 rounded-2xl p-4 flex flex-col items-center justify-center text-center transition-all duration-200 cursor-pointer border ${
                isSelected
                  ? 'bg-[#144230] text-white border-[#144230] shadow-md scale-[1.02]'
                  : 'bg-white text-gray-800 border-gray-100 hover:border-emerald-200 hover:shadow-xs'
              }`}
            >
              {/* Category Icon Badge */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2.5 transition-colors ${
                  isSelected
                    ? 'bg-[#1b533e] text-emerald-300'
                    : 'bg-emerald-50 text-emerald-700'
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>

              {/* Title */}
              <span className={`text-xs font-bold leading-snug line-clamp-1 ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                {cat.name}
              </span>

              {/* Subtitle / Description */}
              <span className={`text-[11px] mt-1 leading-tight line-clamp-2 ${isSelected ? 'text-emerald-100/80' : 'text-gray-400'}`}>
                {cat.subtitle}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}