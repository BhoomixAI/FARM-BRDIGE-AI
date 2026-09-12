import React, { useState } from 'react';
import { 
  Search, 
  Languages, 
  ChevronDown, 
  Bell, 
  Truck, 
  Plus, 
  Sprout 
} from 'lucide-react';

export default function Navbar() {
  const [activeTab, setActiveTab] = useState('Marketplace');
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState({ code: 'EN', name: 'English', native: 'English' });

  const navItems = [
    { label: 'Marketplace', active: true },
    { label: 'Farmer Dashboard', active: false },
    { label: 'Logistics Hub', active: false },
    { label: 'Traceability', active: false },
  ];

  const languages = [
    { code: 'EN', name: 'English', native: 'English' },
    { code: 'HI', name: 'Hindi', native: 'हिन्दी' },
    { code: 'BN', name: 'Bengali', native: 'বাংলা' },
    { code: 'TE', name: 'Telugu', native: 'తెలుగు' },
    { code: 'MR', name: 'Marathi', native: 'मराठी' },
    { code: 'TA', name: 'Tamil', native: 'தமிழ்' },
    { code: 'PA', name: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 px-4 md:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Left: Brand Logo & Name */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-700">
            <Sprout className="w-5 h-5 fill-current" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-serif text-lg font-bold text-gray-900 tracking-tight">
              FarmBridge
            </span>
            <span className="font-serif text-xs font-semibold text-emerald-800 tracking-wider">
              AI
            </span>
          </div>
        </div>

        {/* Center-Left: Search Produce Bar */}
        <div className="hidden lg:flex items-center flex-1 max-w-sm ml-2">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search produce, lot ID, farm..."
              className="w-full bg-[#f8fafc] border border-gray-200/80 rounded-full pl-10 pr-4 py-2 text-xs text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center space-x-7 text-xs font-medium text-gray-600">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setActiveTab(item.label)}
              className={`relative py-1 transition-colors hover:text-emerald-800 ${
                activeTab === item.label
                  ? 'text-gray-900 font-semibold'
                  : 'text-gray-500'
              }`}
            >
              {item.label}
              {activeTab === item.label && (
                <span className="absolute bottom-[-14px] left-0 w-full h-[2px] bg-emerald-800 rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center space-x-3.5">
          {/* Language Selector Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <Languages className="w-3.5 h-3.5 text-emerald-700" />
              <span>{selectedLang.name} <span className="text-gray-400 text-[11px]">({selectedLang.code})</span></span>
              <ChevronDown className={`w-3 h-3 text-gray-400 ml-0.5 transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`} />
            </button>

            {isLangOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setIsLangOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-lg py-1.5 z-50">
                  <div className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-gray-400 border-b border-gray-100">
                    Select Language
                  </div>
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setSelectedLang(lang);
                        setIsLangOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-left text-xs transition-colors hover:bg-emerald-50 ${
                        selectedLang.code === lang.code 
                          ? 'bg-emerald-50/60 text-emerald-800 font-semibold' 
                          : 'text-gray-700'
                      }`}
                    >
                      <span>{lang.name}</span>
                      <span className="text-gray-400 text-[11px]">{lang.native}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Notifications Bell */}
          <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-full transition-colors">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-600 rounded-full ring-2 ring-white" />
          </button>

          {/* Logistics Count */}
          <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-full transition-colors">
            <Truck className="w-4 h-4" />
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-emerald-700 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              2
            </span>
          </button>

          {/* Create Listing */}
          <button className="flex items-center gap-1.5 bg-[#0e3b2e] hover:bg-[#092b21] text-white text-xs font-medium px-3.5 py-2 rounded-lg transition-colors shadow-sm">
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Create Listing</span>
          </button>
        </div>

      </div>
    </header>
  );
}