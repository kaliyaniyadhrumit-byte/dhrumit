import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import {
  ShieldCheck,
  Navigation,
  Phone,
  Share2,
  MapPin,
  Compass,
  AlertTriangle,
  Clock,
  CheckCircle2,
  ExternalLink,
  Search,
  Filter,
  Flame,
  Coffee,
  Sparkles,
  Layers,
  ChevronRight,
  Info
} from 'lucide-react';
import { SafeDateSpot } from '../types';

interface SafeSpotsMapProps {
  spots: SafeDateSpot[];
  selectedSpotId?: string;
  onSelectSpot: (spot: SafeDateSpot) => void;
  onPlanDateWithSpot?: (spot: SafeDateSpot) => void;
  onTriggerSos?: (locationDetails: string) => void;
}

// Calculate distance in kilometers using the Haversine formula
function getDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

export const SafeSpotsMap: React.FC<SafeSpotsMapProps> = ({
  spots,
  selectedSpotId,
  onSelectSpot,
  onPlanDateWithSpot,
  onTriggerSos,
}) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});
  const userMarkerRef = useRef<L.Marker | null>(null);

  // User location state (default to Ahmedabad city center if geolocation not yet granted)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>({
    lat: 23.0338,
    lng: 72.5356,
  });
  const [geoStatus, setGeoStatus] = useState<'prompt' | 'locating' | 'granted' | 'denied'>('prompt');
  const [geoErrorMsg, setGeoErrorMsg] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeSpot, setActiveSpot] = useState<SafeDateSpot>(() => {
    return spots.find((s) => s.id === selectedSpotId) || spots[0];
  });
  const [copiedLink, setCopiedLink] = useState(false);
  const [emergencyAlertActive, setEmergencyAlertActive] = useState(false);

  // Request actual browser geolocation
  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      setGeoStatus('denied');
      setGeoErrorMsg('Geolocation is not supported by your browser.');
      return;
    }

    setGeoStatus('locating');
    setGeoErrorMsg(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setUserLocation(coords);
        setGeoStatus('granted');

        if (mapInstanceRef.current) {
          mapInstanceRef.current.flyTo([coords.lat, coords.lng], 14, {
            duration: 1.5,
          });
        }
      },
      (error) => {
        console.warn('Geolocation error:', error.message);
        setGeoStatus('denied');
        setGeoErrorMsg('Location access was denied or timed out. Defaulted to Ahmedabad center.');
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  };

  // Auto-attempt geolocation on initial mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(coords);
          setGeoStatus('granted');
        },
        () => {
          // Keep default fallback
          setGeoStatus('prompt');
        },
        { timeout: 6000 }
      );
    }
  }, []);

  // Cleanup map instance on component unmount
  useEffect(() => {
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Avoid double initialization
    if (!mapInstanceRef.current) {
      const initialLat = userLocation?.lat || 23.0338;
      const initialLng = userLocation?.lng || 72.5356;

      const map = L.map(mapContainerRef.current, {
        center: [initialLat, initialLng],
        zoom: 13,
        zoomControl: false,
      });

      // Sleek modern tile layer (CartoDB Positron / OSM style for high clarity & dark mode contrast)
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://carto.com/">CARTO</a>, &copy; OpenStreetMap',
        maxZoom: 19,
      }).addTo(map);

      // Add zoom control in top right
      L.control.zoom({ position: 'topright' }).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Render / update user current location marker
    if (userLocation) {
      if (userMarkerRef.current) {
        userMarkerRef.current.setLatLng([userLocation.lat, userLocation.lng]);
      } else {
        const userIcon = L.divIcon({
          className: 'custom-user-marker',
          html: `
            <div class="relative flex items-center justify-center w-8 h-8">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-60"></span>
              <span class="relative inline-flex rounded-full h-4 w-4 bg-blue-600 border-2 border-white shadow-lg"></span>
              <div class="absolute -bottom-6 bg-slate-900/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-400 whitespace-nowrap shadow-md">
                You are here
              </div>
            </div>
          `,
          iconSize: [32, 32],
          iconAnchor: [16, 16],
        });

        userMarkerRef.current = L.marker([userLocation.lat, userLocation.lng], {
          icon: userIcon,
          zIndexOffset: 1000,
        }).addTo(map);
      }
    }

    // Clean up old spot markers
    Object.keys(markersRef.current).forEach((key) => {
      markersRef.current[key]?.remove();
    });
    markersRef.current = {};

    // Filter spots
    const filteredSpots = spots.filter((spot) => {
      const matchCity = selectedCity === 'All' || spot.city === selectedCity;
      const matchCat = selectedCategory === 'All' || spot.category === selectedCategory;
      return matchCity && matchCat;
    });

    // Add markers for each safe date spot
    filteredSpots.forEach((spot) => {
      if (!spot.lat || !spot.lng) return;

      const isSelected = activeSpot.id === spot.id;
      const distance = userLocation
        ? getDistanceKm(userLocation.lat, userLocation.lng, spot.lat, spot.lng)
        : null;

      const markerHtml = `
        <div class="relative group cursor-pointer transition-transform duration-200 ${
          isSelected ? 'scale-110 z-50' : 'hover:scale-105'
        }">
          <div class="px-2.5 py-1 rounded-full ${
            isSelected
              ? 'bg-rose-600 text-white ring-4 ring-rose-500/40'
              : 'bg-slate-900/90 text-emerald-400 border border-emerald-500/50'
          } shadow-xl flex items-center gap-1.5 font-bold text-xs">
            <span class="w-2 h-2 rounded-full ${isSelected ? 'bg-white animate-pulse' : 'bg-emerald-400'}"></span>
            <span>${spot.safetyScore}% Safe</span>
          </div>
          <div class="w-2.5 h-2.5 bg-slate-900 rotate-45 mx-auto -mt-1 ${
            isSelected ? '!bg-rose-600' : ''
          }"></div>
        </div>
      `;

      const customIcon = L.divIcon({
        className: `spot-marker-${spot.id}`,
        html: markerHtml,
        iconSize: [85, 36],
        iconAnchor: [42, 36],
      });

      const marker = L.marker([spot.lat, spot.lng], { icon: customIcon }).addTo(map);

      marker.on('click', () => {
        setActiveSpot(spot);
        onSelectSpot(spot);
        map.flyTo([spot.lat!, spot.lng!], 15, { duration: 1 });
      });

      markersRef.current[spot.id] = marker;
    });

    // Invalidate map size after short delay to ensure correct rendering in modal
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [spots, selectedCity, selectedCategory, activeSpot.id, userLocation]);

  // Handle spot selection from list
  const handleSpotCardClick = (spot: SafeDateSpot) => {
    setActiveSpot(spot);
    onSelectSpot(spot);
    if (mapInstanceRef.current && spot.lat && spot.lng) {
      mapInstanceRef.current.flyTo([spot.lat, spot.lng], 15, { duration: 1.2 });
    }
  };

  // Open Google Maps Directions
  const handleOpenDirections = (spot: SafeDateSpot) => {
    if (!spot.lat || !spot.lng) return;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${spot.lat},${spot.lng}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Copy or share spot link
  const handleShareSpot = (spot: SafeDateSpot) => {
    const text = `HerVibe Verified Safe Date Spot: ${spot.name} (${spot.city} - ${spot.area}). Safety Score: ${spot.safetyScore}%. Address: ${spot.address}. Map: https://maps.google.com/?q=${spot.lat},${spot.lng}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  // Trigger Instant Live GPS SOS
  const handleTriggerLiveSos = () => {
    setEmergencyAlertActive(true);
    const locString = userLocation
      ? `Lat: ${userLocation.lat.toFixed(5)}, Lng: ${userLocation.lng.toFixed(5)} (Near ${activeSpot.name}, ${activeSpot.city})`
      : `Near ${activeSpot.name}, ${activeSpot.city}`;
    
    if (onTriggerSos) {
      onTriggerSos(locString);
    }

    setTimeout(() => {
      setEmergencyAlertActive(false);
    }, 6000);
  };

  const calculatedDistance = userLocation && activeSpot.lat && activeSpot.lng
    ? getDistanceKm(userLocation.lat, userLocation.lng, activeSpot.lat, activeSpot.lng)
    : null;

  return (
    <div className="flex flex-col h-full w-full space-y-3">
      {/* Top Controls Bar: Geolocation Status, City Filter, SOS Quick Dial */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-900/90 p-3 rounded-2xl border border-slate-800 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <button
            onClick={handleDetectLocation}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md ${
              geoStatus === 'granted'
                ? 'bg-blue-600/20 text-blue-300 border border-blue-500/40 hover:bg-blue-600/30'
                : geoStatus === 'locating'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
            }`}
            title="Detect exact live GPS location"
          >
            <Compass className={`w-3.5 h-3.5 ${geoStatus === 'locating' ? 'animate-spin text-amber-400' : 'text-blue-400'}`} />
            <span>
              {geoStatus === 'locating'
                ? 'Finding GPS...'
                : geoStatus === 'granted'
                ? 'GPS Calibrated'
                : 'Locate Me'}
            </span>
          </button>

          {/* Quick City Dropdown */}
          <div className="flex items-center gap-1 text-xs">
            {['All', 'Ahmedabad', 'Surat', 'Mumbai'].map((city) => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                  selectedCity === city
                    ? 'bg-rose-600 text-white font-bold shadow-sm'
                    : 'bg-slate-800/80 text-slate-400 hover:text-white'
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* Emergency Help Action Buttons */}
        <div className="flex items-center gap-1.5 ml-auto">
          <a
            href="tel:112"
            className="px-2.5 py-1.5 rounded-xl bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/40 text-xs font-bold flex items-center gap-1 shadow-sm transition-colors"
            title="Dial 112 National Police Emergency"
          >
            <Phone className="w-3 h-3 text-red-400" />
            <span>112 Police</span>
          </a>

          <a
            href="tel:181"
            className="px-2.5 py-1.5 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/40 text-xs font-bold flex items-center gap-1 shadow-sm transition-colors"
            title="Dial 181 Women Abhayam Helpline"
          >
            <ShieldCheck className="w-3 h-3 text-rose-400" />
            <span>181 Women</span>
          </a>

          <button
            onClick={handleTriggerLiveSos}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white text-xs font-black flex items-center gap-1.5 shadow-md shadow-red-600/30 active:scale-95 transition-all"
            title="Broadcast Live Location SOS"
          >
            <AlertTriangle className="w-3.5 h-3.5 animate-bounce" />
            <span>LIVE SOS</span>
          </button>
        </div>
      </div>

      {/* Emergency Alert Toast */}
      {emergencyAlertActive && (
        <div className="p-3 bg-red-950/90 border border-red-500 text-red-200 rounded-2xl text-xs flex items-center justify-between animate-pulse shadow-xl">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
            <div>
              <span className="font-bold text-white block">Emergency SOS Broadcast Active!</span>
              <span>Sending real-time GPS coordinates ({userLocation?.lat.toFixed(4)}, {userLocation?.lng.toFixed(4)}) to emergency contacts and nearby verified spot guards.</span>
            </div>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-600 text-white">DISPATCHING</span>
        </div>
      )}

      {/* Map Display & Interactive Spot Pin Container */}
      <div className="relative w-full h-64 sm:h-72 rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl bg-slate-950">
        <div ref={mapContainerRef} className="w-full h-full z-10" />

        {/* Floating Overlay Info Badge on Map */}
        <div className="absolute top-3 left-3 z-20 pointer-events-none">
          <div className="px-3 py-1.5 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80 text-white shadow-lg flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <div className="text-[11px] leading-tight">
              <span className="font-bold text-emerald-300">HerVibe Safe Zone Network</span>
              <span className="text-slate-400 block">{spots.length} Verified Spots Monitored</span>
            </div>
          </div>
        </div>

        {/* Floating 'Fly to Selected Spot' button if off-center */}
        <div className="absolute bottom-3 right-3 z-20">
          <button
            onClick={() => {
              if (mapInstanceRef.current && activeSpot.lat && activeSpot.lng) {
                mapInstanceRef.current.flyTo([activeSpot.lat, activeSpot.lng], 15, { duration: 1 });
              }
            }}
            className="p-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-rose-400 border border-slate-700/80 shadow-lg backdrop-blur-md transition-all active:scale-95 flex items-center gap-1.5 text-xs font-bold"
            title="Recenter on Selected Spot"
          >
            <Navigation className="w-4 h-4" />
            <span>Focus Spot</span>
          </button>
        </div>
      </div>

      {/* Highlighted Safe Spot Details Card with One-Tap Navigation & Helpline Actions */}
      <div className="p-4 bg-gradient-to-br from-slate-900 via-slate-900/95 to-slate-950 border border-slate-800 rounded-2xl shadow-xl space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <img
              src={activeSpot.image}
              alt={activeSpot.name}
              className="w-16 h-16 rounded-xl object-cover border border-white/10 shrink-0 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-white tracking-tight">{activeSpot.name}</h4>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> {activeSpot.safetyScore}% Safe
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-rose-400 shrink-0" />
                <span>{activeSpot.area}, {activeSpot.city}</span>
                {calculatedDistance !== null && (
                  <span className="text-blue-400 font-bold ml-1">• {calculatedDistance} km away</span>
                )}
              </p>
              <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                <Clock className="w-3 h-3 text-amber-400 shrink-0" />
                <span>Open: {activeSpot.openHours || '10:00 AM - 11:30 PM'}</span>
              </p>
            </div>
          </div>

          {/* Action Buttons: One-tap Navigation & Itinerary Planner */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => handleOpenDirections(activeSpot)}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-blue-600/30 active:scale-95 transition-transform"
              title="Launch Turn-by-turn Navigation in Google Maps"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>One-Tap Navigate</span>
            </button>

            {onPlanDateWithSpot && (
              <button
                onClick={() => onPlanDateWithSpot(activeSpot)}
                className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-pink-500 hover:from-rose-500 hover:to-pink-400 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-rose-600/30 active:scale-95 transition-transform"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Plan Date Here</span>
              </button>
            )}
          </div>
        </div>

        {/* Spot Safety Features Chips */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {activeSpot.features.map((feature, idx) => (
            <span
              key={idx}
              className="text-[10px] px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 flex items-center gap-1"
            >
              <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
              {feature}
            </span>
          ))}
        </div>

        {/* Quick Contact & Share Bar */}
        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <a
              href={`tel:${activeSpot.phone}`}
              className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Spot Desk: {activeSpot.phone}</span>
            </a>
          </div>

          <button
            onClick={() => handleShareSpot(activeSpot)}
            className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors"
          >
            <Share2 className="w-3.5 h-3.5 text-rose-400" />
            <span>{copiedLink ? 'Location Copied!' : 'Share Spot'}</span>
          </button>
        </div>
      </div>

      {/* Horizontal Carousel of Nearby Recommended Verified Spots */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Recommended Safe Spots ({selectedCity})
          </span>
          <span className="text-slate-500 text-[11px]">Click spot to focus on map</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {spots
            .filter((s) => selectedCity === 'All' || s.city === selectedCity)
            .slice(0, 4)
            .map((spot) => {
              const isSelected = spot.id === activeSpot.id;
              const dist = userLocation && spot.lat && spot.lng
                ? getDistanceKm(userLocation.lat, userLocation.lng, spot.lat, spot.lng)
                : null;

              return (
                <div
                  key={spot.id}
                  onClick={() => handleSpotCardClick(spot)}
                  className={`p-2.5 rounded-2xl cursor-pointer transition-all border text-left ${
                    isSelected
                      ? 'bg-rose-950/40 border-rose-500 ring-2 ring-rose-500/30'
                      : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">
                      {spot.safetyScore}%
                    </span>
                    {dist !== null && (
                      <span className="text-[10px] text-blue-400 font-semibold">{dist}km</span>
                    )}
                  </div>
                  <h5 className="text-xs font-bold text-white truncate">{spot.name}</h5>
                  <p className="text-[10px] text-slate-400 truncate">{spot.area}</p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
