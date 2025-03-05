import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AnnouncementServices } from './announcement.service';
import { TextToVoiceConfigServices } from '../textToVoiceConfig/textToVoiceConfig.service';
import { wss } from '../WebSocket/websocket';
import { Request, Response } from 'express';

const createAnnouncement = catchAsync(async (req: Request, res: Response) => {
  const { event, event_type, serial, name } = req.body;
  
  // Fetch configuration for text-to-voice
  const textTovoiceConfig = await TextToVoiceConfigServices.getTextToVoiceConfigByEventTypeFromDB(event_type);
  const message = textTovoiceConfig?.replace("{serial}", serial).replace("{name}", name).replace("{event}", event);
  
  // Create the announcement in the database
  const result = await AnnouncementServices.createAnnouncementIntoDB(message);


  global.io.emit("announcement", {
    message: 'New announcement created',
    data: result,
    serial: serial
  });


  // Send the announcement to all connected WebSocket clients
  
  // wss.clients.forEach((client) => {
  //     if (client.readyState === WebSocket.OPEN) {
  //         client.send(JSON.stringify({
  //             message: 'New announcement created',
  //             data: result,
  //             serial: serial

  //         }));
  //     }
  // });

  // Send response back to the client
  sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Announcement created successfully',
      data: result,
  });
});

const getAnnouncement = catchAsync(async (req: Request, res: Response) => {
    const result = await AnnouncementServices.getAnnouncementFromDB();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Get all Announcements successfully',
      data: result,
    });
  });

  const getAnnouncementById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await AnnouncementServices.getAnnouncementByIdFromDB(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Get Announcement by id successfully',
      data: result,
    });
  });

  const removeAnnouncement = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await AnnouncementServices.removeAnnouncementFromDB(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Deleted Announcement successfully',
      data: result,
    });
  });

export const AnnouncementController = {
    createAnnouncement,
    getAnnouncement,
    getAnnouncementById,
    removeAnnouncement
};
