import express from "express";
import { createProduct } from "../controller/products.ts";
import tokenValidate from "../middlerware/tokenValidate.ts";

const router = express.Router();

router.post('/', tokenValidate, createProduct)

export default router;
