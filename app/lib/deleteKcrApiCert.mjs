import kcrRequest from "./kcrRequest.mjs";

export default async function deleteKcrApiCert(issue) {
  if (!issue) throw new Error(`Нет id`);
  await kcrRequest(`v2/issues/${issue}`, "DELETE");
  console.log(`Удалена заявка ${issue}`);
  return issue;
}
