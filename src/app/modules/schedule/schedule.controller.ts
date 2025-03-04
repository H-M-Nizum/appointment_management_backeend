import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ScheduleServices } from './schedule.service';


const createSchedule = catchAsync(async (req, res) => {
    // console.log(req.body)
  const result = await ScheduleServices.createScheduleIntoDB(req.body); ;
// console.log("clicked")
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Schedule created successfully',
    data: result,
  });
});






export const ScheduleControllers = {
    createSchedule,

};
