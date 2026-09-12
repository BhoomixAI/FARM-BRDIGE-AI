import React from 'react';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main>
        <HeroBanner />
        {/* Next: Category Bar & Produce Grid */}
      </main>
    </div>
  );
}

export default App;