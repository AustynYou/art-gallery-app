import { Router } from "express";
import { getPostsMain, postPosts, putPosts, deletePosts } from "../controllers/posts.js";

const router = Router();

router.get("/main", getPostsMain);
router.post("/", postPosts);
// router.get("/my/:postId", getPostsMyPost)
router.put("/", putPosts)
router.delete("/", deletePosts)

export default router;
