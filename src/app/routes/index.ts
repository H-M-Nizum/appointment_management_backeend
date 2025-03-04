import { Router } from 'express';
import { AuthRoutes } from '../modules/Auth/auth.route';

import { ScheduleRoutes } from '../modules/schedule/schedule.route';
import { SerialRoutes } from '../modules/serial/serial.route';
import { GlobalRoutes } from '../modules/global_config/global.route';
import { YearlyHolidayRoutes } from '../modules/yearlyHoliday/yearlyHoliday.route';
import { OpenCloseRoutes } from '../modules/openCloseConfig/openCloseConfig.route';
import { BreakConfigRoutes } from '../modules/breakConfig/breakConfig.route';
import { TimeSlotRoutes } from '../modules/serialTimeSlot/serialTimeSlot.route';
import { TextToVoiceConfigRoutes } from '../modules/textToVoiceConfig/textToVoiceConfig.route';
import { AnnouncementRoutes } from '../modules/announcement/announcement.route';
import { NewsConfigRoutes } from '../modules/newsConfig/newsConfig.route';
import { VideoConfigRoutes } from '../modules/videoConfig/videoConfig.route';
import { SerialNumberConfigRoutes } from '../modules/serialNumberConfig/serialNumberConfig.route';
import { TvConfigRoutes } from '../modules/tvConfig/tvConfig.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/schedule',
    route:ScheduleRoutes,
  },
  {
    path: '/serial',
    route:SerialRoutes,
  },
  {
    path:"/global",
    route: GlobalRoutes
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  
  {
    path: '/holiday',
    route: YearlyHolidayRoutes,
  },
  {
    path: '/openClose',
    route: OpenCloseRoutes,
  },
  {
    path: '/break',
    route: BreakConfigRoutes,
  },
  {
    path: '/timeSlot',
    route: TimeSlotRoutes,
  },
  {
    path: '/textToVoiceConfig',
    route: TextToVoiceConfigRoutes,
  },
  {
    path: '/announcement',
    route: AnnouncementRoutes,
  },
  {
    path: '/newsConfig',
    route: NewsConfigRoutes,
  },
  {
    path: '/videoConfig',
    route: VideoConfigRoutes,
  },
  {
    path: '/serialNumberConfig',
    route: SerialNumberConfigRoutes,
  },
  {
    path: '/tvConfig',
    route: TvConfigRoutes,
  }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
