import { Router } from "express";

import {
  postUsers,
  postUsersToken,
  getUsersMyInfo,
  patchUsersMyProfileImage,
  putUsersMyInfo,
} from "../controllers/users.js";

const router = Router();

router.post("/", postUsers);
router.post("/token", postUsersToken);
router.get("/my", getUsersMyInfo);
router.patch("/my/profile-image", patchUsersMyProfileImage);
router.put("/my", putUsersMyInfo);

export default router;
