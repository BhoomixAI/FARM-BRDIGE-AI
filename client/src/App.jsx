import React from 'react';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import CategorySection from './components/CategorySection';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main>
        <HeroBanner />
        <CategorySection />
      </main>
    </div>
  );
}

export default App;