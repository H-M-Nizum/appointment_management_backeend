/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status';
import config from '../../config';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';
import { Request, Response } from 'express';

const registerUser = catchAsync(async(req:Request,res:Response) => {
  
  const result = await AuthServices.registerUserIntoDB(req.body);

  sendResponse(res,{
      success:true,
      statusCode:httpStatus.CREATED,
      message:"User registered successfully",
      data:result
  })
})

const loginUser = catchAsync(async (req, res) => {
  // console.log(req.body)
  const result = await AuthServices.loginUser(req.body);
  const { refreshToken, accessToken } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  });
  // console.log(result)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is logged in succesfully!',
    data: {
      accessToken,
    }
  });
  // sendResponse(res, {
  //   statusCode: httpStatus.OK,
  //   success: true,
  //   message: 'User is logged in succesfully!',
  //   data: {
  //     accessToken,
  //     needsPasswordChange,
  //   },
  // });
});

// const changePassword = catchAsync(async (req, res) => {
//   const { ...passwordData } = req.body;

//   const result = await AuthServices.changePassword(req.user, passwordData);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Password is updated succesfully!',
//     data: result,
//   });
// });

// const refreshToken = catchAsync(async (req, res) => {
//   const { refreshToken } = req.cookies;
//   const result = await AuthServices.refreshToken(refreshToken);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Access token is retrieved succesfully!',
//     data: result,
//   });
// });

// const forgetPassword = catchAsync(async (req, res) => {
//   const userId = req.body.id;
//   const result = await AuthServices.forgetPassword(userId);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Reset link is generated succesfully!',
//     data: result,
//   });
// });

// const resetPassword = catchAsync(async (req, res) => {
//   const token = req.headers.authorization;

//   const result = await AuthServices.resetPassword(req.body, token as string);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Password reset succesful!',
//     data: result,
//   });
// });

export const AuthControllers = {
  loginUser,
  // changePassword,
  // refreshToken,
  // forgetPassword,
  // resetPassword,
  registerUser,

};
