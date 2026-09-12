import React, { useState } from 'react';
import {
  Shield,
  AlertTriangle,
  PhoneCall,
  MapPin,
  Clock,
  UserCheck,
  CheckCircle2,
  Calendar,
  X,
  Share2,
  Lock,
  ChevronRight,
  Sparkles,
  Navigation,
  Send,
  Compass,
  Phone
} from 'lucide-react';
import { safeDateSpots } from '../data/datingData';
import { SafeDateSpot } from '../types';
import { SafeSpotsMap } from './SafeSpotsMap';

interface SafetyHubModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenVerification: () => void;
  onSaveSafeDate?: (datePlan: {
    matchName: string;
    venue: string;
    city: string;
    dateTime: string;
    emergencyContact: string;
  }) => Promise<void>;
  savedDates?: Array<{
    id: string;
    matchName: string;
    venue: string;
    city: string;
    dateTime: string;
    emergencyContact: string;
    status: string;
  }>;
}

export const SafetyHubModal: React.FC<SafetyHubModalProps> = ({
  isOpen,
  onClose,
  onOpenVerification,
  onSaveSafeDate,
  savedDates = [],
}) => {
  const [activeTab, setActiveTab] = useState<'map' | 'sos' | 'safeDate' | 'guidelines'>('map');
  const [selectedSpotId, setSelectedSpotId] = useState<string>(safeDateSpots[0].id);
  const [matchName, setMatchName] = useState('Aarav / Date Partner');
  const [dateDate, setDateDate] = useState('Tomorrow, 6:00 PM');
  const [emergencyPhone, setEmergencyPhone] = useState('+91 98765 43210 (Sister / Bestie)');
  const [isBookingSaved, setIsBookingSaved] = useState(false);
  const [sosSent, setSosSent] = useState(false);
  const [sosDispatchDetails, setSosDispatchDetails] = useState<string>('');

  if (!isOpen) return null;

  const handleCreateSafePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    const spot = safeDateSpots.find((s) => s.id === selectedSpotId) || safeDateSpots[0];
    if (onSaveSafeDate) {
      await onSaveSafeDate({
        matchName,
        venue: spot.name,
        city: spot.city,
        dateTime: dateDate,
        emergencyContact: emergencyPhone,
      });
    }
    setIsBookingSaved(true);
    setTimeout(() => {
      setIsBookingSaved(false);
      setActiveTab('safeDate');
    }, 2000);
  };

  const handleSimulateSos = (locationDetails?: string) => {
    setSosSent(true);
    setSosDispatchDetails(
      locationDetails || 'Live GPS Location broadcasted to local emergency networks'
    );
    setTimeout(() => {
      setSosSent(false);
    }, 7000);
  };

  const handlePlanDateFromMap = (spot: SafeDateSpot) => {
    setSelectedSpotId(spot.id);
    setActiveTab('safeDate');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-xl animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-950 border border-white/10 rounded-[32px] overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.9)] text-white flex flex-col my-auto max-h-[94vh]">
        {/* Ambient background glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-red-950/80 via-slate-900/95 to-slate-950 border-b border-white/10 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-red-600 via-rose-600 to-amber-500 flex items-center justify-center shadow-lg shadow-red-600/30">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white tracking-tight">HerVibe Safety & Trust Hub</h3>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Active Shield
                </span>
              </div>
              <p className="text-xs text-slate-400">
                24/7 Women Protection • Leaflet Live Safe Spots • One-Tap SOS
              </p>
            </div>
          </div>

          {/* Quick Emergency Helplines & Close */}
          <div className="flex items-center gap-2">
            <a
              href="tel:112"
              className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-xl bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/30 text-xs font-bold transition-colors"
              title="Call 112 Police"
            >
              <Phone className="w-3.5 h-3.5 text-red-400" />
              <span>112 Police</span>
            </a>

            <a
              href="tel:181"
              className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/30 text-xs font-bold transition-colors"
              title="Call 181 Abhayam Helpline"
            >
              <Shield className="w-3.5 h-3.5 text-rose-400" />
              <span>181 Abhayam</span>
            </a>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors border border-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center border-b border-slate-800 bg-slate-900/60 px-3 sm:px-5 pt-2 overflow-x-auto scrollbar-none z-10">
          <button
            onClick={() => setActiveTab('map')}
            className={`px-3.5 py-2.5 text-xs font-bold border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'map'
                ? 'border-emerald-500 text-emerald-400 bg-emerald-500/10 rounded-t-xl'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Verified Safe Spots Map</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 font-bold">
              GPS
            </span>
          </button>

          <button
            onClick={() => setActiveTab('sos')}
            className={`px-3.5 py-2.5 text-xs font-bold border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'sos'
                ? 'border-red-500 text-red-400 bg-red-500/10 rounded-t-xl'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <AlertTriangle className="w-4 h-4" />
            <span>Rapid SOS & Helplines</span>
          </button>

          <button
            onClick={() => setActiveTab('safeDate')}
            className={`px-3.5 py-2.5 text-xs font-bold border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'safeDate'
                ? 'border-rose-500 text-rose-400 bg-rose-500/10 rounded-t-xl'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Safe Date Itinerary Planner</span>
          </button>

          <button
            onClick={() => setActiveTab('guidelines')}
            className={`px-3.5 py-2.5 text-xs font-bold border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'guidelines'
                ? 'border-blue-500 text-blue-400 bg-blue-500/10 rounded-t-xl'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>Safety Guidelines</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4 z-10 scrollbar-none">
          {/* TAB 1: DYNAMIC LEAFLET MAP OF VERIFIED SAFE SPOTS */}
          {activeTab === 'map' && (
            <SafeSpotsMap
              spots={safeDateSpots}
              selectedSpotId={selectedSpotId}
              onSelectSpot={(spot) => setSelectedSpotId(spot.id)}
              onPlanDateWithSpot={handlePlanDateFromMap}
              onTriggerSos={handleSimulateSos}
            />
          )}

          {/* TAB 2: RAPID SOS & HELPLINES */}
          {activeTab === 'sos' && (
            <div className="space-y-4">
              {/* Emergency alert status */}
              {sosSent && (
                <div className="p-4 rounded-2xl bg-red-600/20 border border-red-500 text-red-200 text-xs flex items-start gap-3 animate-pulse">
                  <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-white text-sm">Emergency Dispatch Triggered</h5>
                    <p className="mt-1">
                      {sosDispatchDetails || 'Simulated alert sent to emergency contacts with real-time GPS coordinates and local police station ping.'}
                    </p>
                  </div>
                </div>
              )}

              {/* Big Red SOS Button */}
              <div className="p-6 rounded-3xl bg-gradient-to-b from-red-950/60 to-slate-900 border border-red-500/40 text-center space-y-3 shadow-xl">
                <h4 className="text-sm font-bold text-red-300 uppercase tracking-wider">
                  One-Tap Emergency Alert
                </h4>
                <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                  Silently alerts emergency contacts with your live GPS location and notifies nearby HerVibe Safe Spot partners.
                </p>

                <button
                  onClick={() => handleSimulateSos()}
                  className="w-36 h-36 mx-auto rounded-full bg-gradient-to-tr from-red-600 via-rose-600 to-amber-500 hover:from-red-500 hover:to-rose-400 text-white font-black text-xl flex flex-col items-center justify-center shadow-2xl shadow-red-600/50 active:scale-95 transition-all border-4 border-red-400/30"
                >
                  <AlertTriangle className="w-8 h-8 mb-1 animate-bounce" />
                  <span>SOS</span>
                  <span className="text-[10px] font-medium tracking-normal text-red-100">Tap to Dispatch</span>
                </button>
              </div>

              {/* National Verified Helplines */}
              <div className="space-y-2">
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Emergency Helplines (Direct Call)
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <a
                    href="tel:112"
                    className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-red-500/60 flex items-center justify-between group transition-colors shadow-md"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-red-500/20 text-red-400">
                        <PhoneCall className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-red-300">
                          112 All India Police
                        </div>
                        <div className="text-[11px] text-slate-400">National Emergency Response</div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-red-400">Dial 112</span>
                  </a>

                  <a
                    href="tel:181"
                    className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-rose-500/60 flex items-center justify-between group transition-colors shadow-md"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400">
                        <PhoneCall className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-rose-300">
                          181 Abhayam Helpline
                        </div>
                        <div className="text-[11px] text-slate-400">Gujarat Women Protection</div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-rose-400">Dial 181</span>
                  </a>

                  <a
                    href="tel:1091"
                    className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/60 flex items-center justify-between group transition-colors shadow-md"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
                        <PhoneCall className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-amber-300">
                          1091 Women in Distress
                        </div>
                        <div className="text-[11px] text-slate-400">National Commission for Women</div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-amber-400">Dial 1091</span>
                  </a>

                  <button
                    onClick={() => setActiveTab('map')}
                    className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/60 flex items-center justify-between group transition-colors shadow-md"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div className="text-left">
                        <div className="text-xs font-bold text-white group-hover:text-emerald-300">
                          Find Nearest Safe Spot
                        </div>
                        <div className="text-[11px] text-slate-400">View Verified Havens with CCTV</div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-emerald-400">Open Map →</span>
                  </button>
                </div>
              </div>

              {/* Profile Verification shortcut */}
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                <div>
                  <h5 className="text-xs font-bold text-white">Trust & Background Verification</h5>
                  <p className="text-[11px] text-slate-400">Complete Video selfie and Govt ID verification</p>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onOpenVerification();
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-600/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold hover:bg-emerald-600/30 transition-colors"
                >
                  Verify Now
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: SAFE DATE ITINERARY PLANNER */}
          {activeTab === 'safeDate' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 text-xs text-emerald-200 flex items-center justify-between">
                <div>
                  <span className="font-bold text-emerald-100">Safe Date Protocol:</span> Whenever meeting someone new, always pick a verified public spot, set a check-in timer, and share the itinerary with a trusted friend.
                </div>
                <button
                  onClick={() => setActiveTab('map')}
                  className="ml-3 px-3 py-1 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-bold text-xs border border-emerald-500/40 shrink-0"
                >
                  Browse Map
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleCreateSafePlan} className="space-y-3.5">
                <div>
                  <label className="text-xs font-bold text-slate-400 block mb-1">
                    Select Safe Partner Venue
                  </label>
                  <select
                    value={selectedSpotId}
                    onChange={(e) => setSelectedSpotId(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700/80 rounded-2xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-rose-500 shadow-inner"
                  >
                    {safeDateSpots.map((spot) => (
                      <option key={spot.id} value={spot.id}>
                        {spot.name} • {spot.city} ({spot.area}) - Safety Score: {spot.safetyScore}%
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-400 block mb-1">
                      Meeting With (Match Name)
                    </label>
                    <input
                      type="text"
                      value={matchName}
                      onChange={(e) => setMatchName(e.target.value)}
                      placeholder="e.g. Aarav Patel"
                      className="w-full bg-slate-900 border border-slate-700/80 rounded-2xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-rose-500 shadow-inner"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-400 block mb-1">
                      Date & Meeting Time
                    </label>
                    <input
                      type="text"
                      value={dateDate}
                      onChange={(e) => setDateDate(e.target.value)}
                      placeholder="e.g. Tomorrow, 6:00 PM"
                      className="w-full bg-slate-900 border border-slate-700/80 rounded-2xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-rose-500 shadow-inner"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-400 block mb-1">
                    Emergency Contact to Notify
                  </label>
                  <input
                    type="text"
                    value={emergencyPhone}
                    onChange={(e) => setEmergencyPhone(e.target.value)}
                    placeholder="+91 Phone or Name"
                    className="w-full bg-slate-900 border border-slate-700/80 rounded-2xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-rose-500 shadow-inner"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 transition-all active:scale-95"
                >
                  {isBookingSaved ? (
                    <span className="flex items-center gap-1 text-emerald-200">
                      <CheckCircle2 className="w-4 h-4" /> Itinerary Saved & Contact Monitored!
                    </span>
                  ) : (
                    <>
                      <Shield className="w-4 h-4" />
                      <span>Save Safe Date Itinerary & Start Safety Watch</span>
                    </>
                  )}
                </button>
              </form>

              {/* Saved safe date itineraries */}
              {savedDates.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Your Active Safe Date Plans
                  </h5>
                  {savedDates.map((item) => (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800 flex items-center justify-between shadow-md"
                    >
                      <div>
                        <div className="text-xs font-bold text-white flex items-center gap-1.5">
                          <span>{item.matchName}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold">
                            {item.venue}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          {item.dateTime} • Emergency contact: {item.emergencyContact}
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Watch Active
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: SAFETY GUIDELINES */}
          {activeTab === 'guidelines' && (
            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1.5 shadow-md">
                <h5 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-rose-400" />
                  1. Keep Conversations In-App
                </h5>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Never share WhatsApp, personal home address, or UPI details before meeting in a verified public cafe. HerVibe provides end-to-end encrypted audio and video calling within the app.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1.5 shadow-md">
                <h5 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-blue-400" />
                  2. Choose HerVibe Verified Venues
                </h5>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Always choose partner cafes and public spots with high CCTV coverage, verified management, and active security patrols. Use our interactive map to get one-tap directions.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1.5 shadow-md">
                <h5 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-emerald-400" />
                  3. Trust the Safety Score
                </h5>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Profiles with 90%+ scores have passed DigiLocker Govt ID checks, live video selfie liveness, and signed our HerVibe Women-First Charter.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-white/10 flex items-center justify-between z-10">
          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span>HerVibe Guardian System • Real-Time Protection</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-bold transition-colors border border-white/10"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
