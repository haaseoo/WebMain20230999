## * 2주차 수업 개발 완료 *
  - vs code 환경 설정, 깃허브 설정


## * 3주차 수업 개발 완료 *
  - 메타데이터와 하이퍼링크 : 메인 이미지와 텍스트 메뉴에 a 태그 추가
  - 표 : lol 캐릭터 표 구현
  - 네비게이션 바 (부트스트랩)
  - 반응형 메인이미지

### 3주차 응용 문제 & 추가 구현 완료
  - 표에 이미지 추가, 특정 문자에 롤 사이트 링크 달고 하나로 병합하기
  - 네비게이션 바에 하이퍼링크 추가, 색상 변경
 
## * 4주차 수업 개발 완료 *
  - 네비게이션 바 좌측 로고 추가, 반응형으로 수정
  - 자바스크립트 이용해 네비게이션 바 검색창 구현 (마우스 이벤트)
    
### 4주차 응용 문제 & 추가 구현 완료
  - 테이블 색상 변경
  - 네비게이션 바 링크 추가
  - 연습문제: 클릭 이벤트 식별자 수정, 함수 중첩, let 변수 추가 완료

## * 5주차 수업 개발 완료 *
  - map, set 활용 (data_type.js)
  - 검색창 확장 : 구글 검색 함수 호출
  - 팝업창 기능 구현 (날짜, 시간 출력)
  - 로고 이미지 호버 기능 (popup.js) > 딸기
    
### 5주차 응용 문제 & 추가 구현 완료
  - 검색창 js 수정
    1. if문, 반복문, 배열 활용
    2. 공백 검사 : 문장 길이 0이면 함수 중단
    3. 비속어 검사 : 배열 내 포함되는 문자열일시 함수 중단

## * 7주차 수업 개발 완료 *
  - 화살표 함수를 이용해 popup.js 수정
  - 10초 유지 후 팝업창 자동 닫기 기능, 카운트 다운 (popup_close.html)
  - 로그인 페이지 생성

### 7주차 응용 문제 & 추가 구현 완료
  - 로그인 후 로그아웃 기능 구현 
  - 로그아웃시 로그아웃 버튼 > 로그아웃 페이지로 연결 (원래 사이트 메인)

## * 8주차 수업 개발 완료 *
  - 로그인 폼 아이디&비밀번호 조건 추가
  - 로그인 폼 xss 방지 (check_xss)
    
### 8주차 응용 문제 & 추가 구현 완료
  - login.js > check_input 함수 수정
    1. 아이디 10글자 제한, 이메일 15글자 이하 (login.js)
    2. 로그인 입력 패턴 제한 : 3글자 이상 반복, 연속되는 숫자 2개 이상 반복 금지 (login.js)
   
## * 10주차 수업 개발 완료 *
  - 데이터 저장 > 쿠키
    1. 팝업창에 체크 박스 추가 : 클릭시 함수 호출, 쿠키 생성
    2. 쿠키 유무 체크
    3. 쿠키 set, get 함수
  
### 10주차 응용 문제 & 추가 구현 완료
  - 로그인, 로그아웃 횟수 쿠키 저장 (login.js)
    
## * 12주차 수업 개발 완료 *
  - 데이터 저장 > 세션
    1. 세션 검사 : set, get 함수
    2. check 함수 추가
    3. init 함수 수정
       
### 12주차 응용 문제 & 추가 구현 완료
  - 세션 스토리지 로그아웃 구현 : session_del() 함수 구현 (logout.html 내부 스크립트 태그에 직접 추가)

## * 13&14주차 수업 개발 완료 *
  - 객체 세션으로 저장
  - 회원가입 버튼&페이지 추가 (회원가입 완료 페이지 : index_join.html)
  
### 13&14주차 응용 문제 & 추가 구현 완료
  - 콘솔에 객체 내용 출력
    1. session_join_get() 함수 추가 (session.js)
    2. join.js 연동, body에 onload 로 session_join_get() 호출 (index_join.html)

## * 보강주차 수업 개발 완료 *
  - 개인 프로필 만들기 : 로그인 후 볼 수 있도록하기 (inex_login.html), 네비게이션 바에 추가
  - 카카오맵 지도 추가
    
### 보강주차 응용 문제 & 추가 구현 완료
  - 개인 프로필 사진 변경 (profile.html)
  - 카카오맵 키워드 검색 및 목록 출력 화면 구현 (map 폴더 추가 생성함 - map.js/map.css)
  - 위도, 경도 수정

## * 개인 추가 구현 *
1. 검색하기, 로그인, 로그아웃, 회원가입 버튼 css 수정

   <img width="150" alt="image" src="https://github.com/haaseoo/WebMain20230999/assets/155533087/3d601bc3-2df2-44c2-9eb2-74ba474d91a6">
   <img width="150" alt="image" src="https://github.com/haaseoo/WebMain20230999/assets/155533087/7cb2d735-2ca7-497f-80d9-d593125a83f9">

  
2. login.html 의 아이디 기억 체크박스 check.css로 꾸미기 (login.html)

   <img width="200" alt="image" src="https://github.com/haaseoo/WebMain20230999/assets/155533087/c911f6bb-b5e9-4551-9302-a083b2b4c69c">

4. 카카오톡 채널 추가 버튼 구현 : 클릭시 카카오톡 채널 추가 화면으로 연동 (profile.html)

   <img width="500" alt="image" src="https://github.com/haaseoo/WebMain20230999/assets/155533087/339b8600-11f7-4b0e-9112-57a450e36542">

5. 푸터 구현 : 메일, 인스타그램, 페이스북, 트위터 연동 (index.html, index.css)

   <img width="1000" alt="image" src="https://github.com/haaseoo/WebMain20230999/assets/155533087/befd5e38-4dd4-4c85-b5f2-c5f6784f9847">

WEB_MAIN_20230999 에 오류가 생겨 다시 webmain20230999 폴더를 생성하였습니다.
첫 커밋은 첫 수업날 정상 작동되었습니다!
  
  <img width="500" alt="image" src="https://github.com/haaseoo/WebMain20230999/assets/155533087/b3e09780-9293-4813-8e9d-570c281877fb">
