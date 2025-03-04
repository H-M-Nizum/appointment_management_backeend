import { Schema, model, Document } from 'mongoose';
import { IGlobalConfigModel } from './global.interface';

interface IGlobalConfigModelDocument extends IGlobalConfigModel, Document {}

const GlobalConfigModelSchema = new Schema<IGlobalConfigModelDocument>({
    duration: { type: String, required: true },
    weekly_holiday: { type: [String], required: true },
    global_voice_text: { type: String, required: true }
});

const GlobalConfigModel = model<IGlobalConfigModelDocument>('GlobalConfigModel', GlobalConfigModelSchema);

export default GlobalConfigModel;