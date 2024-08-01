import errors from "../utils/apiErrors.js";
import jwt from 'jsonwebtoken';

const { sign, verify } = jwt;

const authenticate = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return next(errors.MissingAuthorizationHeader());
  }
  const [authType, token] = authorizationHeader.split(' ');

  if (authType.toLowerCase() !== 'bearer') {
    return next(errors.MissingBearerAuthorizationHeader());
  }

  try {
    req.user = await promisifyVerify(token, process.env.JWT_SECRET);
  } catch (error) {
    return next(errors.InvalidBearerToken());
  }
  return next();
}

const token = async (payload, additionalOption) => {
  const token = await promisifySign(
    payload,
    process.env.JWT_SECRET,
    additionalOption
  );
  return token;
}

const promisifySign = (payload, secret, options) => {
  return new Promise((resolve, reject) => {
    sign(payload, secret, options, (err, token) => {
      if (err) reject(err);
      else resolve(token);
    });
  });
}

const promisifyVerify = async(token, secret) => {
  return new Promise((resolve, reject) => {
    verify(token, secret, (err, decoded) => {
      if (err) reject(err);
      else resolve(decoded);
    });
  });
}


export default { authenticate, token };