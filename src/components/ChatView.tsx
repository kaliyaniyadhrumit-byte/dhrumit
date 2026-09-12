import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Sparkles,
  ShieldCheck,
  Video,
  Phone,
  MapPin,
  Mic,
  CheckCheck,
  Heart,
  AlertTriangle,
  ArrowLeft,
  X,
  Play,
  Pause,
  Lock,
  Flame,
  Coffee,
  Music,
  Smile
} from 'lucide-react';
import { Profile, Match } from '../types';
import { IcebreakerModal } from './IcebreakerModal';

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isAiGenerated?: boolean;
  isVoiceNote?: boolean;
  duration?: string;
}

interface ChatViewProps {
  currentUser: Profile;
  activeMatch: Match;
  onBack: () => void;
  onOpenSafeDatePlanner: (spotName?: string) => void;
  onOpenSos: () => void;
}

export const ChatView: React.FC<ChatViewProps> = ({
  currentUser,
  activeMatch,
  onBack,
  onOpenSafeDatePlanner,
  onOpenSos,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      senderId: activeMatch.profile.id,
      text: `Hey ${currentUser.name}! Loved your profile vibe about exploring specialty cafes around ${activeMatch.profile.city}! 😊☕`,
      timestamp: '10:42 AM',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [showIcebreakers, setShowIcebreakers] = useState(false);
  const [isCalling, setIsCalling] = useState<'audio' | 'video' | null>(null);
  const [isRecordingAudio, setIsRecordingAudio] = useState(false);
  const [audioTimer, setAudioTimer] = useState(0);
  const [playingVoiceId, setPlayingVoiceId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Voice note timer simulation
  useEffect(() => {
    let timer: any;
    if (isRecordingAudio) {
      timer = setInterval(() => {
        setAudioTimer((prev) => prev + 1);
      }, 1000);
    } else {
      setAudioTimer(0);
    }
    return () => clearInterval(timer);
  }, [isRecordingAudio]);

  const handleSendMessage = (textToSend?: string) => {
    const content = textToSend || inputText;
    if (!content.trim()) return;

    const newMessage: Message = {
      id: 'msg-' + Date.now(),
      senderId: currentUser.id,
      text: content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isAiGenerated: Boolean(textToSend),
    };

    setMessages((prev) => [...prev, newMessage]);
    if (!textToSend) setInputText('');

    // Responsive realistic flirty / safe reply
    setTimeout(() => {
      const replies = [
        `Haha that's spot on! By the way, have you visited The Roastery Cultur on SG Highway? Best iced brew! ☕`,
        `That genuinely made me smile! Tell me more about your favorite weekend vibe! ✨`,
        `Totally agree! Good coffee and genuine conversations without small talk are so rare nowadays. 🌟`,
        `Haha I love that! What's your go-to song when you need good energy? 🎵`,
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      setMessages((prev) => [
        ...prev,
        {
          id: 'reply-' + Date.now(),
          senderId: activeMatch.profile.id,
          text: randomReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 1600);
  };

  const handleSendVoiceNote = () => {
    setIsRecordingAudio(false);
    const durationSec = audioTimer || 4;
    const newMessage: Message = {
      id: 'voice-' + Date.now(),
      senderId: currentUser.id,
      text: `Voice note (0:0${durationSec}s)`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isVoiceNote: true,
      duration: `0:0${durationSec}`,
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const togglePlayVoice = (msgId: string) => {
    if (playingVoiceId === msgId) {
      setPlayingVoiceId(null);
    } else {
      setPlayingVoiceId(msgId);
      setTimeout(() => {
        setPlayingVoiceId(null);
      }, 4000);
    }
  };

  return (
    <div className="flex flex-col h-[650px] w-full bg-slate-950/95 border border-white/10 rounded-[32px] overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.8)] text-white relative">
      {/* Background Ambient Aura */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Chat Header */}
      <div className="p-3 sm:p-4 bg-slate-900/90 backdrop-blur-xl border-b border-slate-800/80 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="relative">
            <img
              src={activeMatch.profile.photos[0] || (activeMatch.profile as any).image}
              alt={activeMatch.profile.name}
              className="w-11 h-11 rounded-full object-cover ring-2 ring-rose-500/80 shadow-md shadow-rose-500/20"
            />
            {activeMatch.profile.verified && (
              <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center text-[9px] text-white font-bold border-2 border-slate-950">
                ✓
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white tracking-tight">
                {activeMatch.profile.name}, {activeMatch.profile.age}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" /> {activeMatch.profile.safetyScore}% Safe
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Online in {activeMatch.profile.city}
              </span>
              <span>•</span>
              <span className="text-rose-400 font-bold flex items-center gap-0.5">
                <Flame className="w-3 h-3 text-rose-400 fill-rose-400" />
                94% Chemistry
              </span>
            </div>
          </div>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setShowIcebreakers(true)}
            className="px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-500 hover:from-rose-500 hover:to-pink-400 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-rose-600/30 transition-all active:scale-95"
            title="Get AI Wingman Icebreakers"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">AI Wingman</span>
          </button>

          <button
            onClick={() => setIsCalling('audio')}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Audio Call"
          >
            <Phone className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsCalling('video')}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Video Call"
          >
            <Video className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenSos}
            className="p-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 border border-rose-500/30 transition-colors"
            title="Emergency SOS"
          >
            <AlertTriangle className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Safe Date Meetup Suggestion Banner */}
      <div className="px-4 py-2 bg-gradient-to-r from-emerald-950/40 via-slate-900/90 to-slate-950 border-b border-emerald-500/20 flex items-center justify-between backdrop-blur-sm z-10">
        <div className="flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <p className="text-xs text-slate-300">
            Suggest verified meetup in {activeMatch.profile.city}:
            <span className="text-emerald-300 font-bold ml-1">The Project Cafe / Roastery (98% Safe)</span>
          </p>
        </div>
        <button
          onClick={() => onOpenSafeDatePlanner('The Roastery Cultur')}
          className="text-xs text-rose-400 hover:text-rose-300 font-bold underline shrink-0 ml-2"
        >
          Plan Safe Date
        </button>
      </div>

      {/* Message Stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 z-10">
        {/* Safe Encryption Notice */}
        <div className="flex items-center justify-center gap-1.5 py-1 text-center">
          <Lock className="w-3 h-3 text-slate-500" />
          <span className="text-[11px] text-slate-500 font-medium">
            End-to-end encrypted • Verified under HerVibe Women-First Charter
          </span>
        </div>

        {messages.map((msg) => {
          const isMe = msg.senderId === currentUser.id;
          const isPlayingThisVoice = playingVoiceId === msg.id;

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} space-y-1`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[72%] p-3.5 rounded-2xl text-sm leading-relaxed transition-all ${
                  isMe
                    ? 'bg-gradient-to-tr from-rose-600 via-pink-600 to-rose-500 text-white rounded-br-none shadow-[0_5px_20px_rgba(244,63,94,0.25)]'
                    : 'bg-slate-900/90 text-slate-100 rounded-bl-none border border-white/10 shadow-lg backdrop-blur-md'
                }`}
              >
                {msg.isAiGenerated && (
                  <div className="flex items-center gap-1 text-[10px] text-amber-200 font-bold mb-1">
                    <Sparkles className="w-3 h-3" />
                    <span>AI Wingman Opener</span>
                  </div>
                )}

                {msg.isVoiceNote ? (
                  <div className="flex items-center gap-3 py-1">
                    <button 
                      onClick={() => togglePlayVoice(msg.id)}
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-white transition-all shadow-md ${
                        isPlayingThisVoice ? 'bg-white text-rose-600 scale-105' : 'bg-white/20'
                      }`}
                    >
                      {isPlayingThisVoice ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                    </button>
                    <div className="space-y-1 flex-1">
                      {isPlayingThisVoice ? (
                        <div className="flex items-center gap-1 h-5 py-0.5">
                          <span className="w-1 bg-white rounded-full animate-soundwave-1" />
                          <span className="w-1 bg-white/80 rounded-full animate-soundwave-2" />
                          <span className="w-1 bg-white rounded-full animate-soundwave-3" />
                          <span className="w-1 bg-white/70 rounded-full animate-soundwave-4" />
                          <span className="w-1 bg-white rounded-full animate-soundwave-5" />
                        </div>
                      ) : (
                        <div className="w-28 bg-white/30 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-white w-1/2 h-full" />
                        </div>
                      )}
                      <span className="text-[10px] text-white/90 font-mono">{msg.duration}</span>
                    </div>
                  </div>
                ) : (
                  <span>{msg.text}</span>
                )}
              </div>

              <div className="flex items-center gap-1 text-[10px] text-slate-500 px-1 font-medium">
                <span>{msg.timestamp}</span>
                {isMe && <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Flirt / Icebreaker Chips Bar */}
      <div className="px-3 py-1.5 bg-slate-900/80 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto scrollbar-none z-10">
        <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
          <Sparkles className="w-3 h-3" /> Quick:
        </span>
        {[
          { label: 'Suggest Coffee ☕', text: `Would love to grab an artisanal coffee with you at Roastery Cultur this weekend! ☕` },
          { label: 'Great Vibe ✨', text: `You have such a genuine and warm smile! What's making you happiest this week? ✨` },
          { label: 'Music Vibe 🎵', text: `If we were on a road trip, what song would you play first? 🎵` },
          { label: 'Two Truths & Lie 🎲', text: `Let's play Two Truths & One Lie! You go first! 🎲` },
        ].map((item, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(item.text)}
            className="px-2.5 py-1 rounded-full bg-slate-800/90 hover:bg-rose-950/60 border border-slate-700 hover:border-rose-500/50 text-[11px] text-slate-200 hover:text-rose-200 font-medium shrink-0 transition-colors whitespace-nowrap"
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Voice note active recording bar */}
      {isRecordingAudio && (
        <div className="px-4 py-2 bg-rose-950/80 border-t border-rose-500/40 flex items-center justify-between animate-pulse z-20">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
            <span className="text-xs font-semibold text-rose-300">
              Recording Voice Note: 0:0{audioTimer}s
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsRecordingAudio(false)}
              className="text-xs text-slate-400 hover:text-white px-2 py-1"
            >
              Cancel
            </button>
            <button
              onClick={handleSendVoiceNote}
              className="px-3 py-1 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-bold shadow-md shadow-rose-600/30"
            >
              Send Note
            </button>
          </div>
        </div>
      )}

      {/* Chat Input Bar */}
      <div className="p-3 sm:p-4 bg-slate-900 border-t border-slate-800/80 flex items-center gap-2 z-20">
        <button
          onClick={() => setShowIcebreakers(true)}
          className="p-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-rose-400 hover:text-rose-300 transition-colors flex items-center justify-center shrink-0 border border-slate-700/60"
          title="Personalized AI Icebreaker"
        >
          <Sparkles className="w-5 h-5" />
        </button>

        <input
          type="text"
          placeholder={`Message ${activeMatch.profile.name}...`}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSendMessage();
          }}
          className="flex-1 bg-slate-800/90 border border-slate-700/80 rounded-2xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-rose-500 placeholder-slate-400 shadow-inner"
        />

        {inputText.trim() ? (
          <button
            onClick={() => handleSendMessage()}
            className="p-2.5 rounded-2xl bg-gradient-to-r from-rose-600 via-pink-500 to-amber-500 text-white shrink-0 shadow-lg shadow-rose-600/30 transition-transform active:scale-95"
          >
            <Send className="w-5 h-5" />
          </button>
        ) : (
          <button
            onClick={() => setIsRecordingAudio(true)}
            className="p-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-rose-400 transition-colors shrink-0 border border-slate-700/60"
            title="Record Voice Note"
          >
            <Mic className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Call Simulation Modal */}
      {isCalling && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex flex-col items-center justify-between p-8 animate-fadeIn">
          <div className="text-center space-y-2 mt-8">
            <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
              Encrypted {isCalling === 'video' ? 'Video' : 'Audio'} Call
            </span>
            <h3 className="text-2xl font-bold text-white">{activeMatch.profile.name}</h3>
            <p className="text-xs text-slate-400">Ringing... HerVibe SafeConnect active</p>
          </div>

          <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-rose-500 shadow-2xl animate-pulse">
            <img
              src={activeMatch.profile.photos[0] || (activeMatch.profile as any).image}
              alt={activeMatch.profile.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex items-center gap-6 mb-8">
            <button
              onClick={() => setIsCalling(null)}
              className="w-14 h-14 rounded-full bg-rose-600 hover:bg-rose-500 flex items-center justify-center text-white shadow-xl shadow-rose-600/40 transition-transform active:scale-90"
              title="End Call"
            >
              <X className="w-7 h-7" />
            </button>
          </div>
        </div>
      )}

      {/* AI Icebreaker Modal */}
      {showIcebreakers && (
        <IcebreakerModal
          senderProfile={currentUser}
          matchProfile={activeMatch.profile}
          onClose={() => setShowIcebreakers(false)}
          onSelectIcebreaker={(text) => handleSendMessage(text)}
        />
      )}
    </div>
  );
};

