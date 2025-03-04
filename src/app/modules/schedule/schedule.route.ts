import express from 'express';
import { ScheduleControllers } from './schedule.controller';

const router = express.Router();

router.post(
  '/create-config',ScheduleControllers.createSchedule
);


export const ScheduleRoutes = router;
