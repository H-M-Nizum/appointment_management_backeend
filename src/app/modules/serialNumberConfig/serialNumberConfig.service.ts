import { SerialNumberConfigModel } from "./serialNumberConfig.model";

const createSerialNumberConfigIntoDB = async (mobile: any) => {
    const SerialNumberConfig = new SerialNumberConfigModel({mobile: mobile});
    const data = await SerialNumberConfig.save();
    return data;
};

const getSerialNumberConfigFromDB = async () => {
    const result = await SerialNumberConfigModel.find();
    return result;
}

const getSerialNumberConfigByIdFromDB = async (id: string) => {
    const result = await SerialNumberConfigModel.findById(id);
    return result;
}

const updateSerialNumberConfigIntoDB = async (updatedData: any) => {
    const {id, mobile} = updatedData;
    const data = await SerialNumberConfigModel.findByIdAndUpdate(id, { mobile: mobile } , { 
        new: true,
        runValidators: true
    });
    return data;
};

const removeSerialNumberConfigFromDB = async (id: string) => {
    const result = await SerialNumberConfigModel.findByIdAndDelete(id);
    return result;
}

export const SerialNumberConfigServices = {
    createSerialNumberConfigIntoDB,
    getSerialNumberConfigFromDB,
    getSerialNumberConfigByIdFromDB,
    updateSerialNumberConfigIntoDB,
    removeSerialNumberConfigFromDB
};