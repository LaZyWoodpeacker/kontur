import kcrRequest from "./kcrRequest.mjs";

export default async function validateKsrApiCert(issue) {
  if (!issue) throw new Error(`Нет id`);
  const result = await kcrRequest(`v2/issues/${issue}/validate`, "POST");
  console.log(`Заявка отправлена на проверку`);
  return result;
}
