import { NewsConfigModel } from "../newsConfig/newsConfig.model";
import { SerialNumberConfigModel } from "../serialNumberConfig/serialNumberConfig.model";
import { VideoConfigModel } from "../videoConfig/videoConfig.model";

const createOrUpdateTvConfigIntoDB = async (data: any) => {
    const mobile = await SerialNumberConfigModel.findOneAndUpdate(
        {},
        { mobile: data.mobile },
        { upsert: true, new: true }
    );
    const news = await NewsConfigModel.findOneAndUpdate(
        {},
        { title: data.title },
        { upsert: true, new: true }
    );
    await VideoConfigModel.deleteMany({});
    const videos = await VideoConfigModel.insertMany(data.videos);
    return true;
};

const getTvConfigFromDB = async () => {
    const mobile = await SerialNumberConfigModel.findOne();
    const news = await NewsConfigModel.findOne();
    const videos = await VideoConfigModel.find();
    const result = {
        mobile: mobile?.mobile,
        title: news?.title,
        videos: videos.map((video) => video.url),
    }                                                                                                                                                                          
   return result;
}

export const TvConfigServices = {
    createOrUpdateTvConfigIntoDB,
    getTvConfigFromDB,
};