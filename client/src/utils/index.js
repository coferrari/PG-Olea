import jwt_decode from "jwt-decode";
const getToken = () => localStorage.getItem("token");
const isAuthorized = () => (getToken() ? true : false);
const decodeToken = () => jwt_decode(getToken());

export { getToken, isAuthorized, decodeToken };
