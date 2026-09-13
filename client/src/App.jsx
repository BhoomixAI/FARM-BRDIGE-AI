import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import CategorySection from './components/CategorySection';
import FilterSidebar from './components/FilterSidebar';
import ProductGrid from './components/ProductGrid';
import AIAssistant from './components/AIAssistant';
import MarketplaceView from './components/MarketplaceView';

function App() {
  const [activeTab, setActiveTab] = useState('Home');
  const [role, setRole] = useState('buyer');

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    if (newRole === 'seller') {
      setActiveTab('AI Assistant');
    } else {
      setActiveTab('Home');
    }
  };

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
    if (tabName === 'AI Assistant' || tabName === 'For Farmers') {
      setRole('seller');
    } else {
      setRole('buyer');
    }
  };

  return (
    <div className="min-h-screen bg-[#f9fafb] flex flex-col">
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={handleTabChange}
        role={role}
        setRole={handleRoleChange}
      />
      
      <main className="space-y-4 pb-16">
        {activeTab === 'Home' && (
          <>
            <HeroBanner />
            <CategorySection />
            <div className="max-w-7xl mx-auto px-4 md:px-8 w-full flex flex-col lg:flex-row gap-6 items-start">
              <FilterSidebar />
              <div className="flex-1 w-full">
                <ProductGrid />
              </div>
            </div>
          </>
        )}

        {activeTab === 'Marketplace' && (
          <MarketplaceView onBackToVoice={() => setActiveTab('AI Assistant')} />
        )}

        {activeTab === 'AI Assistant' && (
          <AIAssistant />
        )}

        {activeTab === 'For Farmers' && (
          <div className="max-w-7xl mx-auto px-4 py-16 text-center">
            <div className="bg-white border border-gray-100 rounded-3xl p-12 shadow-xs">
              <h2 className="font-serif text-2xl font-bold text-gray-900 mb-2">
                Kisan Portal & MSP Tracker
              </h2>
              <p className="text-gray-500 text-xs sm:text-sm max-w-md mx-auto">
                Farmer dashboard, seed procurement, and government MSP pricing rates.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;