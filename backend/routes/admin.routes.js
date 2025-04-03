import { Router } from "express";
import { adminLogin } from "../controllers/admin.controller.js";
import { verifyAdmin } from "../middleware/auth.middleware.js";


const router = Router();

router.route("/adminlogin").post( adminLogin);

export default router;