import kcrRequest from "./kcrRequest.mjs";

export default async function getKsrApiList() {
  return await kcrRequest(`v2/issues?status=preparing&status=correction`);
}
