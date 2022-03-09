import { connect, keyStores } from 'near-api-js';
import { KeyPair } from 'near-api-js';
import { getED25519KeyPair } from './getED25519KeyPair.js';
import { getNearConfig } from '../config/near.config.js';

export const initNear = async () => {
  const accountId = process.env.SERVICE_ACCOUNT_ID;
  const { networkId, nodeUrl } = getNearConfig();

  const keyStore = new keyStores.InMemoryKeyStore();
  const keyPair = KeyPair.fromString(getED25519KeyPair().secretKey);
  await keyStore.setKey(networkId, accountId, keyPair);

  return connect({
    networkId,
    nodeUrl,
    keyStore,
  });
};
