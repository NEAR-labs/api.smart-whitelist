import { getSmartWhitelistContract } from "./getSmartWhitelistContract.js";

export const getApplicantPk = async (accountId, near) => {
  const smartWhitelistContract = getSmartWhitelistContract(near);
  return await smartWhitelistContract.get_applicant_pk({applicant_account_id: accountId});
}
