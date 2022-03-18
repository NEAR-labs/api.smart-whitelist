import { checkParameters } from "../../helpers/checkParameters.js";
import { checkPersonalData } from "./checkPersonalData.js";
import { getStoredPerson } from "./getStoredPerson.js";
import { removeAccountFromWhitelist } from "./removeAccountFromWhitelist.js";
import { updateAccountWithPersonalData } from "./updateAccountWithPersonalData.js";

export const registerApplicant = async (req, res) => {
  try {
    const near = req.app.get('near');
    const onfido = req.app.get('onfido')
    const { account, message } = await checkParameters(req, res);

    if (!message) {
      if (account.status === 'verification_in_progress') {
        return res
          .status(400)
          .send({ error: 'At this stage, registration of the applicant is not possible' });
      }

      const person = checkPersonalData(req, res);

      if (!person.message) {
        let applicantId;
        let status = "registered";
        const storedPerson = getStoredPerson(account);

        if (!storedPerson || JSON.stringify(storedPerson) !== JSON.stringify(person)) {
          const newApplicant = await onfido.applicant.create({
            firstName: person.firstName,
            lastName: person.lastName,
            dob: person.dob,
            email: person.email,
            address: person.address
          });
          applicantId = newApplicant.id;

        } else {
          applicantId = account.applicantId;
          if (account.status === 'registered_token') {
            status = 'registered_token';
          }
        }

        if (account.status === 'account_is_whitelisted') {
          await removeAccountFromWhitelist(account.accountId, near);
        }

        account.status = status;
        account.applicantId = applicantId;
        await updateAccountWithPersonalData(account, person);

        console.log(`Applicant ID ${account.applicantId}`)
        res.send({});
      }
    }

  } catch (e) {
    console.log(e);
    res
      .status(500)
      .send({ error: 'Applicant not registered. Please try again later' });
  }
}
