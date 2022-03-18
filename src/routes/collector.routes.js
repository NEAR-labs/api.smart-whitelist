import { createCheck } from "../services/createCheck/createCheck.js";
import { generateSdkToken } from "../services/generateSdkToken/generateSdkToken.js";
import { getApplicantCountries } from "../services/getApplicantCountries/getApplicantCountries.js";
import { getCheckStatus } from "../services/getCheckStatus/getCheckStatus.js";
import { registerApplicant } from "../services/registerApplicant/registerApplicant.js";
import { registerSession } from "../services/registerSession/registerSession.js";
import { sendCheckResult } from "../services/sendCheckResult/sendCheckResult.js";

export const routes = app => {
  app.post('/register-session', registerSession);
  app.post('/register-applicant', registerApplicant);
  app.post('/generate-sdk-token', generateSdkToken);
  app.post('/create-check', createCheck);
  app.post('/send-check-result', sendCheckResult);
  app.get('/get-check-status', getCheckStatus);
  app.get('/supported-applicant-countries', getApplicantCountries);
}
