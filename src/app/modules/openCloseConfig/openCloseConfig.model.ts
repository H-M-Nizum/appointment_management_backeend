import { model, Schema } from "mongoose";
import { IOpenCloseConfigModel } from "./openCloseConfig.interface";

interface IOpenCloseConfigModelDocument extends IOpenCloseConfigModel, Document {}
const OpenCloseConfigModelSchema = new Schema<IOpenCloseConfigModelDocument>({
    start_at: { type: String, required: true },
    end_at: { type: String, required: true },
    day: { type: String, required: true },
    status: { type: Boolean, required: false }
});
export const OpenCloseConfigModel = model<IOpenCloseConfigModelDocument>('OpenCloseConfigModel', OpenCloseConfigModelSchema);
