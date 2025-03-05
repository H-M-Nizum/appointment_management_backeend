import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { TvConfigServices } from './tvConfig.service';
import { Request, Response } from 'express';

const createOrUpdateTvConfig = catchAsync(async (req: Request, res: Response) => {
  await TvConfigServices.createOrUpdateTvConfigIntoDB(req.body);

  // Send response back to the client
  sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'TvConfig created successfully',
      data: null,
  });
});

const getTvConfig = catchAsync(async (req: Request, res: Response) => {
    const result = await TvConfigServices.getTvConfigFromDB();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Get TvConfig successfully',
      data: result,
    });
  });

 

export const TvConfigController = {
   createOrUpdateTvConfig,
   getTvConfig
};