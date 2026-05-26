import express from "express";
import { login, me, register } from "../controller/user.ts";
import tokenValidate from "../middlerware/tokenValidate.ts";

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.get('/me', tokenValidate, me);

export default router;