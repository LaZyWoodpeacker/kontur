import kcrRequest from "./kcrRequest.mjs";

export default async function checkIdentify(issueId) {
  return kcrRequest(`v2/issues/${issueId}/subject-identification`, "PUT", {
    identificationSubjectType: "headOfOrganization",
    identifiedBy: "111",
  });
}
