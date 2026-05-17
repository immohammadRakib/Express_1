import { Router, type Request, type Response } from "express";
import { pool } from "../../db";
import { userController } from "./user.controller";
import auth from "../../middleware/auth";


const router = Router();

router.post('/', userController.createUser)
router.get ('/', auth(), userController.getAllUsers)
router.get ('/:id', userController.getUserById)
router.put('/:id', userController.updateUserById)
router.delete('/:id', userController.deleteUserById)

export const userRoute = router;

