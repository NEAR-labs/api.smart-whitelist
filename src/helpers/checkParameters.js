import { Account } from "../models/Account.js";
import { checkSessionToken } from "./checkSessionToken.js";
import { getApplicantPk } from "./getApplicantPk.js";
import { verifySignature } from "./verifySignature.js";

export const checkParameters = async (req, res, useContract = true) => {
  let message = null;
  let account = null;

  const accountId = req.body["account_id"];
  if (!accountId) {
    message = 'No account_id specified';
    res.status(400).send({ error: message });
  } else {
    console.log(`account_id: ${accountId}`);

    let publicKey = null;
    if (useContract) {
      publicKey = await getApplicantPk(accountId, req.app.get('near'));
      if (!publicKey) {
        message = 'Unknown applicant';
        res.status(400).send({ error: message });
      } else {
        console.log(`PublicKey: ${publicKey}`);
      }
    }

    if (!message) {
      const signature = `${req.body["signature"]}`;
      console.log(`signature: ${signature}`);

      account = await Account.findOne({ accountId });
      if (!account) {
        message = 'Account ID has not registered in the system. Try to sign up first';
        res.status(400).send({ error: message });
      } else if (!checkSessionToken(account)) {
        message = 'Session expired, sign in again';
        res.status(401).send({ error: message });
      }
      else if (
        !verifySignature(
          signature,
          useContract ? publicKey : account.publicKey,
          account.sessionToken
        )
      ) {
        message = 'Incorrect signature';
        res.status(401).send({ error: message });
      } else {
        console.log(`Signature is ok`);
      }
    }
  }

  return { account, message };
}
