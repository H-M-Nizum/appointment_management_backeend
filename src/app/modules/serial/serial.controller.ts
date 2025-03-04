import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SerialServices } from './serial.service';
import { Request, Response } from 'express';
import { Patient_Serial } from './serial.model';

const createSerial = catchAsync(async (req, res) => {
  const { delay } = req?.body;
  let data = req?.body?.data;
  if (delay) {
    const sequence = await SerialServices.updateWaittingSerialSequence(
      parseInt(delay),
    );
    data.sequence = sequence; 
  }
  const result = await SerialServices.createSerialIntoDB(data);

  global.io.emit('newSerial', {
    message: 'New Serial created',
  });


  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Serial is created succesfully',
    data: result,
  });
});

const getSerial = async (req: Request, res: Response) => {
  let { day, date } = req.params;

  day = String(day).trim();
  date = String(date).trim();

  try {
    const result = await Patient_Serial.find({
      day: day,
      date: date,
    }).sort({ sequence: 1 });

    const serials = result.map((item) => ({
      serial_no: String(item.serial_no),
      _id: item._id,
      day: item.day,
      time: item.time,
      name: item.name,
      phone: item.phone,
      age: item.age,
      serial: item.serial,
      date: item.date,
      sequence: item.sequence,
      status: item.status,
    }));

    if (serials.length === 0) {
      return sendResponse(res, {
        statusCode: 204,
        success: false,
        message: 'No serials found for this day and date',
        data: [],
      });
    }

    return sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Serials fetched successfully',
      data: serials,
    });
  } catch (error) {
    const err = error as Error;
    return sendResponse(res, {
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: 'An error occurred while fetching the serials',
      data: err.message ?? null,
    });
  }
};

const getSerialForConsulting = async (req: Request, res: Response) => {
  let { day, date } = req.params;

  day = String(day).trim();
  date = String(date).trim();

  try {
    const result = await Patient_Serial.find({
      day: day,
      date: date,
      serial: 'Pending',
    }).sort({ sequence: 1 });

    const serials = result.map((item) => ({
      serial_no: String(item.serial_no),
      _id: item._id,
      day: item.day,
      time: item.time,
      name: item.name,
      phone: item.phone,
      age: item.age,
      serial: item.serial,
      date: item.date,
      sequence: item.sequence,
      status: item.status,
    }));

    if (serials.length === 0) {
      return sendResponse(res, {
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: 'No serials found for this day and date',
        data: [],
      });
    }

    return sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Serials fetched successfully',
      data: serials,
    });
  } catch (error) {
    const err = error as Error;
    return sendResponse(res, {
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: 'An error occurred while fetching the serials',
      data: err.message ?? null,
    });
  }
};

const UpdateSerial = catchAsync(async (req, res) => {
  try {


    const { id } = req?.params;
    const { delay, data } = req?.body;
    let updatedData = data;



    if (delay) {
     
      const sequence = await SerialServices.updateWaittingSerialSequence(
        parseInt(delay),
      );
      updatedData.sequence = sequence;
    }

   
    
    const result = await SerialServices.updateSerialByIdIntoDB(id, updatedData);


    

    res.status(200).json({
      success: true,
      message: 'Serial updated successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: (error as Error).message || 'Failed to update serial',
    });
  }
});


const getSerialByPhoneNumber = async (req: Request, res: Response)=>{
  const { phone } = req.query;

    const latestRecords = await Patient_Serial.find({ 
      phone: { $regex: `^${phone}`, $options: 'i' }  
  })
    .sort({ date: -1 })
    .limit(4);



    if(latestRecords?.length==0)
    {
    return sendResponse(res, {
      statusCode: 204,
      success: true,
      message: 'Serial Not Found!',
      data: null,
    });
  }

  return sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Serial Found Successfully!',
    data: latestRecords,
  });
  
}

export const SerialController = {
  createSerial,
  getSerial,
  getSerialForConsulting,
  UpdateSerial,
  getSerialByPhoneNumber,
};
