import type { NextFunction, Request, Response } from "express";
import fs from "fs";


const logger = (req: Request, res: Response, next: NextFunction) => {
    console.log("Method - URL - Time:", req.method, req.url, Date.now());
    const log = `\n Method: ${req.method} \n URL: ${req.url} \n Time: ${Date.now()} \n`;
    fs.appendFile('logs.txt', log, (err) => {
        console.log(err);
    })
    next();
}


export default logger;