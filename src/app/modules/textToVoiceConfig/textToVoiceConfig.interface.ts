import { EventType } from "./textToVoiceConfig.constant";

export interface ITextToVoiceConfigModel {
    voice_text: string;
    event_type: EventType;
}
