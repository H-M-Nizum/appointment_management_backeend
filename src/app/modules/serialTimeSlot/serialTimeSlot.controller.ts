import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { TimeSlotServices } from "./serialTimeSlot.service";
import { SerialTimeSlotModel } from './serialTimeSlot.model'; 
import { Request, Response } from 'express';



const createTimeSlot = catchAsync(async (req, res) => {
    // console.log()
  
    const result = await TimeSlotServices.createtimeSlotIntoDB()
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'TimeSlot is created succesfully',
      data: result,
    });
  });

const getTimeSlotByDay = async (req: Request, res: Response) => {
    try {
      const timeSlots = await SerialTimeSlotModel.find({ day: req.params.day });
  
      if (timeSlots.length === 0) {
        return res.status(404).json({ message: `No time slots found for day: ${req.params.day}` });
      }
  
      res.status(200).json({ data: timeSlots });
    } catch (err) {
      const error = err as Error;  // Type assertion
  
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  };

  const updateTimeSlotById = async (req: Request, res: Response) => {
    try {
      const start_at = req.params.start_at;

      const timeSlots = await SerialTimeSlotModel.find({ start_at });
  
      if (timeSlots.length === 0) {
        return res.status(404).json({ message: `No time slots found with start_at: ${start_at}` });
      }
  
      const updatedTimeSlots = await SerialTimeSlotModel.updateMany(
        { start_at },
        [
          { 
            $set: { 
              isReserved: { $eq: [ "$isReserved", false ] }
            }
          }
        ]
      );
  
      res.status(200).json({
        message: 'Time slots updated successfully',
        data: updatedTimeSlots,
      });
    } catch (err) {
      const error = err as Error;
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  };
  
  

  export const TimeSlotController = {
    createTimeSlot,
    getTimeSlotByDay,
    updateTimeSlotById,
  }