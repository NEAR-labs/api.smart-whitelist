import { PublicKey } from "near-api-js/lib/utils/index.js";
import bs58 from 'bs58';

export const verifySignature = (signature, publicKey, message) => {
  try {
    const sign = bs58.decode(signature);
    const msg = Buffer.from(message);
    const pk = PublicKey.fromString(publicKey);
    return pk.verify(msg, sign);

  } catch (e) {
    console.log(e);
    return false;
  }
}
