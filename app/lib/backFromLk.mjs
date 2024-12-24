import kcrRequest from "./kcrRequest.mjs";

export default async function backFromLk(issueId) {
  return kcrRequest(`v2/issues/${issueId}/retrieve-from-cabinet`, "POST");
}
