import { model, Schema } from "mongoose";
import { IVideoConfigModel } from "./videoConfig.interface";

interface IVideoConfigModelDocument extends IVideoConfigModel, Document {}
const VideoConfigModelSchema = new Schema<IVideoConfigModelDocument>({
    url: { type: String, required: true },
});
export const VideoConfigModel = model<IVideoConfigModelDocument>('VideoConfig', VideoConfigModelSchema);
