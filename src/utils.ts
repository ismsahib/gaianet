import fs from "fs";

export const fetchWithRetries = async (retryCount: number, url: string, rData: RequestInit) => {
  let count = 0;
  let lastError = "Over retries";
  while (count < retryCount) {
    try {
      count += 1;
      const resonse = await fetch(url, rData);
      if (resonse.ok) {
        return await resonse.json();
      } else {
        throw new Error(resonse.statusText);
      }
    } catch (error) {
      console.log("Retry: ", count);
      lastError = `Error: ${error}`;
      console.log(error);
    }
  }
  return Promise.reject(lastError);
};

export const parseFile = (fileName: string) =>
  fs
    .readFileSync(fileName, "utf8")
    .split("\n")
    .map((str: string) => str.trim())
    .filter((str: string) => str.length > 5);
