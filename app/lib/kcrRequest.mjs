import { ReadStream } from "fs";

export const kcrApiUrl = `https://api.kontur.ru/kcr/`;
export const kcrApiKey = `ef966115-4090-3305-7f2c-63964c8b1e88`;

export default async function kcrRequest(
  url,
  method = "GET",
  body = null,
  newParams = {}
) {
  const params = {
    method,
    headers: {
      "X-KONTUR-APIKEY": kcrApiKey,
      "Content-Type":
        body instanceof ReadStream ? "image/jpeg" : "application/json",
    },
    ...newParams,
  };
  if (body && ["POST", "PUT"].includes(method))
    params.body = body instanceof ReadStream ? body : JSON.stringify(body);
  const response = await fetch(`${kcrApiUrl}${url}`, params);
  if (!response.ok) {
    if ([400, 405, 404, 415].includes(response.status)) {
      const result = await response.json();
      console.log(JSON.stringify(result, null, 2));
      throw new Error(
        `${response.status} ${result?.error?.details
          ?.map((e) => e.message)
          .join(" ")}`
      );
    }
    return new Error(
      `Unknown error on status ${response.statusText}(${response.status})`
    );
  }
  const result =
    response.headers.get("content-type") === "application/json; charset=utf-8"
      ? await response.json()
      : await response.text();
  return result ? result : response.status;
}
