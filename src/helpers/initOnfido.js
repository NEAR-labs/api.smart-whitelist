import { Onfido, Region } from "@onfido/api";

export const initOnfido = () => {
  return new Onfido({
    apiToken: process.env.ONFIDO_API_TOKEN,
    region: Region.EU
  });
}
