const check_xss = (input) => {
  const DOMPurify = window.DOMPurify;
  const sanitizedInput = DOMPurify.sanitize(input);

  if (sanitizedInput !== input) {
    alert('XSS 공격 가능성이 있는 입력값을 발견했습니다.');
    return false;
  }
  return sanitizedInput;
};
