import express from "express";
import { synthesizeTextToSpeech } from "./textToVoice.controller";

const router = express.Router();

router.post("/", synthesizeTextToSpeech);

export const TextToVoice = router;
