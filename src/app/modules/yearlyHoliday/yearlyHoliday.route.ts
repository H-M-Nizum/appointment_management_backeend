import { Router } from "express";
import { YearlyHolidayController } from "./yearlyHoliday.controller";


const router = Router();

router.post("/create-yearlyholiday",YearlyHolidayController.createYearlyHoliday)


export const YearlyHolidayRoutes = router;