import React, { useState } from 'react';
import { 
  TrendingUp, 
  Wheat, 
  PlusCircle, 
  ShieldCheck, 
  PhoneCall, 
  CheckCircle2, 
  Clock, 
  DollarSign, 
  Layers, 
  Sparkles,
  ArrowUpRight
} from 'lucide-react';

const mspRates = [
  { crop: 'Wheat (Gehun)', currentMsp: 2425, mandiRate: 2510, change: '+3.5%', status: 'Above MSP', season: 'Rabi' },
  { crop: 'Paddy / Rice (Dhan)', currentMsp: 2320, mandiRate: 2360, change: '+1.7%', status: 'Above MSP', season: 'Kharif' },
  { crop: 'Mustard (Sarson)', currentMsp: 5950, mandiRate: 5850, change: '-1.6%', status: 'Near MSP', season: 'Rabi' },
  { crop: 'Gram / Chana', currentMsp: 5650, mandiRate: 5800, change: '+2.6%', status: 'Above MSP', season: 'Rabi' },
  { crop: 'Cotton (Kapas)', currentMsp: 7521, mandiRate: 7710, change: '+2.5%', status: 'Above MSP', season: 'Kharif' },
];

const activeFarmerLots = [
  {
    id: 'LOT-9482',
    crop: 'Desi Sharbati Gehun',
    quantity: '3.5 Tons',
    basePrice: '₹2,650 / Qtl',
    status: 'In Bidding',
    offers: 4,
    highestBid: '₹2,720 / Qtl',
  },
  {
    id: 'LOT-8819',
    crop: 'Pusa Basmati 1509',
    quantity: '5 Tons',
    basePrice: '₹3,400 / Qtl',
    status: 'Dispatched',
    offers: 1,
    highestBid: '₹3,400 / Qtl',
  },
];

export default function KisanPortal({ onOpenVoiceAssistant }) {
  const [selectedSeason, setSelectedSeason] = useState('All');

  const filteredMsp = selectedSeason === 'All' 
    ? mspRates 
    : mspRates.filter(item => item.season === selectedSeason);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 space-y-8">
      
      {/* Top Banner & Quick Metrics */}
      <div className="bg-[#144230] text-white rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1b533e] border border-emerald-500/30 text-emerald-200 text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>PM Kisan & APMC Direct Sync Active</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight">
            Kisan Portal & Live MSP Tracker
          </h1>
          <p className="text-emerald-100/80 text-xs sm:text-sm font-light leading-relaxed">
            Monitor real-time official Minimum Support Prices, list your crop harvest straight to wholesale buyers, and ensure guaranteed direct mandi payouts.
          </p>
        </div>

        <button 
          onClick={onOpenVoiceAssistant}
          className="relative z-10 shrink-0 bg-emerald-400 hover:bg-emerald-300 text-emerald-950 px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer"
        >
          <PlusCircle className="w-4 h-4 stroke-[2.5]" />
          <span>Add Produce via Voice / AI</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-xs font-semibold">Active Lots Listed</span>
            <Layers className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">8.5 Tons</div>
          <span className="text-[11px] text-emerald-700 font-medium">2 Active Lots in Mandi</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-xs font-semibold">Live Buyer Enquiries</span>
            <PhoneCall className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">5 Direct Bids</div>
          <span className="text-[11px] text-blue-700 font-medium">Latest bid: 15 mins ago</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-xs font-semibold">Avg Realized Price</span>
            <DollarSign className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">+4.8%</div>
          <span className="text-[11px] text-emerald-700 font-medium">Higher than APMC floor price</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-xs font-semibold">Payment Escrow Guard</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-emerald-700">100% Secured</div>
          <span className="text-[11px] text-gray-500 font-medium">Instant T+1 UPI Settlement</span>
        </div>
      </div>

      {/* Main Grid: MSP Rates Board (Left) & Active Lots (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Side: Live MSP Rate Board */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-gray-100 p-6 shadow-xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-gray-100">
            <div>
              <h2 className="font-serif text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
                <Wheat className="w-5 h-5 text-emerald-700" />
                <span>Government Minimum Support Price (MSP) Tracker</span>
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Official statutory price benchmark compared with direct mandi bids.
              </p>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-1.5 bg-gray-100 p-1 rounded-xl text-xs font-medium">
              {['All', 'Rabi', 'Kharif'].map((season) => (
                <button
                  key={season}
                  onClick={() => setSelectedSeason(season)}
                  className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                    selectedSeason === season
                      ? 'bg-white text-gray-900 font-bold shadow-2xs'
                      : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  {season}
                </button>
              ))}
            </div>
          </div>

          {/* MSP Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-gray-100 text-[11px] text-gray-400 font-semibold uppercase tracking-wider">
                  <th className="py-3 px-2">Crop Commodity</th>
                  <th className="py-3 px-2">Govt MSP (₹/Qtl)</th>
                  <th className="py-3 px-2">Market Mandi Bid</th>
                  <th className="py-3 px-2">Fluctuation</th>
                  <th className="py-3 px-2 text-right">Mandi Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredMsp.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/70 transition-colors">
                    <td className="py-3.5 px-2 font-bold text-gray-900 flex items-center gap-2">
                      <span>{item.crop}</span>
                      <span className="px-1.5 py-0.5 rounded bg-gray-100 text-[10px] text-gray-500 font-normal">
                        {item.season}
                      </span>
                    </td>
                    <td className="py-3.5 px-2 font-semibold text-gray-700">₹{item.currentMsp}</td>
                    <td className="py-3.5 px-2 font-bold text-emerald-800">₹{item.mandiRate}</td>
                    <td className="py-3.5 px-2 font-semibold text-emerald-600 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {item.change}
                    </td>
                    <td className="py-3.5 px-2 text-right">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        item.status === 'Above MSP'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Side: Farmer's Active Listed Lots */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-3xl border border-gray-100 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <h3 className="font-serif font-bold text-base text-gray-900">
                Your Active Mandi Lots
              </h3>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                2 Live Lots
              </span>
            </div>

            <div className="space-y-3">
              {activeFarmerLots.map((lot) => (
                <div key={lot.id} className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-emerald-800 bg-white px-2 py-0.5 rounded-md border border-gray-200">
                      {lot.id}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-amber-700 font-semibold">
                      <Clock className="w-3 h-3" />
                      {lot.status}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-xs text-gray-900">{lot.crop}</h4>
                    <p className="text-[11px] text-gray-500">Volume: {lot.quantity} • Reserve: {lot.basePrice}</p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-200/60 text-xs">
                    <div>
                      <span className="text-[10px] text-gray-400 block">Top Buyer Offer</span>
                      <span className="font-extrabold text-emerald-800">{lot.highestBid}</span>
                    </div>
                    <button className="px-3 py-1.5 rounded-lg bg-[#144230] hover:bg-[#0c2b1f] text-white text-[11px] font-semibold flex items-center gap-1 transition-colors cursor-pointer">
                      <span>View {lot.offers} Bids</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Support / Seed Notice Box */}
          <div className="bg-[#f0fdf4] border border-emerald-200/80 rounded-2xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Certified Seed Procurement</span>
            </div>
            <p className="text-[11px] text-emerald-800/80 leading-relaxed">
              Subsidized certified seeds for the upcoming season are now live on the Kisan Seed Portal at 30% direct benefit subsidy.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}