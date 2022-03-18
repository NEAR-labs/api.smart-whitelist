import bodyParser from "express";
import cors from 'cors';
import express from 'express';
import { initNear } from "./helpers/initNear.js";
import { initOnfido } from "./helpers/initOnfido.js";
import { initWebhookEventVerifier } from "./helpers/initWebhookEventVerifier.js";
import { loggingRequestAndResponse } from "./helpers/loggingRequestAndResponse.js";
import mongoose from 'mongoose';
import { registerWebhook } from "./services/registerWebhook/registerWebhook.js";
import { routes } from './routes/collector.routes.js';

await mongoose.connect(process.env.MONGO);

const app = express();
app.use(cors());
app.use(loggingRequestAndResponse);
app.use(bodyParser.json({
  verify: function(req, res, buf) {
    req.rawBody = buf.toString();
  }
}));

app.set('near', await initNear());
app.set('onfido', await initOnfido());
await registerWebhook(app);
app.set('eventVerifier', await initWebhookEventVerifier());

routes(app);
app.listen(process.env.PORT);
