const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = null;
let isListening = false;

export function isSpeechSupported() {
  return typeof SpeechRecognition !== "undefined" || typeof window.webkitSpeechRecognition !== "undefined";
}

export function startListening(lang = "hi-IN", onResult) {
  return new Promise((resolve, reject) => {
    if (!SpeechRecognition && !window.webkitSpeechRecognition) {
      reject(new Error("Speech Recognition not supported"));
      return;
    }

    const SR = SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SR();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = lang;
    recognition.maxAlternatives = 1;

    isListening = true;

    recognition.onresult = (event) => {
      let finalTranscript = "";
      let interimTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }
      if (onResult) {
        onResult({ final: finalTranscript, interim: interimTranscript });
      }
    };

    recognition.onerror = (event) => {
      if (event.error === "no-speech") return;
      if (onResult) onResult({ error: event.error });
    };

    recognition.onend = () => {
      isListening = false;
    };

    try {
      recognition.start();
      resolve();
    } catch (e) {
      reject(e);
    }
  });
}

export function stopListening() {
  if (recognition) {
    try { recognition.stop(); } catch (e) { /* ignore */ }
    recognition = null;
  }
  isListening = false;
}

export function speak(text, lang = "hi-IN") {
  return new Promise((resolve, reject) => {
    if (!window.speechSynthesis) {
      reject(new Error("Speech Synthesis not supported"));
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;
    utterance.onend = () => resolve();
    utterance.onerror = (e) => reject(e);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  });
}

export function stopSpeaking() {
  if (window.speechSynthesis) window.speechSynthesis.cancel();
}

export function getSupportedLanguages() {
  return { EN: "en-US", HI: "hi-IN", HINGLISH: "hi-IN" };
}

export function getIsListening() {
  return isListening;
}
