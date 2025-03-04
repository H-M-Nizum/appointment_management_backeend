import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { GlobalServices } from "./global.service";




const createGlobalConfig = catchAsync(async (req, res) => {
    
  
    const result = await GlobalServices.createGlobalIntoDB(req.body)
    // console.log(result)
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Global Config is created succesfully',
      data: result,
    });
  });

  const getGlobalConfig = catchAsync(async (req, res) => {
    
  
    const result = await GlobalServices.getGlobalConfigFromDB();
    // console.log(result)
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Get global config succesfully',
      data: result,
    });
  });

  export const GlobalController = {
    createGlobalConfig,
    getGlobalConfig,
  }