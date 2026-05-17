import type { Request, Response } from "express"
import { authService } from "./auth.service"

const loginUser = async (req: Request, res: Response) => {
      try {
        const result = await authService.loginUserIntoDB(req.body)
        res.status(200).json({ success: true, message: "User logged in successfully", token: result})
      }catch(error: any){
        res.status(500).json({ message: error.message || "Internal Server Error"})
      }
}



export const authController = {
    loginUser,
}