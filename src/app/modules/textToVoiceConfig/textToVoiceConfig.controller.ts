import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { TextToVoiceConfigServices } from './textToVoiceConfig.service';

const createTextToVoiceConfig = catchAsync(async (req: any, res: any) => {
    const result = await TextToVoiceConfigServices.createTextToVoiceConfigIntoDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Text to voice created successfully',
        data: result,
    });
});

const getTextToVoiceConfig = catchAsync(async (req: any, res: any) => {
    const result = await TextToVoiceConfigServices.getTextToVoiceConfigFromDB();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Get all text to voice data successfully',
      data: result,
    });
  });

  const getTextToVoiceConfigById = catchAsync(async (req: any, res: any) => {
    const { id } = req.params;
    const result = await TextToVoiceConfigServices.getTextToVoiceConfigByIdFromDB(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Get text to voice by id successfully',
      data: result,
    });
  });

  const removeTextToVoiceByIdConfig = catchAsync(async (req: any, res: any) => {
    const { id } = req.params;
    const result = await TextToVoiceConfigServices.removeTextToVoiceConfigFromDB(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Deleted text to voice successfully',
      data: result,
    });
  });

export const TextToVoiceConfigController = {
    createTextToVoiceConfig,
    getTextToVoiceConfig,
    getTextToVoiceConfigById,
    removeTextToVoiceByIdConfig
};