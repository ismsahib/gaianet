import path from "path";
import "./aliases";
import { fetchWithRetries, parseFile } from "./utils";
import schedule from "node-schedule";

const EVERY_TIME = "*/30 * * * *";

const fetchAIRequest = async () => {
  const idArr = parseFile(path.join(__dirname, "id.txt"));
  const questions = parseFile(path.join(__dirname, "questions.txt"));

  for (let index = 0; index < idArr.length; index++) {
    const question = questions[Math.floor(Math.random() * questions.length)];

    console.log(`${idArr[index]} - ${question}`);

    await fetchWithRetries(3, `https://${idArr[index]}.us.gaianet.network/v1/chat/completions`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: question },
        ],
      }),
    })
      .then(console.log)
      .catch(console.log);
  }
};

console.log("Run: ", new Date().toLocaleString());
fetchAIRequest();

schedule.scheduleJob(EVERY_TIME, function () {
  console.log("Run: ", new Date().toLocaleString());
  fetchAIRequest();
});
