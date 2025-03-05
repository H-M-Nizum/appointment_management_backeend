import { AnnouncementModel } from "./announcement.model";

const createAnnouncementIntoDB = async (message: any) => {
    const Announcement = new AnnouncementModel({message: message});
    const data = await Announcement.save();
    return data;
};

const getAnnouncementFromDB = async () => {
    const result = await AnnouncementModel.find();
    return result;
}

const getAnnouncementByIdFromDB = async (id: string) => {
    const result = await AnnouncementModel.findById(id);
    return result;
}

const removeAnnouncementFromDB = async (id: string) => {
    const result = await AnnouncementModel.findByIdAndDelete(id);
    return result;
}

export const AnnouncementServices = {
    createAnnouncementIntoDB,
    getAnnouncementFromDB,
    getAnnouncementByIdFromDB,
    removeAnnouncementFromDB
};