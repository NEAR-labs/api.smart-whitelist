import { checkParameters } from "../../helpers/checkParameters.js";

export const generateSdkToken = async (req, res) => {
  try {
    const onfido = req.app.get('onfido')
    const { account, message } = await checkParameters(req, res);
    if (!message) {
      if (account.status !== 'registered' && account.status !== 'registered_token') {
        return res
          .status(400)
          .send({ error: 'SDK token cannot be generated at this stage' });
      }

      const sdkToken = await onfido.sdkToken.generate({
        applicantId: account.applicantId,
        referrer: process.env.ONFIDO_REFERRER,
      });

      account.status = "registered_token";
      account.sdkToken = sdkToken;
      account.sdkTokenTimestamp = new Date();
      await account.save();
      console.log(`SDK token ${account.sdkToken}`)

      res.send({ sdk_token: account.sdkToken });
    }

  } catch (e) {
    console.log(e);
    res
      .status(500)
      .send({ error: 'STK token not created. Please try again later' });
  }
}
