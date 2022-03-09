import { Webhook } from "../models/Webhook.js";
import { WebhookEventVerifier } from "@onfido/api";

export const initWebhookEventVerifier = async () => {
  const serverUrl = `${process.env.EXTERNAL_SERVER_URL}/send-check-result`;
  const webhook = await Webhook.findOne({ serverUrl });
  if (webhook) {
    return new WebhookEventVerifier(webhook.token);
  }
  throw new Error('WebhookEventVerifier not initialized');
}
