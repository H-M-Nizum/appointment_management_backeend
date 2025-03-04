import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { OpenCloseConfigServices } from "./openCloseConfig.service";

const createOpenCloseConfig = catchAsync(async (req, res) => {
    
    const result = await OpenCloseConfigServices.createOpenCloseConfigIntoDB(req.body)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'OpenCloseConfig is created successfully',
      data: result,
    });
  });

const getOpenCloseConfig = catchAsync(async (req, res) => {
  
    const result = await OpenCloseConfigServices.getOpenCloseConfigFromDB();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'OpenCloseConfig retrieved successfully',
      data: result,
    });
  });
  

  export const OpenCloseConfigController = {
    createOpenCloseConfig,
    getOpenCloseConfig,
    
  }
