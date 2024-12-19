import kcrRequest from "./kcrRequest.mjs";

export default async function deleteKsrApiCert(issue) {
  if (!issue) throw new Error(`Нет id`);
  const result = await kcrRequest(`v2/issues/${issue}`, "DELETE");
  console.log(`Удалена заявка ${issue}`);
  return result;
}
