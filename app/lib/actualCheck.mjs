import getKsrApiIssue from "./getKsrApiIssue.mjs";

export default async function actualCheck(issue, trying = 10, sleep = 2000) {
  let count = 1;
  while (count <= trying) {
    const { actualized } = await getKsrApiIssue(issue);
    console.log("Попытка", count, "Статус actualized", actualized);
    if (actualized) break;
    count++;
    await new Promise((res) => {
      setTimeout(() => res(true), sleep);
    });
  }
  return true;
}
