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


// api to get a user by id

const getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const result = await userService.getUserByIdDB(id as string);

 
            if((await result).rows.length === 0){
                return res.status(500).json({ message: "NO data found", data: []})
            }

            return res.status(200).json({ message: "Data fetched successfully", data: (await result).rows[0]})
    }catch (error: any) {
        return res.status(500).json({ message: error.message, data: error})
    }
};


// api to update a user by id

const updateUserById = async(req: Request, res: Response) => {
    const {id} = req.params;
    // const {name, password, age} = req.body;

    try{
        const result = await userService.updateUserByIdDB(req.body, id as string)
            if(result.rowCount === 0){
                return res.status(404).json({ message: "NO data found", data: []})
            }
            return res.status(200).json({ message: "Data updated successfully", data : result.rows[0]})
    } catch (error: any) {
        return res.status(500).json({ message: error.message, data: error} )
    }
};



// api to delete a user by id

const deleteUserById = async(req: Request, res: Response) => {
    const {id} = req.params;

    try{
        const result = await userService.deleteUserByIdDB(id as string);

            if((await result).rowCount === 0) {
                return res.status(404).json({ message: "No Data found", data: []})
            }

            return res.status(200).json({ message: "Data deleted successfully", data: []})

    }catch (error: any){
        return res.status(500).json({ message: error.message, data: error})
    }
} 


export const userController = {
    createUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
};
