/* eslint-disable @typescript-eslint/no-explicit-any */
import { SerialTimeSlotModel } from '../serialTimeSlot/serialTimeSlot.model';
import { call_all_function_to_generate_time_slot } from '../../utils/util';
import { BreakConfigModel } from './breakConfig.model';

const createBreakConfigIntoDB = async (payload: any) => {
    const breakConfig = new BreakConfigModel(payload);
    const data = await breakConfig.save();
    const newBreakConfig = await BreakConfigModel.findById(data._id);

    // Delete then create all time Slot
    await SerialTimeSlotModel.deleteMany({});
    await call_all_function_to_generate_time_slot();

    return newBreakConfig;
};

export const BreakConfigServices = {
    createBreakConfigIntoDB,
};