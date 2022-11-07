import { Router } from "express";
import { getPostsMain, postPosts, putPostsMyPost, deletePostsMyPost } from "../controllers/posts.js";

const router = Router();

router.get("/main", getPostsMain);
router.post("/", postPosts);
// router.get("/my/:postId", getPostsMyPost)
router.put("/edit", putPostsMyPost)
router.delete("/", deletePostsMyPost)

export default router;
