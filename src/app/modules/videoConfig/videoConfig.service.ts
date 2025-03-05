import { VideoConfigModel } from "./videoConfig.model";

const createVideoConfigIntoDB = async (url: any) => {
    const VideoConfig = new VideoConfigModel({url: url});
    const data = await VideoConfig.save();
    return data;
};

const getVideoConfigFromDB = async () => {
    const result = await VideoConfigModel.find();
    return result;
}

const getVideoConfigByIdFromDB = async (id: string) => {
    const result = await VideoConfigModel.findById(id);
    return result;
}

const updateVideoConfigIntoDB = async (updatedData: any) => {
    const {id, url} = updatedData;
    const data = await VideoConfigModel.findByIdAndUpdate(id, { url: url } , { 
        new: true,
        runValidators: true
    });
    return data;
};

const removeVideoConfigFromDB = async (id: string) => {
    const result = await VideoConfigModel.findByIdAndDelete(id);
    return result;
}

export const VideoConfigServices = {
    createVideoConfigIntoDB,
    getVideoConfigFromDB,
    getVideoConfigByIdFromDB,
    updateVideoConfigIntoDB,
    removeVideoConfigFromDB
};