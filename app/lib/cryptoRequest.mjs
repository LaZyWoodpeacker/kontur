export const cryptoApiUrl = `${process.env["CRYPTOURL"]}/`;
export const cryptoApiKey = process.env["CRYPTOKEY"];

export default async function cryptoRequest() {
  return { cryptoApiUrl, cryptoApiKey };
}
