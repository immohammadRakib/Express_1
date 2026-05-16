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
// app.use('/api/users/:id', userRoute)



app.get("/", async(req: Request, res: Response) => {
    return res.status(200).json({ message: "Hello, World!" });
});

// api to create a new user


// api to get all users



// api to get a user by id




// api to update a user by id
 

// api to delete a user by id






export default app;