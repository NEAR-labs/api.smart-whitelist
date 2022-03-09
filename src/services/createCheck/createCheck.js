import { checkParameters } from "../../helpers/checkParameters.js";

export const createCheck = async (req, res) => {
  try {
    const onfido = req.app.get('onfido')
    const { account, message } = await checkParameters(req, res);
    if (!message) {
      if (account.status !== 'registered_token') {
        return res
          .status(400)
          .send({error: 'Verification cannot be performed at this stage'});
      }

      const applicantId = account.applicantId;
      const newCheck = await onfido.check.create({
        applicantId,
        reportNames: ["document", "facial_similarity_photo"]
      });

      account.status = "verification_in_progress";
      account.checkId = newCheck.id;
      account.checkStartTimestamp = new Date();
      await account.save();
      console.log(`Check ID ${account.checkId}`)

      res.send({});
    }

  } catch (e) {
    console.log(e);
    res
      .status(500)
      .send({ error: 'Verification not started. Please try again later' });
  }
}
