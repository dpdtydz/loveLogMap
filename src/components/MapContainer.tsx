/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { MemoryPlace, UserProfile } from '../types';
import { defaultUsers } from '../data/mockData';
import { Camera, MapPin, Plus, Navigation, Trash2, MessageSquare, Star, Smile, Sparkles, Heart } from 'lucide-react';
import EXIF from 'exif-js';

// Load leaflet styles dynamically if not loaded, keep vanilla safe
interface MapContainerProps {
  memories: MemoryPlace[];
  currentUser: UserProfile;
  onMapClickToAdd: (lat: number, lng: number) => void;
  onSelectPlace: (place: MemoryPlace) => void;
  selectedPlace: MemoryPlace | null;
}

export default function MapContainer({
  memories,
  currentUser,
  onMapClickToAdd,
  onSelectPlace,
  selectedPlace
}: MapContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});
  const polylineRef = useRef<L.Polyline | null>(null);

  // Initialize Map
  useEffect(() => {
    if (!containerRef.current) return;

    // Standard Leaflet Initialization
    if (!mapRef.current) {
      // Default to general Seoul center, then immediately query GPS
      const defaultCenter: L.LatLngTuple = [37.5665, 126.9780];
      mapRef.current = L.map(containerRef.current, {
        center: defaultCenter,
        zoom: 12,
        zoomControl: false, 
        attributionControl: false
      });

      // CartoDB Voyager style for gorgeous warm beige cream couple-friendly tiles
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        maxZoom: 19
      }).addTo(mapRef.current);

      // Attempt to load GPS immediately to focus on user's current location surroundings
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            mapRef.current?.setView([pos.coords.latitude, pos.coords.longitude], 13);
          },
          (err) => {
            console.warn("Geolocation lookup failed or denied at init. Default to baseline.", err);
          },
          { enableHighAccuracy: true, timeout: 50 * 1000 }
        );
      }

      // Listen for map clicks to offer adding places
      mapRef.current.on('click', (e: L.LeafletMouseEvent) => {
        // Prevent clicking marker from double-triggering maps click
        if (e.originalEvent.defaultPrevented) return;
        onMapClickToAdd(e.latlng.lat, e.latlng.lng);
      });
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Update Markers and Polyline on memories change
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Clear existing markers with error resiliency
    try {
      Object.values(markersRef.current).forEach(marker => {
        if (marker) {
          map.removeLayer(marker);
        }
      });
    } catch (err) {
      console.warn("Cleared markers wrapper failure catch:", err);
    }
    markersRef.current = {};

    // Clear existing polyline with error resiliency
    try {
      if (polylineRef.current) {
        map.removeLayer(polylineRef.current);
        polylineRef.current = null;
      }
    } catch (err) {
      console.warn("Cleared polyline wrapper failure catch:", err);
    }

    // Sort memories chronologically to draw sequence lines and allocate numbers
    const sortedMemories = [...memories].sort(
      (a, b) => {
        const timeA = a.visitDate ? new Date(a.visitDate).getTime() : 0;
        const timeB = b.visitDate ? new Date(b.visitDate).getTime() : 0;
        return timeA - timeB;
      }
    );

    const latlngs: L.LatLngTuple[] = [];

    // Draw customized circular photograph markers
    sortedMemories.forEach((place, index) => {
      // Robustly convert and validate coordinates to prevent L.marker invalid coordinates runtime crashes
      const lat = Number(place.latitude);
      const lng = Number(place.longitude);
      if (isNaN(lat) || isNaN(lng)) {
        console.warn(`Skipped rendering marker for place ${place.id} due to invalid coords:`, place.latitude, place.longitude);
        return;
      }

      const position: L.LatLngTuple = [lat, lng];
      latlngs.push(position);

      const isHighlight = selectedPlace?.id === place.id;
      const markerNumber = index + 1; // Visit sequence number

      // HTML template for our beautiful couple custom circular/rounded photos
      const customHtml = `
        <div id="marker-${place.id}" class="relative flex items-center justify-center cursor-pointer group select-none">
          <!-- Image Container with White Photographic Border -->
          <div class="relative w-14 h-14 bg-white p-[3px] rounded-xl shadow-xl border-2 ${
            isHighlight ? 'border-rose-500 scale-110 ring-4 ring-rose-500/30' : 'border-neutral-200/70 hover:border-rose-400'
          } flex items-center justify-center transform active:scale-95 transition-all duration-300">
            <img 
              src="${place.photoUrl || 'https://images.unsplash.com/photo-1542296332-2e4473fac563?q=80&w=600'}" 
              class="w-full h-full object-cover rounded-lg" 
              referrerpolicy="no-referrer"
              alt="Memory marker" 
            />
            <!-- Badge overlay (Visit Sequence) -->
            <div class="absolute -top-2 -right-2 bg-gradient-to-r from-rose-400 to-pink-500 text-white font-sans text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-white flex items-center justify-center min-w-[20px] h-5 shadow-sm">
              ${markerNumber}
            </div>
          </div>
          <!-- Tiny bottom triangle anchor -->
          <div class="absolute -bottom-1.5 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white rotate-45 border-r border-b border-neutral-200 ${
            isHighlight ? 'bg-rose-500 border-rose-500' : ''
          }"></div>
        </div>
      `;

      try {
        const customIcon = L.divIcon({
          html: customHtml,
          className: 'custom-map-marker',
          iconSize: [56, 56],
          iconAnchor: [28, 56]
        });

        const marker = L.marker(position, { icon: customIcon })
          .addTo(map)
          .on('click', (e) => {
            // Stop propagation on native MouseEvent to prevent event bubbling to Map Click Addition listener!
            if (e && e.originalEvent) {
              L.DomEvent.stopPropagation(e.originalEvent);
            }
            onSelectPlace(place);
          });

        markersRef.current[place.id] = marker;
      } catch (err) {
        console.error(`Marker creation failure for place ID ${place.id}:`, err);
      }
    });

    // Draw dashed connecting path between memories chronologically (Warm Pink-Rose)
    try {
      if (latlngs.length > 1) {
        polylineRef.current = L.polyline(latlngs, {
          color: '#f43f5e', // Warm Rose connect line
          weight: 3.5,
          dashArray: '6, 10', // Beautiful dash/dotted line
          lineCap: 'round',
          lineJoin: 'round',
          opacity: 0.8
        }).addTo(map);
      }
    } catch (err) {
      console.error("Polyline creation error:", err);
    }
  }, [memories, selectedPlace]);

  // Handle zooming to the selected place when changed with number check and try-catch
  useEffect(() => {
    if (selectedPlace && mapRef.current) {
      const lat = Number(selectedPlace.latitude);
      const lng = Number(selectedPlace.longitude);
      if (!isNaN(lat) && !isNaN(lng)) {
        try {
          mapRef.current.setView([lat, lng], 13, {
            animate: true,
            duration: 0.8
          });
        } catch (err) {
          console.warn("Zoom and transition to selected place failed:", err);
        }
      }
    }
  }, [selectedPlace]);

  // Center to default view or fit all marks on screen
  const handleFitAllOrCenterDefault = () => {
    if (mapRef.current) {
      if (memories.length > 0) {
        const latlngs = memories.map(m => L.latLng(m.latitude, m.longitude));
        const bounds = L.latLngBounds(latlngs);
        mapRef.current.fitBounds(bounds, { padding: [40, 40], maxZoom: 15 });
      } else {
        // 서울 중심 기본 뷰
        mapRef.current.setView([37.5665, 126.9780], 12, { animate: true });
      }
    }
  };

  // Find user geolocation
  const handleMyLocation = () => {
    if (mapRef.current) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            mapRef.current?.setView([pos.coords.latitude, pos.coords.longitude], 14, {
              animate: true
            });
            
            // Add a beautiful pulsing temporary current location marker
            L.circle([pos.coords.latitude, pos.coords.longitude], {
              radius: 60,
              color: '#d946ef',
              fillColor: '#f472b6',
              fillOpacity: 0.5
            }).addTo(mapRef.current);
          },
          (err) => {
            console.warn('Geolocation failed:', err);
            let reason = '위치 제공 권한이 거부되었거나 일시적으로 신호를 찾을 수 없습니다.';
            if (err.code === 1) {
              reason = '위치 정보 공유 권한이 거부되었습니다. 브라우저 설정에서 위치 권한을 허용해 주세요.';
            } else if (err.code === 2) {
              reason = '위치 탐색에 실패했습니다. GPS 신호 수신 상태를 확인해 주세요.';
            } else if (err.code === 3) {
              reason = '위치 요청 시간이 초과되었습니다.';
            }
            
            alert(`📍 위치 연동 실패:\n${reason}\n\n* AI Studio 미리보기(iframe) 환경에서는 브라우저 보안 규정상 모바일 내 위치 조회가 제한될 수 있습니다. 화면 최상단의 "새 창(새 탭)으로 앱 열기" 버튼을 누르시면 정상적으로 자신의 위치 지도가 로드됩니다!`);
            handleFitAllOrCenterDefault();
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
          }
        );
      } else {
        alert('이 기기/브라우저는 GPS 위치 조회를 지원하지 않습니다.');
        handleFitAllOrCenterDefault();
      }
    }
  };

  return (
    <div className="relative w-full h-full bg-[#faf6f0] overflow-hidden">
      {/* Map Target Div */}
      <div id="couple-leaflet-map" ref={containerRef} className="w-full h-full" />

      {/* Map Interactions Overlay */}
      <div className="absolute right-4 bottom-24 z-10 flex flex-col space-y-2.5 items-end">
        {/* Fit All Memories */}
        <div className="flex items-center space-x-1.5 pointer-events-auto">
          <span className="text-[9px] font-black text-rose-600 bg-white/95 backdrop-blur-xs px-2.5 py-1.2 rounded-lg border border-rose-100 shadow-3xs whitespace-nowrap">
            📍 전체 추억 한눈에
          </span>
          <button
            onClick={handleFitAllOrCenterDefault}
            className="w-10.5 h-10.5 bg-white/90 backdrop-blur-md rounded-xl shadow-md border border-stone-250/50 flex items-center justify-center text-rose-500 active:scale-95 transition-all duration-150 hover:bg-stone-50 hover:text-rose-600"
            title="기본 시야 / 전체 추억 보기"
            id="btn-map-center-jeju"
          >
            <Sparkles className="w-4.5 h-4.5 text-amber-500" />
          </button>
        </div>

        {/* My Geolocation */}
        <div className="flex items-center space-x-1.5 pointer-events-auto">
          <span className="text-[9px] font-black text-stone-600 bg-white/95 backdrop-blur-xs px-2.5 py-1.2 rounded-lg border border-stone-200 shadow-3xs whitespace-nowrap">
            🔍 내 위치 가기
          </span>
          <button
            onClick={handleMyLocation}
            className="w-10.5 h-10.5 bg-gradient-to-br from-rose-450 to-pink-500 hover:from-rose-500 hover:to-pink-600 rounded-xl shadow-md flex items-center justify-center text-white active:scale-95 transition-all duration-150"
            title="내 위치 가기"
            id="btn-map-my-location"
          >
            <Navigation className="w-4.5 h-4.5 fill-current" />
          </button>
        </div>
      </div>

      <div className="absolute left-4 top-4 z-10 pointer-events-none">
        <div className="bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-md border border-stone-200/60 flex items-center space-x-2 text-xs font-semibold text-stone-700">
          <Heart className="w-3 h-3 text-rose-500 fill-rose-400 animate-pulse" />
          <span>우리의 추억 동선: {memories.length}곳</span>
        </div>
      </div>
    </div>
  );
}
