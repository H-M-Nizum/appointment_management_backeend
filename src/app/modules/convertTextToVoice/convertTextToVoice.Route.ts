import { Router } from "express";
import { NewsConfigController } from "./convertTextToVoice.Controllar";



const router = Router();

router.post("/test",NewsConfigController.normalText);

export const ConvertTextToVoice = router;