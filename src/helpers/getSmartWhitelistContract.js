import { Account, Contract } from 'near-api-js';

export const getSmartWhitelistContract = (near) => {
  const contractId = process.env.SMART_WHITELIST_CONTRACT_ID;
  const accountId = process.env.SERVICE_ACCOUNT_ID;
  return new Contract(new Account(near.connection, accountId), contractId, {
    viewMethods: ['get_applicant_pk'],
    changeMethods: ['add_account', 'remove_account'],
  });
}
