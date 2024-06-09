let loginRestricted = false; // 로그인 제한 상태

function login_failed() {
  let login_fail_cnt = parseInt(getCookie('login_fail_cnt')) || 0;
  login_fail_cnt++;
  setCookie('login_fail_cnt', login_fail_cnt, 1); // 1일 저장

  if (login_fail_cnt >= 3) {
    alert('로그인 시도 횟수가 3회 이상이므로 로그인이 제한됩니다.');
    loginRestricted = true; // 로그인 제한 상태 설정

    // 4분 후에 로그인 제한을 해제하는 타이머 설정
    setTimeout(() => {
      loginRestricted = false; // 로그인 제한 상태 해제
      setCookie('login_fail_cnt', 0, 0); // 로그인 실패 횟수 초기화
      alert('로그인 제한이 해제되었습니다.');
    }, 240000); // 4분(4 * 60 * 1000 밀리초)
  }

  // 실패 횟수와 로그인 제한 상태를 화면에 출력하는 코드 추가
  alert('로그인 실패 횟수: ' + login_fail_cnt);
}

const check_input = () => {
  if (loginRestricted) {
    alert('로그인이 제한되어 있습니다. 잠시 후 다시 시도해주세요.');
    return false;
  }

  const loginForm = document.getElementById('login_form');
  const emailInput = document.getElementById('typeEmailX');
  const passwordInput = document.getElementById('typePasswordX');
  const idsave_check = document.getElementById('idSaveCheck');

  const message = '아이디, 패스워드를 체크합니다';
  alert(message);

  const emailValue = emailInput.value.trim();
  const passwordValue = passwordInput.value.trim();

  const sanitizedEmail = check_xss(emailValue);
  const sanitizedPassword = check_xss(passwordValue);

  if (!sanitizedEmail || !sanitizedPassword) {
    login_failed();
    return false;
  }

  if (emailValue.length < 5) {
    alert('아이디는 최소 5글자 이상 입력해야 합니다.');
    login_failed();
    return false;
  }

  if (emailValue.length > 15) {
    alert('이메일은 최대 15글자 이하로 입력해야 합니다.');
    login_failed();
    return false;
  }
  // 8주 연습문제: 이메일 15글자 이하 수정

  const repeatedPattern = /(\w)\1{2,}/;
  if (repeatedPattern.test(emailValue)) {
    alert('아이디에는 동일한 글자가 3번 이상 연속으로 올 수 없습니다.');
    login_failed();
    return false;
  }
  // 8주 연습문제: 3글자 이상 반복 입력 금지

  const repeatedNumberPattern = /(\d{2,})/;
  if (repeatedNumberPattern.test(emailValue)) {
    alert('아이디에는 연속되는 숫자가 2개 이상 반복될 수 없습니다.');
    login_failed();
    return false;
  }
  // 8주 연습문제: 연속되는 숫자 2개 이상 반복 금지

  if (passwordValue.length < 12) {
    alert('비밀번호는 반드시 12글자 이상 입력해야 합니다.');
    login_failed();
    return false;
  }

  const hasSpecialChar = /[!,@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(
    passwordValue
  );
  if (!hasSpecialChar) {
    alert('패스워드는 특수문자를 1개 이상 포함해야 합니다.');
    login_failed();
    return false;
  }

  const hasUpperCase = /[A-Z]+/.test(passwordValue);
  const hasLowerCase = /[a-z]+/.test(passwordValue);
  if (!hasUpperCase || !hasLowerCase) {
    alert('패스워드는 대소문자를 1개 이상 포함해야 합니다.');
    login_failed();
    return false;
  }

  console.log('이메일:', emailValue);
  console.log('비밀번호:', passwordValue);

  if (idsave_check.checked) {
    alert('쿠키를 저장합니다.');
    setCookie('id', emailValue, 1); // 1일 저장
    alert('쿠키 값 :' + emailValue);
  } else {
    setCookie('id', emailValue, 0); // 쿠키 삭제
  }

  session_set(); // 세션 생성
  loginForm.submit();
};
document.getElementById('login_btn').addEventListener('click', check_input);

const init = () => {
  const emailInput = document.getElementById('typeEmailX');
  const idsave_check = document.getElementById('idSaveCheck');
  const savedId = getCookie('id');
  if (savedId) {
    emailInput.value = savedId;
    idsave_check.checked = true;
  }
  session_check(); // 세션 유무 검사
};

// 로그인 카운트를 증가시키는 함수
// 10주 응용문제: 로그인 횟수 쿠키 저장
function login_count() {
  var failedCount = parseInt(getCookie('login_failed_cnt')) || 0;
  if (failedCount >= 3) {
    alert('로그인이 제한되었습니다.');
    return;
  }

  var count = parseInt(getCookie('login_cnt')) || 0;
  count++;
  setCookie('login_cnt', count, 30);
  console.log('Login count: ' + count); // 디버깅을 위해 콘솔에 출력
  displayStatus();
}

// 로그아웃 카운트를 증가시키는 함수
// 10주 응용문제: 로그아웃 횟수 쿠키 저장
function logout_count() {
  var count = parseInt(getCookie('logout_cnt')) || 0;
  count++;
  setCookie('logout_cnt', count, 30);
  console.log('Logout count: ' + count); // 디버깅을 위해 콘솔에 출력
}

function addJavascript(jsname) {
  // 자바스크립트 외부 연동
  var th = document.getElementsByTagName('head')[0];
  var s = document.createElement('script');
  s.setAttribute('type', 'text/javascript');
  s.setAttribute('src', jsname);
  th.appendChild(s);
}
addJavascript('/js/security.js'); // 암복호화 함수
addJavascript('/js/session.js'); // 세션 함수
addJavascript('/js/cookie.js'); // 쿠키 함수

function session_del() {
  if (sessionStorage) {
    sessionStorage.removeItem('Session_Storage_test');
    alert('로그아웃 버튼 클릭 확인: 세션 스토리지를 삭제합니다.');
  } else {
    alert('세션 스토리지 지원 x');
  }
}
// 12주차 응용문제: 세션 스토리지 로그아웃 구현
