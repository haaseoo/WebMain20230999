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

function setCookie(name, value, days) {
  var expires = '';
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expores=' + date.toUTCString();
  }
  document.cookie = name + '=' + (value || '') + expires + '; path=/';
}

function getCookie(name) {
  var nameEQ = name + '=';
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === '') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

// function session_set() {
//   //세션저장
//   let session_id = document.querySelector('#typeEmailX');
//   let session_pass = document.querySelector('#typePasswordX');
//   if (sessionStorage) {
//     let en_text = encrypt_text(session_pass.value);
//     // sessionStorage.setItem('Session_Storage_test', session_id.value);
//     sessionStorage.setItem('Session_Storage_id', session_id.value);
//     sessionStorage.setItem('Session_Storage_pass', en_text);
//     const now = new Date().getTime();
//     sessionStorage.setItem('login_time', now.toString());
//     setTimeout(() => {
//       logout();
//     }, 300000);
//   } else {
//     alert('로컬 스토리지 지원 x');
//   }
// }

// function session_get() {
//   if (sessionStorage.getItem('Session_Storage_id')) {
//     return sessionStorage.getItem('Session_Storage_test');
//   } else {
//     alert('세션 스토리지 지원 x');
//   }
// }

function session_get() {
  if (sessionStorage) {
    return sessionStorage.getItem('Session_Storage_encrypted');
  } else {
    alert('세션 스토리지 지원 x');
  }
}

function session_check() {
  if (sessionStorage.getItem('Session_Storage_id')) {
    alert('이미 로그인 되었습니다.');
    location.href = '../login/index_login.html';
  }
}

function session_del() {
  if (sessionStorage) {
    sessionStorage.removeItem('Session_Storage_test');
    alert('로그아웃 버튼 클릭 확인: 세션 스토리지를 삭제합니다.');
  } else {
    alert('세션 스토리지 지원 x');
  }
}

function logout() {
  session_del();
  // document.cookie = 'id=; Max-Age=0;psth=/';
  // document.cookie = 'login_cnt=; Max-Age=0;psth=/';
  location.href = '../index.html';
}

function encodeByAES256(key, data) {
  const cipher = CryptoJS.AES.encrypt(data, CryptoJS.enc.Utf8.parse(key), {
    iv: CryptoJS.enc.Utf8.parse(''),
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC,
  });
  return cipher.toString();
}

function decodeByAES256(key, data) {
  const cipher = CryptoJS.AES.decrypt(data, CryptoJS.enc.Utf8.parse(key), {
    iv: CryptoJS.enc.Utf8.parse(''),
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC,
  });
  return cipher.toString(CryptoJS.enc.Utf8);
}

function encrypt_text(password) {
  const k = 'key';
  const rk = k.padEnd(32, '');
  const b = password;
  const eb = this.encodeByAES256(rk, b);
  return eb;
  console.log(eb);
}

function decrypt_text() {
  const k = 'key';
  const rk = k.padEnd(32, '');
  const eb = session_get();
  const b = this.decodeByAES256(rk, eb);
  console.log(b);
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
