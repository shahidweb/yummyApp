import express from "express";
import { createProduct, deleteProduct, getProducts, topSellingProduct, updateProduct } from "../controller/products.ts";
import tokenValidate from "../middlerware/tokenValidate.ts";
import isAdmin from "../middlerware/IsValidAdmin.ts";

const router = express.Router();

router.get('/', getProducts)
router.post('/', tokenValidate, isAdmin, createProduct)
router.put('/:id', tokenValidate, isAdmin, updateProduct)
router.delete('/:id', tokenValidate, isAdmin, deleteProduct)
router.get('/top-selling', tokenValidate, isAdmin, topSellingProduct)

export default router;
