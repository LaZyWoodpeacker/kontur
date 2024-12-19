import kcrRequest from "./kcrRequest.mjs";

export default async function getKsrApiIssue(issue) {
  if (!issue) throw new Error(`Нет id`);
  return await kcrRequest(`v2/issues/${issue}`);
}
