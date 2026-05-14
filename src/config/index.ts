import dotenv from "dotenv";
import path from "path";

dotenv.config({
    path: path.resolve(process.cwd(), ".env"),
});

const config = {
    connectionString: process.env.CONNECTIONSTRING,
    port: process.env.PORT
}


export default config;