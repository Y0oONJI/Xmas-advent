# Firebase 설정 가이드

이 프로젝트는 Firebase Firestore를 사용하여 사용자의 소원을 저장하고 표시합니다.

## 1. Firebase 프로젝트 생성

1. [Firebase Console](https://console.firebase.google.com/)에 접속
2. "프로젝트 추가" 클릭
3. 프로젝트 이름 입력 (예: "newyear-wishes")
4. Google Analytics 설정 (선택사항)
5. 프로젝트 생성 완료

## 2. 웹 앱 등록

1. Firebase 프로젝트 대시보드에서 "웹 앱 추가" 클릭 (</> 아이콘)
2. 앱 닉네임 입력 (예: "New Year Wishes Web")
3. "앱 등록" 클릭
4. 나타나는 설정 값 복사

## 3. Firestore Database 설정

1. 왼쪽 메뉴에서 "Firestore Database" 클릭
2. "데이터베이스 만들기" 클릭
3. "테스트 모드로 시작" 선택 (개발 중에는 이렇게 시작)
4. 위치 선택 (가장 가까운 리전 선택, 예: asia-northeast3 - 서울)
5. "사용 설정" 클릭

## 4. 보안 규칙 설정 (중요!)

Firestore Database > 규칙 탭에서 다음 규칙을 설정하세요:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // wishes 컬렉션에 대한 규칙
    match /wishes/{wishId} {
      // 모든 사용자가 읽을 수 있음
      allow read: if true;
      // 모든 사용자가 쓸 수 있음 (필요시 인증 추가 가능)
      allow create: if true;
      // 수정 및 삭제는 허용하지 않음
      allow update, delete: if false;
    }
  }
}
```

**주의**: 프로덕션 환경에서는 인증을 추가하는 것이 좋습니다!

## 5. 프로젝트에 설정 적용

1. `firebase-config.js` 파일 열기
2. Firebase Console에서 복사한 설정 값을 입력:

```javascript
window.firebaseConfig = {
  apiKey: "여기에_API_KEY_입력",
  authDomain: "여기에_PROJECT_ID.firebaseapp.com",
  projectId: "여기에_PROJECT_ID_입력",
  storageBucket: "여기에_PROJECT_ID.appspot.com",
  messagingSenderId: "여기에_MESSAGING_SENDER_ID_입력",
  appId: "여기에_APP_ID_입력"
};
```

## 6. 로컬에서 테스트

1. 로컬 웹 서버 실행 (예: Python의 `python -m http.server 8000` 또는 VS Code의 Live Server)
2. 브라우저에서 열기
3. 소원을 입력하고 제출
4. Firestore Console에서 데이터 확인

## 7. 배포 (선택사항)

### Vercel 배포 (권장)

1. [Vercel](https://vercel.com)에 가입
2. GitHub에 프로젝트 푸시
3. Vercel에서 프로젝트 import
4. 자동 배포 완료!

### Firebase Hosting 배포

1. Firebase CLI 설치: `npm install -g firebase-tools`
2. 로그인: `firebase login`
3. 프로젝트 초기화: `firebase init hosting`
4. 배포: `firebase deploy`

## 문제 해결

### 데이터가 저장되지 않을 때
- Firestore 보안 규칙 확인
- 브라우저 콘솔에서 오류 메시지 확인
- `firebase-config.js`의 설정 값 확인

### CORS 오류가 발생할 때
- Firebase 설정에서 허용된 도메인 확인
- 로컬 개발 시 `localhost`가 자동으로 허용됨

## 추가 기능 아이디어

- 사용자 인증 추가 (Firebase Authentication)
- 이미지 업로드 기능 (Firebase Storage)
- 좋아요 기능
- 댓글 기능
- 관리자 페이지

