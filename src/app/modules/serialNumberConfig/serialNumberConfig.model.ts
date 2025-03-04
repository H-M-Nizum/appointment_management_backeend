import { model, Schema } from "mongoose";
import { ISerialNumberConfigModel } from "./serialNumberConfig.interface";

interface ISerialNumberConfigModelDocument extends ISerialNumberConfigModel, Document {}
const SerialNumberConfigModelSchema = new Schema<ISerialNumberConfigModelDocument>({
    mobile: { type: String, required: true },
});
export const SerialNumberConfigModel = model<ISerialNumberConfigModelDocument>('SerialNumberConfig', SerialNumberConfigModelSchema);
