import { Account } from "../../models/Account.js";
import { addAccount } from "./addAccount.js";
import { Event } from "../../models/Event.js";

export const eventHandling = async (req, event) => {
  try {
    console.log('Handling event:');
    console.log(event);

    const near = req.app.get('near');
    const onfido = req.app.get('onfido')

    if (event && event.action === 'check.completed' && event.object && event.object.status === 'complete' &&
      event.object.id)
    {
      const checkId = event.object.id;
      const check = await onfido.check.find(checkId);

      if (check.status === 'complete') {
        const applicantId = check.applicantId;
        const successResult = check.result === 'clear';
        let account = await Account.findOne({ applicantId, checkId });
        if (account && account.status === 'verification_in_progress') {
          if (successResult) {
            await addAccount(account.accountId, near);
          }
          account.status = successResult ? 'account_is_whitelisted' : 'applicant_was_rejected';
          account.checkResult = check.result;
          account.checkFinishTimestamp = new Date();
          await account.save();

          const eventObj = await Event.findOne({ checkId });
          eventObj.processed = true;
          await eventObj.save();

          console.log(`The account has been given the status of '${account.status}'`);

        } else {
          console.log("Account must have 'verification_in_progress' status");
        }
      } else {
        console.log('Verification is not yet complete');
      }
    } else {
      console.log('Event missed');
    }

  } catch (e) {
    console.log('Unknown error:');
    console.log(e);
  }
}
