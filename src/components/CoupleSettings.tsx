/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { UserProfile } from '../types';
import { Heart, RefreshCw, Key, Music, Check, Copy, Award, Shield, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface CoupleSettingsProps {
  currentUser: UserProfile;
  otherUser: UserProfile;
  coupleCode: string;
  onSwitchUser: () => void;
  onUpdateNicknames: (u1Nick: string, u2Nick: string) => void;
  onUpdateBgm: (song: string) => void;
  currentBgm: string;
  anniversaryDate: string;
  onUpdateAnniversary: (date: string) => void;
  onResetAllData?: () => void;
}

export default function CoupleSettings({
  currentUser,
  otherUser,
  coupleCode,
  onSwitchUser,
  onUpdateNicknames,
  onUpdateBgm,
  currentBgm,
  anniversaryDate,
  onUpdateAnniversary,
  onResetAllData
}: CoupleSettingsProps) {
  const [partnerCodeInput, setPartnerCodeInput] = useState('');
  const [isLinked, setIsLinked] = useState(true);
  const [copied, setCopied] = useState(false);
  
  const [u1Nick, setU1Nick] = useState(currentUser.nickname);
  const [u2Nick, setU2Nick] = useState(otherUser.nickname);
  const [songName, setSongName] = useState(currentBgm);
  const [anniversary, setAnniversary] = useState(anniversaryDate);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(coupleCode);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleLinkPartner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!partnerCodeInput.trim()) return;
    setIsLinked(true);
    alert(`커플 코드가 전송되었습니다! ${otherUser.nickname}님과의 연결이 갱신되었습니다.`);
  };

  const handleSaveProfiles = () => {
    onUpdateNicknames(u1Nick, u2Nick);
    onUpdateBgm(songName);
    onUpdateAnniversary(anniversary);
    alert('커플 프로필 및 디데이 설정이 성공적으로 저장되었습니다!');
  };

  const daysCount = Math.max(1, Math.floor(
    (new Date().getTime() - new Date(anniversary).getTime()) / (1000 * 60 * 60 * 24)
  ) + 1);

  return (
    <div className="w-full h-full bg-[#fbf9f6] flex flex-col overflow-y-auto pb-24 font-sans text-stone-800">
      {/* settings header */}
      <div className="p-4 bg-white border-b border-stone-150 sticky top-0 z-10 flex items-center justify-between shadow-xs">
        <div>
          <h1 className="text-sm font-black text-stone-850 flex items-center space-x-1.5 font-serif">
            <span>둘만의 공간 설정</span>
          </h1>
          <p className="text-[10px] text-stone-500">우리 관계 및 연동 정보 관리</p>
        </div>
        <button
          onClick={onSwitchUser}
          className="flex items-center space-x-1.5 px-3 py-1.5 bg-[#ff8a8c] hover:bg-[#ff7578] text-white text-[11px] font-extrabold rounded-lg shadow-sm active:scale-95 transition-all duration-150"
          id="btn-switch-user"
        >
          <RefreshCw className="w-3 h-3" />
          <span>작성자 전환</span>
        </button>
      </div>

      <div className="p-4 space-y-5">
        {/* Heart profile link display */}
        <div className="bg-gradient-to-br from-rose-50/80 via-white to-pink-50/60 border border-stone-200 rounded-3xl p-5 relative overflow-hidden flex flex-col items-center shadow-xs">
          
          <div className="flex items-center space-x-8 mt-2">
            {/* User 1 image bubble */}
            <div className="flex flex-col items-center space-y-2">
              <div className="relative">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.nickname}
                  className="w-16 h-16 rounded-full object-cover ring-4 ring-rose-300 shadow-md"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute -bottom-1 -right-1 bg-rose-500 text-white font-extrabold text-[9px] px-1.5 py-0.5 rounded-full">
                  ME
                </span>
              </div>
              <span className="text-xs font-bold text-stone-800">{currentUser.nickname}</span>
              <span className="text-[9px] text-stone-400 font-mono">@{currentUser.username}</span>
            </div>

            {/* Pulse heart vector */}
            <div className="flex flex-col items-center">
              <div className="text-[9px] text-rose-505 font-black bg-rose-50 border border-rose-100/70 px-2.2 py-1 rounded-full mb-2.5 shadow-3xs flex items-center space-x-1 whitespace-nowrap">
                <span>우리가 함께한 지</span>
                <span className="text-[11px] font-black text-rose-600">{daysCount}일째</span>
                <span>💑</span>
              </div>
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="w-10 h-10 bg-rose-500 rounded-full flex items-center justify-center shadow-md shadow-rose-500/10"
              >
                <Heart className="w-4.5 h-4.5 text-white fill-white" />
              </motion.div>
              <span className="text-[9px] text-rose-500 mt-2 font-black uppercase tracking-widest">Connected</span>
            </div>

            {/* User 2 image bubble */}
            <div className="flex flex-col items-center space-y-2">
              <div className="relative">
                <img
                  src={otherUser.avatar}
                  alt={otherUser.nickname}
                  className="w-16 h-16 rounded-full object-cover ring-4 ring-pink-200 shadow-md"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="text-xs font-bold text-stone-800">{otherUser.nickname}</span>
              <span className="text-[9px] text-stone-400 font-mono">@{otherUser.username}</span>
            </div>
          </div>

          <p className="text-[10px] text-stone-500 mt-6 text-center max-w-xs leading-relaxed">
            두 피드는 암호화 터널을 통해 결합되어 있으며, 실시간으로 두 사람의 단 하나의 지도로 합산 출력됩니다.
          </p>
        </div>

        {/* Couple code section */}
        <div className="bg-white border border-stone-200 rounded-2.5xl p-4.5 space-y-3 shadow-xs">
          <div className="flex items-center space-x-2 text-xs font-bold text-stone-800">
            <Key className="w-4 h-4 text-rose-400" />
            <span>둘만의 커플 코드 연동</span>
          </div>

          <div className="grid grid-cols-2 gap-3.5">
            <div>
              <p className="text-[10px] text-stone-500 font-semibold mb-1">내 공유 코드</p>
              <div className="bg-stone-50 px-3.5 py-2 rounded-xl flex items-center justify-between border border-stone-200">
                <code className="text-xs font-mono font-bold text-stone-700">{coupleCode}</code>
                <button
                  onClick={handleCopyCode}
                  className="text-stone-400 hover:text-stone-600 transition-colors"
                  title="복사하기"
                  id="btn-copy-couple-code"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <form onSubmit={handleLinkPartner} className="flex flex-col justify-end">
              <p className="text-[10px] text-stone-500 font-semibold mb-1">상대방 코드 입력</p>
              <div className="flex space-x-1.5">
                <input
                  type="text"
                  placeholder="상대 코드 입력"
                  value={partnerCodeInput}
                  onChange={(e) => setPartnerCodeInput(e.target.value)}
                  className="flex-1 min-w-0 bg-white border border-stone-200 rounded-xl px-2.5 py-1.5 text-xs text-stone-800 outline-none focus:border-rose-350"
                  id="input-partner-code"
                />
                <button
                  type="submit"
                  className="bg-stone-100 hover:bg-stone-200 text-xs px-2.5 rounded-xl border border-stone-200 font-bold text-stone-600 active:scale-95 transition-all"
                  id="btn-link-partner"
                >
                  연동
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Profile update fields */}
        <div className="bg-white border border-stone-200 rounded-2.5xl p-4.5 space-y-4 shadow-xs">
          <div className="flex items-center space-x-2 text-xs font-bold text-stone-850">
            <Award className="w-4 h-4 text-rose-400" />
            <span>기본 정보 및 프로필 최적화</span>
          </div>

          <div className="grid grid-cols-2 gap-3.5">
            <div>
              <label className="text-[10px] text-stone-500 font-semibold block mb-1">내 닉네임</label>
              <input
                type="text"
                value={u1Nick}
                onChange={(e) => setU1Nick(e.target.value)}
                className="w-full bg-white border border-stone-200 rounded-xl px-3.5 py-2 text-xs text-stone-800 outline-none focus:border-rose-300"
                id="input-u1-nickname"
              />
            </div>

            <div>
              <label className="text-[10px] text-stone-500 font-semibold block mb-1">상대방 닉네임</label>
              <input
                type="text"
                value={u2Nick}
                onChange={(e) => setU2Nick(e.target.value)}
                className="w-full bg-white border border-stone-200 rounded-xl px-3.5 py-2 text-xs text-stone-800 outline-none focus:border-rose-300"
                id="input-u2-nickname"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] text-stone-500 font-semibold block mb-1">
              우리의 시작일 (기념일 설정)
            </label>
            <input
              type="date"
              value={anniversary}
              onChange={(e) => setAnniversary(e.target.value)}
              className="w-full bg-white border border-stone-200 rounded-xl px-3.5 py-2 text-xs text-stone-800 outline-none focus:border-rose-300 pointer-events-auto"
              id="input-anniversary-date"
            />
            <p className="text-[9px] text-stone-400 mt-1">시작한 날짜를 지정하면 실시간 디데이(+일째)가 바 디자인에 자동 업데이트됩니다.</p>
          </div>

          <div>
            <label className="text-[10px] text-stone-500 font-semibold block mb-1">
              음악 (BGM) 정보 설정
            </label>
            <div className="relative">
              <Music className="absolute left-3.5 top-3 w-4 h-4 text-rose-450" />
              <input
                type="text"
                value={songName}
                onChange={(e) => setSongName(e.target.value)}
                className="w-full bg-white border border-stone-200 pl-10 pr-3.5 py-2.5 rounded-xl text-xs text-stone-800 outline-none focus:border-rose-300"
                id="input-bgm-song"
              />
            </div>
            <p className="text-[9px] text-stone-400 mt-1">앱 상단에 표시되는 추억의 전용 연애 테마 곡명입니다.</p>
          </div>

          <button
            onClick={handleSaveProfiles}
            className="w-full py-3 bg-gradient-to-br from-[#ff8d90] to-pink-500 text-white rounded-xl text-xs font-semibold shadow-sm active:scale-95 transition-all duration-150"
            id="btn-save-settings"
          >
            변경 설정 사항 저장하기
          </button>
        </div>

        {/* Danger Zone */}
        <div className="bg-red-50/50 border border-red-100 rounded-2.5xl p-4.5 space-y-3 shadow-xs">
          <div className="flex items-center space-x-2 text-xs font-bold text-red-700">
            <AlertCircle className="w-4 h-4 text-red-500" />
            <span>위험 구역 (Danger Zone)</span>
          </div>
          <p className="text-[10px] text-stone-500 leading-relaxed">
            기기에 기록된 모든 이야기, 커플 앨범 추억 좌표, 메시지 기록 및 버킷 목록 데이터를 단 한 번의 터치로 즉각 깨끗이 제거합니다.
          </p>
          <button
            onClick={() => {
              if (confirm('정말로 본인 및 상대방의 모든 추억 기록과 러브 플래너 목록을 완전히 깨끗하게 초기화하시겠습니까? (이 작업은 복구될 수 없습니다)')) {
                onResetAllData?.();
              }
            }}
            className="w-full py-2.5 bg-white hover:bg-red-50 border border-red-200 text-red-600 hover:text-red-700 rounded-xl text-[11px] font-bold transition-all active:scale-95 flex items-center justify-center space-x-1.5"
            id="btn-danger-reset-all"
          >
            <span>전체 데이터 완전히 초기화하기 (Fresh Start)</span>
          </button>
        </div>

        {/* Dev note */}
        <div className="bg-stone-100/60 border border-stone-200 rounded-2xl p-4.5 flex items-start space-x-3 text-stone-500">
          <Shield className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
          <div className="text-[10px] leading-relaxed">
            <span className="font-bold text-stone-700 block mb-0.5">인증 정보 보안 시스템</span>
            현재 개발 중인 기기는 LocalStorage 연동 모드로 격리되어 있습니다. 두 사람이 각각 피드를 남기거나 상단의 아바타 버튼을 이용하여 수시로 작성자를 바꾸며 교차 기록할 수 있습니다.
          </div>
        </div>
      </div>
    </div>
  );
}
