/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PlannerItem, UserProfile } from '../types';
import { Check, CheckSquare, Heart, Plus, Trash2, Wallet, ListTodo } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PlannerViewProps {
  plannerItems: PlannerItem[];
  currentUser: UserProfile;
  onAddPlannerItem: (title: string, category: 'checklist' | 'bucket' | 'budget', amount?: number, dueDate?: string) => void;
  onTogglePlannerItem: (id: string) => void;
  onDeletePlannerItem: (id: string) => void;
}

export default function PlannerView({
  plannerItems,
  currentUser,
  onAddPlannerItem,
  onTogglePlannerItem,
  onDeletePlannerItem
}: PlannerViewProps) {
  const [activeTab, setActiveTab] = useState<'checklist' | 'bucket' | 'budget'>('checklist');
  const [newTitle, setNewTitle] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [newDueDate, setNewDueDate] = useState('');

  const filteredItems = plannerItems.filter(item => item.category === activeTab);

  // Statistics calculation
  const totalChecklist = plannerItems.filter(i => i.category === 'checklist').length;
  const completedChecklist = plannerItems.filter(i => i.category === 'checklist' && i.completed).length;
  const percentCompleted = totalChecklist > 0 ? Math.round((completedChecklist / totalChecklist) * 100) : 0;

  const totalBucket = plannerItems.filter(i => i.category === 'bucket').length;
  const completedBucket = plannerItems.filter(i => i.category === 'bucket' && i.completed).length;

  const totalBudget = plannerItems
    .filter(i => i.category === 'budget')
    .reduce((sum, item) => sum + (item.amount || 0), 0);

  const budgetUsed = plannerItems
    .filter(i => i.category === 'budget' && i.completed)
    .reduce((sum, item) => sum + (item.amount || 0), 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const parsedAmount = activeTab === 'budget' ? Number(newAmount) || 0 : undefined;
    onAddPlannerItem(newTitle, activeTab, parsedAmount, newDueDate || undefined);

    setNewTitle('');
    setNewAmount('');
    setNewDueDate('');
  };

  return (
    <div className="w-full h-full bg-[#fdfbf9] flex flex-col overflow-y-auto pb-24 font-sans text-stone-850">
      {/* Premium Header */}
      <div className="px-6 py-5 bg-white border-b border-stone-200/60 sticky top-0 z-10 shadow-3xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-lg font-black text-stone-900 flex items-center space-x-2 font-serif tracking-tight">
              <span>둘만의 러브 플래너</span>
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500 animate-pulse shrink-0" />
            </h1>
            <p className="text-xs text-stone-550 mt-0.5">완전하게 기록하고 오붓하게 함께 만드는 러브 플래너</p>
          </div>
          <span className="text-[10px] self-start sm:self-auto bg-rose-50 text-rose-600 border border-rose-100 px-3 py-1 rounded-full font-black font-mono">
            LIVE SYNCING
          </span>
        </div>

        {/* Dashboard Cards Summary with elevated styling */}
        <div className="grid grid-cols-3 gap-4 mt-5">
          <div className="bg-[#fffdfb] rounded-2xl p-3.5 border border-stone-200 shadow-3xs flex flex-col justify-between">
            <span className="text-[11px] font-extrabold text-stone-500 block mb-1">체크리스트</span>
            <div className="flex items-baseline space-x-1">
              <span className="text-lg font-black text-rose-550 font-mono tracking-tight">{percentCompleted}</span>
              <span className="text-[10px] text-stone-400 font-bold">%</span>
            </div>
          </div>

          <div className="bg-[#fffdfb] rounded-2xl p-3.5 border border-stone-200 shadow-3xs flex flex-col justify-between">
            <span className="text-[11px] font-extrabold text-stone-500 block mb-1">우리 버킷</span>
            <div className="flex items-baseline space-x-0.8">
              <span className="text-lg font-black text-stone-900 font-mono tracking-tight">{completedBucket}</span>
              <span className="text-stone-300 text-sm font-mono font-medium">/</span>
              <span className="text-stone-450 text-xs font-mono font-black">{totalBucket}</span>
            </div>
          </div>

          <div className="bg-[#fffdfb] rounded-2xl p-3.5 border border-stone-200 shadow-3xs flex flex-col justify-between">
            <span className="text-[11px] font-extrabold text-stone-500 block mb-1">예정 예산</span>
            <div className="flex items-baseline">
              <span className="text-sm sm:text-base font-black text-rose-500 font-mono tracking-tight truncate">
                {(totalBudget).toLocaleString()}원
              </span>
            </div>
          </div>
        </div>

        {/* Categories Tab Pill Rows */}
        <div className="flex space-x-1 bg-stone-100/70 p-1 rounded-2xl border border-stone-200/50 mt-5">
          <button
            onClick={() => setActiveTab('checklist')}
            className={`flex-1 flex items-center justify-center space-x-1.5 py-2.2 rounded-xl text-xs font-black transition-all ${
              activeTab === 'checklist'
                ? 'bg-rose-500 text-white shadow-md shadow-rose-500/10'
                : 'text-stone-500 hover:text-stone-800'
            }`}
            id="tab-planner-checklist"
          >
            <ListTodo className="w-3.5 h-3.5" />
            <span>준비물 / 체크</span>
          </button>

          <button
            onClick={() => setActiveTab('bucket')}
            className={`flex-1 flex items-center justify-center space-x-1.5 py-2.2 rounded-xl text-xs font-black transition-all ${
              activeTab === 'bucket'
                ? 'bg-rose-500 text-white shadow-md shadow-rose-500/10'
                : 'text-stone-500 hover:text-stone-800'
            }`}
            id="tab-planner-bucket"
          >
            <Heart className="w-3.5 h-3.5" />
            <span>커플 버킷</span>
          </button>

          <button
            onClick={() => setActiveTab('budget')}
            className={`flex-1 flex items-center justify-center space-x-1.5 py-2.2 rounded-xl text-xs font-black transition-all ${
              activeTab === 'budget'
                ? 'bg-rose-500 text-white shadow-md shadow-rose-500/10'
                : 'text-stone-500 hover:text-stone-800'
            }`}
            id="tab-planner-budget"
          >
            <Wallet className="w-3.5 h-3.5" />
            <span>공동 가계부</span>
          </button>
        </div>
      </div>

      {/* Input container with rich premium theme styling */}
      <div className="px-6 py-5 bg-gradient-to-b from-white/40 to-transparent border-b border-stone-150">
        <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
          <div>
            <label className="text-[10px] font-black text-rose-550 block mb-1.5 uppercase tracking-wide">
              {activeTab === 'checklist' ? '✅ 챙겨야 할 소중한 준비물 / 약속' :
               activeTab === 'bucket' ? '💖 함께하고 싶은 로맨틱 버킷리스트' :
               '💰 여행 공동 소요 비용 설계'}
            </label>
            <div className="flex space-x-2.5">
              <input
                type="text"
                required
                placeholder={
                  activeTab === 'checklist' ? '예: 삼각대, 선크림, 편안한 커플 운동화 👟' :
                  activeTab === 'bucket' ? '예: 한강 공원에서 자전거 타고 피크닉 브이로그 🧺' :
                  '예: 맛있는 커플 맛집 저녁 식사비'
                }
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="flex-1 bg-white border border-stone-200 rounded-xl px-4 py-2.5 text-xs text-stone-800 outline-none focus:border-rose-350"
                id="input-planner-title"
              />
              <button
                type="submit"
                className="px-5 bg-gradient-to-br from-[#ff7e80] to-pink-500 rounded-xl text-xs font-black text-white shadow-md hover:opacity-95 active:scale-95 transition-all outline-none shrink-0"
                id="btn-planner-add"
              >
                <span>등록</span>
              </button>
            </div>
          </div>

          {/* Optional sub-fields if activeTab has numbers or dates */}
          <AnimatePresence>
            {(activeTab === 'checklist' || activeTab === 'budget') && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="grid grid-cols-2 gap-3"
              >
                {activeTab === 'checklist' && (
                  <div>
                    <label className="text-[10px] font-bold text-stone-500 block mb-1">챙길 예정일 (선택)</label>
                    <input
                      type="date"
                      value={newDueDate}
                      onChange={(e) => setNewDueDate(e.target.value)}
                      className="w-full bg-white border border-stone-200 rounded-xl px-3.5 py-2 text-xs text-stone-850 outline-none focus:border-rose-350"
                    />
                  </div>
                )}

                {activeTab === 'budget' && (
                  <div>
                    <label className="text-[10px] font-bold text-stone-500 block mb-1">소요 지출액 (원 ₩)</label>
                    <input
                      type="number"
                      placeholder="예: 55000"
                      value={newAmount}
                      onChange={(e) => setNewAmount(e.target.value)}
                      className="w-full bg-white border border-stone-200 rounded-xl px-3.5 py-2 text-xs text-stone-850 outline-none focus:border-rose-350"
                    />
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>

      {/* Styled Checklist Elements Layout */}
      <div className="px-6 py-4 max-w-xl mx-auto w-full">
        {filteredItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center text-stone-400 bg-white rounded-3xl border border-dashed border-stone-200">
            <CheckSquare className="w-10 h-10 opacity-30 text-rose-300 mb-2" />
            <p className="text-stone-700 text-xs font-black font-serif">정해진 일정이 비어있어요.</p>
            <p className="text-[10px] text-stone-450 mt-1 leading-relaxed">준비할 물건이나 해보고 싶은 로맨스를 기록해보세요!</p>
          </div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence initial={false}>
              {filteredItems.map(item => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className={`flex items-center justify-between p-4.5 rounded-2xl border transition-all ${
                    item.completed
                      ? 'bg-stone-50/70 border-stone-150 opacity-60'
                      : 'bg-white border-stone-200 hover:border-rose-350 shadow-3xs'
                  }`}
                  id={`planner-item-${item.id}`}
                >
                  <div className="flex items-center space-x-3.5 flex-1 min-w-0">
                    {/* Circle Checkbox Trigger with fine gradient border overlays */}
                    <button
                      onClick={() => onTogglePlannerItem(item.id)}
                      className={`w-6 h-6 rounded-xl flex items-center justify-center border transition-all flex-shrink-0 ${
                        item.completed
                          ? 'bg-gradient-to-br from-[#ff7e80] to-pink-500 border-none text-white shadow-sm'
                          : 'border-stone-300 hover:border-rose-450 bg-[#faf8f5]'
                      }`}
                      id={`btn-toggle-item-${item.id}`}
                    >
                      {item.completed && <Check className="w-4.5 h-4.5 stroke-[3.5px] text-white" />}
                    </button>

                    <div className="min-w-0 flex-1">
                      <p className={`text-xs font-black font-serif text-stone-850 truncate ${item.completed ? 'line-through text-stone-400' : ''}`}>
                        {item.title}
                      </p>

                      {/* Subtitles metadata */}
                      {item.dueDate && (
                        <p className="text-[9px] text-stone-450 font-mono mt-0.5">
                          ⏰ 목표일: {item.dueDate}
                        </p>
                      )}

                      {item.category === 'budget' && item.amount !== undefined && (
                        <p className={`text-xs font-black font-mono mt-0.5 ${item.completed ? 'text-stone-400' : 'text-[#ff6a6a]'}`}>
                          ₩ {item.amount.toLocaleString()}원
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Right controllers */}
                  <div className="flex items-center space-x-2 flex-shrink-0">
                    {item.category === 'budget' && (
                      <span className={`text-[9px] px-2.5 py-0.8 rounded-full font-black uppercase tracking-wider ${
                        item.completed
                          ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                          : 'bg-stone-100 text-stone-500'
                      }`}>
                        {item.completed ? '정산완료' : '지출예상'}
                      </span>
                    )}

                    <button
                      onClick={() => onDeletePlannerItem(item.id)}
                      className="p-1.5 text-stone-400 hover:text-rose-500 rounded-xl hover:bg-stone-50 transition-colors"
                      id={`btn-delete-item-${item.id}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Guidelines footer banner */}
      <div className="px-6 py-6 max-w-xl mx-auto w-full">
        <div className="p-4 bg-gradient-to-r from-rose-50/50 to-pink-50/20 border border-rose-100 rounded-2xl">
          <p className="text-[11px] font-black text-rose-600 flex items-center space-x-1.5 font-serif">
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            <span>커플 실시간 공유 플래너</span>
          </p>
          <span className="text-[10px] text-stone-500 leading-relaxed block mt-1.5">
            등록하는 모든 가계 내역과 준비물은 동행 파트너에 의해 함께 조율될 수 있습니다. 꼼꼼한 마일스톤 설계로 더욱 깊은 사랑을 쌓아보세요.
          </span>
        </div>
      </div>
    </div>
  );
}
