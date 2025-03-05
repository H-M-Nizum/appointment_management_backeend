
import catchAsync from '../../utils/catchAsync';


import { Request, Response } from 'express';

const normalText = catchAsync(async (req: Request, res: Response) => {
    res.status(200).json(`hello world`);
});

export const NewsConfigController = {
    normalText
};