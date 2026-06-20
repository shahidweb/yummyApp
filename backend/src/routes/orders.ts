import express from "express";
import { createOrder, getMyOrder } from "../controller/orders.ts";
import tokenValidate from "../middlerware/tokenValidate.ts";

const router = express.Router();

router.post('/place-order', tokenValidate, createOrder);
router.get('/my-orders', tokenValidate, getMyOrder);

export default router;