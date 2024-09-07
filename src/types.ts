export interface ThemeColors {
    backgroundColor: string;
    textColor: string;
    progressBackgroundColor: string;
    progressBarBackgroundColor: string;
    progressBarFillColor: string;
    borderColor: string;
  }
  
  export interface LeetCodeData {
    totalSolved: number;
    easySolved: number;
    mediumSolved: number;
    hardSolved: number;
    totalEasy: number;
    totalMedium: number;
    totalHard: number;
  }
  
  export interface ApiRequest {
    query: {
      username?: string;
      theme?: string;
      border?: string;
      hide_title?: string;  
      custom_title?: string; 
      animation?: string;
      animation_duration?: string;
    };
    method: string;
  }
  
  export interface ApiResponse {
    status: (code: number) => ApiResponse;
    json: (body: object) => void;
    setHeader: (name: string, value: string) => void;
    end: (buffer: Buffer) => void;
  }
  