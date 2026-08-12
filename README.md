<div align="center">

<svg viewBox="0 0 900 380" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="border-radius: 18px; box-shadow: 0 20px 40px rgba(244, 63, 94, 0.12); font-family: system-ui, -apple-system, sans-serif;">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fff5f6" />
      <stop offset="50%" stop-color="#ffe4e6" />
      <stop offset="100%" stop-color="#fecdd3" />
    </linearGradient>
    <linearGradient id="cardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="100%" stop-color="#fff8f8" />
    </linearGradient>
    <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#f43f5e" />
      <stop offset="100%" stop-color="#ec4899" />
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="6" stdDeviation="12" flood-color="#f43f5e" flood-opacity="0.15" />
    </filter>
    <filter id="markerShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000000" flood-opacity="0.18" />
    </filter>
  </defs>

  <!-- Background Canvas -->
  <rect width="900" height="380" rx="18" fill="url(#bgGrad)" />
  
  <!-- Map Decorative Background Grid Lines -->
  <path d="M 0 100 Q 250 80 500 120 T 900 110" stroke="#fca5a5" stroke-width="2" fill="none" opacity="0.35" />
  <path d="M 0 220 Q 200 260 450 200 T 900 240" stroke="#fca5a5" stroke-width="2" fill="none" opacity="0.35" />
  <path d="M 0 310 Q 350 280 650 330 T 900 300" stroke="#fca5a5" stroke-width="2.5" fill="none" stroke-dasharray="6,6" opacity="0.4" />
  <path d="M 220 0 Q 250 180 200 380" stroke="#fca5a5" stroke-width="2" fill="none" opacity="0.3" />
  <path d="M 680 0 Q 640 200 700 380" stroke="#fca5a5" stroke-width="2" fill="none" opacity="0.3" />

  <!-- Main App Frame Box -->
  <rect x="40" y="30" width="820" height="320" rx="14" fill="url(#cardGrad)" stroke="#fecdd3" stroke-width="2" filter="url(#shadow)" />

  <!-- App Bar Header -->
  <rect x="40" y="30" width="820" height="54" rx="14" fill="#ffffff" />
  <line x1="40" y1="84" x2="860" y2="84" stroke="#ffe4e6" stroke-width="1.5" />
  
  <!-- Logo & Couple D-Day Badge -->
  <text x="65" y="64" font-size="20" font-weight="800" fill="#e11d48">🐾 우리발자국</text>
  <rect x="200" y="45" width="165" height="28" rx="14" fill="#fff1f2" stroke="#fecdd3" stroke-width="1" />
  <text x="212" y="64" font-size="12" font-weight="700" fill="#e11d48">민우 ♥ 수진 D+100</text>
  
  <!-- Top Action Controls -->
  <rect x="620" y="45" width="120" height="28" rx="14" fill="#fecdd3" opacity="0.4" />
  <text x="635" y="63" font-size="11" font-weight="600" fill="#be123c">🎵 BGM : 벚볼 엔딩</text>
  <circle cx="775" cy="59" r="14" fill="#ffe4e6" stroke="#f43f5e" stroke-width="1" />
  <text x="768" y="63" font-size="11" font-weight="700" fill="#be123c">👦🏻</text>
  <rect x="795" y="45" width="50" height="28" rx="8" fill="url(#accentGrad)" />
  <text x="806" y="63" font-size="11" font-weight="700" fill="#ffffff">연동</text>

  <!-- Simulated Interactive Map Canvas -->
  <rect x="55" y="98" width="790" height="236" rx="10" fill="#f8fafc" stroke="#f1f5f9" stroke-width="1" />
  
  <!-- Map Features (Roads & Islands/Parks) -->
  <path d="M 70 200 Q 250 160 480 230 T 830 190" stroke="#cbd5e1" stroke-width="16" fill="none" opacity="0.5" stroke-linecap="round" />
  <path d="M 70 200 Q 250 160 480 230 T 830 190" stroke="#ffffff" stroke-width="10" fill="none" opacity="0.9" stroke-linecap="round" />
  
  <path d="M 320 100 Q 340 220 300 320" stroke="#cbd5e1" stroke-width="10" fill="none" opacity="0.4" stroke-linecap="round" />
  <path d="M 320 100 Q 340 220 300 320" stroke="#ffffff" stroke-width="6" fill="none" opacity="0.9" stroke-linecap="round" />

  <!-- Green Park Areas on Map -->
  <path d="M 100 120 C 140 110 180 130 160 170 C 130 190 90 170 100 120 Z" fill="#dcfce7" opacity="0.7" />
  <path d="M 600 240 C 650 220 720 250 690 300 C 630 310 580 280 600 240 Z" fill="#e0e7ff" opacity="0.6" />

  <!-- Dotted Romantic Memory Path Line -->
  <path d="M 150 210 Q 280 130 450 180 T 730 150" stroke="#f43f5e" stroke-width="3.5" stroke-dasharray="6,8" fill="none" stroke-linecap="round" />

  <!-- Marker 1 (Namsan Tower) -->
  <g filter="url(#markerShadow)">
    <rect x="126" y="165" width="48" height="54" rx="8" fill="#ffffff" stroke="#f43f5e" stroke-width="2" />
    <rect x="130" y="169" width="40" height="38" rx="5" fill="#fecdd3" />
    <text x="142" y="193" font-size="18">🗼</text>
    <circle cx="168" cy="168" r="9" fill="#f43f5e" />
    <text x="165" y="172" font-size="10" font-weight="800" fill="#ffffff">1</text>
    <text x="122" y="230" font-size="11" font-weight="700" fill="#be123c">남산타워 첫 데이트</text>
  </g>

  <!-- Marker 2 (Jeju Beach) -->
  <g filter="url(#markerShadow)">
    <rect x="426" y="135" width="48" height="54" rx="8" fill="#ffffff" stroke="#f43f5e" stroke-width="2.5" />
    <rect x="430" y="139" width="40" height="38" rx="5" fill="#bae6fd" />
    <text x="442" y="163" font-size="18">🌊</text>
    <circle cx="468" cy="138" r="9" fill="#f43f5e" />
    <text x="465" y="142" font-size="10" font-weight="800" fill="#ffffff">2</text>
    <text x="418" y="200" font-size="11" font-weight="700" fill="#be123c">제주 협재 바다</text>
  </g>

  <!-- Marker 3 (Busan Cafe) -->
  <g filter="url(#markerShadow)">
    <rect x="706" y="105" width="48" height="54" rx="8" fill="#ffffff" stroke="#f43f5e" stroke-width="2" />
    <rect x="710" y="109" width="40" height="38" rx="5" fill="#fef08a" />
    <text x="722" y="133" font-size="18">☕</text>
    <circle cx="748" cy="108" r="9" fill="#f43f5e" />
    <text x="745" y="112" font-size="10" font-weight="800" fill="#ffffff">3</text>
    <text x="702" y="170" font-size="11" font-weight="700" fill="#be123c">해운대 감성카페</text>
  </g>

  <!-- Memory Preview Popup Overlay (Selected Marker 2) -->
  <g filter="url(#shadow)">
    <rect x="260" y="200" width="280" height="110" rx="12" fill="#ffffff" stroke="#fecdd3" stroke-width="1.5" />
    <rect x="270" y="210" width="75" height="75" rx="8" fill="#e0f2fe" />
    <text x="290" y="256" font-size="32">📸</text>
    
    <text x="355" y="230" font-size="13" font-weight="800" fill="#1e293b">제주도 1주년 여행 ❤️</text>
    <text x="355" y="247" font-size="10" font-weight="600" fill="#64748b">📅 2026.07.14 · 📍 제주 제주시</text>
    <text x="355" y="265" font-size="10" fill="#f43f5e" font-weight="700">⭐ 5.0  |  🏷️ 여행 · 맛집</text>
    
    <rect x="355" y="275" width="170" height="22" rx="6" fill="#fff1f2" />
    <text x="362" y="290" font-size="10" fill="#be123c" font-weight="600">💬 민우: 에메랄드빛 바다 최고!</text>
  </g>

  <!-- Navigation Tab Bar -->
  <rect x="270" y="318" width="360" height="32" rx="16" fill="#ffffff" stroke="#fecdd3" stroke-width="1" filter="url(#shadow)" />
  <rect x="274" y="321" width="85" height="26" rx="13" fill="url(#accentGrad)" />
  <text x="293" y="338" font-size="11" font-weight="700" fill="#ffffff">🗺️ 지도</text>
  <text x="375" y="338" font-size="11" font-weight="600" fill="#64748b">📖 타임라인</text>
  <text x="462" y="338" font-size="11" font-weight="600" fill="#64748b">🗓️ 플래너</text>
  <text x="548" y="338" font-size="11" font-weight="600" fill="#64748b">⚙️ 설정</text>
</svg>

</div>

<br />

<div align="center">

# 🐾 우리발자국 (Our Footprints)

### 커플을 위한 위치 기반 추억 지도 앨범 & 실시간 연동 다이어리

소중한 연인과의 모든 순간과 여행 추억을 지도 위에 한눈에 기록하고 공유해보세요.  
사진의 위치 정보(EXIF) 자동 감지부터 타임라인 코멘터리, 공동 여행 플래너, D-Day 기념일 관리까지 하나의 앱에서 즐길 수 있습니다.

[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Leaflet](https://img.shields.io/badge/Leaflet-1.9-199900?style=for-the-badge&logo=leaflet&logoColor=white)](https://leafletjs.com/)
[![PWA Ready](https://img.shields.io/badge/PWA-Supported-FF6F61?style=for-the-badge&logo=pwa&logoColor=white)](#-pwa--모바일-지원)

</div>

---

<br />

## 🎨 주요 화면 UI 모듈 (Interactive UI Preview)

### 1️⃣ 위치 기반 추억 지도 (Map View)
> 지도 위 이동 동선(대시 경로)과 순서별 폴라로이드 핀 마커, 사진 업로드 시 EXIF 메타데이터 위치 자동 추출을 지원합니다.

```svg
<svg viewBox="0 0 800 240" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="border-radius: 12px; font-family: system-ui, sans-serif;">
  <rect width="800" height="240" rx="12" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5" />
  
  <!-- Map Lines -->
  <path d="M 50 120 Q 200 40 400 140 T 750 100" stroke="#f43f5e" stroke-width="3" stroke-dasharray="6,6" fill="none" />
  
  <!-- Marker 1 -->
  <g transform="translate(160, 40)">
    <rect width="60" height="70" rx="8" fill="#ffffff" stroke="#f43f5e" stroke-width="2" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.1))" />
    <rect x="5" y="5" width="50" height="45" rx="5" fill="#fbcfe8" />
    <text x="20" y="33" font-size="20">🌸</text>
    <circle cx="50" cy="5" r="10" fill="#f43f5e" />
    <text x="47" y="9" font-size="10" fill="#fff" font-weight="bold">1</text>
    <text x="-5" y="85" font-size="11" font-weight="bold" fill="#be123c">여의도 벚꽃축제</text>
  </g>

  <!-- Marker 2 -->
  <g transform="translate(380, 110)">
    <rect width="60" height="70" rx="8" fill="#ffffff" stroke="#f43f5e" stroke-width="2" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.1))" />
    <rect x="5" y="5" width="50" height="45" rx="5" fill="#bae6fd" />
    <text x="20" y="33" font-size="20">🏖️</text>
    <circle cx="50" cy="5" r="10" fill="#f43f5e" />
    <text x="47" y="9" font-size="10" fill="#fff" font-weight="bold">2</text>
    <text x="5" y="85" font-size="11" font-weight="bold" fill="#be123c">속초 해변 데이트</text>
  </g>

  <!-- Marker 3 -->
  <g transform="translate(620, 70)">
    <rect width="60" height="70" rx="8" fill="#ffffff" stroke="#f43f5e" stroke-width="2" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.1))" />
    <rect x="5" y="5" width="50" height="45" rx="5" fill="#fef08a" />
    <text x="20" y="33" font-size="20">🥐</text>
    <circle cx="50" cy="5" r="10" fill="#f43f5e" />
    <text x="47" y="9" font-size="10" fill="#fff" font-weight="bold">3</text>
    <text x="5" y="85" font-size="11" font-weight="bold" fill="#be123c">성수동 베이커리</text>
  </g>

  <!-- EXIF Auto Detect Pill Badge -->
  <g transform="translate(20, 180)">
    <rect width="250" height="40" rx="20" fill="#ffffff" stroke="#fecdd3" stroke-width="1.5" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.05))" />
    <text x="15" y="25" font-size="12" font-weight="bold" fill="#e11d48">📸 EXIF 자동 감지: 37.5665 N, 126.9780 E</text>
  </g>
</svg>
```

<br />

### 2️⃣ 타임라인 & 커플 코멘터리 (Timeline & Dual Commentary)
> 연대순으로 정렬된 추억 카드에 나와 연인이 주고받은 스티커와 메시지 코멘트가 함께 보존됩니다.

```svg
<svg viewBox="0 0 800 220" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="border-radius: 12px; font-family: system-ui, sans-serif;">
  <rect width="800" height="220" rx="12" fill="#fff1f2" stroke="#fecdd3" stroke-width="1" />
  
  <!-- Left Memory Card -->
  <g transform="translate(30, 20)">
    <rect width="350" height="180" rx="12" fill="#ffffff" stroke="#ffe4e6" stroke-width="1.5" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.04))" />
    <rect x="15" y="15" width="80" height="80" rx="8" fill="#fecdd3" />
    <text x="40" y="60" font-size="30">🍰</text>
    
    <text x="110" y="35" font-size="14" font-weight="bold" fill="#1e293b">100일 기념 케이크 촛불 비우기</text>
    <text x="110" y="55" font-size="11" fill="#64748b">📅 2026.08.01  |  📍 연남동 카페</text>
    <text x="110" y="75" font-size="11" fill="#f43f5e" font-weight="bold">⭐ 5.0  [🥰 행복해요]</text>
    
    <!-- Comment Bubbles -->
    <rect x="15" y="105" width="320" height="28" rx="6" fill="#f1f5f9" />
    <text x="25" y="123" font-size="11" fill="#334155">👦🏻 민우: 우리가 벌써 100일이라니 시간 빠르다!</text>
    
    <rect x="15" y="138" width="320" height="28" rx="6" fill="#fff1f2" />
    <text x="25" y="156" font-size="11" fill="#be123c" font-weight="bold">👩🏻 수진: 맛있는 케이크 준비해줘서 고마워 최고 💖</text>
  </g>

  <!-- Right Memory Card -->
  <g transform="translate(420, 20)">
    <rect width="350" height="180" rx="12" fill="#ffffff" stroke="#ffe4e6" stroke-width="1.5" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.04))" />
    <rect x="15" y="15" width="80" height="80" rx="8" fill="#bbf7d0" />
    <text x="40" y="60" font-size="30">🏕️</text>
    
    <text x="110" y="35" font-size="14" font-weight="bold" fill="#1e293b">가평 차박 글램핑 여행</text>
    <text x="110" y="55" font-size="11" fill="#64748b">📅 2026.07.20  |  📍 가평 자라섬</text>
    <text x="110" y="75" font-size="11" fill="#f43f5e" font-weight="bold">⭐ 4.8  [🔥 감성폭발]</text>
    
    <!-- Comment Bubbles -->
    <rect x="15" y="105" width="320" height="28" rx="6" fill="#f1f5f9" />
    <text x="25" y="123" font-size="11" fill="#334155">👦🏻 민우: 밤하늘 별빛 보면서 불멍 때리던 순간 최고</text>
    
    <rect x="15" y="138" width="320" height="28" rx="6" fill="#fff1f2" />
    <text x="25" y="156" font-size="11" fill="#be123c" font-weight="bold">👩🏻 수진: 다음엔 고구마 꼭 사가지고 가자! 🍠</text>
  </g>
</svg>
```

<br />

### 3️⃣ 공동 여행 플래너 & 가계부 (Trip Planner & Budget)
> D-Day 카운트다운, 가고 싶은 곳 체크리스트 및 공동 예산 수립/집행 현황을 한눈에 관리합니다.

```svg
<svg viewBox="0 0 800 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="border-radius: 12px; font-family: system-ui, sans-serif;">
  <rect width="800" height="200" rx="12" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5" />
  
  <!-- Trip Card Header -->
  <rect x="20" y="20" width="760" height="50" rx="10" fill="#fff1f2" />
  <text x="40" y="50" font-size="16" font-weight="bold" fill="#e11d48">✈️ 2026 여름 제주도 3박 4일 힐링 여행</text>
  <rect x="650" y="32" width="110" height="26" rx="13" fill="#f43f5e" />
  <text x="670" y="49" font-size="12" font-weight="bold" fill="#ffffff">D-12 카운트다운</text>

  <!-- Checklist Box -->
  <g transform="translate(20, 85)">
    <rect width="360" height="95" rx="8" fill="#f8fafc" stroke="#f1f5f9" stroke-width="1" />
    <text x="15" y="25" font-size="12" font-weight="bold" fill="#334155">📋 준비물 & 체크리스트 (3/4 완료)</text>
    
    <text x="15" y="48" font-size="11" fill="#16a34a">✅ 렌트카 예약 완료 (SK렌터카)</text>
    <text x="15" y="66" font-size="11" fill="#16a34a">✅ 숙소 3박 예약 (아쿠아뷰 리조트)</text>
    <text x="15" y="84" font-size="11" fill="#94a3b8">⬜ 우도 스쿠터 대여 사전 문의</text>
  </g>

  <!-- Budget Progress Box -->
  <g transform="translate(400, 85)">
    <rect width="380" height="95" rx="8" fill="#f8fafc" stroke="#f1f5f9" stroke-width="1" />
    <text x="15" y="25" font-size="12" font-weight="bold" fill="#334155">💰 여행 예산 & 데이트 통장 집행률</text>
    
    <!-- Progress bar -->
    <rect x="15" y="38" width="350" height="14" rx="7" fill="#e2e8f0" />
    <rect x="15" y="38" width="260" height="14" rx="7" fill="#f43f5e" />
    
    <text x="15" y="72" font-size="11" font-weight="bold" fill="#be123c">현재 지출: 450,000원</text>
    <text x="260" y="72" font-size="11" fill="#64748b">목표 예산: 600,000원 (75%)</text>
  </g>
</svg>
```

---

<br />

## ✨ 핵심 주요 기능 (Key Features)

### 🗺️ 1. 위치 기반 추억 지도 (Memory Map)
- **자동 EXIF 위치 추출**: 업로드한 사진 속 GPS 정보(위도/경도) 및 촬영 날짜를 자동으로 인식하여 지도에 배치합니다.
- **포토 핀 & 이동 경로 선**: 데이트와 여행 동선을 연대순으로 연결하는 핑크빛 대시 라인 경로와 감성적인 폴라로이드 핀을 제공합니다.
- **상세 추억 모달**: 각 장소의 사진, 별점, 카테고리, 함께 남긴 코멘트와 감정 스티커를 바로 확인할 수 있습니다.

### 📖 2. 타임라인 추억 앨범 (Timeline Album)
- **날짜별 & 여행별 필터**: 연도/월별, 특정 여행(예: "첫 제주도 여행", "1주년 기념 부산 여행") 단위로 추억을 감상합니다.
- **커플 실시간 코멘트**: 나와 상대방(연인)이 사진 하나에 각자의 시점으로 주고받은 코멘터리가 수록됩니다.
- **배경음악 (BGM) 플레이어**: 두 사람만의 추억이 담긴 대표 BGM 트랙을 들으며 추억을 회상할 수 있습니다.

### 🗓️ 3. 공동 여행 플래너 & 가계부 (Couple Planner)
- **일정 체크리스트**: 준비물, 가고 싶은 맛집, 예약 내역 등을 등록하고 완료 여부를 공유합니다.
- **예산 및 지출 관리**: 예상 비용과 실제 집행 내역을 기록하여 공동 데이트 통장 및 여행 예산을 투명하게 관리합니다.
- **D-Day 카운트다운**: 다음 여행까지 남은 일수를 실시간으로 계산해 기대감을 더해줍니다.

### 💑 4. 커플 프로필 & 연동 시뮬레이션 (Couple Sync & Profile)
- **D-Day 기념일 계산**: 만난 날부터 오늘까지 며칠째 사랑 중인지 한눈에 계산됩니다.
- **커플 코드 공유**: 고유 커플 연동 코드를 생성하고 공유하여 두 기기 간의 데이터를 동기화할 수 있습니다.
- **유저 스위칭 모드**: 단일 기기에서도 나(민우)와 연인(수진)의 시점을 자유롭게 전환하며 테스트할 수 있는 시뮬레이터를 탑재했습니다.

---

## 🛠️ 기술 스택 (Tech Stack)

### Client & Framework
- **Core**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Lucide React Icons, Motion (Framer Motion)
- **Map Engine**: Leaflet, React-Leaflet, OpenStreetMap
- **Utilities**: `exif-js` (사진 EXIF GPS 메타데이터 파싱), HTML5 LocalStorage (오프라인 내구성 저장)

### PWA & Native Feeling
- Web App Manifest (`manifest.json`)
- Service Worker (`sw.js`) 오프라인 캐싱 및 스탠드얼론 PWA 지원

---

## 🚀 시작하기 (Getting Started)

### 1. Repository 클론 및 패키지 설치

```bash
# 의존성 패키지 설치
npm install
```

### 2. 개발 서버 실행

```bash
# Vite 개발 서버 3000번 포트 실행
npm run dev
```

브라우저에서 `http://localhost:3000` 접속 후 사용하실 수 있습니다.

### 3. 프로덕션 빌드

```bash
npm run build
```

---

## 📁 프로젝트 구조 (Project Structure)

```
our-footprints/
├── public/
│   ├── icon.png            # 앱 아이콘
│   ├── manifest.json       # PWA 매니페스트
│   └── sw.js               # Service Worker
├── src/
│   ├── components/         # 모듈화된 UI 컴포넌트
│   │   ├── CoupleSettings.tsx # 커플 프로필, D-Day 및 설정
│   │   ├── MapContainer.tsx   # Leaflet 대화형 지도 & 포토 마커
│   │   ├── PlannerView.tsx    # 공동 여행 일정/예산 플래너
│   │   └── TimelineView.tsx   # 추억 타임라인 & 코멘트
│   ├── data/
│   │   └── mockData.ts        # 초깃값 및 샘플 추억 데이터
│   ├── types.ts            # TypeScript 인터페이스 정의
│   ├── App.tsx             # 메인 어플리케이션 및 상태 관리
│   ├── main.tsx            # 엔트리 포인트
│   └── index.css           # Tailwind 및 글로벌 CSS
├── metadata.json           # 앱 메타데이터
├── package.json            # 의존성 및 스크립트 정의
└── README.md               # 프로젝트 설명서
```

---

<div align="center">

Made with ❤️ for Couples Everywhere · **우리발자국**

</div>
