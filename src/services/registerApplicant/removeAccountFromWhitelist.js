import { getSmartWhitelistContract } from "../../helpers/getSmartWhitelistContract.js";

export const removeAccountFromWhitelist = async (accountId, near) => {
  const smartWhitelistContract = getSmartWhitelistContract(near);
  return await smartWhitelistContract.remove_account({ args: { account_id: accountId } });
}
