import { model, Schema } from "mongoose";
import { ISerialTimeSlotModel } from "./serialTimeSlot.interface";

interface ISerialTimeSlotModelDocument extends ISerialTimeSlotModel, Document {}
const SerialTimeSlotModelSchema = new Schema<ISerialTimeSlotModelDocument>({
    start_at: { type: String, required: true },
    end_At: { type: String, required: true },
    day: { type: String, required: true },
    isReserved: { type: Boolean, required: false, default: false }
});
export const SerialTimeSlotModel = model<ISerialTimeSlotModelDocument>('SerialTimeSlotModel', SerialTimeSlotModelSchema);
