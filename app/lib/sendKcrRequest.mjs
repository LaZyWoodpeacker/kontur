import kcrRequest from "./kcrRequest.mjs";

export default async function sendKcrRequest(issueId) {
  const response = await kcrRequest(
    `v2/issues/${issueId}/retrieve-from-cabinet`,
    "POST",
    {}
  );
  return response;
}
