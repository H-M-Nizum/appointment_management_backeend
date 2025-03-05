import { Router } from "express";
import { AnnouncementController } from "./announcement.controller";


const router = Router();

router.post("/create-announcement",AnnouncementController.createAnnouncement);
router.get("/get-announcement",AnnouncementController.getAnnouncement);
router.get("/get-announcement/:id",AnnouncementController.getAnnouncementById);
router.delete("/remove-announcement/:id",AnnouncementController.removeAnnouncement);

export const AnnouncementRoutes = router;