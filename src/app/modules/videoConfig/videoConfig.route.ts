import { Router } from "express";
import { VideoConfigController } from "./videoConfig.controller";


const router = Router();

router.post("/create-videoConfig",VideoConfigController.createVideoConfig);
router.get("/get-videoConfig",VideoConfigController.getVideoConfig);
router.get("/get-videoConfig/:id",VideoConfigController.getVideoConfigById);
router.put("/update-videoConfig",VideoConfigController.UpdateVideoConfig);
router.delete("/remove-videoConfig/:id",VideoConfigController.removeVideoConfig);

export const VideoConfigRoutes = router;