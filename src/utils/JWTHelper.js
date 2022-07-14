import { decodeToken, isExpired } from "react-jwt";

const JWTHelper = {
  checkIsJWTValid(token) {
    if (decodeToken(token) !== null && !isExpired(token)) return true;
    return false;
  },
};

export default JWTHelper;
