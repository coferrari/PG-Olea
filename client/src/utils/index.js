import jwt_decode from "jwt-decode";
const getToken = () => localStorage.getItem("token");
const isAuthorized = () => (getToken() ? true : false);
const decodeToken = () => (getToken() ? jwt_decode(getToken()) : false);
const format = (num) => {
  num = num + "";
  var str = "";
  for (var i = num.length - 1, j = 1; i >= 0; i--, j++) {
    if (j % 3 === 0 && i !== 0) {
      str += num[i] + ".";
      continue;
    }
    str += num[i];
  }
  return str.split("").reverse().join("");
};
export { getToken, isAuthorized, decodeToken, format };
