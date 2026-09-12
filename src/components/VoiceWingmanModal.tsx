import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Sparkles,
  X,
  MessageSquare,
  Bot,
  User,
  Radio,
  Send,
  RefreshCw,
  Award
} from 'lucide-react';
import { Gender } from '../types';

interface VoiceWingmanModalProps {
  isOpen: boolean;
  onClose: () => void;
  userGender: Gender;
}

interface Message {
  sender: 'aria' | 'user';
  text: string;
}

export const VoiceWingmanModal: React.FC<VoiceWingmanModalProps> = ({
  isOpen,
  onClose,
  userGender,
}) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'aria',
      text: "Namaste! I'm Aria, your HerVibe AI Voice Coach. Tap the mic or pick a topic to practice dating questions, get opener advice, or run a safe date prep!",
    },
  ]);

  const recognitionRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initialize Speech Recognition if supported in browser
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = 'en-IN';

        recognition.onresult = (event: any) => {
          const current = event.resultIndex;
          const transcriptText = event.results[current][0].transcript;
          setTranscript(transcriptText);
          if (event.results[current].isFinal) {
            handleSendMessage(transcriptText);
            setTranscript('');
            setIsListening(false);
          }
        };

        recognition.onerror = () => {
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      }
    }

    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  if (!isOpen) return null;

  const speakText = (text: string) => {
    if (!speechEnabled || typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.1;

    // Try finding an Indian or natural English voice
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice =
      voices.find((v) => v.lang.includes('en-IN')) ||
      voices.find((v) => v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha'));
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert('Speech Recognition is not supported in this browser. You can type your message below!');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      }
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.error('Recognition start error:', err);
      }
    }
  };

  const handleSendMessage = async (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed) return;

    setMessages((prev) => [...prev, { sender: 'user', text: trimmed }]);
    setInputText('');
    setLoading(true);

    try {
      const res = await fetch('/api/gemini-coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmed,
          persona: 'wingman',
          userGender,
        }),
      });

      const data = await res.json();
      const reply = data.reply || "You're doing great! Keep your conversation authentic and upbeat.";
      setMessages((prev) => [...prev, { sender: 'aria', text: reply }]);
      speakText(reply);
    } catch (err) {
      console.error('Coach API error:', err);
      const fallback = 'Smile, ask about their favorite hobbies, and let your positive vibe shine through!';
      setMessages((prev) => [...prev, { sender: 'aria', text: fallback }]);
      speakText(fallback);
    } finally {
      setLoading(false);
    }
  };

  const promptShortcuts = [
    'How should I greet a girl in Ahmedabad on a first date?',
    'Give me a witty opener for someone who loves specialty coffee',
    'Practice roleplaying: Ask me a first date question',
    'What are 3 green flags to look for when chatting?',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-slate-900 border border-purple-500/40 rounded-3xl overflow-hidden shadow-2xl text-white flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-purple-950 via-slate-900 to-rose-950 border-b border-purple-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-500 via-pink-500 to-rose-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
                <Radio className="w-5 h-5 text-white animate-pulse" />
              </div>
              {isSpeaking && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full ring-2 ring-slate-900 animate-ping" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white">Aria • AI Voice Wingman</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  Gemini Live
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                {isSpeaking ? 'Aria is speaking...' : isListening ? 'Listening to your voice...' : 'Real-time conversational wingman'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (speechEnabled && typeof window !== 'undefined' && window.speechSynthesis) {
                  window.speechSynthesis.cancel();
                  setIsSpeaking(false);
                }
                setSpeechEnabled(!speechEnabled);
              }}
              className={`p-2 rounded-xl transition-colors ${
                speechEnabled
                  ? 'bg-purple-600/30 text-purple-300 hover:bg-purple-600/50'
                  : 'bg-slate-800 text-slate-500 hover:text-slate-400'
              }`}
              title={speechEnabled ? 'Mute AI Voice' : 'Enable AI Voice'}
            >
              {speechEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <button
              onClick={() => {
                if (typeof window !== 'undefined' && window.speechSynthesis) {
                  window.speechSynthesis.cancel();
                }
                onClose();
              }}
              className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Voice Visualizer Stage */}
        <div className="py-5 px-4 bg-gradient-to-b from-purple-950/40 to-slate-950 flex flex-col items-center justify-center border-b border-slate-800">
          <div className="relative flex items-center justify-center">
            {/* Glowing ripples */}
            <div
              className={`absolute w-28 h-28 rounded-full transition-all duration-700 ${
                isSpeaking
                  ? 'bg-gradient-to-r from-purple-500/30 to-pink-500/30 scale-125 animate-pulse'
                  : isListening
                  ? 'bg-emerald-500/20 scale-110 animate-ping'
                  : 'bg-purple-500/10 scale-100'
              }`}
            />

            {/* Mic Center Trigger */}
            <button
              onClick={toggleListening}
              className={`relative z-10 w-20 h-20 rounded-full flex flex-col items-center justify-center shadow-xl transition-all active:scale-95 ${
                isListening
                  ? 'bg-gradient-to-tr from-emerald-500 to-teal-600 text-white ring-4 ring-emerald-400/40 shadow-emerald-500/40 animate-pulse'
                  : 'bg-gradient-to-tr from-purple-600 via-pink-600 to-rose-600 text-white hover:opacity-90 shadow-purple-600/40'
              }`}
            >
              {isListening ? <Mic className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
            </button>
          </div>

          <span className="text-xs font-semibold text-purple-300 mt-3">
            {isListening ? 'Listening... Speak now' : 'Tap microphone to speak'}
          </span>
          {transcript && (
            <p className="text-xs text-slate-300 italic mt-1 bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700">
              "{transcript}"
            </p>
          )}

          {/* Quick suggestions */}
          <div className="flex flex-wrap gap-1.5 justify-center mt-3 max-w-md">
            {promptShortcuts.map((text, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(text)}
                className="text-[11px] px-2.5 py-1 rounded-full bg-slate-800 hover:bg-purple-900/50 border border-slate-700 hover:border-purple-500/40 text-slate-300 hover:text-white transition-all text-left"
              >
                {text}
              </button>
            ))}
          </div>
        </div>

        {/* Conversation Transcript */}
        <div className="p-4 overflow-y-auto flex-1 space-y-3 max-h-60 bg-slate-900">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex items-start gap-2.5 ${
                m.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-lg shrink-0 flex items-center justify-center text-xs ${
                  m.sender === 'user'
                    ? 'bg-rose-600 text-white'
                    : 'bg-gradient-to-tr from-purple-600 to-pink-500 text-white'
                }`}
              >
                {m.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div
                className={`p-3 rounded-2xl text-xs max-w-[80%] leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-rose-600/90 text-white rounded-tr-none'
                    : 'bg-slate-800 border border-slate-700/80 text-slate-200 rounded-tl-none'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex items-center gap-2 text-xs text-purple-400">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Aria is thinking...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSendMessage(inputText);
            }}
            placeholder="Type or speak a question..."
            className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
          />
          <button
            onClick={() => handleSendMessage(inputText)}
            disabled={!inputText.trim()}
            className="p-2 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
