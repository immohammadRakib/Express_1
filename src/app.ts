import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { pool } from "./db";
import { userRoute } from "./modules/user/user.route";

const app: Application = express();


app.use(express.json());

app.use('/api/users', userRoute);



app.get("/", async(req: Request, res: Response) => {
    return res.status(200).json({ message: "Hello, World!" });
});

// api to create a new user


// api to get all users



// api to get a user by id

app.get ('/api/users/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const result = await pool.query(`
               SELECT * FROM users WHERE id = $1
            `, [id]);


            if((await result).rows.length === 0){
                return res.status(500).json({ message: "NO data found", data: []})
            }

            return res.status(200).json({ message: "Data fetched successfully", data: (await result).rows[0]})
    }catch (error: any) {
        return res.status(500).json({ message: error.message, data: error})
    }
});


// api to update a user by id

app.put('/api/users/:id', async(req: Request, res: Response) => {
    const {id} = req.params;
    const {name, password, age} = req.body;

    try{
        const result = await pool.query(`
            UPDATE users SET name = COALESCE($1, name), password = COALESCE($2, password), age = COALESCE($3, age), updated_at = NOW() WHERE id = $4 RETURNING *
            `, [name,password, age, id])
            if(result.rowCount === 0){
                return res.status(404).json({ message: "NO data found", data: []})
            }
            return res.status(200).json({ message: "Data updated successfully", data : result.rows[0]})
    } catch (error: any) {
        return res.status(500).json({ message: error.message, data: error} )
    }
});

// api to delete a user by id

app.delete('/api/users/:id', async(req: Request, res: Response) => {
    const {id} = req.params;

    try{
        const result = await pool.query(`
            DELETE FROM users WHERE id = $1 
            `, [id])

            if((await result).rowCount === 0) {
                return res.status(404).json({ message: "No Data found", data: []})
            }

            return res.status(200).json({ message: "Data deleted successfully", data: []})

    }catch (error: any){
        return res.status(500).json({ message: error.message, data: error})
    }
} )




export default app;