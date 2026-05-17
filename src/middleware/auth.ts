import type { NextFunction, Request, Response } from "express"


const auth = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
    console.log("Auth middleware executed")
    next();

    const token = req.headers.authorization;

    if(!token){
        res.status(401).json({ success: false, message: "unauthorized, no token provided"})
    }
}
}


export default auth;