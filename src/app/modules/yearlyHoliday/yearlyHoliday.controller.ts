import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { YearlyHolidayServices } from "./yearlyHoliday.service";

const createYearlyHoliday = catchAsync(async (req, res) => {
  
    const result = await YearlyHolidayServices.createYearlyHolidayIntoDB(
      req.body
    );
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'YearlyHoliday is created succesfully',
      data: result,
    });
  });

  export const YearlyHolidayController = {
    createYearlyHoliday,

  }