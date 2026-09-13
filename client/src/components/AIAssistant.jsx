import React, { useState } from 'react';
import { Mic, Send, Sparkles, Volume2 } from 'lucide-react';

export default function AIAssistant() {
  const [isListening, setIsListening] = useState(false);
  const [query, setQuery] = useState('');
  const [transcript, setTranscript] = useState('');

  const toggleMic = () => {
    setIsListening(!isListening);
    if (!isListening) {
      setTranscript('Listening... Speak now in Hindi, English or Hinglish');
    }
  };

  const handleSend = () => {
    if (!query.trim()) return;
    setTranscript(`Requirement received: "${query}"`);
    setQuery('');
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-10 flex flex-col items-center">
      {/* Title & Subtitle */}
      <div className="text-center space-y-2 mb-8">
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900">
          Farmer Voice Inventory Assistant
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 max-w-xl mx-auto">
          Speak your harvest details naturally in Hindi or English (e.g. "I have 2 tons of Grade A potatoes.")
        </p>
      </div>

      {/* Main Assistant Card */}
      <div className="w-full bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-10 flex flex-col items-center text-center relative overflow-hidden">
        
        {/* Top Tag */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-800 text-xs font-medium mb-6">
          <Sparkles className="w-3 h-3 text-emerald-600" />
          <span>Voice Request</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight mb-1 uppercase">
          What do you want to sell?
        </h2>
        <p className="text-xs text-gray-500 mb-8">
          Tell us what you need in English, Hindi or Hinglish.
        </p>

        {/* Big Mic Button */}
        <button
          onClick={toggleMic}
          className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer shadow-lg active:scale-95 ${
            isListening 
              ? 'bg-red-500 text-white shadow-red-200 animate-pulse ring-8 ring-red-100' 
              : 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-200 ring-8 ring-emerald-50'
          }`}
        >
          <Mic className="w-10 h-10" />
        </button>

        <div className="mt-4 mb-8">
          <p className="text-xs font-bold text-gray-800 flex items-center justify-center gap-1">
            <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
            {isListening ? 'Listening...' : 'Tap to Speak'}
          </p>
          <p className="text-[11px] text-gray-400 mt-0.5">
            {transcript || 'Tap mic and speak'}
          </p>
        </div>

        {/* Divider */}
        <div className="w-full flex items-center justify-center gap-3 my-2">
          <div className="h-[1px] bg-gray-100 flex-1" />
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">OR</span>
          <div className="h-[1px] bg-gray-100 flex-1" />
        </div>

        {/* Bottom Text Prompt Input */}
        <div className="w-full max-w-xl mt-4 text-left">
          <label className="text-[11px] font-medium text-gray-500 mb-1 block">
            Or type your requirement
          </label>
          <div className="relative flex items-center">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="I need 500 kg Grade A tomatoes in Ghaziabad tomorrow"
              className="w-full bg-[#f8fafc] border border-gray-200 rounded-xl pl-4 pr-20 py-2.5 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
            <button
              onClick={handleSend}
              className="absolute right-1.5 px-3 py-1.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-lg text-xs font-semibold flex items-center gap-1 shadow-2xs cursor-pointer"
            >
              <span>Send</span>
              <Send className="w-3 h-3" />
            </button>
          </div>
          <p className="text-[10px] text-gray-400 mt-2">
            Example: "I need 500 kg Grade A tomatoes in Ghaziabad tomorrow."
          </p>
        </div>

      </div>

      {/* Floating Bottom Right Badge */}
      <div className="fixed bottom-6 right-6 hidden md:flex items-center gap-2.5 bg-emerald-50 border border-emerald-200/80 rounded-full py-1.5 px-3.5 shadow-sm">
        <div className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center text-white">
          <Sparkles className="w-3 h-3" />
        </div>
        <div className="text-left text-[11px] leading-tight">
          <div className="font-bold text-emerald-950">Ask FarmBridge AI</div>
          <div className="text-emerald-700 text-[10px]">Hindi • Hinglish • English</div>
        </div>
      </div>
    </section>
  );
}