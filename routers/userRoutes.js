import { Router } from "express";
import { RegisterUser } from "../controllers/userController.js";
const router = Router();

/********************************* all user routes *************************************/
router.post("/register", RegisterUser);

export default router;
