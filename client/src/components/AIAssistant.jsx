import React, { useState, useRef, useCallback } from 'react';
import { Mic, Send, Volume2, Sparkles, Loader2, X } from 'lucide-react';
import { startListening, stopListening, speak, isSpeechSupported } from '../services/voiceService';
import { processVoice } from '../services/aiVoiceService';

const LANG_MAP = { EN: 'en-US', HI: 'hi-IN', HINGLISH: 'hi-IN' };

export default function AIAssistant() {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [transcript, setTranscript] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [showResponse, setShowResponse] = useState(false);
  const [error, setError] = useState('');
  const sessionIdRef = useRef(`conv_${Date.now()}_${Math.random().toString(36).slice(2)}`);
  const transcriptRef = useRef('');
  const [lang, setLang] = useState('HI');

  const speechSupported = isSpeechSupported();
  const speechLang = LANG_MAP[lang] || 'hi-IN';

  const handleMicClick = useCallback(async () => {
    if (!speechSupported) {
      setError('Speech recognition not supported. Please use Chrome.');
      return;
    }
    setError('');
    setAiResponse('');
    setShowResponse(false);

    if (isListening) {
      stopListening();
      setIsListening(false);
      return;
    }

    try {
      setIsListening(true);
      setTranscript('Listening...');

      await startListening(speechLang, ({ final, interim }) => {
        if (interim) setTranscript(`Listening... ${interim}`);
        if (final) {
          setTranscript(final);
          setQuery(final);
          transcriptRef.current = final;
        }
      });

      setTimeout(async () => {
        stopListening();
        setIsListening(false);
        const currentTranscript = transcriptRef.current;
        if (currentTranscript && currentTranscript !== 'Listening...' && !currentTranscript.startsWith('Listening...')) {
          setIsLoading(true);
          try {
            const result = await processVoice(currentTranscript, sessionIdRef.current);
            setAiResponse(result.response);
            setShowResponse(true);
            setIsSpeaking(true);
            await speak(result.response, speechLang);
            setIsSpeaking(false);
          } catch (err) {
            setError('Voice processing failed. Please try again.');
            console.error(err);
          }
          setIsLoading(false);
        }
      }, 2500);
    } catch (err) {
      setError('Microphone access failed. Check permissions.');
      setIsListening(false);
      console.error(err);
    }
  }, [isListening, speechSupported, speechLang, sessionIdRef]);

  const handleSend = async () => {
    if (!query.trim()) return;
    setError('');
    setAiResponse('');
    setShowResponse(false);
    setIsLoading(true);
    try {
      const result = await processVoice(query, sessionIdRef.current);
      setAiResponse(result.response);
      setShowResponse(true);
      setIsSpeaking(true);
      await speak(result.response, speechLang);
      setIsSpeaking(false);
    } catch (err) {
      setError('AI processing failed.');
      console.error(err);
    }
    setIsLoading(false);
  };

  const handleKeyDown = (e) => { if (e.key === 'Enter') handleSend(); };

  const handleClear = () => {
    setTranscript('');
    setAiResponse('');
    setShowResponse(false);
    setError('');
    setQuery('');
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-10 flex flex-col items-center">
      <div className="text-center space-y-2 mb-8">
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900">Farmer Voice Inventory Assistant</h1>
        <p className="text-xs sm:text-sm text-gray-500 max-w-xl mx-auto">Speak your harvest details naturally in Hindi or English.</p>
      </div>

      <div className="w-full bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-10 flex flex-col items-center text-center relative overflow-hidden">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-800 text-xs font-medium mb-6">
          <Sparkles className="w-3 h-3 text-emerald-600" />
          <span>Voice Request</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight mb-1 uppercase">What do you want to sell?</h2>
        <p className="text-xs text-gray-500 mb-8">Tell us what you need in English, Hindi or Hinglish.</p>

        <button
          onClick={handleMicClick}
          disabled={isLoading}
          className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer shadow-lg active:scale-95 ${isListening ? 'bg-red-500 text-white shadow-red-200 animate-pulse ring-8 ring-red-100' : 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-200 ring-8 ring-emerald-50'} ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isLoading ? <Loader2 className="w-10 h-10 animate-spin" /> : <Mic className="w-10 h-10" />}
        </button>

        <div className="mt-4 mb-8">
          <p className="text-xs font-bold text-gray-800 flex items-center justify-center gap-1">
            <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
            {isListening ? 'Listening...' : isSpeaking ? 'Speaking...' : 'Tap to Speak'}
          </p>
          <p className="text-[11px] text-gray-400 mt-0.5">{transcript || 'Tap mic and speak'}</p>
        </div>

        {showResponse && aiResponse && (
          <div className="w-full bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-6 text-left">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-emerald-800">AI Response</span>
              <button onClick={handleClear} className="text-gray-400 hover:text-gray-600 cursor-pointer"><X className="w-3 h-3" /></button>
            </div>
            <p className="text-sm text-emerald-900 leading-relaxed">{aiResponse}</p>
          </div>
        )}

        {error && (
          <div className="w-full bg-red-50 border border-red-200 rounded-xl p-4 mb-6 text-left">
            <p className="text-xs text-red-700">{error}</p>
          </div>
        )}

        <div className="w-full flex items-center justify-center gap-3 my-2">
          <div className="h-[1px] bg-gray-100 flex-1" />
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">OR</span>
          <div className="h-[1px] bg-gray-100 flex-1" />
        </div>

        <div className="w-full max-w-xl mt-4 text-left">
          <label className="text-[11px] font-medium text-gray-500 mb-1 block">Or type your requirement</label>
          <div className="relative flex items-center">
            <input
              type="text"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setAiResponse(''); setShowResponse(false); }}
              onKeyDown={handleKeyDown}
              placeholder="I need 500 kg Grade A tomatoes in Ghaziabad tomorrow"
              className="w-full bg-[#f8fafc] border border-gray-200 rounded-xl pl-4 pr-20 py-2.5 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !query.trim()}
              className="absolute right-1.5 px-3 py-1.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-lg text-xs font-semibold flex items-center gap-1 shadow-2xs cursor-pointer disabled:opacity-50"
            >
              <span>Send</span>
              <Send className="w-3 h-3" />
            </button>
          </div>
          <p className="text-[10px] text-gray-400 mt-2">Example: "I need 500 kg Grade A tomatoes in Ghaziabad tomorrow."</p>
        </div>
      </div>

      <div className="fixed bottom-6 right-6 hidden md:flex items-center gap-2.5 bg-emerald-50 border border-emerald-200/80 rounded-full py-1.5 px-3.5 shadow-sm">
        <div className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center text-white"><Sparkles className="w-3 h-3" /></div>
        <div className="text-left text-[11px] leading-tight">
          <div className="font-bold text-emerald-950">Ask FarmBridge AI</div>
          <div className="text-emerald-700 text-[10px]">Hindi • Hinglish • English</div>
        </div>
      </div>
    </section>
  );
}
