import { model, Schema } from "mongoose";
import { IAnnouncementModel } from "./announcement.interface";

interface IAnnouncementModelDocument extends IAnnouncementModel, Document {}
const AnnouncementModelSchema = new Schema<IAnnouncementModelDocument>({
    message: { type: String, required: true },
});
export const AnnouncementModel = model<IAnnouncementModelDocument>('Announcement', AnnouncementModelSchema);
