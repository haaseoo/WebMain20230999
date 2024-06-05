const search_message = () => {
  const c = '검색을 수행합니다';
  alert(c);
};

document
  .getElementById('search_button_msg')
  .addEventListener('click', search_message);
// function search_message() {
//   // alert('검색을 수행합니다');
//   let message = '검색을 수행합니다';
//   alert(message);
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

  // 검색어로 설정
  const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(
    searchTerm
  )}`; // 새 창에서 구글 검색 수행
  // window.open(googleSearchUrl, '_blank');
  window.location.href = googleSearchUrl;
  return false;
}
