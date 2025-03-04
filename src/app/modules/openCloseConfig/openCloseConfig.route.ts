import { Router } from "express";
import { OpenCloseConfigController } from "./openCloseConfig.controller";



const router = Router();

router.post("/create-openClose",OpenCloseConfigController.createOpenCloseConfig);
router.get("/get-openClose",OpenCloseConfigController.getOpenCloseConfig);

export const OpenCloseRoutes  =router;