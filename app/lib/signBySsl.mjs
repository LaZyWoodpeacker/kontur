import { spawn } from "node:child_process";
import { writeFile, readFile, unlink } from "fs/promises";

export default async function signByOpenSsl(
  buff,
  cerFile = `/app/keys/cert.crt`,
  keyFile = `/app/keys/private.key`,
  defaultType = "DER"
) {
  const inFile = `/app/file.txt`;
  const outFile = `/app/signature.der.sig`;
  let errMessage = "no message";
  try {
    await writeFile(inFile, buff);
    return new Promise((res, rej) => {
      const ssl = spawn("openssl", [
        "smime",
        "-sign",
        "-signer",
        cerFile,
        "-engine",
        "gost",
        "-inkey",
        keyFile,
        "-binary",
        "-outform",
        defaultType,
        "-in",
        inFile,
        "-out",
        outFile,
      ]);
      ssl.stderr.on("data", (data) => {
        errMessage = data.toString();
      });
      ssl.on("close", (code) => {
        if (!code) {
          res(readFile(outFile));
        } else {
          rej({
            code,
            errMessage,
            request: `openssl ${[
              "smime",
              "-sign",
              "-signer",
              cerFile,
              "-engine",
              "gost",
              "-inkey",
              keyFile,
              "-binary",
              "-outform",
              defaultType,
              "-in",
              inFile,
              "-out",
              outFile,
            ].join(" ")}`,
          });
        }
        unlink(inFile);
        // unlink(outFile);
      });
    });
  } catch (e) {
    console.log(`Ошибка при подписании файла`);
    throw e;
  }
}
