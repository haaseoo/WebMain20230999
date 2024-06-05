class SignUp {
  constructor(
    firstName,
    lastName,
    birthdayDate,
    gender,
    emailAddress,
    phoneNumber,
    classNumber,
    random
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthdayDate = birthdayDate;
    this.gender = gender;
    this.emailAddress = emailAddress;
    this.phoneNumber = phoneNumber;
    this.classNumber = classNumber;
    this.random = random;
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  set fullName(fullName) {
    const [firstName, lastName] = fullName.split('');
    this.firstName = firstName;
    this.lastName = lastName;
  }

  get contactInfo() {
    return `${this.emailAddress} ${this.phoneNumber} ${this.random}`;
  }

  set contactInfo(contactInfo) {
    const [emailAddress, phoneNumber, random] = contactInfo.split(' ');
    this.emailAddress = emailAddress;
    this.phoneNumber = phoneNumber;
    this.random = random;
  }
}

function join() {
  let form = document.querySelector('#form_main');
  let f_name = document.querySelector('#firstname');
  let l_name = document.querySelector('#lastname');
  let b_day = document.querySelector('#birthdatDate');
  let gender = document.querySelector('#inlineRadioOptions');
  let email = document.querySelector('#emailAddress');
  let p_number = document.querySelector('#phoneNumber');
  let class_check = document.querySelector('.select form-control-lg');

  form.action = '../login/index_join.html';
  form.method = 'get';

  if (
    f_name.value.length === 0 ||
    l_name.value.length === 0 ||
    b_day.value.length === 0 ||
    email.value.length === 0 ||
    p_number.value.length === 0
  ) {
    alert('회원가입 폼에 모든 정보를 입력해주세요. (성별, 분반 제외)');
  } else {
    session_join_set(); //회원가입용 세션 생성
    form.submit();
  }
}

function joinUser() {
  // 회원가입 로직 구현
  console.log('회원가입 되었습니다!');
  const user = session_join_get();
  if (user) {
    console.log('복호화된 객체 내용:', user);
  } else {
    console.log('사용자 정보가 없습니다.');
  }
}

console.log(sessionStorage.getItem('Session_Storage_object'));
console.log(sessionStorage.getItem('Session_Storage_encrypted'));
