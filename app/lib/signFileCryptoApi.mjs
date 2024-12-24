import getCertificate from "./getCertificate.mjs";

export const cryptoApiUrl = `${process.env["CRYPTOURL"]}/`;
export const cryptoApiKey = process.env["CRYPTOKEY"];

const checkError = async (response) => {
  const errorResult = await response.text();
  if (errorResult.startsWith("Внутренняя ошибка.")) {
    const errorGuid = errorResult.split(" ")[3];
    return ["500", errorGuid.replaceAll(".", "")];
  } else if (
    errorResult.startsWith("У вас есть другая неподтверждённая операция")
  ) {
    return ["has open", "У вас есть другая неподтверждённая операция"];
  }
  return [false, errorResult];
};

export default async function signByCryptoApi(issue) {
  if (!issue) throw new Error(`Нет id`);
  console.log(`Создаёт файл на подпись ${issue}`);
  const buff = Buffer.from(
    `Тестовый файл на подпись\nК заявке ${issue}`,
    "utf8"
  );
  const CertificateBase64 = await getCertificate(issue);
  if (CertificateBase64) {
    const data = {
      CertificateBase64,
      SerializedFiles: [
        {
          Id: issue,
          FileName: "Тестовый_файл.txt",
          ContentBase64: buff.toString("base64"),
        },
      ],
      SignType: "2",
      DisableServerSign: "true",
    };
    const result = await fetch(`${cryptoApiUrl}v3/Sign`, {
      method: "POST",
      headers: {
        "X-KONTUR-APIKEY": cryptoApiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const [apiError, payload] = await checkError(result);
    if (apiError) {
      throw new Error(payload);
    } else {
      const load = JSON.parse(payload);
      console.log(`Создан документ на подписание ${load.OperationId}`);
      return load;
    }
  }
}
