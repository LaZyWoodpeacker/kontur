import fs from "fs";
import kcrRequest from "./kcrRequest.mjs";

export default async function uploadFile(issue, documentType, filePath) {
  const rs = fs.createReadStream(filePath);
  const response = await kcrRequest(
    `v2/issues/${issue}/documents/${documentType}/pages`,
    "POST",
    rs,
    { duplex: "half" }
  );
  console.log(`Добавлен скан ${documentType}`);
  return response;
}
