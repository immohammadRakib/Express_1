import { pool } from "../../db";
import type { Iuser } from "./user.interface";


const userIntoDB = async (payload: Iuser) => {
    const { name, email, password, age} = payload;
    const result = await pool.query(
      `
            INSERT INTO users (name, email, password, age) VALUES ($1, $2, $3, $4)
            RETURNING *
        `,
      [name, email, password, age],
    );
    return result;
};


const getAllUsersDB = async () => {
       const result = await pool.query(`
            SELECT * FROM users
            `);
       return result;
}


export const userService = {
    userIntoDB,
    getAllUsersDB,
}
