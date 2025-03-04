import { Schedule } from "./schedule.model";
import moment from "moment";

// Assuming you have a Schedule model to create schedules in the database
const createScheduleIntoDB = async (payload: any) => {
  console.log(payload);

  // Creating the schedule in the database
  const result = await Schedule.create(payload);

  // Assuming each result contains time slots, create serial data
  const serialData = [result].map((schedule: any, index: number) => {
      // Generating serial numbers based on the index (or any other logic)
      const serialNumber = `সিরিয়া-${String(index + 1).padStart(2, '0')}`;

      // Assuming schedule.time contains the time in a 12-hour format, e.g., "9:00 AM"
      const time = formatTime(schedule.time);

      return { serialNumber, time };
  });

  // Returning formatted serial data
  return {
      success: true,
      message: "Schedule created successfully",
      data: serialData
  };
};

// Helper function to format the time in the required format
const formatTime = (time: string) => {
  // Example: Convert "9:00 AM" to "সকাল ৯ টা" (Bangla format)
  const [hour, minute, period] = time.split(' ');
  let hourInBangla = convertToBanglaNumber(hour.replace(/[^\d]/g, ''));
  let minuteInBangla = convertToBanglaNumber(minute ? minute.replace(/[^\d]/g, '') : '00');

  if (period === 'AM') {
      return `সকাল ${hourInBangla}:${minuteInBangla} টা`;
  } else {
      return `বিকাল ${hourInBangla}:${minuteInBangla} টা`;
  }
};

// Helper function to convert numbers to Bangla format
const convertToBanglaNumber = (num: string) => {
  const banglaNumbers = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num.split('').map(digit => banglaNumbers[parseInt(digit)]).join('');
};

// Export the service function
export const ScheduleServices = {
  createScheduleIntoDB,
};
