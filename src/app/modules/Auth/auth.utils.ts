import jwt, { JwtPayload } from 'jsonwebtoken';

export const createToken = (
  jwtPayload: { email: string },
  secret: jwt.Secret,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  expiresIn: any,
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};

export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as JwtPayload;
};
