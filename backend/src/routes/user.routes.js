import { Router } from "express";
import { userRegister, loginUser, logoutUser} from "../controllers/user.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
const router = Router();

router.route("/register").post(userRegister)

router.route("/login").post(loginUser)
router.route("/logout").post(verifyJWT ,logoutUser)


export default router;