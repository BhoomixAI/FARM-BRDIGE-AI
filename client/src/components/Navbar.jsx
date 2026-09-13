import React, { useState } from 'react';
import {
  Languages,
  ChevronDown,
  Sprout,
  Sparkles,
  ShoppingBag,
  Tractor,
  RotateCcw
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, role, setRole }) {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState({ code: 'EN', name: 'English', native: 'English' });

  const navItems = ['Home', 'Marketplace', 'For Farmers', 'AI Assistant'];

  const languages = [
    { code: 'EN', name: 'English', native: 'English' },
    { code: 'HI', name: 'Hindi', native: 'हिंदी' },
    { code: 'BN', name: 'Bengali', native: 'বাংলা' },
    { code: 'TE', name: 'Telugu', native: 'తెలుగు' },
    { code: 'MR', name: 'Marathi', native: 'मराठी' },
    { code: 'PA', name: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 px-4 md:px-8 py-2.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">

        {/* Left: Brand Logo */}
        <div
          onClick={() => setActiveTab('Home')}
          className="flex items-center gap-2.5 cursor-pointer shrink-0"
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-700">
            <Sprout className="w-5 h-5 fill-current" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-serif text-base font-bold text-gray-900">FarmBridge</span>
            <span className="font-serif text-[10px] font-semibold text-emerald-700">AI</span>
          </div>
        </div>

        {/* Center: Navigation Pills */}
        <nav className="hidden md:flex items-center gap-1.5 text-xs font-medium">
          {navItems.map((item) => {
            const isActive = activeTab === item;
            return (
              <button
                key={item}
                onClick={() => setActiveTab(item)}
                className={`px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1.5 cursor-pointer ${isActive
                  ? 'bg-[#e6f7f0] text-emerald-800 font-semibold border border-emerald-200/60 shadow-2xs'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
              >
                {item === 'AI Assistant' && (
                  <Sparkles className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-700' : 'text-emerald-500'}`} />
                )}
                <span>{item}</span>
              </button>
            );
          })}
        </nav>

        {/* Right: Buyer/Seller Switch + Language + Reset */}
        <div className="flex items-center gap-3">

          {/* Buyer / Seller Toggle Pill */}
          <div className="flex items-center bg-gray-100 p-0.5 rounded-full text-xs font-semibold">
            <button
              onClick={() => setRole('buyer')}
              className={`flex items-center gap-1 px-3 py-1 rounded-full transition-all cursor-pointer ${role === 'buyer'
                ? 'bg-emerald-700 text-white shadow-2xs'
                : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              <ShoppingBag className="w-3 h-3" />
              <span>Buyer</span>
            </button>
            <button
              onClick={() => setRole('seller')}
              className={`flex items-center gap-1 px-3 py-1 rounded-full transition-all cursor-pointer ${role === 'seller'
                ? 'bg-emerald-600 text-white shadow-2xs'
                : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              <Tractor className="w-3 h-3" />
              <span>Seller</span>
            </button>
          </div>

          {/* Language Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 border border-gray-200 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <Languages className="w-3.5 h-3.5 text-emerald-700" />
              <span>{selectedLang.name}</span>
              <ChevronDown className={`w-3 h-3 text-gray-400 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
            </button>

            {isLangOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsLangOpen(false)} />
                <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-100 rounded-xl shadow-lg py-1 z-50">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setSelectedLang(l);
                        setIsLangOpen(false);
                      }}
                      className="w-full px-3 py-1.5 text-left text-xs hover:bg-emerald-50 text-gray-700 font-medium cursor-pointer"
                    >
                      {l.name} ({l.native})
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Reset Filters / State */}
          <button
            title="Reset Filters"
            onClick={() => {
              setRole('buyer');
              setActiveTab('Home');
            }}
            className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 border border-gray-200 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-50 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        </div>
      </div>
    </header>
  );
}