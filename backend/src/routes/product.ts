import express from "express";
import { createProduct, deleteProduct, getProducts, updateProduct } from "../controller/products.ts";
import tokenValidate from "../middlerware/tokenValidate.ts";

const router = express.Router();

router.get('/', getProducts)
router.post('/', tokenValidate, createProduct)
router.put('/:id', tokenValidate, updateProduct)
router.delete('/:id', tokenValidate, deleteProduct)

export default router;
