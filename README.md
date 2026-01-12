# AlgoMBTI

시청·청취 기록 텍스트를 붙여넣으면 더미 로직으로 알고리즘 성향 프로필 카드를 생성하는 Next.js 프로토타입입니다.

## Features
- 플랫폼 선택(YouTube/Spotify/Melon) 및 제목 리스트 분석
- 키워드 Top 10, 카테고리 비율 차트, 3문장 요약 제공
- 민감 키워드 기본 마스킹 + 공개 토글
- 로컬 저장(localStorage) 기반 결과 유지

## Getting Started

```bash
npm install
```

```bash
npm run dev
```

브라우저에서 `http://localhost:3000`으로 접속합니다.

## VS Code 실행
1. VS Code에서 프로젝트를 엽니다.
2. `npm install` 실행 후,
3. **Run and Debug** 패널에서 `AlgoMBTI: Dev (Chrome)` 구성을 선택해 실행합니다.
   - 실행 시 `AlgoMBTI: dev server` 작업이 함께 시작됩니다.

## Scripts
- `npm run dev` - 개발 서버 실행
- `npm run build` - 프로덕션 빌드
- `npm run start` - 빌드 결과 실행
- `npm run lint` - 린트 실행
