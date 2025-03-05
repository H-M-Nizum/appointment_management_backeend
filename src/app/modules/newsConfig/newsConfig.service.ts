import { NewsConfigModel } from "./newsConfig.model";

const createNewsConfigIntoDB = async (title: any) => {
    const NewsConfig = new NewsConfigModel({title: title});
    const data = await NewsConfig.save();
    return data;
};

const getNewsConfigFromDB = async () => {
    const result = await NewsConfigModel.find();
    return result;
}

const getNewsConfigByIdFromDB = async (id: string) => {
    const result = await NewsConfigModel.findById(id);
    return result;
}

const updateNewsConfigIntoDB = async (updatedData: any) => {
    const {id, title} = updatedData;
    const data = await NewsConfigModel.findByIdAndUpdate(id, { title: title } , { 
        new: true,
        runValidators: true
    });
    return data;
};

const removeNewsConfigFromDB = async (id: string) => {
    const result = await NewsConfigModel.findByIdAndDelete(id);
    return result;
}

export const NewsConfigServices = {
    createNewsConfigIntoDB,
    getNewsConfigFromDB,
    getNewsConfigByIdFromDB,
    updateNewsConfigIntoDB,
    removeNewsConfigFromDB
};