import { model, Schema } from "mongoose";
import { IYearlyHoliDayModel } from "./yearlyHoliday.interface";


interface IYearlyHoliDayModelDocument extends IYearlyHoliDayModel, Document {}
const YearlyHoliDayModelSchema = new Schema<IYearlyHoliDayModelDocument>({
    year: { type: String, required: true },
    date: { type: String, required: true },
    reson: { type: String, required: true }
});
export const YearlyHoliDayModel = model<IYearlyHoliDayModelDocument>('YearlyHoliDayModel', YearlyHoliDayModelSchema);
