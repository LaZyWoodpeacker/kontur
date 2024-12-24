import deleteKsrApiCert from "./deleteKcrApiCert.mjs";
import getKsrApiList from "./getKsrApiList.mjs";

export default async function clear() {
  const { issues, total } = await getKsrApiList();
  const filtered = issues.filter(
    (e) => e.subjectEmail === "lazywoodpeacker@gmail.com"
  );
  const deleteResults = await Promise.all(
    filtered.map((e) => deleteKsrApiCert(e.id))
  );
  return { total, filtered: filtered?.length, deleteResults };
}
