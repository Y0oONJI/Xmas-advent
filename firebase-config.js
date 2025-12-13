// Firebase 설정 파일
// 이 파일에 Firebase 프로젝트 설정을 입력하세요

// Firebase Console (https://console.firebase.google.com/)에서 프로젝트를 생성한 후
// 프로젝트 설정 > 일반 > 앱 추가 > 웹 앱에서 설정 값을 복사하여 아래에 입력하세요

window.firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// 설정 방법:
// 1. https://console.firebase.google.com/ 에서 새 프로젝트 생성
// 2. 프로젝트 설정 > 일반 > 앱 추가 > 웹 앱 선택
// 3. 앱 닉네임 입력 후 등록
// 4. 나타나는 설정 값을 위의 firebaseConfig 객체에 입력
// 5. Firestore Database 생성 (빌드 > Firestore Database > 데이터베이스 만들기)
// 6. 테스트 모드로 시작 (나중에 보안 규칙 설정 가능)

