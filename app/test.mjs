// docker run --rm -ti -v ./app:/app node:latest node app/test.mjs
import fs from "fs";
import createKcrApiDss from "./lib/createKcrApiDss.mjs";
import actualCheck from "./lib/actualCheck.mjs";
import clear from "./lib/clear.mjs";
import putDocument from "./lib/putDocument.mjs";
import uploadFile from "./lib/uploadFile.mjs";
import getKsrApiIssue from "./lib/getKsrApiIssue.mjs";
import validateKcrApiCert from "./lib/validateKcrApiCert.mjs";
import backFromLk from "./lib/backFromLk.mjs";
import checkIdentify from "./lib/checkIdentify.mjs";
import confirmationRequests from "./lib/confirmationRequests.mjs";
import getKsrApiList from "./lib/getKsrApiList.mjs";
import addSignFileByTestSignature from "./lib/addSignFile.mjs";
import signByCryptoApi from "./lib/signFileCryptoApi.mjs";
import sendKcrRequest from "./lib/sendKcrRequest.mjs";

const lastFilePath = "/app/current.issue";

const main = async () => {
  let currentId = null;
  if (fs.existsSync(lastFilePath)) {
    currentId = fs.readFileSync(lastFilePath, { encoding: "utf8" });
  }
  const action = process.argv.length > 2 ? process.argv[2] : "info";
  switch (action) {
    case "create":
      try {
        const { id } = await createKcrApiDss({
          certificateTemplateInfo: {
            type: "qualified",
            useAreas: ["portalUser"],
          },
          subjectInfo: {
            type: "naturalPerson",
            inn: "593294540919",
            lastname: "Тест",
            firstname: "Виталий",
            middlename: "Виталиевич",
            email: "lazywoodpeacker@gmail.com",
            phone: "9122694997",
          },
          cspInfo: {
            type: "dss",
          },
        });
        await actualCheck(id);
        await putDocument(id, "snils", {
          requisitesToAddOrUpdate: [
            {
              type: "number",
              value: "20397309663",
            },
          ],
        });
        await putDocument(id, "passport", {
          requisitesToAddOrUpdate: [
            {
              type: "number",
              value: "666666",
              // value: "010101",
            },
            {
              type: "series",
              value: "6666",
              // value: "0101",
            },
            {
              type: "IssueDate",
              value: "10.10.2020",
            },
            {
              type: "IssueOrganizationId",
              value: "666666",
            },
            {
              type: "Gender",
              value: "Мужской",
            },
            {
              type: "BirthDate",
              value: "10.10.2000",
            },
          ],
        });
        await putDocument(id, "naturalPersonInn", {});
        await putDocument(id, "releaseStatement", {});
        await uploadFile(id, "snils", "/app/scan.jpeg");
        await uploadFile(id, "passport", "/app/scan.jpeg");
        await uploadFile(id, "naturalPersonInn", "/app/scan.jpeg");
        await uploadFile(id, "releaseStatement", "/app/scan.jpeg");
        await validateKcrApiCert(id);
        fs.writeFileSync(lastFilePath, id);
        return await actualCheck(id);
      } catch (e) {
        await clear();
        throw e;
      }
    case "checkIdentify":
      try {
        const { actualized, status } = await getKsrApiIssue(currentId);
        if (actualized && status === "identityVerification") {
          return checkIdentify(currentId);
        }
        return `У заявки ${currentId} статус не identityVerification`;
      } catch (e) {
        throw e;
      }
    case "confirm":
      return confirmationRequests(currentId);
    case "backFromLk":
      return await backFromLk(currentId);
    case "info":
      try {
        return JSON.stringify(await getKsrApiIssue(currentId), null, 2);
      } catch (e) {
        if (fs.existsSync(lastFilePath)) fs.unlinkSync(lastFilePath);
        return `Сброшена последняя заявка ${currentId}`;
      }
    case "list":
      return await getKsrApiList();
    case "clear":
      return await clear();
    case "signmhd":
      return await addSignFileByTestSignature();
    case "sign":
      return await signByCryptoApi(currentId);
    case "sendRequest":
      const { actualized, status } = await getKsrApiIssue(currentId);
      if (actualized && status === "approved") {
        return await sendKcrRequest(currentId);
      }
      return `У заявки ${currentId} статус не approved`;
    case "set":
      if (process.argv[3]) fs.writeFileSync(lastFilePath, process.argv[3]);
      else return "Нет guid";
      return `Установлен заявка ${process.argv[3]}`;
  }
};

main().then(console.log).catch(console.error);

// https://kcr.kontur.ru/number/8057034/issues?tab=inProgress
// https://itest.kontur-ca.ru/Wizard/Run?formId=2de5fe8a-85fe-4a2b-9cab-1494453de935
// http://46.17.202.75:5555/api/testsms?phone=79122694997
