import kcrRequest from "./kcrRequest.mjs";

export default async function createKsrApiDss(data) {
  const result = await kcrRequest("v2/issues", "POST", data);
  if (result?.error) throw new Error(result.error);
  console.log(`Создана заявка ${result.id}`);
  return result;
}
