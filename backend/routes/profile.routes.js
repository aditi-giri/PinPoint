import { createProfile, deleteProfile, editProfile, getAllProfiles, getProfileById } from "../controllers/profile.controller.js";
import { verifyAdmin } from "../middleware/auth.middleware.js";
import { Router } from "express";

const router = Router();

router.route("/createprofile").post(verifyAdmin, createProfile);
router.route("/getallprofiles").get(getAllProfiles);
router.route("/getprofile/:profileId").get(getProfileById);
router.route("/editprofile/:profileId").put(verifyAdmin, editProfile);
router.route("/deleteprofile/:profileId").delete(verifyAdmin, deleteProfile);

export default router;