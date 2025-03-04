import { Router } from "express";
import { TimeSlotController } from "./serialTimeSlot.controller";

const router = Router();

router.post("/", TimeSlotController.createTimeSlot);
router.get("/:day", TimeSlotController.getTimeSlotByDay);
router.put("/:start_at", TimeSlotController.updateTimeSlotById);

export const TimeSlotRoutes = router;
