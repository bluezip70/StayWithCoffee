/* 미션 1_버튼 클릭하면 안내 메시지 출력 */
const langBtn = document.querySelector("#lang-btn");
langBtn.addEventListener("click", function(){
  alert("한국어 지원만 가능합니다.");
});

// 미션 2_// 선택한 원두 표시하기
const selectMenu = document.querySelector(".select-menu");
selectMenu.addEventListener("change", function(){
  const roast = selectMenu.value;
  alert("선택하신 " + roast + " 로스트 원두는 오늘 주문하시면 내일 받아보실 수 있습니다.");
});

// 미션 5_카드 클릭하면 커피 추천
const cards = document.querySelectorAll(".card");
cards.forEach(function(card){
  card.addEventListener("click", function(){
    const name = card.querySelector("h3").innerText;
    alert(name + "를 추천합니다");
  });
});


//미션 11_푸터의 상품Q&A 매뉴 클릭 시 FAQ 섹션 이동 기능

const qnaBtn = document.querySelector("#qna-btn"); 
const faqSection = document.querySelector("#faq");
qnaBtn.addEventListener("click", function(e){ 
  e.preventDefault();
  faqSection.scrollIntoView({
    behavior: "smooth"
  });
});

//좋아요 버튼 클릭 수
let count = 0;

const likeBtn = document.querySelector("#like");
const result = document.querySelector("#count");

likeBtn.addEventListener("click", function(){
  count++;
  result.innerText = count;
});

/* --- 입력받은 이메일 안내 메시지 출력 --- */
const emailForms = document.querySelectorAll(".add-email");

emailForms.forEach(form => {
  form.addEventListener("submit", function(event){
    event.preventDefault();
    const emailInput = this.querySelector("input");
    const email = emailInput.value;

    if(email) {
      alert(email + " 로 구독 안내문을 보내드리겠습니다.");
  emailInput.value = "";  // 입력창 초기화 (내용 비우기)
    }
  });
});

/* 1. 기본 설정 (모달 열고 닫기)
 * 2. 단순 모달 열기 (배너, 푸터 이벤트)
 * 3. 회원가입 (데이터 저장)
 * 4. 로그인 (데이터 확인)  */
// --- 1. 기본 설정: 모달창을 열고 닫는 함수 만들기 ---

// 모달을 여는 함수: id를 전달받아 해당 요소에 'active' 클래스를 추가합니다.
const openModal = (id) => {
  const modal = document.getElementById(id);
  if (modal) modal.classList.add('active');
};

// 모달을 닫는 함수: 모든 모달에서 'active' 클래스를 제거하고 입력창을 비웁니다.
const closeModal = () => {   // 모든 모달 레이어 찾아서 닫기
  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.classList.remove('active');
  });

  // 입력했던 내용이나 에러 메시지 초기화하기
  document.querySelectorAll('.modal-content input').forEach(input => input.value = '');
  document.querySelectorAll('.error-msg').forEach(error => error.textContent = '');
};

// 모든 '닫기 버튼(X)'에 클릭 이벤트 연결하기
document.querySelectorAll('.close-btn').forEach(btn => {
  btn.onclick = closeModal;
});


// --- 2. 단순 모달 열기: 버튼 클릭 이벤트 ---

// (1) 배너의 "자세히 알아보기" 버튼 클릭 시
const bannerBtn = document.getElementById('banner-btn');
if (bannerBtn) {
  bannerBtn.onclick = () => openModal('banner-modal');
}

// (2) 푸터의 "이벤트" 메뉴 클릭 시
const eventBtn = document.getElementById('event-btn');
if (eventBtn) {
  eventBtn.onclick = () => openModal('event-modal');
}

// (3) 상단 네비게이션 로그인/회원가입 버튼
const loginNavBtn = document.getElementById('login-nav-btn');
if (loginNavBtn) {
  loginNavBtn.onclick = () => openModal('login-modal');
}

const signupNavBtn = document.getElementById('signup-nav-btn');
if (signupNavBtn) {
  signupNavBtn.onclick = () => openModal('signup-modal');
}

// --- 3. 회원가입: 로컬 스토리지에 저장하기 ---

const signupSubmit = document.getElementById('signup-submit');
if (signupSubmit) {
  signupSubmit.onclick = () => {

    // 사용자가 입력한 값 가져오기
    const id = document.getElementById('signup-id').value.trim();
    const pw = document.getElementById('signup-pw').value;
    const pwConfirm = document.getElementById('signup-pw-confirm').value;
    const errorEl = document.getElementById('signup-error');
    
    if (!id || !pw) {     // 빈 칸 검사
      errorEl.textContent = '아이디와 비밀번호를 입력해주세요.';
      return;
    }    
    if (pw !== pwConfirm) {       // 비밀번호 확인 검사
      errorEl.textContent = '비밀번호가 일치하지 않습니다.';
      return;
    }

    // 로컬 스토리지에서 기존 회원 명단 가져오기 (없으면 빈 배열 [])
    const accounts = JSON.parse(localStorage.getItem('accounts')) || [];
    // 아이디 중복 검사
    if (accounts.find(user => user.id === id)) {      
      errorEl.textContent = '이미 사용 중인 아이디입니다.';
      return;
    }

    // 새로운 회원 추가하고 저장하기
    accounts.push({ id, pw });
    localStorage.setItem('accounts', JSON.stringify(accounts));

    alert('회원가입이 완료되었습니다! 이제 로그인해 보세요.');
    closeModal();
  };
}


// --- 4. 로그인: 저장된 정보와 비교하기 ---

const loginSubmit = document.getElementById('login-submit');
if (loginSubmit) {
  loginSubmit.onclick = () => {
    const id = document.getElementById('login-id').value.trim();
    const pw = document.getElementById('login-pw').value;
    const errorEl = document.getElementById('login-error');

    // 저장된 회원 명단 가져오기
    const accounts = JSON.parse(localStorage.getItem('accounts')) || [];

    // 입력한 정보와 일치하는 회원 찾기
    const user = accounts.find(acc => acc.id === id && acc.pw === pw);

    if (user) {
      // 로그인 성공 시: 현재 로그인한 유저 정보를 저장
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      alert(`${user.id}님, 환영합니다!`);
      closeModal();
      updateUI(); // 화면 모습 바꾸기 (로그인 버튼 숨기기 등)
    } else {
      errorEl.textContent = '아이디 또는 비밀번호가 틀렸습니다.';
    }
  };
}


// --- 추가 기능: 로그인 상태에 따라 버튼 보여주기/숨기기 ---

const updateUI = () => {
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  const userStatus = document.getElementById('user-status');
  const loginNavBtn = document.getElementById('login-nav-btn');
  const signupNavBtn = document.getElementById('signup-nav-btn');
  const logoutBtn = document.getElementById('logout-btn');

  if (loggedInUser) {
    // 로그인 된 상태
    userStatus.textContent = `${loggedInUser.id}님 접속 중`;
    userStatus.classList.remove('hidden');
    logoutBtn.classList.remove('hidden');
    loginNavBtn.classList.add('hidden');
    signupNavBtn.classList.add('hidden');
  } else {
    // 로그아웃 된 상태
    userStatus.classList.add('hidden');
    logoutBtn.classList.add('hidden');
    loginNavBtn.classList.remove('hidden');
    signupNavBtn.classList.remove('hidden');
  }
};

// 로그아웃 버튼 클릭 시
const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) {
  logoutBtn.onclick = () => {
    localStorage.removeItem('loggedInUser');
    alert('로그아웃 되었습니다.');
    updateUI();
  };
}

// 페이지가 처음 열릴 때 로그인 상태 확인하기
window.onload = updateUI;