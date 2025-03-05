import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { NewsConfigServices } from './newsConfig.service';
import { Request, Response } from 'express';

const createNewsConfig = catchAsync(async (req: Request, res: Response) => {
  const { title } = req.body;
  const result = await NewsConfigServices.createNewsConfigIntoDB(title);

  // Send response back to the client
  sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'NewsConfig created successfully',
      data: result,
  });
});

const getNewsConfig = catchAsync(async (req: Request, res: Response) => {
    const result = await NewsConfigServices.getNewsConfigFromDB();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Get all NewsConfigs successfully',
      data: result,
    });
  });

  const getNewsConfigById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await NewsConfigServices.getNewsConfigByIdFromDB(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Get NewsConfig by id successfully',
      data: result,
    });
  });

  const removeNewsConfig = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await NewsConfigServices.removeNewsConfigFromDB(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Deleted NewsConfig successfully',
      data: result,
    });
  });

  const UpdateNewsConfig = catchAsync(async (req: Request, res: Response) => {
    try {
      const result = await NewsConfigServices.updateNewsConfigIntoDB(req.body);

      res.status(200).json({
        success: true,
        message: 'NewsConfig updated successfully',
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: (error as Error).message || 'Failed to update NewsConfig',
      });
    }
  });

export const NewsConfigController = {
    createNewsConfig,
    getNewsConfig,
    getNewsConfigById,
    UpdateNewsConfig,
    removeNewsConfig
};