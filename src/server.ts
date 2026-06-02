import { createClient } from "redis";
import app from "./app";
import config from "./config";
import { initDB } from "./db";


export const redisClient =createClient({
   url: "redis://redis-cache:6379"
})

redisClient.on("error", (err) => console.error("Redis Client Error:", err));
redisClient.on("connect", () => console.log("Redis Connected Successfully! ⚡"));



const main = async() => {
  await initDB();
  await redisClient.connect();

  app.listen(config.port, () => {
  console.log(`server is running on port ${config.port}`);
});
}

main();