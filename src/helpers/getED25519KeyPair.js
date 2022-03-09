import { parseSeedPhrase } from 'near-seed-phrase';

export const getED25519KeyPair = () => {
  return parseSeedPhrase(process.env.SERVICE_ACCOUNT_SEED_PHRASE, "m/44'/397'/0'");
};
