import type { Request, Response } from "express";
import { pool } from "../../db";


const createUser = async (req: Request, res: Response) => {
  const { name, email, password, age } = req.body;
  try {
    const result = await pool.query(
      `
            INSERT INTO users (name, email, password, age) VALUES ($1, $2, $3, $4)
            RETURNING *
        `,
      [name, email, password, age],
    );
    console.log(result);
    return res
      .status(200)
      .json({ message: "Data received successfully", data: result.rows[0] });
  } catch (error: any) {
   return res
      .status(500)
      .json({ message: error.message, data: error });
  }
};

export const userController = {
    createUser,
};