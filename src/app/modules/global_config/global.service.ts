/* eslint-disable @typescript-eslint/no-explicit-any */
import GlobalConfigModel from './global.model';
import { SerialTimeSlotModel } from '../serialTimeSlot/serialTimeSlot.model';
import { call_all_function_to_generate_time_slot, update_existing_open_close_record, update_single_open_close_record } from '../../utils/util';

const createGlobalIntoDB = async (payload:any) => {
    // console.log(payload)
    const existingRecord = await GlobalConfigModel.findOne({});
    console.log("existing",existingRecord)

    if (existingRecord) {
        const updatedData = {
            duration: payload.duration,
            weekly_holiday: payload.weekly_holiday,
            global_voice_text: payload.global_voice_text,
        };

        await GlobalConfigModel.updateOne({}, { $set: updatedData });
        const updatedRecord = await GlobalConfigModel.findOne({});
        console.log("updatedRecord", updatedRecord);
        if (updatedRecord) {
          
            await update_existing_open_close_record(true);
            
            await update_single_open_close_record(updatedRecord.weekly_holiday, false);
            
           

            // Delete then create all time Slot
            await SerialTimeSlotModel.deleteMany({});
            const data =await call_all_function_to_generate_time_slot();

            // return { message: "Record updated successfully." };
            return { message: "Record updated successfully.", data: data };
        }
    } else {
        const newRecord = new GlobalConfigModel(payload);
        const result = await newRecord.save();
        console.log("result", result);

        await update_existing_open_close_record(true);
        await update_single_open_close_record(result.weekly_holiday, false);

        // Delete all time Slot
        await SerialTimeSlotModel.deleteMany({});
        const data =call_all_function_to_generate_time_slot();
        // console.log(data)

        return data;
    }
};

const getGlobalConfigFromDB = async () => {
    const result = await GlobalConfigModel.findOne();
    console.log(result);
    return result;
}

export const GlobalServices = {
    createGlobalIntoDB,
    getGlobalConfigFromDB,
};