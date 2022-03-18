import { Account } from '../../models/Account.js';
import { checkSessionToken } from "../../helpers/checkSessionToken.js";
import { getApplicantPk } from "../../helpers/getApplicantPk.js";
import { randomValueHex } from "../../helpers/randomValueHex.js";
import { verifySignature } from "../../helpers/verifySignature.js";

export const registerSession = async (req, res) => {
  try {
    let publicKey, sessionToken, status;
    let signatureCheckRequired = true;

    const accountId = req.body["account_id"];
    if (!accountId) {
      return res.status(400).send({ error: 'No account_id specified' });
    }

    const account = await Account.findOne({ accountId });
    if (account && account.status === 'account_is_whitelisted') {
      signatureCheckRequired = false;
    } else {
      publicKey = await getApplicantPk(accountId, req.app.get('near'));
      if (!publicKey) {
        return res.status(400).send({ error: 'Unknown applicant' });
      }
      console.log(`PublicKey: ${publicKey}`);
    }

    if (signatureCheckRequired) {
      const signature = `${req.body["signature"]}`;

      const message = `${accountId}-${new Date().toISOString().substring(0, 10)}`;
      if (!verifySignature(signature, publicKey, message)) {
        return res.status(401).send({ error: 'Incorrect signature' });
      }
      console.log(`Signature is ok`);
    }

    if (account) {
      status = account.status;
      if (signatureCheckRequired && account.publicKey !== publicKey) {
        account.publicKey = publicKey;
      }
      if (!checkSessionToken(account)) {
        sessionToken = randomValueHex(32);
        account.sessionToken = sessionToken;
        account.sessionTokenTimestamp = new Date();
      } else {
        sessionToken = account.sessionToken;
      }
      await account.save();

    } else {
      sessionToken = randomValueHex(32);
      status = 'new';
      await Account.create({
        accountId,
        sessionToken,
        sessionTokenTimestamp: new Date(),
        publicKey: publicKey,
        status,
        applicantId: null,
        sdkToken: null,
        sdkTokenTimestamp: null,
        checkId: null,
        checkResult: null,
        checkStartTimestamp: null,
        checkFinishTimestamp: null,
      });
    }
    console.log('Session registered');
    res.send({ session_token: sessionToken, status });

  } catch (e) {
    console.log(e);
    res
      .status(500)
      .send({ error: 'Session not registered. Please try again later' });
  }
}
