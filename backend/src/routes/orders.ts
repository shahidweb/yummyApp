import express from "express";
import { createOrder, getMyOrder } from "../controller/orders.ts";
import tokenValidate from "../middlerware/tokenValidate.ts";

const router = express.Router();

router.post('/create', tokenValidate, createOrder);
router.get('/my', tokenValidate, getMyOrder);

export default router;