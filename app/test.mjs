// docker run --rm -ti -v ./app:/app node:latest node app/test.mjs
import createKsrApiDss from "./lib/createKsrApiDss.mjs";
import actualCheck from "./lib/actualCheck.mjs";
import clear from "./lib/clear.mjs";
import putDocument from "./lib/putDocument.mjs";
import uploadFile from "./lib/uploadFile.mjs";
import getKsrApiIssue from "./lib/getKsrApiIssue.mjs";
import validateKsrApiCert from "./lib/validateKsrApiCert.mjs";

const main = async () => {
  // const { id } = await createKsrApiDss({
  //   certificateTemplateInfo: {
  //     type: "qualified",
  //     useAreas: ["portalUser"],
  //   },
  //   subjectInfo: {
  //     type: "naturalPerson",
  //     inn: "593294540919",
  //     lastname: "Тест",
  //     firstname: "Виталий",
  //     middlename: "Виталиевич",
  //     email: "lazywoodpeacker@gmail.com",
  //     phone: "9122694997",
  //   },
  //   cspInfo: {
  //     type: "dss",
  //   },
  // });
  // await actualCheck(id);
  // await putDocument(id, "snils", {
  //   requisitesToAddOrUpdate: [
  //     {
  //       type: "number",
  //       value: "20397309663",
  //     },
  //   ],
  // });
  // await putDocument(id, "passport", {
  //   requisitesToAddOrUpdate: [
  //     {
  //       type: "number",
  //       value: "666666",
  //     },
  //     {
  //       type: "series",
  //       value: "6666",
  //     },
  //     {
  //       type: "IssueDate",
  //       value: "10.10.2020",
  //     },
  //     {
  //       type: "IssueOrganizationId",
  //       value: "666666",
  //     },
  //     {
  //       type: "Gender",
  //       value: "Мужской",
  //     },
  //     {
  //       type: "BirthDate",
  //       value: "10.10.2000",
  //     },
  //   ],
  // });
  // await putDocument(id, "naturalPersonInn", {});
  // await uploadFile(id, "snils", "/app/scan.jpeg");
  // await uploadFile(id, "passport", "/app/scan.jpeg");
  // await uploadFile(id, "naturalPersonInn", "/app/scan.jpeg");
  // await actualCheck(id);
  // await validateKsrApiCert(id);
  // await actualCheck(id);
  const id = "2de5fe8a-85fe-4a2b-9cab-1494453de935";
  const result = await getKsrApiIssue(id);
  // await clear();
  return result;
};

main().then(console.log).catch(console.error);

// https://kcr.kontur.ru/number/8057034/issues?tab=inProgress
