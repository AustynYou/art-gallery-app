import { Router } from "express";

import {
  postUsers,
  postUsersToken,
  getUsersMyInfo,
  patchUsersMyProfileImage,
  putUsersMyInfo,
  // deleteUsersMyInfo
} from "../controllers/users.js";

const router = Router();

router.post("/", postUsers);
// createUser -> POST /users -> postUsers
router.post("/token", postUsersToken);
// getToken ->   POST /users/token -> postUsersToken
router.get("/my", getUsersMyInfo);
// getMyInfo ->  GET  /users/my -> getUsersMyInfo
router.patch("/my/profile-image", patchUsersMyProfileImage);
// patchMyProfileImage -> PATCH /users/my/profile-image -> patchUsersMyProfileImage
router.put("/my", putUsersMyInfo);
// putMyInfo ->  PUT  /users/my -> putUsersMyInfo
// router.delete("/my", deleteUsersMyInfo);
export default router;
