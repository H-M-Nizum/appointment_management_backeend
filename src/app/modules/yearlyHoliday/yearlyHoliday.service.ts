/* eslint-disable @typescript-eslint/no-explicit-any */
import { YearlyHoliDayModel } from './yearlyHoliday.model';

const createYearlyHolidayIntoDB = async (payload:any) => {
  const newYearlyHoliday = new YearlyHoliDayModel(payload);
  const data = await YearlyHoliDayModel.insertMany(newYearlyHoliday);
  const createdYearlyHoliday = await YearlyHoliDayModel.findOne({
    _id: data[0]._id,
  });
  return createdYearlyHoliday;
};

export const YearlyHolidayServices = {
  createYearlyHolidayIntoDB,
};
