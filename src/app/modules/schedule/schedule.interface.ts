

export type TYearly_holiday = {
    year: number;
    date: Date;
    reason: string;
  };
  
  export type TGlobal_config = {
    duration: number;
    weekly_holiday: string[];
    global_voice_text: string;
  };
  
  export type TOpen_close_config = {
    start_at: string;
    end_at: string;
    day: string;
  };
  
  export type TBreak_config = {
    start_at: string;
    end_at: string;
    reason: string;
    voice_text: string;
    day: string;
  };
  
  export type TSchedule = {
    global_config: TGlobal_config;
    yearly_holiday: TYearly_holiday;
    open_close_config: TOpen_close_config;
    break_config: TBreak_config;
  };
  
  
  