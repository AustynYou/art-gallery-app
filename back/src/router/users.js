import { Router } from "express";

import { postUsers } from "../controllers/users.js";

const router = Router();

router.post("/", postUsers);

export default router;
