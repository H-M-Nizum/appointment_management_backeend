import { Router } from "express";
import { SerialNumberConfigController } from "./serialNumberConfig.controller";


const router = Router();

router.post("/create-serialNumberConfig",SerialNumberConfigController.createSerialNumberConfig);
router.get("/get-serialNumberConfig",SerialNumberConfigController.getSerialNumberConfig);
router.get("/get-serialNumberConfig/:id",SerialNumberConfigController.getSerialNumberConfigById);
router.put("/update-serialNumberConfig",SerialNumberConfigController.UpdateSerialNumberConfig);
router.delete("/remove-serialNumberConfig/:id",SerialNumberConfigController.removeSerialNumberConfig);

export const SerialNumberConfigRoutes = router;