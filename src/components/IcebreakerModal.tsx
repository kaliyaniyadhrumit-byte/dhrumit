import React, { useState, useEffect } from 'react';
import { Sparkles, MessageCircle, RefreshCw, Copy, Check, Send, Heart, Lightbulb, Compass, Flame } from 'lucide-react';
import { Profile, Gender } from '../types';

interface IcebreakerModalProps {
  senderProfile: Profile;
  matchProfile: Profile;
  onClose: () => void;
  onSelectIcebreaker: (text: string) => void;
}

interface IcebreakerOption {
  category: string;
  text: string;
}

export const IcebreakerModal: React.FC<IcebreakerModalProps> = ({
  senderProfile,
  matchProfile,
  onClose,
  onSelectIcebreaker,
}) => {
  const [loading, setLoading] = useState(false);
  const [selectedTone, setSelectedTone] = useState('witty and charming');
  const [commonGround, setCommonGround] = useState<string>('');
  const [icebreakers, setIcebreakers] = useState<IcebreakerOption[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [isAiGenerated, setIsAiGenerated] = useState(false);

  const fetchIcebreakers = async (tone: string) => {
    setLoading(true);
    try {
      const res = await fetch('/api/generate-icebreakers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userA: senderProfile,
          userB: matchProfile,
          tone: tone,
        }),
      });

      if (!res.ok) throw new Error('API failed');
      const data = await res.json();
      setCommonGround(data.commonGround || `Connected by mutual lifestyle interests in ${matchProfile.city}!`);
      setIcebreakers(data.icebreakers || []);
      setIsAiGenerated(Boolean(data.isAiGenerated));
    } catch (err) {
      console.warn('Fallback icebreakers used:', err);
      // Fallback
      setCommonGround(`Both of you appreciate vibrant lifestyles and good vibes in ${matchProfile.city}!`);
      setIcebreakers([
        {
          category: 'Witty & Playful',
          text: `Hey ${matchProfile.name}! On a scale of 1 to 10, how adventurous are you when picking a coffee spot in ${matchProfile.city}? ☕`,
        },
        {
          category: 'Shared Passion',
          text: `Saw your profile mentions ${matchProfile.interests[0] || 'good food'}! What's one thing in ${matchProfile.city} you can never get tired of?`,
        },
        {
          category: 'Curious & Deep',
          text: `Your prompt really stood out! What's the best piece of advice you've actually taken to heart recently?`,
        },
        {
          category: 'Local Gujarat Vibe',
          text: `If we had a free Sunday evening, are we doing a chill Riverfront walk or hunting for the best street food? ✨`,
        },
      ]);
      setIsAiGenerated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIcebreakers(selectedTone);
  }, []);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard?.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const tones = [
    { label: 'Witty & Fun', value: 'witty and playful' },
    { label: 'Deep & Soulful', value: 'soulful and thoughtful' },
    { label: 'Flirty & Smooth', value: 'flirty and romantic' },
    { label: 'Local Vibe', value: 'Gujarat local culture and humor' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-slate-900 border border-rose-500/40 rounded-3xl overflow-hidden shadow-2xl text-white my-auto max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 bg-gradient-to-r from-rose-950/40 via-slate-900 to-purple-950/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-500 to-amber-400 flex items-center justify-center shadow-lg shadow-rose-500/30">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">AI Wingman Icebreakers</h3>
                {isAiGenerated && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                    Gemini 3.8
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400">Personalized openers tailored to {matchProfile.name}'s bio & hobbies</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Common Ground Banner */}
        {commonGround && (
          <div className="px-5 py-3 bg-rose-500/10 border-b border-rose-500/20 flex items-start gap-2.5">
            <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider block">Profile Synergy</span>
              <p className="text-xs text-rose-100 font-medium">{commonGround}</p>
            </div>
          </div>
        )}

        {/* Tone Filters */}
        <div className="px-5 pt-3.5 pb-2 flex items-center gap-2 overflow-x-auto">
          <span className="text-xs text-slate-400 shrink-0">Tone:</span>
          {tones.map((t) => (
            <button
              key={t.value}
              onClick={() => {
                setSelectedTone(t.value);
                fetchIcebreakers(t.value);
              }}
              className={`text-xs px-3 py-1.5 rounded-xl font-medium shrink-0 transition-all ${
                selectedTone === t.value
                  ? 'bg-gradient-to-r from-rose-600 to-pink-500 text-white shadow-md'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {t.label}
            </button>
          ))}
          <button
            onClick={() => fetchIcebreakers(selectedTone)}
            disabled={loading}
            className="ml-auto p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-50 transition-colors"
            title="Regenerate new icebreakers"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-rose-400' : ''}`} />
          </button>
        </div>

        {/* Icebreaker Cards List */}
        <div className="p-5 space-y-3 overflow-y-auto flex-1">
          {loading ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-10 h-10 mx-auto rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center animate-spin">
                <Sparkles className="w-5 h-5" />
              </div>
              <p className="text-sm font-medium text-slate-300">
                Gemini is analyzing both profiles & hobbies...
              </p>
              <p className="text-xs text-slate-500">
                Comparing {senderProfile.name}'s interests with {matchProfile.name}'s prompts
              </p>
            </div>
          ) : (
            icebreakers.map((item, idx) => (
              <div
                key={idx}
                className="group p-4 rounded-2xl bg-slate-800/70 border border-slate-700/60 hover:border-rose-500/50 transition-all shadow-md space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-700 text-rose-300">
                    {item.category}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleCopy(item.text, idx)}
                      className="p-1.5 rounded-lg bg-slate-700/70 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors text-xs flex items-center gap-1"
                      title="Copy to clipboard"
                    >
                      {copiedIndex === idx ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-[10px] text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                <p className="text-sm text-slate-100 font-medium leading-relaxed">
                  "{item.text}"
                </p>

                <div className="pt-1 flex items-center justify-end">
                  <button
                    onClick={() => {
                      onSelectIcebreaker(item.text);
                      onClose();
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-500 hover:from-rose-500 hover:to-pink-400 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md shadow-rose-600/20 transition-transform active:scale-95"
                  >
                    <span>Use this message</span>
                    <Send className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="p-3.5 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <Heart className="w-3.5 h-3.5 text-rose-400" />
            94% of users reply to personalized openers
          </span>
          <button
            onClick={onClose}
            className="hover:text-white font-medium underline"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
