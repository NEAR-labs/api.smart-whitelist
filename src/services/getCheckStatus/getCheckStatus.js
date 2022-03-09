import { checkParameters } from "../../helpers/checkParameters.js";

export const getCheckStatus = async (req, res) => {
  try {
    const { account, message } = await checkParameters(req, res, false);
    if (!message) {
      let status = account.status;
      if (status !== 'verification_in_progress') {
        return res
          .status(400)
          .send({error: 'Status cannot be requested at this stage'});
      }
      res.send({ status });
    }

  } catch (e) {
    console.log(e);
    res
      .status(500)
      .send({ error: 'Unable to get verification status. Please try again' });
  }
}
