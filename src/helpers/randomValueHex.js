import { randomBytes } from "crypto";

export const randomValueHex = (len) => {
  return randomBytes(Math.ceil(len / 2))
    .toString('hex')
    .slice(0, len).toUpperCase();
}
