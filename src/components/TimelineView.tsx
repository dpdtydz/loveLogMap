/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MemoryPlace, CoupleTrip, UserProfile } from '../types';
import { Star, MessageSquare, Trash2, Calendar, MapPin, Send, Plus, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface TimelineViewProps {
  memories: MemoryPlace[];
  trips: CoupleTrip[];
  currentUser: UserProfile;
  otherUser: UserProfile;
  onSelectPlace: (place: MemoryPlace) => void;
  onAddComment: (placeId: string, commentText: string) => void;
  onDeleteMemory: (placeId: string) => void;
  onAddTrip: (name: string, emoji: string, startDate: string) => void;
}

export default function TimelineView({
  memories,
  trips,
  currentUser,
  otherUser,
  onSelectPlace,
  onAddComment,
  onDeleteMemory,
  onAddTrip
}: TimelineViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [commentInputs, setCommentInputs] = useState<{ [key: string]: string }>({});
  const [showAddTripModal, setShowAddTripModal] = useState(false);
  const [newTripName, setNewTripName] = useState('');
  const [newTripEmoji, setNewTripEmoji] = useState('🚗');
  const [newTripDate, setNewTripDate] = useState('');
  const [selectedDetailPlace, setSelectedDetailPlace] = useState<MemoryPlace | null>(null);

  // Sorter
  const sortedMemories = [...memories].sort(
    (a, b) => new Date(b.visitDate).getTime() - new Date(a.visitDate).getTime()
  );

  // Filters
  const filteredMemories = selectedCategory === 'all'
    ? sortedMemories
    : sortedMemories.filter(m => m.category === selectedCategory);

  const categories = [
    { id: 'all', label: '전체', emoji: '✨' },
    { id: 'food', label: '맛집', emoji: '🍕' },
    { id: 'cafe', label: '카페', emoji: '☕' },
    { id: 'activity', label: '놀거리', emoji: '🎢' },
    { id: 'stay', label: '숙소', emoji: '🏡' },
    { id: 'scenery', label: '풍경', emoji: '🌅' }
  ];

  const handleSendComment = (placeId: string) => {
    const text = commentInputs[placeId]?.trim();
    if (!text) return;

    onAddComment(placeId, text);
    setCommentInputs(prev => ({ ...prev, [placeId]: '' }));
  };

  const handleKeyDown = (e: React.KeyboardEvent, placeId: string) => {
    if (e.key === 'Enter') {
      handleSendComment(placeId);
    }
  };

  const createTripSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTripName || !newTripDate) return;
    onAddTrip(newTripName, newTripEmoji, newTripDate);
    setNewTripName('');
    setNewTripDate('');
    setShowAddTripModal(false);
  };

  // Date helper
  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return `${d.getMonth() + 1}월 ${d.getDate()}일 (${['일', '월', '화', '수', '목', '금', '토'][d.getDay()]})`;
  };

  return (
    <div className="w-full h-full bg-[#fdfbf9] flex flex-col overflow-y-auto pb-24 font-sans text-stone-800 animate-fade-in">
      {/* Editorial Header Section */}
      <div className="px-5 py-4 bg-white/95 backdrop-blur-md border-b border-stone-200/60 sticky top-0 z-10 shadow-3xs">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h1 className="text-base font-black text-stone-900 flex items-center space-x-1.5 font-serif tracking-tight">
              <span>우리 둘만의 추억 서랍</span>
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse shrink-0" />
            </h1>
            <p className="text-[10px] text-stone-500 mt-0.5">서로 함께 새기고 모아온 향기 가득한 순간들의 기록장</p>
          </div>
          <button
            onClick={() => setShowAddTripModal(true)}
            className="flex items-center space-x-1 px-3 py-1.5 bg-gradient-to-br from-[#ff7e80] to-pink-500 text-white text-[10px] font-black rounded-full shadow-md active:scale-95 hover:opacity-95 transition-all outline-none"
            id="btn-timeline-add-trip"
          >
            <Plus className="w-3.5 h-3.5 text-white stroke-[2.5px]" />
            <span>새 추억 폴더 추가</span>
          </button>
        </div>

        {/* Fancy Category Pills Layout */}
        <div className="flex space-x-1.5 mt-3.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center space-x-1 px-2.5 py-1.2 rounded-full text-[10px] font-black whitespace-nowrap border transition-all duration-200 ${
                selectedCategory === cat.id
                  ? 'bg-rose-500 text-white border-rose-500 shadow-xs'
                  : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
              }`}
              id={`tab-category-${cat.id}`}
            >
              <span className="text-xs">{cat.emoji}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Expanded Passport-Style Trips Row */}
      <div className="px-5 py-4 bg-gradient-to-b from-[#fdfbfc] to-[#fdfbf9] border-b border-stone-200/40">
        <h2 className="text-[9px] font-black text-rose-500 uppercase tracking-wider mb-2.5 flex items-center space-x-1.5">
          <span className="inline-block w-1.2 h-1.2 rounded-full bg-rose-400 animate-ping" />
          <span>테마별 추억 수집첩</span>
        </h2>
        <div className="flex space-x-3 overflow-x-auto pb-1 scrollbar-none">
          {trips.map(trip => {
            const tripMemories = memories.filter(m => m.tripId === trip.id);
            return (
              <div
                key={trip.id}
                className="flex-shrink-0 w-32 bg-white rounded-xl p-2.5 border border-stone-200 hover:border-rose-350 hover:shadow-3xs transition-all duration-200 shadow-3xs cursor-pointer group"
                onClick={() => {
                  if (tripMemories.length > 0) {
                    setSelectedDetailPlace(tripMemories[0]);
                  } else {
                    alert(`"${trip.name}" 수집첩에 등록된 데이트 흔적이 아직 없습니다. 지도의 '추억 추가' 버튼으로 이 폴더를 선택해서 마킹해 보세요! 🗺️`);
                  }
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-6.5 h-6.5 bg-rose-50/70 border border-rose-100 rounded-lg flex items-center justify-center text-sm">
                    {trip.emoji}
                  </div>
                  <span className="text-[8px] bg-rose-50 text-rose-600 font-extrabold px-1.5 py-0.5 rounded-full">
                    📂 {tripMemories.length}개
                  </span>
                </div>
                <h4 className="text-[9.5px] font-black text-stone-800 truncate group-hover:text-rose-500 transition-colors font-serif">
                  {trip.name}
                </h4>
              </div>
            );
          })}
        </div>
      </div>

      {/* Grid List Section - Pinterest Style 2-Column Responsive Card Grid! */}
      <div className="p-3.5">
        {filteredMemories.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center space-y-3 bg-white rounded-2xl border border-dashed border-stone-150 mx-auto max-w-sm p-5 shadow-3xs">
            <div className="w-10 h-10 bg-stone-50 rounded-full flex items-center justify-center text-stone-400 border border-stone-100">
              <Calendar className="w-4.5 h-4.5 text-rose-300" />
            </div>
            <div>
              <p className="text-stone-700 font-black text-xs font-serif">여기에 등록된 흔적이 없어요.</p>
              <p className="text-[9.5px] text-stone-405 mt-1 leading-relaxed">
                지도를 직접 누르거나, 하단 (+) 메뉴 혹은 지도의 '추억 추가'를 통해 달콤한 데이트를 남겨주세요! 💑
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            <AnimatePresence>
              {filteredMemories.map((place, index) => {
                const author = place.createdBy === currentUser.id ? currentUser : otherUser;
                const commentCount = place.comments?.length || 0;
                
                return (
                  <motion.div
                    key={place.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2, delay: Math.min(index * 0.04, 0.2) }}
                    className="bg-white rounded-xl border border-stone-200 hover:border-rose-305 active:scale-98 transition-all duration-200 flex flex-col overflow-hidden shadow-3xs cursor-pointer group"
                    onClick={() => setSelectedDetailPlace(place)}
                    id={`timeline-card-${place.id}`}
                  >
                    {/* Visual Photo Header aspect 4:3 */}
                    <div className="relative w-full aspect-[4/3] bg-stone-105 overflow-hidden">
                      <img
                        src={place.photoUrl}
                        alt={place.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                        referrerPolicy="no-referrer"
                      />
                      
                      {/* Interactive hover overlay */}
                      <div className="absolute inset-0 bg-stone-900/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                        <span className="text-[8px] bg-white text-rose-600 font-extrabold px-1.8 py-1 rounded-md shadow-3xs">
                          🔍 자세히보기
                        </span>
                      </div>
 
                      {/* Short Category Tag */}
                      <div className="absolute top-2 left-2">
                        <span className="text-[8px] bg-white/90 backdrop-blur-md text-stone-850 border border-stone-100 px-1.5 py-0.5 rounded font-black leading-none inline-block shadow-3xs">
                          {place.category === 'food' ? '🍕 맛집' :
                           place.category === 'cafe' ? '☕ 카페' :
                           place.category === 'activity' ? '🎢 놀거리' :
                           place.category === 'stay' ? '🏡 숙소' :
                           place.category === 'scenery' ? '🌅 풍경' : '🗺️ 추억'}
                        </span>
                      </div>
 
                      {/* Star Rating Overlay */}
                      <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-md px-1 py-0.5 rounded flex items-center space-x-0.5 border border-stone-100 shadow-3xs">
                        <Star className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />
                        <span className="text-stone-800 text-[8px] font-black font-mono leading-none">{place.rating}.0</span>
                      </div>
                    </div>
 
                    {/* Card metadata block */}
                    <div className="p-2 flex-1 flex flex-col justify-between space-y-1">
                      <div>
                        <h3 className="text-[10.5px] font-extrabold text-stone-800 line-clamp-1 group-hover:text-rose-500 font-serif leading-tight">
                          {place.title}
                        </h3>
                        <p className="text-[8.5px] text-stone-400 font-mono mt-0.5">{formatDate(place.visitDate)}</p>
                      </div>
 
                      {/* Miniature Bottom line info */}
                      <div className="flex items-center justify-between border-t border-stone-100 pt-1.2 mt-1">
                        <div className="flex items-center space-x-1">
                          <img
                            src={author.avatar}
                            alt={author.nickname}
                            className="w-3.5 h-3.5 rounded-full object-cover ring-1 ring-stone-100"
                            referrerPolicy="no-referrer"
                          />
                          <span className="text-[8px] text-stone-500 font-semibold truncate max-w-[40px]">
                            {author.nickname}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-0.5 text-[8px] font-bold text-stone-400">
                          <span>💬</span>
                          <span>{commentCount}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Advanced Full-Screen Spotlight Detail Popover Sheet */}
      <AnimatePresence>
        {selectedDetailPlace && (
          <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
            <div className="absolute inset-0" onClick={() => setSelectedDetailPlace(null)} />
            
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 26, stiffness: 210 }}
              className="bg-white border-t sm:border border-stone-250/80 rounded-t-2.5xl sm:rounded-2.5xl w-full max-w-sm h-[88vh] sm:h-auto sm:max-h-[85vh] flex flex-col overflow-hidden shadow-2xl relative z-10"
            >
              {/* Top Handle bar for mobile indicator */}
              <div className="w-10 h-1 bg-stone-200 rounded-full mx-auto my-2.5 sm:hidden" />

              {/* Photo Spotlight Area */}
              <div className="relative w-full aspect-[4/3] bg-stone-100 shrink-0">
                <img
                  src={selectedDetailPlace.photoUrl}
                  alt={selectedDetailPlace.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                
                {/* Close Button */}
                <button
                  onClick={() => setSelectedDetailPlace(null)}
                  className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/45 hover:bg-black/60 text-white flex items-center justify-center transition-all shadow-md active:scale-90 font-black text-[11px]"
                >
                  ✕
                </button>

                {/* Overlays on photo */}
                <div className="absolute bottom-3 left-3.5 flex items-center space-x-1.5">
                  <span className="text-[9.5px] bg-rose-500 text-white px-2 py-0.8 rounded-full font-black shadow-sm">
                    {selectedDetailPlace.category === 'food' ? '🍕 맛집' :
                     selectedDetailPlace.category === 'cafe' ? '☕ 카페' :
                     selectedDetailPlace.category === 'activity' ? '🎡 놀거리' :
                     selectedDetailPlace.category === 'stay' ? '🏡 숙소' :
                     selectedDetailPlace.category === 'scenery' ? '🌅 풍경' : '🗺️ 추억'}
                  </span>
                  <div className="bg-white/95 backdrop-blur-md px-1.8 py-0.5 rounded-full border border-stone-200/50 flex items-center space-x-0.5 shadow-3xs">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    <span className="text-stone-850 text-[9px] font-black font-mono">{selectedDetailPlace.rating}.0</span>
                  </div>
                </div>
              </div>

              {/* Scrollable contents area */}
              <div className="p-4 flex-1 overflow-y-auto space-y-3.5 pb-20 scrollbar-none font-sans">
                {/* Creator Header row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <img
                      src={selectedDetailPlace.createdBy === currentUser.id ? currentUser.avatar : otherUser.avatar}
                      alt="avatar"
                      className="w-6.5 h-6.5 rounded-full object-cover ring-2 ring-rose-100"
                    />
                    <div>
                      <p className="text-[10.5px] font-black text-stone-900">
                        {selectedDetailPlace.createdBy === currentUser.id ? currentUser.nickname : otherUser.nickname}의 기록
                      </p>
                      <p className="text-[8.5px] text-stone-400 font-mono">📅 {formatDate(selectedDetailPlace.visitDate)}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (confirm('이 사랑이 가득 담긴 흔적을 정말로 삭제할까요?')) {
                        onDeleteMemory(selectedDetailPlace.id);
                        setSelectedDetailPlace(null);
                      }
                    }}
                    className="text-[9.5px] text-rose-600 hover:text-rose-700 bg-rose-50 px-2 py-1.2 rounded-lg font-bold transition-colors"
                  >
                    🗑️ 삭제하기
                  </button>
                </div>

                {/* Title & Location details */}
                <div className="bg-stone-50 p-3 rounded-xl border border-stone-150 space-y-1.5">
                  <h3 className="text-xs font-black text-stone-900 font-serif leading-snug">
                    {selectedDetailPlace.title}
                  </h3>
                  <div className="flex items-center space-x-1.5 text-[9px] text-stone-550 font-bold">
                    <MapPin className="w-3 h-3 text-rose-500 shrink-0" />
                    <span className="truncate max-w-[170px]">{selectedDetailPlace.name}</span>
                    <button
                      onClick={() => {
                        onSelectPlace(selectedDetailPlace);
                        setSelectedDetailPlace(null);
                      }}
                      className="text-[8.5px] bg-white border border-stone-200 hover:border-rose-450 text-rose-500 px-1.8 py-0.5 rounded font-black transition-all ml-auto shrink-0 shadow-3xs"
                    >
                      🧭 지도 보기
                    </button>
                  </div>
                </div>

                {/* Post body caption content */}
                <div className="space-y-1">
                  <h4 className="text-[9px] font-extrabold text-stone-400 uppercase tracking-wide">🤍 우리의 꿀추억 코멘트</h4>
                  <p className="text-[11px] text-stone-650 leading-relaxed font-serif bg-rose-50/15 p-3 rounded-xl border border-rose-100/30 whitespace-pre-wrap">
                    {selectedDetailPlace.description}
                  </p>
                </div>

                {/* Comments Thread Section */}
                <div className="border-t border-stone-150 pt-3 space-y-2.5">
                  <div className="flex items-center justify-between text-[9.5px] text-stone-500 font-bold">
                    <span className="flex items-center space-x-1">
                      <MessageSquare className="w-3.5 h-3.5 text-rose-400" />
                      <span>실시간 댓글 사랑방 ({selectedDetailPlace.comments?.length || 0}개)</span>
                    </span>
                  </div>

                  {/* Bubble feed style comment list */}
                  <div className="space-y-1.5 max-h-40 overflow-y-auto scrollbar-none">
                    {(!selectedDetailPlace.comments || selectedDetailPlace.comments.length === 0) ? (
                      <div className="text-center py-5 text-stone-400 bg-stone-50/40 rounded-lg text-[9px]">
                        아직 나눈 대화가 없어요. 다정한 한마디를 적어보세요! 💌
                      </div>
                    ) : (
                      selectedDetailPlace.comments.map(comment => (
                        <div
                          key={comment.id}
                          className="flex items-start space-x-1.8 bg-stone-50/60 p-2 rounded-lg border border-stone-150/50"
                        >
                          <img
                            src={comment.avatar}
                            alt={comment.username}
                            className="w-4.5 h-4.5 rounded-full object-cover shrink-0 ring-1 ring-stone-200"
                            referrerPolicy="no-referrer"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="text-[8.5px] font-bold text-stone-700">
                                {comment.username}
                              </span>
                              <span className="text-[7px] text-stone-400 font-mono">
                                {new Date(comment.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-[9.5px] text-stone-600 mt-1 whitespace-pre-wrap leading-relaxed">
                              {comment.text}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Inline comment insert row */}
                  <div className="flex items-center space-x-1.5 h-8 pt-1">
                    <input
                      type="text"
                      placeholder="행복한 대화를 보태보세요..."
                      value={commentInputs[selectedDetailPlace.id] || ''}
                      onChange={(e) => setCommentInputs(prev => ({ ...prev, [selectedDetailPlace.id]: e.target.value }))}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleSendComment(selectedDetailPlace.id);
                          setTimeout(() => {
                            const found = memories.find(m => m.id === selectedDetailPlace.id);
                            if (found) setSelectedDetailPlace(found);
                          }, 100);
                        }
                      }}
                      className="flex-1 bg-stone-50 text-[9.5px] text-stone-850 border border-stone-200 focus:border-rose-350 focus:bg-white rounded-lg px-2.8 outline-none transition-all placeholder:text-stone-400 font-sans h-full"
                      id={`detail-comment-input-${selectedDetailPlace.id}`}
                    />
                    <button
                      onClick={() => {
                        handleSendComment(selectedDetailPlace.id);
                        setTimeout(() => {
                          const found = memories.find(m => m.id === selectedDetailPlace.id);
                          if (found) setSelectedDetailPlace(found);
                        }, 100);
                      }}
                      className="w-8 h-8 bg-gradient-to-br from-rose-450 to-pink-500 text-white rounded-lg flex items-center justify-center shadow-3xs active:scale-95 hover:opacity-95 transition-all focus:outline-none"
                    >
                      <Send className="w-3 h-3 text-white" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add New Theme Modal */}
      <AnimatePresence>
        {showAddTripModal && (
          <div className="fixed inset-0 bg-[#433d3c]/55 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#fffdfb] border border-stone-200 rounded-2xl p-5 w-full max-w-xs shadow-2xl relative"
            >
              <h3 className="text-xs font-black text-stone-850 flex items-center space-x-1.5 font-serif">
                <span>📂 새로운 추억 수집첩 개설</span>
              </h3>
              <p className="text-[9.5px] text-stone-405 mt-0.5 leading-relaxed">우리 둘만의 여행 에피소드나 특정 이벤트 별로 모아서 예쁘게 분류해보세요.</p>

              <form onSubmit={createTripSubmit} className="space-y-3.5 mt-3.5 font-sans text-stone-800">
                <div>
                  <label className="text-[9.5px] font-extrabold text-stone-500 block mb-1">수집첩 이름</label>
                  <input
                    type="text"
                    required
                    placeholder="예: 부산 봄꽃 나들이 🌸"
                    value={newTripName}
                    onChange={(e) => setNewTripName(e.target.value)}
                    className="w-full bg-white border border-stone-200 rounded-lg px-2.5 py-2 text-xs text-stone-850 outline-none focus:border-rose-350"
                    id="input-new-trip-name"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="text-[9.5px] font-extrabold text-stone-500 block mb-1">선택 테마 이모지</label>
                    <select
                      value={newTripEmoji}
                      onChange={(e) => setNewTripEmoji(e.target.value)}
                      className="w-full bg-white border border-stone-200 rounded-lg px-1.8 py-2 text-xs text-stone-855 outline-none focus:border-rose-350"
                      id="select-new-trip-emoji"
                    >
                      <option value="✈️">✈️ 비행기 여행</option>
                      <option value="🚗">🚗 로드 트립</option>
                      <option value="⛰️">⛰️ 등산/액티비티</option>
                      <option value="🍕">🍕 구르메 투어</option>
                      <option value="🌅">🌅 멋진 일몰</option>
                      <option value="🌸">🌸 낭만 벚꽃</option>
                      <option value="🏡">🏡 펜션/감성숙소</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[9.5px] font-extrabold text-stone-550 block mb-1">시작 일자</label>
                    <input
                      type="date"
                      required
                      value={newTripDate}
                      onChange={(e) => setNewTripDate(e.target.value)}
                      className="w-full bg-white border border-stone-200 rounded-lg px-2 py-1.8 text-xs text-stone-800 outline-none focus:border-rose-350 font-sans"
                      id="input-new-trip-date"
                    />
                  </div>
                </div>

                <div className="flex space-x-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setShowAddTripModal(false)}
                    className="flex-1 py-1.8 bg-stone-100 hover:bg-stone-200 text-[10.5px] font-black text-stone-600 rounded-lg active:scale-95 transition-all border border-stone-150"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-1.8 bg-gradient-to-br from-[#ff7e80] to-pink-500 text-white text-[10.5px] font-black rounded-lg shadow-md active:scale-95 transition-all"
                  >
                    개설하기
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
