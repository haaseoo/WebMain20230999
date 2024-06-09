const search_message = () => {
  const c = '검색을 수행합니다';
  alert(c);
};

document
  .getElementById('search_button_msg')
  // * 4주 연습문제 : 클릭 이벤트 식별자 수정
  .addEventListener('click', search_message);
// function search_message() {
//   alert('검색을 수행합니다');
//   let message = '검색을 수행합니다';
//   alert(message);
// * 4주 연습문제 : 함수 중첩 > 가장 내부의 함수가 우선순위를 갖음
// * 4주 연습문제 : let 변수 추가

// }

function googleSearch() {
  const searchTerm = document.getElementById('search_input').value.trim();

  if (searchTerm.length === 0) {
    alert('검색어를 입력하세요!');
    return false;
  }

  const basWords = ['비속어1', '비속어2', '비속어3', '비속어4', '비속어5'];

  for (let i = 0; i < basWords.length; i++) {
    if (searchTerm.includes(basWords[i])) {
      alert('비속어가 포함된 검색입니다 ㅠㅠ..');
      return false;
    }
  }
  // * 5주 연습문제 : if문, 반복문, 배열 이용해 공백&비속어 검사

  // 검색어로 설정
  const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(
    searchTerm
  )}`; // 새 창에서 구글 검색 수행
  // window.open(googleSearchUrl, '_blank');
  window.location.href = googleSearchUrl;
  return false;
}
