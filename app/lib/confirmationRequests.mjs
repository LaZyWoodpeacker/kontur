import kcrRequest from "./kcrRequest.mjs";

export default async function confirmationRequests(issueId) {
  return kcrRequest(`v2/issues/${issueId}/confirmation-requests`, "POST", {
    operationToConfirm: "signingReleaseStatement",
  });
}
