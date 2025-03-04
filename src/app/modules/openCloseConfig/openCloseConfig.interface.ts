// File: src/openCloseConfig/openCloseConfig.interface.ts

import { Document } from 'mongoose';

export interface IOpenCloseConfigModel {
    start_at: string;
    end_at: string;
    day: string;
    status: boolean;
}

export type OpenCloseConfigDocument = IOpenCloseConfigModel & Document;
