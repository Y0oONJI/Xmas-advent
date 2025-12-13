// Firebase Firestore 참조
let wishesCollection;

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
  initializeFirebase();
  setupFormListener();
  loadWishes();
});

// Firebase 초기화
function initializeFirebase() {
  if (window.db) {
    wishesCollection = window.collection(window.db, 'wishes');
  } else {
    console.error('Firebase가 초기화되지 않았습니다. firebase-config.js를 확인하세요.');
  }
}

// 폼 제출 리스너 설정
function setupFormListener() {
  const form = document.getElementById('wishForm');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      await handleFormSubmit(e);
    });
  }
}

// 폼 제출 처리
async function handleFormSubmit(e) {
  const form = e.target;
  const nameInput = document.getElementById('name');
  const wishInput = document.getElementById('wish');
  const submitBtn = form.querySelector('.submit-btn');

  const name = nameInput.value.trim();
  const wish = wishInput.value.trim();

  if (!name || !wish) {
    alert('이름과 소원을 모두 입력해주세요!');
    return;
  }

  // 버튼 비활성화 및 로딩 상태
  submitBtn.disabled = true;
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<span>전송 중...</span>';

  try {
    if (!wishesCollection) {
      throw new Error('Firebase가 초기화되지 않았습니다.');
    }

    // Firestore에 데이터 저장
    await window.addDoc(wishesCollection, {
      name: name,
      wish: wish,
      timestamp: new Date(),
      createdAt: new Date().toISOString()
    });

    // 폼 초기화
    form.reset();
    
    // 성공 메시지
    showSuccessMessage('소원이 성공적으로 전송되었습니다! 🎉');
    
  } catch (error) {
    console.error('소원 저장 중 오류:', error);
    alert('소원을 저장하는 중 오류가 발생했습니다. Firebase 설정을 확인해주세요.');
  } finally {
    // 버튼 복원
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalText;
  }
}

// 소원 불러오기
function loadWishes() {
  if (!wishesCollection) {
    document.getElementById('wishesContainer').innerHTML = 
      '<div class="empty-state">Firebase 설정이 필요합니다. firebase-config.js를 확인하세요.</div>';
    return;
  }

  const q = window.query(wishesCollection, window.orderBy('timestamp', 'desc'));

  window.onSnapshot(q, (snapshot) => {
    const container = document.getElementById('wishesContainer');
    
    if (snapshot.empty) {
      container.innerHTML = '<div class="empty-state">아직 소원이 없습니다. 첫 번째 소원을 작성해보세요! ✨</div>';
      return;
    }

    container.innerHTML = '';
    
    snapshot.forEach((doc) => {
      const data = doc.data();
      const wishCard = createWishCard(data);
      container.appendChild(wishCard);
    });
  }, (error) => {
    console.error('소원 불러오기 오류:', error);
    document.getElementById('wishesContainer').innerHTML = 
      '<div class="empty-state">소원을 불러오는 중 오류가 발생했습니다.</div>';
  });
}

// 소원 카드 생성
function createWishCard(data) {
  const card = document.createElement('div');
  card.className = 'wish-card';

  // 이름의 첫 글자로 아바타 생성
  const avatarText = data.name.charAt(0).toUpperCase();
  
  // 날짜 포맷팅
  const date = data.timestamp?.toDate() || new Date(data.createdAt);
  const formattedDate = formatDate(date);

  card.innerHTML = `
    <div class="wish-header">
      <div class="wish-avatar">${avatarText}</div>
      <div class="wish-name">${escapeHtml(data.name)}</div>
    </div>
    <div class="wish-text">${escapeHtml(data.wish)}</div>
    <div class="wish-date">${formattedDate}</div>
  `;

  return card;
}

// 날짜 포맷팅
function formatDate(date) {
  const now = new Date();
  const diff = now - date;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return '방금 전';
  if (minutes < 60) return `${minutes}분 전`;
  if (hours < 24) return `${hours}시간 전`;
  if (days < 7) return `${days}일 전`;

  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

// HTML 이스케이프 (XSS 방지)
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// 성공 메시지 표시
function showSuccessMessage(message) {
  const messageDiv = document.createElement('div');
  messageDiv.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: white;
    color: #667eea;
    padding: 15px 25px;
    border-radius: 10px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
    z-index: 1000;
    animation: slideIn 0.3s ease-out;
  `;
  messageDiv.textContent = message;
  
  document.body.appendChild(messageDiv);
  
  setTimeout(() => {
    messageDiv.style.animation = 'slideOut 0.3s ease-out';
    setTimeout(() => {
      document.body.removeChild(messageDiv);
    }, 300);
  }, 3000);
}

// CSS 애니메이션 추가
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

