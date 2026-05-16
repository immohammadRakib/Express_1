import { pool } from "../../db";
import type { Iuser } from "./user.interface";
import bcrypt from "bcrypt";



// api to create a new user
const userIntoDB = async (payload: Iuser) => {
    const { name, email, password, age} = payload;
    const hashPassword = await bcrypt.hash(password, 10);


    const result = await pool.query(
      `
            INSERT INTO users (name, email, password, age) VALUES ($1, $2, $3, $4)
            RETURNING *
        `,
      [name, email, hashPassword, age],
    );
    delete result.rows[0].password;
    return result;
};



        // api to get all users
const getAllUsersDB = async () => {
       const result = await pool.query(`
            SELECT * FROM users
            `);
       return result;
}


// api to get a user by id
const getUserByIdDB = async (id: string) => {
    const result = await pool.query(`
               SELECT * FROM users WHERE id = $1
            `, [id]);
    return result;
}



// api to update a user by id
const updateUserByIdDB = async (payload: Iuser, id: string) => {
    const { name, password, age } = payload;
    const result = await pool.query(`
            UPDATE users SET name = COALESCE($1, name), password = COALESCE($2, password), age = COALESCE($3, age), updated_at = NOW() WHERE id = $4 RETURNING *
            `, [name, password, age, id]);
    return result;
}


// api to delete a user by id

const deleteUserByIdDB = async (id: string) => {
    const result = await pool.query(`
            DELETE FROM users WHERE id = $1 
            `, [id]);
        return result;    
}


export const userService = {
    userIntoDB,
    getAllUsersDB,
    getUserByIdDB,
    updateUserByIdDB,
    deleteUserByIdDB,
}
