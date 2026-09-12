import React from 'react';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import CategorySection from './components/CategorySection';
import FilterSidebar from './components/FilterSidebar';

function App() {
  return (
    <div className="min-h-screen bg-[#f9fafb] flex flex-col">
      <Navbar />
      <main className="space-y-4 pb-16">
        <HeroBanner />
        <CategorySection />

        {/* Marketplace 2-Column Section */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 w-full flex flex-col lg:flex-row gap-6 items-start">
          {/* Left Sidebar */}
          <FilterSidebar />

          {/* Right Area: Product Grid will be plugged here */}
          <div className="flex-1 w-full">
            {/* Next: ProductGrid */}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;