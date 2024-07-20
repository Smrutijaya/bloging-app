import express from "express";
import { getAllUsers, signup } from '../controller/user-controller.js';


const router = express.Router();

router.get("/", getAllUsers);
router.post("/signup", signup)

export default router;
