/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { ObjectId } from 'mongodb';
// import moment from 'moment';
import { OpenCloseConfigModel } from '../modules/openCloseConfig/openCloseConfig.model';
import { BreakConfigModel } from '../modules/breakConfig/breakConfig.model';
import { SerialTimeSlotModel } from '../modules/serialTimeSlot/serialTimeSlot.model';
import GlobalConfigModel from '../modules/global_config/global.model';
import moment from 'moment';

async function update_existing_open_close_record(status: any) {
    try {
        const existing_open_close_records = await OpenCloseConfigModel.find({}).exec();
        console.log('existing_open_close_records : ', existing_open_close_records);
        if (existing_open_close_records.length > 0) {
            for (const record of existing_open_close_records) {
                const updated_data = {
                    start_at: record.start_at,
                    end_at: record.end_at,
                    status: status,
                };
                await OpenCloseConfigModel.updateOne({ day: record.day }, { $set: updated_data });
            }
        }
    } catch (error) {
        console.error('Error updating existing open close records:', error);
    }
}

async function update_single_open_close_record(record: any, status: any) {
    console.log("update_single_open_close_record record", record, status);

    try {
        for (const day of record) {
            const existing_record = await OpenCloseConfigModel.findOne({ day: day }).exec();
            console.log("update_single_open_close_record day", day);

            if (existing_record) {
                const updated_data = {
                    start_at: existing_record.start_at,
                    end_at: existing_record.end_at,
                    status: false,
                };

                console.log("update_single_open_close_record updated data", updated_data);
                console.log("before update", day, updated_data);

                // Perform the update operation
                await OpenCloseConfigModel.updateOne({ day: day }, { $set: updated_data });

                // Fetch the updated record to verify
                const newUpdateData = await OpenCloseConfigModel.findOne({ day: day }).exec();
                console.log("newUpdated open close", newUpdateData);
            }
        }
    } catch (error) {
        console.error('Error updating single open close record:', error);
    }
}


async function update_open_close_data(day: any, request_data: any, status: any) {
    try {
        const updated_data = {
            start_at: request_data.start_at,
            end_at: request_data.end_at,
            status: status,
        };
        console.log('util ---------- ', updated_data)
        await OpenCloseConfigModel.updateOne({ day: day }, { $set: updated_data });
    } catch (error) {
        console.error('Error updating open close data:', error);
    }
}

async function create_open_close_data(day: any, request_data: { start_at: any; end_at: any; }, status: any) {
    try {
        const new_record: { day: any; start_at: any; end_at: any; status: any; _id?: ObjectId } = {
            day: day,
            start_at: request_data.start_at,
            end_at: request_data.end_at,
            status: status,
        };
        const result = await OpenCloseConfigModel.insertMany([new_record]);
        new_record._id = result[0]._id;
    } catch (error) {
        console.error('Error creating open close data:', error);
    }
}

// function calculate_time_intervals(start_time: any, end_time: any, duration_minutes: any, breaks: any[]) {
//     console.log('calculate_time_intervals : ', start_time, end_time, duration_minutes)
//     const start = moment(start_time, "hh:mm A");
//     const end = moment(end_time, "hh:mm A");
//     const duration = moment.duration(duration_minutes, 'minutes');

//     console.log('calculate_time_intervals 2 : ', start, end, duration_minutes)

//     const break_intervals = breaks.map((b: moment.MomentInput[]) => [moment(b[0], "hh:mm A"), moment(b[1], "hh:mm A")]);

//     const time_intervals = [];
//     let current = start;
//     while (current.isSameOrBefore(end)) {
//         console.log('))))))))))))))))) ',current.add(duration), end )
//         const next_time = moment(current).add(duration);
//         // if (break_intervals.some(([b_start, b_end]) => next_time.isAfter(b_start) && current.isBefore(b_end))) {
//         //     current = moment.max(break_intervals.map(([b_start, b_end]) => b_end));
//         //     continue;
//         // }
//         if (next_time > end){
//             current = next_time;
//             continue
//         }
//         time_intervals.push([current.format('hh:mmA'), next_time.format('hh:mmA')]);
//         current = next_time;
//     }

//     return time_intervals;
// }
function calculate_time_intervals(start_time: any, end_time: any, duration_minutes: any, breaks: any[]) {
    console.log('calculate_time_intervals : ', start_time, end_time, duration_minutes);
    const start = moment(start_time, "hh:mm A");
    const end = moment(end_time, "hh:mm A");
    const duration = moment.duration(duration_minutes, 'minutes');

    console.log('calculate_time_intervals 2 : ', start, end, duration_minutes);

    const break_intervals = breaks.map((b: moment.MomentInput[]) => [moment(b[0], "hh:mm A"), moment(b[1], "hh:mm A")]);

    const time_intervals = [];
    let current = start.clone();
    while (current.isSameOrBefore(end)) {
        const next_time = current.clone().add(duration);

        // Check if the current time interval overlaps with any break intervals
        if (break_intervals.some(([b_start, b_end]) => next_time.isAfter(b_start) && current.isBefore(b_end))) {
            // Move the current time to the end of the overlapping break interval
            current = moment.max(break_intervals.map(([b_start, b_end]) => b_end));
            continue;
        }

        if (next_time.isAfter(end)) {
            break;
        }

        time_intervals.push([current.format('hh:mm A'), next_time.format('hh:mm A')]);
        current = next_time;
    }

    return time_intervals;
}

function calculation_input_break_time(all_break_records: any[]) {
    const input_break_records: { [key: string]: [any, any][] } = {};
    all_break_records.forEach((record: { start_at: any; end_At: any; day: any; }) => {
        const { start_at, end_At, day } = record;
        if (input_break_records[day]) {
            input_break_records[day].push([start_at, end_At]);
        } else {
            input_break_records[day] = [[start_at, end_At]];
        }
    });
    return input_break_records;
}

async function generate_time_slot(duration_time: string, input_break_records: { [x: string]: [any, any][]; }, all_open_close_records: any) {
    try {
        for (const record of all_open_close_records) {
            const { start_at, end_at, day } = record;
            const breaks = input_break_records[day] || [];
           
            const time_intervals = calculate_time_intervals(start_at, end_at, parseInt(duration_time), breaks);
            
            for (const time_interval of time_intervals) {
                const new_time_slot = {
                    start_at: time_interval[0],
                    end_At: time_interval[1],
                    day: day
                };
                await SerialTimeSlotModel.insertMany(new_time_slot);
            }
        }
        return { status: true, message: "Record created successfully." };
    } catch (error) {
        console.error('Error generating time slots:', error);
        return { status: false, message: "Error generating time slots." };
    }
}

async function call_all_function_to_generate_time_slot() {
    try {
        const all_break_records = await BreakConfigModel.find({}).exec();
        const input_break_records = calculation_input_break_time(all_break_records);

        // -------------------- Calculate Duration Time --------------------
        const all_global_records = await GlobalConfigModel.findOne({}).exec();
        const duration_time = all_global_records?.duration;

        const all_open_close_records = await OpenCloseConfigModel.find({}).exec();
        if (!duration_time) {
            throw new Error("Duration time is undefined");
        }

        const result = await generate_time_slot(duration_time, input_break_records, all_open_close_records);
        
        return result;
    } catch (error) {
        console.error('Error calling function to generate time slots:', error);
        return { status: false, message: "Error calling function to generate time slots." };
    }
}

export {
    update_existing_open_close_record,
    update_single_open_close_record,
    update_open_close_data,
    create_open_close_data,
    calculate_time_intervals,
    calculation_input_break_time,
    generate_time_slot,
    call_all_function_to_generate_time_slot
};