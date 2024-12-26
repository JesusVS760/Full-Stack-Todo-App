import express from "express";
import { register, login, logout } from "../controllers/auth.js";

//creates a router instance using Express
// use this router to handle specific routes realted to authentication
// allows you to organize your routes in a modular way
const router = express.Router();

// /api/user/login -> post req is made to this, the login is called to handle req
router.post("/login", login);

// /api/user/register
router.post("/register", register);

// /api/user/logout
router.post("/logout", logout);

export default router;
