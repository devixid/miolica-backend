import { sign } from "jsonwebtoken";

// jwt cookie
export const createToken = (userId) => {
  const maxAge = 3 * 24 * 60 * 60;
  return sign({ userId }, "devix token secret", { expiresIn: maxAge });
};
