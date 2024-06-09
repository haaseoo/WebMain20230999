// 10주...........
// 쿠키를 설정하는 함수
function setCookie(name, value, days) {
  var expires = '';
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = name + '=' + (value || '') + expires + '; path=/';
}

// 쿠키를 가져오는 함수
function getCookie(name) {
  var nameEQ = name + '=';
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

// 로그인 실패 횟수를 증가시키는 함수
function login_failed() {
  var count = parseInt(getCookie('login_failed_cnt')) || 0;
  count++;
  setCookie('login_failed_cnt', count, 30);
  displayStatus();
}

// 로그인 카운트를 증가시키는 함수
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
function logout_count() {
  var count = parseInt(getCookie('logout_cnt')) || 0;
  count++;
  setCookie('logout_cnt', count, 30);
  console.log('Logout count: ' + count); // 디버깅을 위해 콘솔에 출력
}

// 실패횟수와 로그인 제한 상태를 화면에 출력하는 함수
function displayStatus() {
  var failedCount = parseInt(getCookie('login_failed_cnt')) || 0;
  var status =
    failedCount >= 3 ? '로그인이 제한되었습니다.' : '로그인 가능합니다.';
  document.getElementById('loginFailCount').innerText =
    '로그인 실패 횟수: ' + failedCount;
  document.getElementById('loginStatus').innerText = status;
}

// 버튼 클릭 이벤트 리스너 추가
document.getElementById('login_btn').addEventListener('click', login_count);
// document.getElementById('logout_btn').addEventListener('click', logout_count);

// 초기 상태를 표시
displayStatus();

// 12주.........
// 로그인 함수
function login() {
  // 세션 설정 (로그인 시간 저장)
  sessionStorage.setItem('loginTime', new Date().getTime());
  document.cookie = 'set cookie' + 5 * 60; // Set cookie with 5-minute expiration

  alert('로그인되었습니다.');

  // 5분 후 자동 로그아웃 타이머 설정
  setTimeout(autoLogout, 5 * 60 * 1000); // 5분 = 300,000ms
}

// 자동 로그아웃 함수
function autoLogout() {
  alert('5분이 경과하여 자동 로그아웃됩니다!');
  sessionStorage.clear(); // 세션 삭제
  deleteAllCookies(); // 쿠키 삭제
  window.location.href = '../index.html'; // 메인 페이지로 이동
}

// 로그아웃 버튼 클릭 시 호출되는 함수
function manualLogout() {
  alert('로그아웃되었습니다.');
  sessionStorage.clear(); // 세션 삭제
  deleteAllCookies(); // 쿠키 삭제
  window.location.href = '../index.html'; // 메인 페이지로 이동
}

// 페이지 로드 시 세션 확인
window.onload = function () {
  const loginTime = sessionStorage.getItem('loginTime');
  if (loginTime) {
    const currentTime = new Date().getTime();
    const elapsedTime = currentTime - loginTime;

    if (elapsedTime >= 5 * 60 * 1000) {
      autoLogout();
    } else {
      // 남은 시간만큼 타이머 설정
      setTimeout(autoLogout, 5 * 60 * 1000 - elapsedTime);
    }
  }
};

function deleteAllCookies() {
  const cookies = document.cookie.split(';');

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf('=');
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
  }
}

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
    return false;
  }

  // 실패 횟수와 로그인 제한 상태를 화면에 출력하는 코드 추가
  alert('로그인 실패 횟수: ' + login_fail_cnt);
}

const check_input = () => {
  if (loginRestricted) {
    alert('로그인이 제한되어 있습니다. 잠시 후 다시 시도해주세요.');
    return false;
  }
};
