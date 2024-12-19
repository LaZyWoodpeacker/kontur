import kcrRequest from "./kcrRequest.mjs";

export default async function putDocument(issue, documentType, data = {}) {
  if (!issue) throw new Error(`Нет id`);
  const result = await kcrRequest(
    `v2/issues/${issue}/documents/${documentType}`,
    "PUT",
    data
  );
  console.log(`Добавлен документ ${documentType} к заявке ${issue}`);
  return result;
}
