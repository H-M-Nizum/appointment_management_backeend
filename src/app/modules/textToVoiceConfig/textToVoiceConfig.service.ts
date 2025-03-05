import { TextToVoiceConfigModel } from './textToVoiceConfig.model';

const createTextToVoiceConfigIntoDB = async (payload: any) => {
    const event_type = payload.event_type;
    const data = TextToVoiceConfigModel.updateOne(
        { event_type },
        { $set: payload },
        { upsert: true }
      );
    return data;
};

const getTextToVoiceConfigFromDB = async () => {
    const result = await TextToVoiceConfigModel.find();
    return result;
}

const getTextToVoiceConfigByIdFromDB = async (id: string) => {
    const result = await TextToVoiceConfigModel.findById(id);
    return result;
}

const getTextToVoiceConfigByEventTypeFromDB = async (event_type: string) => {
    const result = await TextToVoiceConfigModel.findOne({ event_type: event_type });
    return result?.voice_text;
}

const removeTextToVoiceConfigFromDB = async (id: string) => {
    const result = await TextToVoiceConfigModel.findByIdAndDelete(id);
    return result;
}

export const TextToVoiceConfigServices = {
    createTextToVoiceConfigIntoDB,
    getTextToVoiceConfigFromDB,
    getTextToVoiceConfigByIdFromDB,
    getTextToVoiceConfigByEventTypeFromDB,
    removeTextToVoiceConfigFromDB
};