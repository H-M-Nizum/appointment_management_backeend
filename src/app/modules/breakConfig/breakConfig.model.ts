import { model, Schema } from "mongoose";
import { IBreakConfigModel } from "./breakConfig.interface";

interface IBreakConfigModelDocument extends IBreakConfigModel, Document {}
const BreakConfigModelSchema = new Schema<IBreakConfigModelDocument>({
    start_at: { type: String, required: true },
    end_At: { type: String, required: true },
    day: { type: String, required: true },
    reason: { type: String, required: true },
    voice_text: { type: String, required: true }
});
export const BreakConfigModel = model<IBreakConfigModelDocument>('BreakConfigModel', BreakConfigModelSchema);
