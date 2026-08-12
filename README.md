<div align="center">

<img src="./public/preview-hero.svg" alt="Our Footprints UI Banner Preview" width="100%" style="border-radius: 18px; box-shadow: 0 20px 40px rgba(244, 63, 94, 0.12);" />

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

<p align="center">
  <img src="./public/preview-map.svg" alt="Map View Preview" width="100%" style="border-radius:12px;" />
</p>

<br />

### 2️⃣ 타임라인 & 커플 코멘터리 (Timeline & Dual Commentary)
> 연대순으로 정렬된 추억 카드에 나와 연인이 주고받은 스티커와 메시지 코멘트가 함께 보존됩니다.

<p align="center">
  <img src="./public/preview-timeline.svg" alt="Timeline View Preview" width="100%" style="border-radius:12px;" />
</p>

<br />

### 3️⃣ 공동 여행 플래너 & 가계부 (Trip Planner & Budget)
> D-Day 카운트다운, 가고 싶은 곳 체크리스트 및 공동 예산 수립/집행 현황을 한눈에 관리합니다.

<p align="center">
  <img src="./public/preview-planner.svg" alt="Planner View Preview" width="100%" style="border-radius:12px;" />
</p>

---

<br />

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
