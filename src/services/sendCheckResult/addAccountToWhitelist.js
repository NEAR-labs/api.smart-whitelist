import { getSmartWhitelistContract } from "../../helpers/getSmartWhitelistContract.js";

export const addAccountToWhitelist = async (accountId, near) => {
  const smartWhitelistContract = getSmartWhitelistContract(near);
  return await smartWhitelistContract.add_account({ args: { account_id: accountId } });
}
