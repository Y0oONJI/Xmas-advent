# 🎄 크리스마스 어드벤트 웹

사용자의 소원을 받아서 Firebase에 저장하고, 아름다운 카드 형태로 표시하는 크리스마스 어드벤트 웹 애플리케이션입니다.

## ✨ 기능

- 📝 사용자 소원 입력 및 저장
- 💾 Firebase Firestore를 통한 실시간 데이터 저장
- 🎨 아름다운 크리스마스 테마 UI
- ❄️ 눈 내리는 애니메이션 효과
- 📱 반응형 디자인 (모바일 지원)
- 🔄 실시간 소원 목록 업데이트

## 🚀 시작하기

### 1. Firebase 설정

자세한 설정 방법은 [FIREBASE_SETUP.md](./FIREBASE_SETUP.md)를 참고하세요.

1. [Firebase Console](https://console.firebase.google.com/)에서 프로젝트 생성
2. Firestore Database 생성 (테스트 모드)
3. `firebase-config.js` 파일에 설정 값 입력

### 2. 로컬 실행

```bash
# Python을 사용한 간단한 웹 서버
python -m http.server 8000

# 또는 Node.js의 http-server 사용
npx http-server -p 8000
```

브라우저에서 `http://localhost:8000` 접속

### 3. 배포

#### Vercel 배포 (권장)

1. GitHub에 프로젝트 푸시
2. [Vercel](https://vercel.com)에서 프로젝트 import
3. 자동 배포 완료!

#### Firebase Hosting

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

## 📁 프로젝트 구조

```
Xmas-advent/
├── index.html          # 메인 HTML 파일
├── style.css          # 스타일시트
├── main.js            # 메인 JavaScript 로직
├── firebase-config.js # Firebase 설정 파일
├── FIREBASE_SETUP.md  # Firebase 설정 가이드
└── README.md          # 프로젝트 설명서
```

## 🛠️ 기술 스택

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Firebase Firestore
- **Hosting**: Vercel 또는 Firebase Hosting

## 📝 사용 방법

1. 웹 페이지 접속
2. 이름과 크리스마스 소원 입력
3. "소원 보내기" 버튼 클릭
4. 저장된 소원이 실시간으로 카드 형태로 표시됨

## 🔒 보안

현재는 테스트 모드로 설정되어 있어 모든 사용자가 읽기/쓰기가 가능합니다. 프로덕션 환경에서는 Firebase Authentication을 추가하여 보안을 강화하는 것을 권장합니다.

## 🎨 커스터마이징

- `style.css`: 색상, 폰트, 레이아웃 수정
- `main.js`: 기능 추가 및 수정
- `index.html`: 구조 변경

## 📄 라이선스

MIT License

## 🙏 기여

이슈 및 풀 리퀘스트 환영합니다!
