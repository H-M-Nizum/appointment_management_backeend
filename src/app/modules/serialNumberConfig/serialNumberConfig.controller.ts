import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SerialNumberConfigServices } from './serialNumberConfig.service';
import { Request, Response } from 'express';

const createSerialNumberConfig = catchAsync(async (req: Request, res: Response) => {
  const { mobile } = req.body;
  const result = await SerialNumberConfigServices.createSerialNumberConfigIntoDB(mobile);

  // Send response back to the client
  sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'SerialNumberConfig created successfully',
      data: result,
  });
});

const getSerialNumberConfig = catchAsync(async (req: Request, res: Response) => {
    const result = await SerialNumberConfigServices.getSerialNumberConfigFromDB();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Get all SerialNumberConfigs successfully',
      data: result,
    });
  });

  const getSerialNumberConfigById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await SerialNumberConfigServices.getSerialNumberConfigByIdFromDB(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Get SerialNumberConfig by id successfully',
      data: result,
    });
  });

  const removeSerialNumberConfig = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await SerialNumberConfigServices.removeSerialNumberConfigFromDB(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Deleted SerialNumberConfig successfully',
      data: result,
    });
  });

  const UpdateSerialNumberConfig = catchAsync(async (req: Request, res: Response) => {
    try {
      const result = await SerialNumberConfigServices.updateSerialNumberConfigIntoDB(req.body);

      res.status(200).json({
        success: true,
        message: 'SerialNumberConfig updated successfully',
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: (error as Error).message || 'Failed to update SerialNumberConfig',
      });
    }
  });

export const SerialNumberConfigController = {
    createSerialNumberConfig,
    getSerialNumberConfig,
    getSerialNumberConfigById,
    UpdateSerialNumberConfig,
    removeSerialNumberConfig
};