import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { pool } from "./db";
import { userRoute } from "./modules/user/user.route";
import { profileRoute } from "./modules/profile/profile.route";
import { authRoute } from "./modules/auth/auth.route";

const app: Application = express();


app.use(express.json());

app.use('/api/users', userRoute);
app.use('/api/profiles', profileRoute);
app.use('/api/auth', authRoute);
// app.use('/api/users/:id', userRoute)



app.get("/", async(req: Request, res: Response) => {
    return res.status(200).json({ message: "Hello, World!" });
});




export default app;