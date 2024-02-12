import { Router } from "express";
import { LoginUser, RegisterUser } from "../controllers/userController.js";
const router = Router();

/********************************* all user routes *************************************/
router.post("/register", RegisterUser);
router.post("/login", LoginUser);

export default router;
