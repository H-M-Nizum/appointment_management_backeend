import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BreakConfigServices } from './breakConfig.service';

const createBreakConfig = catchAsync(async (req, res) => {
    const result = await BreakConfigServices.createBreakConfigIntoDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Break configuration created successfully',
        data: result,
    });
});

export const BreakConfigController = {
    createBreakConfig,
};