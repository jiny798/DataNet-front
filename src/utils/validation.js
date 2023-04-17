function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function validateNickName(id) {
  const idRegExp = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+$/;
  return idRegExp.test(id);
}

function validatePw(pw) {
  const idRegExp = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+$/;
  return idRegExp.test(pw);
}

export { validateEmail, validateNickName, validatePw };
