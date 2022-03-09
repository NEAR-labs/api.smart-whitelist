import { Webhook } from "../../models/Webhook.js";

export const registerWebhook = async (app) => {
  const serverUrl = `${process.env.EXTERNAL_SERVER_URL}/send-check-result`;
  try {
    const onfido = app.get('onfido')
    const webhook = await Webhook.findOne({ serverUrl });

    if (!webhook) {
      const webhookObj = await onfido.webhook.create({
        url: serverUrl,
        events: ["check.completed"]
      });

      await Webhook.create({
        url: serverUrl,
        id: webhookObj.id,
        token: webhookObj.token,
        webhookTimestamp: new Date(),
      });

      console.log('Webhook registered');
    }

  } catch (e) {
    console.log(e);
    throw new Error('Webhook not registered, an error has occurred');
  }
}
