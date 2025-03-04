import { Schema, model } from 'mongoose';
import { TSchedule, TYearly_holiday, TGlobal_config, TOpen_close_config, TBreak_config } from './schedule.interface';

const yearlyHolidaySchema = new Schema<TYearly_holiday>({
  year: { type: Number, required: false },
  date: { type: Date, required: false },
  reason: { type: String, required: false },
});

const globalConfigSchema = new Schema<TGlobal_config>({
  duration: { type: Number, required: true },
  weekly_holiday: { type: [String], required: false },
  global_voice_text: { type: String, required: true },
});

const openCloseConfigSchema = new Schema<TOpen_close_config>({
  start_at: { type: String, required: true },
  end_at: { type: String, required: true },
  day: { type: String, required: true },
});

const breakConfigSchema = new Schema<TBreak_config>({
  start_at: { type: String, required: false },
  end_at: { type: String, required: false },
  reason: { type: String, required: false },
  voice_text: { type: String, required: false },
  day: { type: String, required: false },
});

const scheduleSchema = new Schema<TSchedule>({
  global_config: { type: globalConfigSchema, required: false},
  yearly_holiday: { type: yearlyHolidaySchema, required: false },
  open_close_config: { type: openCloseConfigSchema, required: false},
  break_config: { type: breakConfigSchema, required: false },
}, {
  toJSON: {
    virtuals: true,
  },
});

// Add any virtuals, pre-hooks, or static methods if needed

export const Schedule = model<TSchedule>('Schedule', scheduleSchema);