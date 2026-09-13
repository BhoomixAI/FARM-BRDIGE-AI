import React from 'react';
import { Sprout } from 'lucide-react';

export default function Footer() {
  const links = [
    { label: 'Cold-Chain Guarantee', href: '#' },
    { label: 'Origin Certification', href: '#' },
    { label: 'Producer Directory', href: '#' },
    { label: 'Logistics Telemetry', href: '#' },
    { label: 'Terms of Trade', href: '#' },
    { label: 'Privacy Policy', href: '#' },
  ];

  return (
    <footer className="mt-auto w-full bg-[#edf3fc] border-t border-blue-100/70 py-6 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left: Brand Logo & Copyright */}
        <div className="flex flex-col sm:flex-row items-center sm:items-center gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-7 h-7 rounded-md bg-emerald-100/80 flex items-center justify-center text-emerald-800">
              <Sprout className="w-4 h-4 fill-current" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-serif text-sm font-bold text-gray-900">FarmBridge</span>
              <span className="font-serif text-[9px] font-semibold text-emerald-800 tracking-wider">AI</span>
            </div>
          </div>

          <span className="hidden sm:inline text-gray-300">|</span>

          <p className="text-[11px] text-gray-500 leading-tight">
            © 2025 FarmBridge AI Agro-Logistics Inc. Regenerative cold-chain certified. All rights reserved.
          </p>
        </div>

        {/* Right: Policy & Guarantee Links */}
        <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-5 gap-y-2 text-[11px] text-gray-600 font-medium">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-emerald-800 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

      </div>
    </footer>
  );
}