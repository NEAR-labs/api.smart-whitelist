import { getSmartWhitelistContract } from "../../helpers/getSmartWhitelistContract.js";

export const addAccount = async (accountId, near) => {
  const smartWhitelistContract = getSmartWhitelistContract(near);
  return await smartWhitelistContract.add_account({ args: { account_id: accountId } });
}
