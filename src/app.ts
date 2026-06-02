import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { pool } from "./db";
import { userRoute } from "./modules/user/user.route";
import { profileRoute } from "./modules/profile/profile.route";
import { authRoute } from "./modules/auth/auth.route";
import logger from "./middleware/logger";

const app: Application = express();


app.use(express.json());
app.use(logger);


app.use('/api/users', userRoute);
app.use('/api/profiles', profileRoute);
app.use('/api/auth', authRoute);

// app.use('/api/users/:id', userRoute)



app.get("/", async(req: Request, res: Response) => {
    return res.status(200).json({ message: "Hello, World!", 
      container_id: process.env.HOSTNAME || "Unknown Container",
      served_by: process.env.SERVER_NAME || "Unknown Server"
     });
});




export default app;