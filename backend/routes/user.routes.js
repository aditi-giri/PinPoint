import { Router } from "express";
import {
  createUser,
  userLogin,
  getUserProfiles,
  assignProfileToUser,
  getAllUsers,
  removePropertyFromUser,
} from "../controllers/user.controller.js";

import { verifyAdmin } from "../middleware/auth.middleware.js";
import { verifyUser } from "../middleware/userAuth.middleware.js";

const router = Router();

router.post("/user/create", verifyAdmin, createUser);
router.post("/user/login", userLogin);
router.get("/user/profiles", verifyUser, getUserProfiles);
router.put("/user/assignProfile", verifyAdmin, assignProfileToUser);
router.get("/user/all", verifyAdmin, getAllUsers);
router.put("/user/removeProperty", verifyAdmin, removePropertyFromUser);



export default router;
