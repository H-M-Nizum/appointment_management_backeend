import { model, Schema } from 'mongoose';
import { TSerial } from './serial.interface';
import { boolean } from 'zod';

const SerialSchema = new Schema<TSerial>(
  {
    serial_no: {
      type: Number,
      required: true,
    },
    day: {
      type: String,
      required: true,
    },
    time: {   
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    age: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
      default: () => new Date().toISOString().split('T')[0],
    },
    serial: {
      type: String,
      required: true,
      default: 'Pending',
    },
    sequence: {
      type: Number,
      required: true,
    },
    isPreviousPatient:{
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      required: true,
      default: "normal",
    },
  },
  {
    timestamps: true,
  },
);


export const Patient_Serial = model<TSerial>('Patient_Serial', SerialSchema);
