/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  UserProfile,
  MemoryPlace,
  CoupleTrip,
  PlannerItem,
  QuickMessage,
  UserComment
} from './types';
import {
  defaultUsers,
  defaultTrips,
  defaultMemories,
  defaultPlanner,
  defaultMessages
} from './data/mockData';
import MapContainer from './components/MapContainer';
import TimelineView from './components/TimelineView';
import PlannerView from './components/PlannerView';
import CoupleSettings from './components/CoupleSettings';

import {
  Heart,
  Map,
  BookOpen,
  CalendarDays,
  Settings,
  Plus,
  Send,
  X,
  Star,
  Camera,
  MapPin,
  Music,
  ChevronRight,
  MessageSquare,
  Smile,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import EXIF from 'exif-js';

export default function App() {
  // Load initial states from LocalStorage or Fallback Mock Data
  const [memories, setMemories] = useState<MemoryPlace[]>(() => {
    const saved = localStorage.getItem('couple_memories');
    return saved ? JSON.parse(saved) : defaultMemories;
  });

  const [trips, setTrips] = useState<CoupleTrip[]>(() => {
    const saved = localStorage.getItem('couple_trips');
    return saved ? JSON.parse(saved) : defaultTrips;
  });

  const [plannerItems, setPlannerItems] = useState<PlannerItem[]>(() => {
    const saved = localStorage.getItem('couple_planner');
    return saved ? JSON.parse(saved) : defaultPlanner;
  });

  const [messages, setMessages] = useState<QuickMessage[]>(() => {
    const saved = localStorage.getItem('couple_messages');
    return saved ? JSON.parse(saved) : defaultMessages;
  });

  const [bgmSong, setBgmSong] = useState(() => {
    return localStorage.getItem('couple_bgm') || 'BGM President · 코로 부는 리코더 🎶';
  });

  const [coupleCode, setCoupleCode] = useState(() => {
    const saved = localStorage.getItem('couple_code');
    if (saved) return saved;
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    localStorage.setItem('couple_code', code);
    return code;
  });

  // Switch between simulation users and manage stateful user profiles
  const [userProfile1, setUserProfile1] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('couple_user_1');
    return saved ? JSON.parse(saved) : defaultUsers[0];
  });

  const [userProfile2, setUserProfile2] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('couple_user_2');
    return saved ? JSON.parse(saved) : defaultUsers[1];
  });

  const [anniversaryDate, setAnniversaryDate] = useState(() => {
    return localStorage.getItem('couple_anniversary') || '2026-06-01'; // Default fresh start date
  });

  const [activeUserId, setActiveUserId] = useState<'user1' | 'user2'>('user1');
  const currentUser = activeUserId === 'user1' ? userProfile1 : userProfile2;
  const otherUser = activeUserId === 'user1' ? userProfile2 : userProfile1;

  // Navigation Active View
  const [activeTab, setActiveTab] = useState<'map' | 'timeline' | 'planner' | 'settings'>('map');

  // Selected place for highlighting/flying to
  const [selectedPlace, setSelectedPlace] = useState<MemoryPlace | null>(null);

  // Chat/Floating message bar at normal bottom
  const [chatInput, setChatInput] = useState('');
  const [hearts, setHearts] = useState<{ id: number; x: number; size: number; delay: number }[]>([]);

  // Add Memory Modal controller
  const [showAddModal, setShowAddModal] = useState(false);
  const [showChatDrawer, setShowChatDrawer] = useState(false);
  const [showMusicOverlay, setShowMusicOverlay] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newPhoto, setNewPhoto] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newCategory, setNewCategory] = useState<'food' | 'cafe' | 'activity' | 'stay' | 'scenery' | 'other'>('food');
  const [newLat, setNewLat] = useState(33.3617);
  const [newLng, setNewLng] = useState(126.5292);
  const [newDate, setNewDate] = useState('2026-04-15T12:00');
  const [newTripId, setNewTripId] = useState('trip1');
  const [isGpsExtracted, setIsGpsExtracted] = useState(false);

  // Clear residual/old browser caches of pre-existing mock data for a clean production start
  useEffect(() => {
    const isMockCleared = localStorage.getItem('couple_mock_cleared_v5');
    if (!isMockCleared) {
      localStorage.setItem('couple_memories', JSON.stringify([]));
      localStorage.setItem('couple_trips', JSON.stringify([]));
      localStorage.setItem('couple_planner', JSON.stringify([]));
      localStorage.setItem('couple_messages', JSON.stringify([]));
      localStorage.setItem('couple_mock_cleared_v5', 'true');
      
      setMemories([]);
      setTrips([]);
      setPlannerItems([]);
      setMessages([]);
    }
  }, []);

  // Save changes to localstorage when states mutate
  useEffect(() => {
    localStorage.setItem('couple_memories', JSON.stringify(memories));
  }, [memories]);

  useEffect(() => {
    localStorage.setItem('couple_trips', JSON.stringify(trips));
  }, [trips]);

  useEffect(() => {
    localStorage.setItem('couple_planner', JSON.stringify(plannerItems));
  }, [plannerItems]);

  useEffect(() => {
    localStorage.setItem('couple_messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('couple_bgm', bgmSong);
  }, [bgmSong]);

  useEffect(() => {
    localStorage.setItem('couple_user_1', JSON.stringify(userProfile1));
  }, [userProfile1]);

  useEffect(() => {
    localStorage.setItem('couple_user_2', JSON.stringify(userProfile2));
  }, [userProfile2]);

  useEffect(() => {
    localStorage.setItem('couple_anniversary', anniversaryDate);
  }, [anniversaryDate]);

  const handleResetAllData = () => {
    localStorage.setItem('couple_memories', JSON.stringify([]));
    localStorage.setItem('couple_trips', JSON.stringify([]));
    localStorage.setItem('couple_planner', JSON.stringify([]));
    localStorage.setItem('couple_messages', JSON.stringify([]));
    
    setMemories([]);
    setTrips([]);
    setPlannerItems([]);
    setMessages([]);
    
    alert('모든 추억 지도 좌표 및 플래너 데이터가 완벽하게 초기화되었습니다! ✨');
  };

  // Handle switching users simulation
  const handleSwitchUser = () => {
    setActiveUserId(prev => (prev === 'user1' ? 'user2' : 'user1'));
  };

  const handleUpdateNicknames = (u1Nick: string, u2Nick: string) => {
    setUserProfile1(prev => ({ ...prev, nickname: u1Nick }));
    setUserProfile2(prev => ({ ...prev, nickname: u2Nick }));
  };

  // Heart trigger effect
  const handleTriggerHearts = () => {
    const batch = Array.from({ length: 12 }).map((_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 80 + 10, // horizontal start percent
      size: Math.random() * 1.5 + 0.8,
      delay: Math.random() * 0.4
    }));
    setHearts(prev => [...prev, ...batch]);
  };

  // Auto clean stale heart particles
  useEffect(() => {
    if (hearts.length > 0) {
      const timer = setTimeout(() => {
        setHearts([]);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [hearts]);

  // Fast message text sending
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const newMsg: QuickMessage = {
      id: `msg-${Date.now()}`,
      senderId: currentUser.id,
      text: chatInput,
      createdAt: new Date().toISOString()
    };

    setMessages(prev => [...prev, newMsg]);
    setChatInput('');
    handleTriggerHearts();
  };

  // Adding memory callback
  const handleAddMemorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const userAddedPhoto = newPhoto || 'https://images.unsplash.com/photo-1542296332-2e4473fac563?q=80&w=600';

    const newPlace: MemoryPlace = {
      id: `mem-${Date.now()}`,
      title: newTitle,
      description: newDesc,
      latitude: Number(newLat),
      longitude: Number(newLng),
      photoUrl: userAddedPhoto,
      rating: newRating,
      comments: [],
      visitDate: new Date(newDate).toISOString(),
      category: newCategory,
      createdBy: currentUser.id,
      tripId: newTripId || undefined
    };

    setMemories(prev => [newPlace, ...prev]);
    setShowAddModal(false);
    
    // Reset fields
    setNewTitle('');
    setNewDesc('');
    setNewPhoto('');
    setNewRating(5);
    setNewLat(33.3617);
    setNewLng(126.5292);
    setIsGpsExtracted(false);

    // Switch view to timeline or map to view results
    setActiveTab('map');
    setSelectedPlace(newPlace);
  };

  // Photo pick and EXIF GPS coordinates fetcher
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      setNewPhoto(base64);

      // Attempt parsing EXIF Geo coords
      EXIF.getData(file as any, function (this: any) {
        const lat = EXIF.getTag(this, "GPSLatitude");
        const lon = EXIF.getTag(this, "GPSLongitude");
        const latRef = EXIF.getTag(this, "GPSLatitudeRef") || "N";
        const lonRef = EXIF.getTag(this, "GPSLongitudeRef") || "E";

        if (lat && lon) {
          const convertDMSToDD = (dms: any[], ref: string) => {
            const degrees = dms[0]?.numerator / dms[0]?.denominator || dms[0] || 0;
            const minutes = dms[1]?.numerator / dms[1]?.denominator || dms[1] || 0;
            const seconds = dms[2]?.numerator / dms[2]?.denominator || dms[2] || 0;
            let dd = degrees + minutes / 60 + seconds / 3600;
            if (ref === "S" || ref === "W") {
              dd = dd * -1;
            }
            return dd;
          };

          const decimalLat = convertDMSToDD(lat, latRef);
          const decimalLon = convertDMSToDD(lon, lonRef);
          
          if (!isNaN(decimalLat) && !isNaN(decimalLon)) {
            setNewLat(Number(decimalLat.toFixed(5)));
            setNewLng(Number(decimalLon.toFixed(5)));
            setIsGpsExtracted(true);
          }
        }
      });
    };
    reader.readAsDataURL(file);
  };

  // Preset travel hot spots in Jeju to ease coordinate choice without mapping clicks
  const selectPresetCoordinates = (presetName: string, lat: number, lng: number) => {
    setNewLat(lat);
    setNewLng(lng);
    setIsGpsExtracted(false);
  };

  // Add Comment nested action
  const handleAddComment = (placeId: string, commentText: string) => {
    const newComment: UserComment = {
      id: `comm-${Date.now()}`,
      userId: currentUser.id,
      username: currentUser.username,
      avatar: currentUser.avatar,
      text: commentText,
      createdAt: new Date().toISOString()
    };

    setMemories(prev =>
      prev.map(p => {
        if (p.id === placeId) {
          return {
            ...p,
            comments: [...p.comments, newComment]
          };
        }
        return p;
      })
    );
  };

  // Delete Memory action
  const handleDeleteMemory = (placeId: string) => {
    setMemories(prev => prev.filter(p => p.id !== placeId));
    if (selectedPlace?.id === placeId) {
      setSelectedPlace(null);
    }
  };

  // Create customized trip collection
  const handleAddTrip = (name: string, emoji: string, startDate: string) => {
    const newTrip: CoupleTrip = {
      id: `trip-${Date.now()}`,
      name,
      emoji,
      startDate
    };
    setTrips(prev => [...prev, newTrip]);
  };

  // Planner toggle checkboxes
  const handleTogglePlannerItem = (id: string) => {
    setPlannerItems(prev =>
      prev.map(item => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
  };

  // Delete Planner checkbox
  const handleDeletePlannerItem = (id: string) => {
    setPlannerItems(prev => prev.filter(item => item.id !== id));
  };

  // Add Planner Checklist/Bucket/Budget item
  const handleAddPlannerItem = (
    title: string,
    category: 'checklist' | 'bucket' | 'budget',
    amount?: number,
    dueDate?: string
  ) => {
    const newItem: PlannerItem = {
      id: `plan-${Date.now()}`,
      title,
      completed: false,
      dueDate,
      category,
      amount,
      createdBy: currentUser.id
    };
    setPlannerItems(prev => [...prev, newItem]);
  };

  // Setup triggering click addition
  const handleMapClickToAdd = (lat: number, lng: number) => {
    setNewLat(Number(lat.toFixed(5)));
    setNewLng(Number(lng.toFixed(5)));
    setIsGpsExtracted(false);
    setShowAddModal(true);
  };

  // Local state for sidebar music simulation
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(34);
  const [volume, setVolume] = useState(80);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(t => (t >= 225 ? 0 : t + 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const formatBgmTime = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Pre-calculated D-Day based on stateful anniversary date configuration
  const daysCount = Math.max(1, Math.floor(
    (new Date().getTime() - new Date(anniversaryDate).getTime()) / (1000 * 60 * 60 * 24)
  ) + 1);

  return (
    <div className="min-h-screen w-full bg-gradient-to-tr from-[#fdf7f5] via-[#fffbf9] to-[#faf2f0] flex flex-col md:flex-row items-center justify-center text-stone-800 antialiased font-sans select-none overflow-hidden relative">
      
      {/* Decorative Widescreen Room Backdrop items (Only visible on Desktop to frame the UI with extreme luxury) */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-gradient-to-tr from-rose-200/30 to-pink-200/20 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-tr from-[#ffdfdb]/40 to-rose-200/10 blur-[150px] pointer-events-none" />
      
      {/* Left-side descriptive marketing copy (Desktop Only) */}
      <div className="hidden lg:flex flex-col max-w-[340px] mr-14 p-6 select-none animate-fade-in text-stone-800">
        <span className="text-[10px] bg-rose-50 text-rose-600 font-extrabold px-3 py-1 rounded-full border border-rose-100 self-start tracking-wide uppercase font-mono">
          Interactive Live Simulator
        </span>
        <h2 className="text-2xl font-black font-serif mt-3 text-stone-900 leading-tight">
          발걸음마다 가득한,<br />
          둘만의 러브로그 🌸
        </h2>
        <p className="text-xs text-stone-550 leading-relaxed mt-2.5">
          오른쪽 시뮬레이터 폰은 실제 모바일 환경과 동일하게 동작합니다. 다이내믹 로케이션 기능, 실시간 메시지 함, 커플 버킷 플래너와 추억 앨범을 지금 한손으로 경험해보세요.
        </p>
        
        {/* Swapper Tips inside sidebar description */}
        <div className="mt-8 bg-white/70 border border-stone-200 p-4 rounded-2.5xl backdrop-blur-md">
          <p className="text-[10.5px] font-black text-rose-555 flex items-center space-x-1 font-serif">
            <span>✨ 시뮬레이션 멀티 롤가이드</span>
          </p>
          <p className="text-[9.5px] text-stone-450 mt-1 leading-relaxed">
            상단 프로필 이미지를 누르고 <strong>역할 전환</strong>을 누르면 상대 커플 관점에서 등록 및 조율하는 시뮬레이션을 즐길 수 있습니다.
          </p>
          <div className="flex items-center space-x-1.5 mt-3">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-[9px] font-extrabold text-stone-500">BGM President 재생 지원 중</span>
          </div>
        </div>
      </div>

      {/* Dynamic Hearts Burst Particles Overlay (Global layout portal inside screen) */}
      <AnimatePresence>
        {hearts.map(heart => (
          <motion.div
            key={heart.id}
            initial={{ opacity: 1, y: '90vh', x: `${heart.x}vw`, scale: 0 }}
            animate={{ opacity: 0, y: '10vh', scale: heart.size, rotate: Math.random() * 60 - 30 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.2, ease: 'easeOut', delay: heart.delay }}
            className="fixed z-50 pointer-events-none text-rose-500 text-3xl fill-current"
          >
            ❤️
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Primary Mobile App Chassis on Desktop / Fluid Web Screen on Mobile */}
      <div className="w-full h-screen md:w-[395px] md:h-[844px] md:rounded-[44px] md:border-[11px] md:border-stone-900 md:shadow-2xl bg-white flex flex-col relative overflow-hidden shrink-0 transition-all border-stone-200 shadow-rose-100">
        
        {/* Simulated Native Mobile Top Status Bar */}
        <div className="px-5 pt-3 pb-1.5 flex justify-between items-center text-[10.5px] font-black tracking-tight text-stone-500 bg-white select-none shrink-0 z-30">
          <span>09:41</span>
          {/* Mock Camera Notch (Dynamic Island Accent) */}
          <div className="hidden md:block w-24 h-4 bg-stone-900 rounded-full mx-auto absolute left-1/2 -translate-x-1/2 top-2.5" />
          <div className="flex items-center space-x-1.5 font-sans">
            <span>📶</span>
            <span className="text-[9px]">5G</span>
            <span>🔋 100%</span>
          </div>
        </div>

        {/* Premium Application Top Ribbon Header (Integrated with Music and Role swaps) */}
        <header className="px-4 py-2.5 bg-white border-b border-stone-150/70 flex items-center justify-between shrink-0 z-20">
          <div className="flex items-center space-x-2.2">
            <div 
              onClick={handleSwitchUser}
              className="relative flex -space-x-2.2 cursor-pointer active:scale-95 transition-transform" 
              title="역할 간편 전환"
            >
              <img 
                src={currentUser.avatar} 
                alt={currentUser.nickname} 
                className="w-7.5 h-7.5 rounded-full object-cover ring-2 ring-white shadow-sm relative z-10" 
                referrerPolicy="no-referrer" 
              />
              <img 
                src={otherUser.avatar} 
                alt={otherUser.nickname} 
                className="w-7.5 h-7.5 rounded-full object-cover ring-2 ring-white/50 shadow-sm" 
                referrerPolicy="no-referrer" 
              />
            </div>
            
            <div className="min-w-0">
              <h1 className="text-xs font-black text-rose-500 font-serif flex items-center tracking-tight">
                <span>우리발자국</span>
                <span className="text-[8.5px] bg-rose-50 text-rose-600 px-1.2 py-0.2 rounded-md ml-1 font-mono tracking-tighter">
                  +{daysCount}일째 💑
                </span>
              </h1>
              <p className="text-[8.5px] text-stone-450 truncate">
                작성: <span className="font-bold text-stone-700">{currentUser.nickname}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-1.5">
            {/* Interactive Music trigger button */}
            <button
              onClick={() => {
                setShowMusicOverlay(!showMusicOverlay);
                setShowChatDrawer(false); // Close chat to prevent stacking noise
              }}
              className={`p-2 rounded-xl border border-stone-200 bg-white shadow-3xs flex items-center justify-center transition-all ${
                isPlaying ? 'text-rose-500 bg-rose-50/55' : 'text-stone-400'
              }`}
              title="BGM 재생기 열기"
            >
              <Music className={`w-3.5 h-3.5 ${isPlaying ? 'animate-bounce' : ''}`} />
            </button>

            {/* Quick swap button */}
            <button
              onClick={handleSwitchUser}
              className="p-1.8 bg-stone-50 hover:bg-stone-100 text-stone-605 rounded-xl border border-stone-200 transition-colors"
              title="상대로 역할 전환"
            >
              <Smile className="w-3.5 h-3.5 text-stone-500" />
            </button>
          </div>
        </header>

        {/* Dynamic Shared Floating Spotify-Style BGM controller banner */}
        <AnimatePresence>
          {showMusicOverlay && (
            <motion.div
              initial={{ opacity: 0, y: -15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.95 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="absolute top-13 inset-x-4 bg-white/98 backdrop-blur-md border border-rose-100 rounded-3xl p-4 shadow-2xl z-40 select-none flex flex-col space-y-3"
            >
              <div className="flex items-center space-x-3 min-w-0">
                <div 
                  className="relative w-9 h-9 bg-stone-100 rounded-full border border-stone-250 flex items-center justify-center overflow-hidden flex-shrink-0 animate-spin"
                  style={{ animationDuration: '8s', animationPlayState: isPlaying ? 'running' : 'paused' }}
                >
                  <div className="w-2.5 h-2.5 bg-white rounded-full z-10 absolute shadow-inner border border-stone-300" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-stone-900 to-stone-700 rounded-full flex items-center justify-center">
                    <Music className="w-4 h-4 text-rose-300/40" />
                  </div>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] text-rose-550 font-black uppercase tracking-wider">Now Playing</span>
                    <span className="text-[8px] text-stone-400 font-medium font-mono">{formatBgmTime(currentTime)} / 03:45</span>
                  </div>
                  <h3 className="text-[11px] font-black font-serif text-stone-850 truncate mt-0.5" title={bgmSong}>
                    {bgmSong}
                  </h3>
                </div>
              </div>

              {/* Progress interaction track */}
              <div 
                className="w-full bg-stone-200/70 h-1.5 rounded-full overflow-hidden cursor-pointer relative"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  const percentage = clickX / rect.width;
                  setCurrentTime(Math.floor(225 * percentage));
                }}
              >
                <div 
                  className="bg-rose-500 h-full rounded-full transition-all"
                  style={{ width: `${(currentTime / 225) * 100}%` }} 
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Music className="w-3.5 h-3.5 text-[#ff8183]" />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={volume}
                    onChange={(e) => setVolume(Number(e.target.value))}
                    className="w-14 bg-stone-2 accent-rose-500 rounded-lg cursor-pointer h-1"
                    title="BGM 볼륨"
                  />
                </div>
                
                <div className="flex space-x-1.5">
                  <button
                    onClick={() => setShowMusicOverlay(false)}
                    className="px-3 py-1 bg-stone-100 hover:bg-stone-150 text-stone-600 text-[10px] font-bold rounded-lg border border-stone-200 transition-colors"
                  >
                    닫기
                  </button>
                  <button
                    onClick={() => {
                      setIsPlaying(!isPlaying);
                      handleTriggerHearts();
                    }}
                    className="px-4.5 py-1 bg-gradient-to-r from-rose-500 to-pink-500 hover:opacity-95 text-white text-[10px] font-black rounded-lg shadow-md active:scale-95 transition-all"
                  >
                    {isPlaying ? '일시정지' : '재생하기'}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dynamic Chat Drawer Slide-Up Sheet Overlay (우리 톡) */}
        <AnimatePresence>
          {showChatDrawer && (
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 210 }}
              className="absolute inset-x-0 bottom-0 top-13 bg-white z-[41] flex flex-col rounded-t-[32px] border-t border-stone-150 shadow-2xl overflow-hidden font-sans"
            >
              {/* Drawer Header */}
              <div className="px-4.5 py-4.5 border-b border-stone-150 bg-gradient-to-r from-rose-50/20 to-pink-50/10 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-base">💬</span>
                  <div>
                    <h3 className="text-xs font-black text-stone-850 font-serif">실시간 둘만의 소통망</h3>
                    <p className="text-[9px] text-stone-450 mt-0.5 font-sans">실시간 사랑의 메시지를 전송하고 하트 폭탄을 터뜨리세요!</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowChatDrawer(false)}
                  className="p-1.5 text-stone-400 hover:text-stone-700 bg-stone-50 hover:bg-stone-100 rounded-xl transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Chats Log Content Feed */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#fdfbf9] flex flex-col scrollbar-thin">
                {messages.length === 0 ? (
                  <div className="my-auto flex flex-col items-center justify-center text-stone-400 py-12 text-center">
                    <MessageSquare className="w-8 h-8 opacity-25 mb-1.5 text-rose-300" />
                    <p className="text-[11px] font-bold">오손도손 첫 메시지를 남겨보세요!</p>
                    <p className="text-[9px] text-stone-400 mt-0.5">상대방에게 메세지가 즉각 싱크됩니다.</p>
                  </div>
                ) : (
                  messages.map((msg) => {
                    const isMe = msg.senderId === currentUser.id;
                    const msgSender = isMe ? currentUser : otherUser;
                    return (
                      <div
                        key={msg.id}
                        className={`flex space-x-2.5 max-w-[85%] ${isMe ? 'self-end flex-row-reverse space-x-reverse' : 'self-start'}`}
                      >
                        {!isMe && (
                          <img
                            src={msgSender.avatar}
                            alt={msgSender.nickname}
                            className="w-7 h-7 rounded-full object-cover border border-stone-200"
                            referrerPolicy="no-referrer"
                          />
                        )}
                        <div>
                          {!isMe && (
                            <span className="text-[9px] text-stone-450 font-black block mb-0.5 ml-0.8">
                              {msgSender.nickname}
                            </span>
                          )}
                          <div className={`px-3 py-2 rounded-2xl text-[11px] leading-snug font-medium shadow-3xs ${
                            isMe 
                              ? 'bg-rose-500 text-white rounded-tr-none' 
                              : 'bg-white text-stone-850 border border-stone-200/70 rounded-tl-none'
                          }`}>
                            {msg.text}
                          </div>
                          <span className="text-[7.5px] text-stone-400 block mt-0.5 font-mono ml-0.8">
                            {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Message Form Inputs */}
              <form onSubmit={handleSendMessage} className="p-3 border-t border-stone-150 bg-white flex items-center space-x-2 shrink-0 pb-4">
                <button
                  type="button"
                  onClick={handleTriggerHearts}
                  className="w-10 h-10 bg-rose-50 hover:bg-rose-100 text-rose-500 border border-rose-100 flex items-center justify-center rounded-2xl active:scale-90 transition-all font-sans shrink-0 hover:scale-105"
                  title="하트 뿅뿅"
                >
                  ❤️
                </button>
                <input
                  type="text"
                  placeholder="러브메시지 전달하기..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className="flex-1 bg-stone-50 focus:bg-white border border-stone-200 focus:border-rose-450 outline-none rounded-2xl px-3.5 py-2.5 text-xs text-stone-850 placeholder:text-stone-400 transition-all"
                />
                <button
                  type="submit"
                  className="w-10 h-10 bg-gradient-to-br from-[#ff7e80] to-pink-500 text-white flex items-center justify-center rounded-2xl active:scale-95 hover:opacity-95 transition-all shrink-0 shadow-md shadow-rose-300/30"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 2. Main Content Frame Workspace Panel */}
        <div className="flex-1 relative overflow-hidden bg-[#faf8f5]">
          
          {/* Floating Messenger trigger bubble (opposite right map actions to maintain clean mobile geometry) */}
          <button
            onClick={() => {
              setShowChatDrawer(true);
              setShowMusicOverlay(false); // Close music overlay to keep UI neat
            }}
            className="absolute left-4 bottom-24 z-20 w-11 h-11 rounded-xl bg-gradient-to-br from-rose-450 to-pink-500 text-white flex items-center justify-center shadow-lg shadow-pink-500/20 hover:scale-105 active:scale-95 transition-all"
            title="우리 톡 메시지창"
          >
            <MessageSquare className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[8px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center border-2 border-white animate-bounce">
              {messages.length}
            </span>
          </button>

          <AnimatePresence mode="wait">
            {activeTab === 'map' && (
              <motion.div
                key="tab-map"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full h-full relative"
              >
                {/* Map renders fully in container */}
                <MapContainer
                  memories={memories}
                  currentUser={currentUser}
                  onMapClickToAdd={handleMapClickToAdd}
                  onSelectPlace={(place) => {
                    setSelectedPlace((prev) => (prev?.id === place.id ? null : place));
                  }}
                  selectedPlace={selectedPlace}
                />

                {/* Overlaid Float Travel Point Dashboard on Map adjusted for compact mobile chassis */}
                <div className="absolute bottom-4 left-4 right-4 z-25 pointer-events-none flex flex-col space-y-2.5 max-w-full">
                  
                  {/* Selected Memory detail overlay card */}
                  <AnimatePresence>
                    {selectedPlace && (
                      <motion.div
                        initial={{ scale: 0.94, opacity: 0, y: 15 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.94, opacity: 0, y: 15 }}
                        className="bg-white/95 backdrop-blur-md p-3 rounded-2.5xl border border-stone-200 shadow-xl pointer-events-auto flex items-start space-x-3 relative w-full"
                      >
                        <button
                          onClick={() => setSelectedPlace(null)}
                          className="absolute top-2 right-2 p-1 text-stone-400 hover:text-stone-700 rounded-lg"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>

                        <img
                          src={selectedPlace.photoUrl}
                          alt={selectedPlace.title}
                          className="w-13 h-13 rounded-xl object-cover ring-2 ring-rose-100 flex-shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-1 min-w-0 pr-4">
                          <span className="text-[8px] bg-rose-50 text-rose-505 font-black px-2 py-0.2 rounded-full uppercase">
                            {selectedPlace.category}
                          </span>
                          <h3 className="text-[11px] font-black text-stone-850 truncate mt-1 font-serif">
                            {selectedPlace.title}
                          </h3>
                          <p className="text-[9px] text-stone-500 mt-0.5 truncate leading-tight">
                            {selectedPlace.description}
                          </p>
                        </div>
                        <ChevronRight
                          className="w-4.5 h-4.5 text-stone-400 hover:text-rose-500 cursor-pointer self-center"
                          onClick={() => {
                            setActiveTab('timeline');
                            setTimeout(() => {
                              const element = document.getElementById(`timeline-card-${selectedPlace.id}`);
                              if (element) {
                                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                              }
                            }, 250);
                          }}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Horizontal Scroll trip collections block */}
                  <div className="pointer-events-auto overflow-x-auto flex space-x-2.5 pb-1 scrollbar-none">
                    {trips.map(trip => {
                      const tripSpots = memories.filter(m => m.tripId === trip.id);
                      const tripBannerPhoto = tripSpots[0]?.photoUrl || 'https://images.unsplash.com/photo-1542296332-2e4473fac563?q=80&w=600';
                      
                      return (
                        <div
                          key={trip.id}
                          onClick={() => {
                            if (tripSpots.length > 0) {
                              setSelectedPlace(tripSpots[0]);
                            }
                          }}
                          className="flex-shrink-0 w-36 bg-white/95 backdrop-blur-md border border-stone-200/80 rounded-2xl p-2 flex items-center space-x-2 cursor-pointer hover:border-rose-300 transition-all shadow-md"
                        >
                          <img
                            src={tripBannerPhoto}
                            alt={trip.name}
                            className="w-8 h-8 rounded-lg object-cover flex-shrink-0 ring-1 ring-stone-150"
                            referrerPolicy="no-referrer"
                          />
                          <div className="min-w-0 flex-1">
                            <h4 className="text-[10px] font-black text-stone-800 truncate font-serif">{trip.name}</h4>
                            <p className="text-[8px] text-[#ff7578] font-bold mt-0.2">
                              {tripSpots.length}곳 저장
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Floating Add memory button on Map screen */}
                <div className="absolute right-4 top-4 z-10 pointer-events-auto">
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center space-x-1 px-3.5 py-2.5 rounded-xl bg-gradient-to-br from-[#ff8385] to-pink-500 text-white text-[10px] font-black shadow-lg shadow-rose-450/20 active:scale-95 transition-all"
                    id="btn-trigger-add-spot-modal"
                    title="새로운 추억 추가"
                  >
                    <Plus className="w-3.5 h-3.5 stroke-[2.5px]" />
                    <span>추억 추가</span>
                  </button>
                </div>
              </motion.div>
            )}

            {activeTab === 'timeline' && (
              <motion.div
                key="tab-timeline"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full h-full"
              >
                <TimelineView
                  memories={memories}
                  trips={trips}
                  currentUser={currentUser}
                  otherUser={otherUser}
                  onSelectPlace={(place) => {
                    setSelectedPlace(place);
                    setActiveTab('map');
                  }}
                  onAddComment={handleAddComment}
                  onDeleteMemory={handleDeleteMemory}
                  onAddTrip={handleAddTrip}
                />
              </motion.div>
            )}

            {activeTab === 'planner' && (
              <motion.div
                key="tab-planner"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full h-full"
              >
                <PlannerView
                  plannerItems={plannerItems}
                  currentUser={currentUser}
                  onAddPlannerItem={handleAddPlannerItem}
                  onTogglePlannerItem={handleTogglePlannerItem}
                  onDeletePlannerItem={handleDeletePlannerItem}
                />
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div
                key="tab-settings"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full h-full"
              >
                <CoupleSettings
                  currentUser={currentUser}
                  otherUser={otherUser}
                  coupleCode={coupleCode}
                  onSwitchUser={handleSwitchUser}
                  onUpdateNicknames={handleUpdateNicknames}
                  onUpdateBgm={setBgmSong}
                  currentBgm={bgmSong}
                  anniversaryDate={anniversaryDate}
                  onUpdateAnniversary={setAnniversaryDate}
                  onResetAllData={handleResetAllData}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 3. Sleek Bottom Mobile Application Tab Menu Bar */}
        <nav className="h-14 bg-white border-t border-stone-200/60 flex items-center justify-around shrink-0 z-30 shadow-sm px-1.5 pb-0.8">
          <button
            onClick={() => {
              setActiveTab('map');
              setShowChatDrawer(false);
            }}
            className={`flex flex-col items-center justify-center flex-1 h-full py-0.5 transition-all active:scale-95 ${
              activeTab === 'map' ? 'text-rose-500 scale-103' : 'text-stone-400 hover:text-stone-600'
            }`}
            id="nav-tab-map"
          >
            <Map className="w-[19px] h-[19px] mb-0.5" />
            <span className="text-[8.5px] font-black font-sans">지도스토리</span>
          </button>
          
          <button
            onClick={() => {
              setActiveTab('timeline');
              setShowChatDrawer(false);
            }}
            className={`flex flex-col items-center justify-center flex-1 h-full py-0.5 transition-all active:scale-95 ${
              activeTab === 'timeline' ? 'text-rose-500 scale-103' : 'text-stone-400 hover:text-stone-600'
            }`}
            id="nav-tab-timeline"
          >
            <BookOpen className="w-[19px] h-[19px] mb-0.5" />
            <span className="text-[8.5px] font-black font-sans">추억앨범</span>
          </button>

          {/* Core centered custom floating launcher for adding new points */}
          <button
            onClick={() => setShowAddModal(true)}
            className="w-11 h-11 rounded-full bg-gradient-to-br from-[#ff7e80] to-pink-500 text-white flex items-center justify-center shadow-md shadow-rose-450/20 active:scale-90 transition-all -translate-y-3.5 border-4 border-white shrink-0 hover:rotate-90"
            title="새 추억 기록 등록"
          >
            <Plus className="w-5 h-5 stroke-[3.2px]" />
          </button>

          <button
            onClick={() => {
              setActiveTab('planner');
              setShowChatDrawer(false);
            }}
            className={`flex flex-col items-center justify-center flex-1 h-full py-0.5 transition-all active:scale-95 ${
              activeTab === 'planner' ? 'text-rose-500 scale-103' : 'text-stone-400 hover:text-stone-600'
            }`}
            id="nav-tab-planner"
          >
            <CalendarDays className="w-[19px] h-[19px] mb-0.5" />
            <span className="text-[8.5px] font-black font-sans">러브플래너</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('settings');
              setShowChatDrawer(false);
            }}
            className={`flex flex-col items-center justify-center flex-1 h-full py-0.5 transition-all active:scale-95 ${
              activeTab === 'settings' ? 'text-rose-500 scale-103' : 'text-stone-400 hover:text-stone-600'
            }`}
            id="nav-tab-settings"
          >
            <Settings className="w-[19px] h-[19px] mb-0.5" />
            <span className="text-[8.5px] font-black font-sans">커플설정</span>
          </button>
        </nav>

        {/* Beautiful bottom virtual Home Indicator line on Desktop simulator */}
        <div className="hidden md:block w-28 h-1 bg-stone-900 rounded-full mx-auto my-1.5 shrink-0 select-none opacity-90" />
      </div>

      {/* Adding Memory Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 bg-[#433d3c]/55 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#fffdfb] border border-stone-200 rounded-3xl p-6 w-full max-w-md shadow-2xl relative max-h-[92vh] overflow-y-auto font-sans"
            >
              <button
                onClick={() => setShowAddModal(false)}
                className="absolute top-4 right-4 p-1.5 text-stone-400 hover:text-stone-700 bg-stone-100 rounded-full hover:scale-105 transition-all"
              >
                <X className="w-4 h-4" />
              </button>

              <h3 className="text-base font-black text-stone-850 flex items-center space-x-2 font-serif">
                <span>📸 소중한 순간 지도에 새기기</span>
              </h3>
              <p className="text-xs text-stone-500 mt-1 font-sans">
                사진을 불러와 GPS 위치를 자동 분석하거나, 인기 명소를 간편하게 선택해 기록해보세요.
              </p>

              <form onSubmit={handleAddMemorySubmit} className="space-y-4 mt-5 text-stone-850">
                {/* File picker EXIF Extractor UI */}
                <div>
                  <label className="text-[11px] font-extrabold text-stone-700 block mb-1">
                    추억의 대표 사진 선택 (GPS 자동배치)
                  </label>
                  <div className="flex items-center space-x-3.5 bg-stone-50 p-3 rounded-2xl border border-stone-200">
                    <div className="relative w-15 h-15 bg-stone-100 border border-stone-200 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0">
                      {newPhoto ? (
                        <img
                          src={newPhoto}
                          alt="preview"
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <Camera className="w-5.5 h-5.5 text-stone-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0 font-sans">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                        id="image-file-exif-uploader"
                      />
                      <label
                        htmlFor="image-file-exif-uploader"
                        className="inline-block px-3.5 py-2 bg-white hover:bg-stone-50 border border-stone-200 rounded-xl text-[11px] font-black text-stone-700 cursor-pointer active:scale-95 transition-all text-center shadow-3xs"
                      >
                        사진 업로드하기
                      </label>
                      <p className="text-[9px] text-stone-450 mt-1 leading-relaxed">
                        ★ 스마트폰으로 찍은 원본 사진인 경우 지도 핀이 저절로 위치합니다.
                      </p>
                    </div>
                  </div>
                </div>

                {isGpsExtracted && (
                  <div className="bg-emerald-55 border border-emerald-100 text-emerald-700 p-3 rounded-2xl flex items-start space-x-2 text-[10px] leading-relaxed animate-fade-in shadow-2xs">
                    <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-emerald-600" />
                    <div>
                      <span className="font-bold">촬영 스마트 GPS 감지 성공!</span>
                      <p className="mt-0.5">이미지 메타데이터에서 위도 {newLat}, 경도 {newLng} 좌표를 복원했습니다.</p>
                    </div>
                  </div>
                )}

                {/* Preset spots shortcut buttons */}
                <div>
                  <label className="text-[10px] font-black text-stone-500 block mb-1.5 uppercase font-mono">
                    인기 명소 간편 좌표선택
                  </label>
                  <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto bg-stone-50 p-2.5 rounded-xl border border-stone-200">
                    <button
                      type="button"
                      onClick={() => selectPresetCoordinates('인천국제공항', 37.4602, 126.4407)}
                      className="text-[10px] bg-white hover:bg-rose-50 hover:text-rose-600 text-stone-650 px-2.5 active:bg-stone-105 py-1 rounded-lg border border-stone-200 shadow-3xs font-serif transition-colors"
                    >
                      ✈️ 인천공항
                    </button>
                    <button
                      type="button"
                      onClick={() => selectPresetCoordinates('서울남산타워', 37.5511, 126.9882)}
                      className="text-[10px] bg-white hover:bg-rose-50 hover:text-rose-600 text-stone-650 px-2.5 active:bg-stone-105 py-1 rounded-lg border border-stone-200 shadow-3xs font-serif transition-colors"
                    >
                      🗼 남산 서울타워
                    </button>
                    <button
                      type="button"
                      onClick={() => selectPresetCoordinates('부산해운대', 35.1587, 129.1601)}
                      className="text-[10px] bg-white hover:bg-rose-50 hover:text-rose-600 text-stone-650 px-2.5 active:bg-stone-105 py-1 rounded-lg border border-stone-200 shadow-3xs font-serif transition-colors"
                    >
                      🏝️ 부산 해운대
                    </button>
                    <button
                      type="button"
                      onClick={() => selectPresetCoordinates('파리에펠탑', 48.8584, 2.2945)}
                      className="text-[10px] bg-white hover:bg-rose-50 hover:text-rose-600 text-stone-650 px-2.5 active:bg-stone-105 py-1 rounded-lg border border-stone-200 shadow-3xs font-serif transition-colors"
                    >
                      🗼 파리 에펠탑
                    </button>
                    <button
                      type="button"
                      onClick={() => selectPresetCoordinates('뉴욕타임스퀘어', 40.7580, -73.9855)}
                      className="text-[10px] bg-white hover:bg-rose-50 hover:text-rose-600 text-stone-650 px-2.5 active:bg-stone-105 py-1 rounded-lg border border-stone-200 shadow-3xs font-serif transition-colors"
                    >
                      🗽 뉴욕 타임스퀘어
                    </button>
                    <button
                      type="button"
                      onClick={() => selectPresetCoordinates('도쿄타워', 35.6586, 139.7454)}
                      className="text-[10px] bg-white hover:bg-rose-50 hover:text-rose-600 text-stone-650 px-2.5 active:bg-stone-105 py-1 rounded-lg border border-stone-200 shadow-3xs font-serif transition-colors"
                    >
                      🗼 도쿄 타워
                    </button>
                  </div>
                </div>

                {/* Coordinate inputs */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="text-[10px] font-bold text-stone-450 block mb-1">위도 (Latitude)</label>
                    <input
                      type="number"
                      step="0.00001"
                      required
                      value={newLat}
                      onChange={(e) => {
                        setNewLat(Number(e.target.value));
                        setIsGpsExtracted(false);
                      }}
                      className="w-full bg-white border border-stone-200 rounded-xl px-3.5 py-2 text-xs text-stone-700 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-stone-450 block mb-1">경도 (Longitude)</label>
                    <input
                      type="number"
                      step="0.00001"
                      required
                      value={newLng}
                      onChange={(e) => {
                        setNewLng(Number(e.target.value));
                        setIsGpsExtracted(false);
                      }}
                      className="w-full bg-white border border-stone-200 rounded-xl px-3.5 py-2 text-xs text-stone-700 outline-none"
                    />
                  </div>
                </div>

                {/* Sub details inputs */}
                <div className="space-y-3.5 pt-1.5">
                  <div>
                    <label className="text-xs font-black text-stone-800 block mb-1 font-serif">동행 명칭 / 추억 한줄</label>
                    <input
                      type="text"
                      required
                      placeholder="예: 성산일출봉 정상에서 맞이한 첫 노을 🌅"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="w-full bg-white border border-stone-200 focus:border-rose-350 rounded-xl px-3.5 py-2.5 text-xs text-stone-800 outline-none transition-all"
                      id="input-add-memory-title"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-black text-stone-800 block mb-1 font-serif">추억 내용 / 짧은 일기</label>
                    <textarea
                      rows={2.5}
                      required
                      placeholder="바람 소리, 나눈 달콤한 약속 등 자세한 스토리를 적어보세요..."
                      value={newDesc}
                      onChange={(e) => setNewDesc(e.target.value)}
                      className="w-full bg-white border border-stone-200 focus:border-rose-350 rounded-xl px-3.5 py-2.5 text-xs text-stone-800 outline-none transition-all resize-none"
                      id="input-add-memory-desc"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="text-xs font-black text-stone-800 block mb-1 font-serif">추억 방문 일시</label>
                      <input
                        type="datetime-local"
                        required
                        value={newDate}
                        onChange={(e) => setNewDate(e.target.value)}
                        className="w-full bg-white border border-stone-200 focus:border-rose-350 rounded-xl px-3 py-2 text-xs text-stone-800 outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-black text-stone-800 block mb-1 font-serif">카테고리</label>
                      <select
                        value={newCategory}
                        onChange={(e: any) => setNewCategory(e.target.value)}
                        className="w-full bg-white border border-stone-200 focus:border-rose-350 rounded-xl px-3.5 py-2 text-xs text-stone-750 outline-none"
                      >
                        <option value="food">🍗 달콤 맛집 (Food)</option>
                        <option value="cafe">☕ 디저트 카페 (Cafe)</option>
                        <option value="activity">⛰️ 액티비티/도보 (Hiking)</option>
                        <option value="stay">🏡 오붓 숙소 (Stay)</option>
                        <option value="scenery">🌅 멋진 풍경 (Scenery)</option>
                        <option value="other">✨ 기타 기억 (Other)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="text-xs font-black text-stone-800 block mb-1 font-serif">추억 콜렉션 폴더</label>
                      <select
                        value={newTripId}
                        onChange={(e) => setNewTripId(e.target.value)}
                        className="w-full bg-white border border-stone-205 focus:border-rose-350 rounded-xl px-3 py-2.5 text-xs text-stone-750 outline-none"
                        id="select-add-memory-trip"
                      >
                        {trips.map(trip => (
                          <option key={trip.id} value={trip.id}>
                            {trip.emoji} {trip.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-black text-stone-800 block mb-1 font-serif">우리의 행복 별점</label>
                      <div className="flex items-center space-x-1.5 py-1 px-1 bg-white border border-stone-200 rounded-xl justify-center h-[38px]">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setNewRating(star)}
                            className="p-0.5 text-amber-400 focus:outline-none transition-transform active:scale-125"
                          >
                            <Star
                              className={`w-4.5 h-4.5 ${star <= newRating ? 'fill-current text-amber-400' : 'text-stone-250'}`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2.5 pt-3">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 py-3 bg-stone-100 hover:bg-stone-200 text-xs font-black text-stone-600 rounded-xl transition-colors border border-stone-200"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-gradient-to-br from-rose-450 to-pink-500 hover:opacity-95 text-xs font-black text-white rounded-xl shadow-md transform active:scale-[0.98] transition-all"
                    id="btn-add-memory-submit"
                  >
                    소중한 추억 저장하기
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
