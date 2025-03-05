import { model, Schema } from "mongoose";
import { INewsConfigModel } from "./newsConfig.interface";

interface INewsConfigModelDocument extends INewsConfigModel, Document {}
const NewsConfigModelSchema = new Schema<INewsConfigModelDocument>({
    title: { type: String, required: true },
});
export const NewsConfigModel = model<INewsConfigModelDocument>('NewsConfig', NewsConfigModelSchema);
