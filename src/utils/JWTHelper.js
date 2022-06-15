import { decodeToken } from "react-jwt";

const JWTHelper = {
  checkIsJWTValid(token) {
    console.log({ token, decode: decodeToken(token) });
    if (decodeToken(token) !== null) return true;
    return false;
  },
};

export default JWTHelper;
