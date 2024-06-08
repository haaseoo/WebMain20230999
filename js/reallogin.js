const check_input = () => {
  const idsave_check = document.getElementById('idSaveCheck');
  const loginForm = document.getElementById('login_form');
  const emailInput = document.getElementById('typeEmailX');
  const passwordInput = document.getElementById('typePasswordX');

  const emailValue = emailInput.value.trim();
  const passwordValue = passwordInput.value.trim();

  if (emailValue === '') {
    alert('이메일을 입력하세요!');
    return false;
  }

  if (passwordValue === '') {
    alert('비밀번호를 입력하세요!');
    return false;
  }

  console.log('이메일: ', emailValue);
  console.log('비밀번호: ', passwordValue);
  // loginForm.submit();

  if (emailValue.length < 5) {
    alert('아이디는 최소 5글자 이상으로 입력해주세요.');
    return false;
  }

  if (passwordValue.length < 12) {
    alert('비밀번호는 최소 12글자 이상으로 입력해주세요.');
    return false;
  }

  const hasSpecialChar =
    passwordValue.match(/[!,@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/) !== null;
  if (!hasSpecialChar) {
    alert('비밀번호는 특수문자를 1개 이상 포함해야 합니다.');
    return false;
  }

  const hasUpperCase = passwordValue.match(/[A-Z]+/) !== null;
  const hasLowerCase = passwordValue.match(/[a-z]+/) !== null;
  if (!hasUpperCase || !hasLowerCase) {
    alert('비밀번호는 대소문자를 1개 이상 포함해야 합니다.');
    return false;
  }

  const sanitizedPassword = check_xss(passwordValue);
  const sanitizedEmail = check_xss(emailValue);
  if (!sanitizedEmail) {
    return false;
  }
  if (!sanitizedPassword) {
    return false;
  }

  if (idsave_check.checked == true) {
    alert('쿠키를 저장합니다.', emailValue);
    setCookie('id', emailValue, 1);
    alert('쿠키 값: ' + emailValue);
  } else {
    setCookie('id', emailValue.value, 0);
  }

  if (idsave_check.value.length === 0 || password.value.length === 0) {
    alert('아이디와 비밀번호를 모두 입력해주세요.');
  } else {
    session_set(); //세션 생성
    form.submit();
  }
  session_set();
  loginForm.submit();
};

document.getElementById('loginbtn').addEventListener('click', check_input);
// document.getElementById('logout_btn').addEventListener('click', check_input);

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
