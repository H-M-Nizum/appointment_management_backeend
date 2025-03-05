import { Router } from "express";
import { TextToVoiceConfigController } from "./textToVoiceConfig.controller";


const router = Router();

router.post("/create-textToVoice",TextToVoiceConfigController.createTextToVoiceConfig);
router.get("/get-textToVoice",TextToVoiceConfigController.getTextToVoiceConfig);
router.get("/get-textToVoice/:id",TextToVoiceConfigController.getTextToVoiceConfigById);
router.delete("/remove-textToVoice/:id",TextToVoiceConfigController.removeTextToVoiceByIdConfig);

export const TextToVoiceConfigRoutes = router;