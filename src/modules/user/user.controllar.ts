import type { Request, Response } from "express";
import { pool } from "../../db";
import { userService } from "./user.service";

// api to create a new user
const createUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.userIntoDB(req.body);
    // console.log(result);
    return res
      .status(200)
      .json({ message: "Data received successfully", data: result.rows[0] });
  } catch (error: any) {
   return res
      .status(500)
      .json({ message: error.message, data: error });
  }
};

// api to get all users

const getAllUsers = async (req: Request, res: Response) => {
       try {
        const result = await userService.getAllUsersDB()
            return res.status(200).json({ message: "DATA fetched successfully", data: result.rows })
       }catch(error: any){
        return res.status(500).json({ message: error.message, data: error})
       }
}




export const userController = {
    createUser,
    getAllUsers,
};