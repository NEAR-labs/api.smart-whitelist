import { checkParameters } from "../../helpers/checkParameters.js";
import { checkPersonalData } from "./checkPersonalData.js";

export const registerApplicant = async (req, res) => {
  try {
    const onfido = req.app.get('onfido')
    const { account, message } = await checkParameters(req, res);

    if (!message) {
      if (account.status !== 'new' && account.status !== 'applicant_was_rejected') {
        return res
          .status(400)
          .send({ error: 'At this stage, registration of the applicant is not possible' });
      }
      const { firstName, lastName, email, dob, address, message } = checkPersonalData(req, res);
      if (!message) {
        const newApplicant = await onfido.applicant.create({ firstName, lastName, dob, email, address });
        account.status = "registered";
        account.applicantId = newApplicant.id;
        account.email = email;
        await account.save();
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
