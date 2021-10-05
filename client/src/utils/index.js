import jwt_decode from "jwt-decode";
const getToken = () => localStorage.getItem("token");
const isAuthorized = () => (getToken() ? true : false);
const decodeToken = () => (getToken() ? jwt_decode(getToken()) : false);

export { getToken, isAuthorized, decodeToken };
