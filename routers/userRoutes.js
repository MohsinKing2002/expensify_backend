import { Router } from "express";
import { isAuthenticated } from "../middleware/authentication.js";
import {
  LoginUser,
  RegisterUser,
  UpdateProfile,
  deleteProfile,
} from "../controllers/userController.js";
const router = Router();

/********************************* all user routes *************************************/
router.post("/register", RegisterUser);
router.post("/login", LoginUser);

router.post("/update", isAuthenticated, UpdateProfile);
router.delete("/delete", isAuthenticated, deleteProfile);

export default router;
