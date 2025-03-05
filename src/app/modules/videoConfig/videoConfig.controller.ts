import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { VideoConfigServices } from './videoConfig.service';
import { Request, Response } from 'express';

const createVideoConfig = catchAsync(async (req: Request, res: Response) => {
  const { url } = req.body;
  const result = await VideoConfigServices.createVideoConfigIntoDB(url);

  // Send response back to the client
  sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'VideoConfig created successfully',
      data: result,
  });
});

const getVideoConfig = catchAsync(async (req: Request, res: Response) => {
    const result = await VideoConfigServices.getVideoConfigFromDB();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Get all VideoConfigs successfully',
      data: result,
    });
  });

  const getVideoConfigById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await VideoConfigServices.getVideoConfigByIdFromDB(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Get VideoConfig by id successfully',
      data: result,
    });
  });

  const removeVideoConfig = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await VideoConfigServices.removeVideoConfigFromDB(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Deleted VideoConfig successfully',
      data: result,
    });
  });

  const UpdateVideoConfig = catchAsync(async (req: Request, res: Response) => {
    try {
      const result = await VideoConfigServices.updateVideoConfigIntoDB(req.body);

      res.status(200).json({
        success: true,
        message: 'VideoConfig updated successfully',
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: (error as Error).message || 'Failed to update VideoConfig',
      });
    }
  });

export const VideoConfigController = {
    createVideoConfig,
    getVideoConfig,
    getVideoConfigById,
    UpdateVideoConfig,
    removeVideoConfig
};