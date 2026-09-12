import React, { useState } from 'react';
import { SlidersHorizontal, ShieldCheck } from 'lucide-react';

export default function FilterSidebar() {
  // State for Distance (Radio)
  const [selectedDistance, setSelectedDistance] = useState('15km');

  // State for Harvest & Freshness (Checkboxes)
  const [harvestOptions, setHarvestOptions] = useState({
    pluckedToday: true,
    nextDay: false,
    preOrder: false,
  });

  // State for Farming Method (Checkboxes)
  const [farmingMethods, setFarmingMethods] = useState({
    jaivik: true,
    prakritik: true,
    desiSeeds: false,
    pesticideFree: false,
  });

  const handleHarvestChange = (key) => {
    setHarvestOptions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleMethodChange = (key) => {
    setFarmingMethods((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const resetAll = () => {
    setSelectedDistance('15km');
    setHarvestOptions({ pluckedToday: true, nextDay: false, preOrder: false });
    setFarmingMethods({ jaivik: false, prakritik: false, desiSeeds: false, pesticideFree: false });
  };

  return (
    <aside className="w-full lg:w-64 shrink-0 bg-white rounded-2xl border border-gray-100 p-5 shadow-xs space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
        <div className="flex items-center gap-2 text-[#144230]">
          <SlidersHorizontal className="w-4 h-4 stroke-[2.5]" />
          <h3 className="font-serif font-bold text-base tracking-tight">Filters</h3>
        </div>
        <button
          onClick={resetAll}
          className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 transition-colors cursor-pointer"
        >
          Reset All
        </button>
      </div>

      {/* Section 1: Farm Distance */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-gray-800 tracking-wide">Farm Distance</h4>
        <div className="space-y-2.5">
          <label className="flex items-start gap-2.5 text-xs text-gray-600 cursor-pointer hover:text-gray-900 leading-snug">
            <input
              type="radio"
              name="distance"
              value="15km"
              checked={selectedDistance === '15km'}
              onChange={(e) => setSelectedDistance(e.target.value)}
              className="mt-0.5 accent-[#144230] cursor-pointer"
            />
            <span>Within 15 km (Local Mandi & Farms)</span>
          </label>

          <label className="flex items-start gap-2.5 text-xs text-gray-600 cursor-pointer hover:text-gray-900 leading-snug">
            <input
              type="radio"
              name="distance"
              value="50km"
              checked={selectedDistance === '50km'}
              onChange={(e) => setSelectedDistance(e.target.value)}
              className="mt-0.5 accent-[#144230] cursor-pointer"
            />
            <span>Within 50 km (District Regional Farms)</span>
          </label>

          <label className="flex items-start gap-2.5 text-xs text-gray-600 cursor-pointer hover:text-gray-900 leading-snug">
            <input
              type="radio"
              name="distance"
              value="state"
              checked={selectedDistance === 'state'}
              onChange={(e) => setSelectedDistance(e.target.value)}
              className="mt-0.5 accent-[#144230] cursor-pointer"
            />
            <span>All Verified State Growers</span>
          </label>
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* Section 2: Harvest & Freshness */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-gray-800 tracking-wide">Harvest & Freshness</h4>
        <div className="space-y-2.5">
          <label className="flex items-center justify-between text-xs text-gray-600 cursor-pointer hover:text-gray-900">
            <div className="flex items-center gap-2.5">
              <input
                type="checkbox"
                checked={harvestOptions.pluckedToday}
                onChange={() => handleHarvestChange('pluckedToday')}
                className="rounded accent-[#144230] cursor-pointer"
              />
              <span>Plucked Today</span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-emerald-100/70 text-emerald-800 text-[10px] font-semibold tracking-tight">
              Morning 6 AM
            </span>
          </label>

          <label className="flex items-center justify-between text-xs text-gray-600 cursor-pointer hover:text-gray-900">
            <div className="flex items-center gap-2.5">
              <input
                type="checkbox"
                checked={harvestOptions.nextDay}
                onChange={() => handleHarvestChange('nextDay')}
                className="rounded accent-[#144230] cursor-pointer"
              />
              <span>Next-Day Farm Dispatch</span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-semibold">
              24 hrs
            </span>
          </label>

          <label className="flex items-center gap-2.5 text-xs text-gray-600 cursor-pointer hover:text-gray-900">
            <input
              type="checkbox"
              checked={harvestOptions.preOrder}
              onChange={() => handleHarvestChange('preOrder')}
              className="rounded accent-[#144230] cursor-pointer"
            />
            <span>Pre-order Seasonal Harvest</span>
          </label>
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* Section 3: Farming Method */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-gray-800 tracking-wide">Farming Method</h4>
        <div className="space-y-2.5">
          <label className="flex items-center gap-2.5 text-xs text-gray-600 cursor-pointer hover:text-gray-900">
            <input
              type="checkbox"
              checked={farmingMethods.jaivik}
              onChange={() => handleMethodChange('jaivik')}
              className="rounded accent-[#144230] cursor-pointer"
            />
            <span>Jaivik Bharat / Organic Certified</span>
          </label>

          <label className="flex items-center gap-2.5 text-xs text-gray-600 cursor-pointer hover:text-gray-900">
            <input
              type="checkbox"
              checked={farmingMethods.prakritik}
              onChange={() => handleMethodChange('prakritik')}
              className="rounded accent-[#144230] cursor-pointer"
            />
            <span>Natural Farming (Prakritik Kheti)</span>
          </label>

          <label className="flex items-center gap-2.5 text-xs text-gray-600 cursor-pointer hover:text-gray-900">
            <input
              type="checkbox"
              checked={farmingMethods.desiSeeds}
              onChange={() => handleMethodChange('desiSeeds')}
              className="rounded accent-[#144230] cursor-pointer"
            />
            <span>Desi / Traditional Seeds</span>
          </label>

          <label className="flex items-center gap-2.5 text-xs text-gray-600 cursor-pointer hover:text-gray-900">
            <input
              type="checkbox"
              checked={farmingMethods.pesticideFree}
              onChange={() => handleMethodChange('pesticideFree')}
              className="rounded accent-[#144230] cursor-pointer"
            />
            <span>100% Pesticide-Free</span>
          </label>
        </div>
      </div>

      {/* Blue Informational Box */}
      <div className="rounded-xl bg-[#f0f6ff] border border-blue-100/80 p-3.5 space-y-1.5">
        <div className="flex items-center gap-1.5 text-emerald-800 font-semibold text-xs">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
          <span>Freshness & Purity Assured</span>
        </div>
        <p className="text-[11px] text-gray-600 leading-relaxed font-light">
          Produce is harvested at sunrise and sorted in farm-level cold crates to guarantee zero wilting upon doorstep delivery.
        </p>
      </div>
    </aside>
  );
}