import { Router } from "express";
import { NewsConfigController } from "./newsConfig.controller";


const router = Router();

router.post("/create-newsConfig",NewsConfigController.createNewsConfig);
router.get("/get-newsConfig",NewsConfigController.getNewsConfig);
router.get("/get-newsConfig/:id",NewsConfigController.getNewsConfigById);
router.put("/update-newsConfig",NewsConfigController.UpdateNewsConfig);
router.delete("/remove-newsConfig/:id",NewsConfigController.removeNewsConfig);

export const NewsConfigRoutes = router;