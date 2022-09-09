import { Router } from "express";
import { getPostsMain, postPosts } from "../controllers/posts.js";

const router = Router();

router.get("/main", getPostsMain);
router.post("/", postPosts);

export default router;
