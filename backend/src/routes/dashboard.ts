import express from "express";
import { getDashboardSummary } from "../controller/dashboard.ts";
import isAdmin from "../middlerware/IsValidAdmin.ts";
import tokenValidate from "../middlerware/tokenValidate.ts";

const router = express.Router();

router.get('/', tokenValidate, isAdmin, getDashboardSummary);

export default router;