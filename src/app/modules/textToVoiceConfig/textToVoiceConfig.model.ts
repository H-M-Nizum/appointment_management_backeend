import { model, Schema } from "mongoose";
import { ITextToVoiceConfigModel } from "./textToVoiceConfig.interface";
import { EventType } from "./textToVoiceConfig.constant";

interface ITextToVoiceConfigModelDocument extends ITextToVoiceConfigModel, Document {}
const TextToVoiceConfigModelSchema = new Schema<ITextToVoiceConfigModelDocument>({
    voice_text: { type: String, required: true },
    event_type: { type: String, enum: Object.values(EventType), required: true },
});
export const TextToVoiceConfigModel = model<ITextToVoiceConfigModelDocument>('TextToVoiceModel', TextToVoiceConfigModelSchema);
