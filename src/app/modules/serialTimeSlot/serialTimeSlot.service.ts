import { call_all_function_to_generate_time_slot } from "../../utils/util";


interface TimeSlotResult {
    // Define the structure of the result returned by call_all_function_to_generate_time_slot
}

const createtimeSlotIntoDB = async (): Promise<TimeSlotResult> => {
    const result: TimeSlotResult = await call_all_function_to_generate_time_slot();
    // console.log(result)
    return result;
}

export const TimeSlotServices = {
    createtimeSlotIntoDB,

}