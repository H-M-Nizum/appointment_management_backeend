import { all_days } from "../../utils/AllDays";
import { call_all_function_to_generate_time_slot, create_open_close_data, update_open_close_data } from "../../utils/util";
import GlobalConfigModel from "../global_config/global.model";
import { SerialTimeSlotModel } from "../serialTimeSlot/serialTimeSlot.model";
import { OpenCloseConfigModel } from "./openCloseConfig.model";
import { OpenCloseConfigDocument } from './openCloseConfig.interface';



interface Request {
    body: {
        status: boolean;
        day: string;
        [key: string]: string | boolean | number;
    };
    query: {
        [key: string]: string | boolean | number | undefined;
    };
}



const createOpenCloseConfigIntoDB = async (requestData: any): Promise<{ result: string }> => {
    const autoCreate = requestData.status;
    if (autoCreate) {
       
        for (const day of all_days) {
            const existingRecord = await OpenCloseConfigModel.findOne({ day: day });
            const existingGlobalRecord = await GlobalConfigModel.findOne({});
          

           
            if (existingGlobalRecord) {
                if (existingRecord) {
                    await update_open_close_data(day, requestData, !existingGlobalRecord.weekly_holiday.includes(day));
                } else {
                    await create_open_close_data(day, { start_at: requestData.start_at, end_at: requestData.end_at }, !existingGlobalRecord.weekly_holiday.includes(day));
                }
            } else {
                if (existingRecord) {
                    await update_open_close_data(day, requestData, true);
                } else {
                    await create_open_close_data(day, { start_at: requestData.start_at, end_at: requestData.end_at }, true);
                }
            }
        }

        await SerialTimeSlotModel.deleteMany({});
        await call_all_function_to_generate_time_slot();
        return { result: 'Success' };
    } else {
        const existingGlobalRecord = await GlobalConfigModel.findOne({});
     

        const existingRecord = await OpenCloseConfigModel.findOne({ day: requestData.day });

        if (existingGlobalRecord) {
            if (existingRecord) {
                await update_open_close_data(requestData.day, requestData, !existingGlobalRecord.weekly_holiday.includes(requestData.day));
            } else {
                await create_open_close_data(requestData.day, { start_at: requestData.start_at, end_at: requestData.end_at }, !existingGlobalRecord.weekly_holiday.includes(requestData.day));
            }
        } else {
            if (existingRecord) {
                await update_open_close_data(requestData.day, requestData, true);
            } else {
                await create_open_close_data(requestData.day, { start_at: requestData.start_at, end_at: requestData.end_at }, true);
            }
        }

        await SerialTimeSlotModel.deleteMany({});
        await call_all_function_to_generate_time_slot();
        return { result: 'Success' };
    }
};




// Removed unused GetOpenCloseConfigResponse interface

const getOpenCloseConfigFromDB = async (): Promise<OpenCloseConfigDocument[]> => {
    try {
        const openCloseConfig = await OpenCloseConfigModel.find({}, '-_id -__v');
        return openCloseConfig;
    } catch (error) {
        throw new Error('Error fetching OpenCloseConfig from DB');
    }
};
  
export const OpenCloseConfigServices = {
    createOpenCloseConfigIntoDB,
    getOpenCloseConfigFromDB,
}