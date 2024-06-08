function session_set() {
  let f_name = document.querySelector('#firstName').value;
  let l_name = document.querySelector('#lastName').value;
  let b_day = document.querySelector('#birthdayDate').value;
  let gender = document.querySelector('#inlineRadioOptions');
  let email = document.querySelector('#emailAddress').value;
  let p_number = document.querySelector('#phoneNumber').value;
  let class_check = document.querySelector('.select form-control-lg');
  // let id = document.querySelector('#floatingInput');
  // let password = document.querySelector('#floatingPassword');
  let random = new Date();

  const newSignUp = new SignUp(
    f_name,
    l_name,
    b_day,
    gender,
    email,
    p_number,
    class_check,
    random
  );
  console.log(newSignUp.fullName);
  console.log(newSignUp.contactInfo);

  const obj = {
    id: id.value,
    otp: random,
  };

  if (sessionStorage) {
    const objString = JSON.stringify(newSignUp);
    let en_text = encrypt_text(objString);
    sessionStorage.setItem('Session_Storage_object', objString);
    sessionStorage.setItem('Session_Storage_encrypted', en_text);
  } else {
    alert('세션 스토리지 지원 x');
  }
}

function session_set() {
  //세션저장
  let session_id = document.querySelector('#typeEmailX');
  let session_pass = document.querySelector('#typePasswordX');
  if (sessionStorage) {
    let en_text = encrypt_text(session_pass.value);
    // sessionStorage.setItem('Session_Storage_test', session_id.value);
    sessionStorage.setItem('Session_Storage_id', session_id.value);
    sessionStorage.setItem('Session_Storage_pass', en_text);
    const now = new Date().getTime();
    sessionStorage.setItem('login_time', now.toString());
    setTimeout(() => {
      logout();
    }, 300000);
  } else {
    alert('로컬 스토리지 지원 x');
  }
}

function session_get() {
  if (sessionStorage.getItem('Session_Storage_id')) {
    return sessionStorage.getItem('Session_Storage_test');
  } else {
    alert('세션 스토리지 지원 x');
  }
}

// function session_join_set(user) {
//   sessionStorage.setItem('user', JSON.stringify(user));
// }

function session_join_get() {
  const user = sessionStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}

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
