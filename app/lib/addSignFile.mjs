import fs from "fs";
import signByOpenSsl from "./signBySsl.mjs";

export default async function addSignFileByTestSignature(
  fileToSign = "/app/testmhd.xml"
) {
  const buff = fs.readFileSync(fileToSign);
  const result = await signByOpenSsl(buff);
  console.log(`Файл ${fileToSign} подписан тестовым сертификатом`);
  console.log(`Файл подписи /app/signature.der.sig`);
  return "ready";
}
