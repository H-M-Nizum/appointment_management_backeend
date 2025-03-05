// import { TextToSpeechClient } from '@google-cloud/text-to-speech';
// import fs from 'fs';
// import path from 'path';

// const client = new TextToSpeechClient();

// export const synthesizeSpeech = async (text: string): Promise<string> => {
//     if (!text.trim()) {
//         throw new Error('Text cannot be empty');
//     }

//     const request = {
//         input: { text },
//         voice: { languageCode: 'bn-IN', ssmlGender: 'FEMALE' },
//         audioConfig: { audioEncoding: 'MP3' },
//     };

//     try {
//         const [response] = await client.synthesizeSpeech(request);

//         if (!response.audioContent) {
//             throw new Error('No audio content received from Google TTS');
//         }

//         const audioDir = path.join(__dirname, '../audio');
//         if (!fs.existsSync(audioDir)) {
//             fs.mkdirSync(audioDir, { recursive: true });
//         }

//         const audioPath = path.join(audioDir, 'output.mp3');
//         fs.writeFileSync(audioPath, response.audioContent, 'binary');

//         return audioPath; 
//     } catch (error) {
//         console.error('Error synthesizing speech:', error);
//         throw new Error('Error synthesizing speech');
//     }
// };
