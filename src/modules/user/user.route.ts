import { Router, type Request, type Response } from "express";
import { pool } from "../../db";
import { userController } from "./user.controllar";


const router = Router();

router.post('/', userController.createUser)

export const userRoute = router;

