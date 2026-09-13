import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Sprout, 
  AlertCircle, 
  Search, 
  MapPin, 
  Star, 
  CheckCircle2, 
  Weight 
} from 'lucide-react';

const farmerLots = [
  {
    id: 1,
    name: 'Green Valley FPO',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    location: 'Dasna, Ghaziabad (32 km away)',
    rating: 4.9,
    verified: true,
    produce: 'Grade A Tomatoes - Green Valley FPO',
    grade: 'Grade A',
    availableQty: '800 kg available',
    price: 27,
    mandiLocation: 'Dasna, Ghaziabad',
  },
  {
    id: 2,
    name: 'Rameshwar Singh Yadav',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    location: 'Muradnagar, Ghaziabad (18 km away)',
    rating: 4.8,
    verified: true,
    produce: 'Grade A Potatoes - Ghaziabad Lot',
    grade: 'Grade A',
    availableQty: '2000 kg available',
    price: 22,
    mandiLocation: 'Muradnagar, Ghaziabad',
  },
  {
    id: 3,
    name: 'Green Valley FPO',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    location: 'Dasna, Ghaziabad (32 km away)',
    rating: 4.9,
    verified: true,
    produce: 'Fresh Green Peas',
    grade: 'Grade A',
    availableQty: '760 kg available',
    price: 42,
    mandiLocation: 'Dasna, Ghaziabad',
  },
  {
    id: 4,
    name: 'Simran Kaur Dhillon',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    location: 'Samalkha, Panipat (83 km away)',
    rating: 4.8,
    verified: true,
    produce: 'Kinnaur Apple Cartons',
    grade: 'Organic Premium',
    availableQty: '900 kg available',
    price: 78,
    mandiLocation: 'Samalkha, Panipat',
  },
  {
    id: 5,
    name: 'Farida Begum',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    location: 'Pilakhuwa, Hapur (35 km away)',
    rating: 4.7,
    verified: true,
    produce: 'Cavendish Banana Hands',
    grade: 'Grade A',
    availableQty: '1400 kg available',
    price: 32,
    mandiLocation: 'Pilakhuwa, Hapur',
  },
  {
    id: 6,
    name: 'Omprakash Gurjar',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    location: 'Garhmukteshwar, Hapur (68 km away)',
    rating: 4.4,
    verified: true,
    produce: 'Dasheri Mango Late Lot',
    grade: 'Organic Premium',
    availableQty: '680 kg available',
    price: 58,
    mandiLocation: 'Garhmukteshwar, Hapur',
  },
];

export default function MarketplaceView({ onBackToVoice }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLots = farmerLots.filter((lot) =>
    lot.produce.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lot.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 space-y-6">
      
      {/* Top Breadcrumb Link */}
      <button
        onClick={onBackToVoice}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-emerald-800 transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Voice Input</span>
      </button>

      {/* Header with Title & Active Count */}
      <div className="space-y-1">
        <div className="flex items-center gap-2.5">
          <div className="text-emerald-700">
            <Sprout className="w-6 h-6" />
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900">
            Farmers Market
          </h1>
          <span className="px-2.5 py-0.5 rounded-full bg-[#dcfce7] text-emerald-800 text-xs font-bold">
            {filteredLots.length} Available
          </span>
        </div>
        <p className="text-xs sm:text-sm text-gray-500">
          Fresh produce directly from verified farmers — search or use voice to filter.
        </p>
      </div>

      {/* Warning / Active State Info Banner */}
      <div className="bg-[#fffbeb] border border-[#fef3c7] rounded-2xl p-4 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <h4 className="text-xs font-bold text-amber-900">
            No filter applied — showing all produce
          </h4>
          <p className="text-[11px] text-amber-700">
            For best matches, speak on the voice page e.g. "I need 500 kg tomatoes in Ghaziabad".
          </p>
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search produce... e.g. Tomatoes, Potatoes"
          className="w-full bg-white border border-gray-200/90 rounded-2xl pl-11 pr-4 py-3 text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 shadow-2xs"
        />
      </div>

      {/* 2-Column Grid of Farmer Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredLots.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between gap-4"
          >
            {/* Top Row: Avatar, Farmer Name, Location & FPO Badge */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-11 h-11 rounded-full object-cover border border-gray-100 shrink-0"
                />
                <div>
                  <h3 className="font-bold text-sm text-gray-900 leading-tight">
                    {item.name}
                  </h3>
                  <div className="flex items-center gap-1 text-[11px] text-gray-500 mt-1">
                    <MapPin className="w-3 h-3 text-emerald-700 shrink-0" />
                    <span>{item.location}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end gap-1.5 shrink-0">
                {item.verified && (
                  <span className="px-2.5 py-0.5 rounded-full bg-[#f0fdf4] border border-emerald-200 text-emerald-700 text-[10px] font-bold">
                    FPO Verified
                  </span>
                )}
                <div className="flex items-center gap-1 text-xs font-bold text-gray-800">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{item.rating}</span>
                </div>
              </div>
            </div>

            {/* Middle Section: Produce Name, Badges & Price */}
            <div className="bg-[#f9fafb] rounded-xl p-3.5 border border-gray-100 flex items-center justify-between">
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                  Available Produce
                </span>
                <h4 className="font-bold text-xs sm:text-sm text-gray-900">
                  {item.produce}
                </h4>
                <div className="flex items-center gap-1.5 text-[11px]">
                  <span className="px-2 py-0.5 rounded-md bg-white border border-gray-200 font-semibold text-gray-700 text-[10px]">
                    {item.grade}
                  </span>
                  <span className="flex items-center gap-1 text-gray-500 font-medium">
                    <Weight className="w-3 h-3 text-gray-400" />
                    {item.availableQty}
                  </span>
                </div>
              </div>

              {/* Direct Price */}
              <div className="text-right">
                <span className="text-[10px] text-gray-400 font-medium block">Direct Price</span>
                <div className="text-emerald-800 font-extrabold text-base sm:text-lg leading-tight">
                  ₹{item.price}
                  <span className="text-xs text-gray-500 font-normal">/kg</span>
                </div>
                <span className="text-[10px] text-gray-400 block mt-0.5">{item.mandiLocation}</span>
              </div>
            </div>

            {/* Bottom Row: View Details & Connect CTAs */}
            <div className="flex items-center gap-3 pt-1">
              <button className="flex-1 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer text-center">
                View Details
              </button>
              <button className="flex-1 py-2 rounded-xl bg-[#10b981] hover:bg-[#059669] text-white text-xs font-semibold transition-colors shadow-2xs cursor-pointer text-center">
                Connect
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}