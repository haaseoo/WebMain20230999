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

function init() {
  const emailInput = document.getElementById('typeEmailX');
  const idsave_check = document.getElementById('idSaveCheck');
  let get_id = getCookie('id');

  if (get_id) {
    emailInput.value = get_id;
    idsave_check.checked = true;
  }

  if (get_id) {
    id.value = get_id;
    check.checked = true;
  }
  session_check();
}

function login_count() {
  var count = parseInt(getCookie('login_cnt')) || 0;
  count++;
  setCookie('login_cnt', count, 30);
  console.log('login count: ' + count);
}
document.getElementById('login_btn').addEventListener('click', login_count);

function logout_count() {
  var count = parseInt(getCookie('logout_cnt')) || 0;
  count++;
  setCookie('logout_cnt', count, 30);
  console.log('logout count: ' + count);
}
document.getElementById('logout_btn').addEventListener('click', logout_count);

function logout() {
  session_del();
  // document.cookie = 'id=; Max-Age=0;psth=/';
  // document.cookie = 'login_cnt=; Max-Age=0;psth=/';
  location.href = '../index.html';
}

function init_logined() {
  if (sessionStorage) {
    decrypt_text();
  } else {
    alert('세션 스토리지 지원 x');
  }
}

function addJavascript(jsname) {
  var th = document.getElementsByTagName('head')[0];
  var s = document.createElement('script');
  s.setAttribute('type', 'text/javascript');
  s.setAttribute('src', jsname);
  th.appendChild(s);
}
addJavascript('/js/security.js');
addJavascript('/js/session.js');
addJavascript('/js/cookie.js');
