import fs from "fs";

export const kcrApiUrl = `${process.env["KCRURL"]}/`;
export const kcrApiKey = process.env["KCRKEY"];

export default async function getCertificate(issue) {
  const result = await fetch(
    `${kcrApiUrl}v2/issues/${issue}/download-certificate`,
    {
      method: "POST",
      headers: {
        "X-KONTUR-APIKEY": kcrApiKey,
      },
    }
  );
  if (!result.ok) {
    console.log(await result.json());
  }
  const arrayBuffer = await result.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  fs.writeFileSync("/app/test.crt", buffer);
  return buffer.toString("base64");
}
