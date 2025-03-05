import { Request, Response } from 'express';
import { spawn } from 'child_process';
import path from 'path'; 

export const synthesizeTextToSpeech = (req: Request, res: Response) => {
    const text = req.body.text;

    
    if (!text) {
        return res.status(400).json({ error: 'No text provided!' });
    }

    const pythonProcess = spawn('python', [path.join(__dirname, 'textToVoice.py'), text]);


    let audioData: Buffer[] = [];

    pythonProcess.stdout.on('data', (data) => {
        audioData.push(data);
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`Error: ${data}`);
        return res.status(500).json({ error: 'Error occurred during speech synthesis' });
    });

    pythonProcess.on('close', (code) => {
        if (code === 0) {
            const audioBuffer = Buffer.concat(audioData);
            res.setHeader('Content-Type', 'audio/mp3');
            res.setHeader('Content-Disposition', 'attachment; filename="speech.mp3"');
            res.send(audioBuffer);
        } else {
            return res.status(500).json({ error: `Python script exited with code ${code}` });
        }
    });
};
