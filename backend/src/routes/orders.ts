import express from "express";
import { createOrder, getAllOrders, getMyOrder, orderStatus } from "../controller/orders.ts";
import tokenValidate from "../middlerware/tokenValidate.ts";
import isAdmin from "../middlerware/IsValidAdmin.ts";

const router = express.Router();

router.post('/place-order', tokenValidate, createOrder);
router.get('/my-orders', tokenValidate, getMyOrder);
router.get('/all-orders', tokenValidate, isAdmin, getAllOrders);
router.put('/order-status/:id', tokenValidate, isAdmin, orderStatus);

export default router;