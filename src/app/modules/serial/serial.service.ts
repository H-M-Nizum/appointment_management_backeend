import { TSerial } from "./serial.interface";
import { Patient_Serial } from "./serial.model";


const createSerialIntoDB = async (payload: TSerial) => {
    const createdData = {
      ...payload,
      serial_no: Number(payload.serial_no)
    }
    const result = await Patient_Serial.create(createdData);
    return result;
}

const getSerialFromDB = async () => {
    const result = await Patient_Serial.find();
    // console.log(result)
    return result;
}

const getSerialByIdFromDB = async (id: any) => {
  const result = await Patient_Serial.findById(id);
  return result;
}

const updateWaittingSerialSequence = async (delay: any) => {
  const today = new Date();

  
  const today_Date: string = today.toISOString().split('T')[0];
  console.log("dealyyyyyyy", delay, today_Date);
  const pendingSerials = await Patient_Serial.find({ serial: "Pending", date: today_Date })
    .sort({ sequence: 1 })
    .limit(delay);
  
    
  
  if (!pendingSerials.length) {
    return null;
  }
  

  let sequence: Number = -10000;

  for (const serial of pendingSerials) {
    sequence = serial.sequence;
    
    await Patient_Serial.updateOne({ _id: serial._id }, { $inc: { sequence: -1 } });
  }
  return sequence;
}

const updateSerialByIdIntoDB = async (id: any, updateFields: any) => {
    try {
      const result = await Patient_Serial.findByIdAndUpdate(
        id,
        { $set: updateFields },
        { new: true }
      );
  
      if (!result) {
        throw new Error("Serial not found");
      }
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message || "Failed to update serial");
      } else {
        throw new Error("Failed to update serial");
      }
    }
  };
  
  
  export const SerialServices = {
    createSerialIntoDB,
    getSerialByIdFromDB,
    getSerialFromDB,
    updateSerialByIdIntoDB,
    updateWaittingSerialSequence,
  };