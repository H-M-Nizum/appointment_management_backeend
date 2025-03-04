import { Router } from "express";
import { BreakConfigController } from "./breakConfig.controller";


const router = Router();

router.post("/create-break",BreakConfigController.createBreakConfig)

export const BreakConfigRoutes = router;