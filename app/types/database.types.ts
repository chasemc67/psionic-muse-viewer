export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      eeg_sessions: {
        Row: {
          id: string;
          created_at: string | null;
          updated_at: string | null;
          user_id: string | null;
          title: string | null;
          notes: string | null;
          csv_file_path: string | null;
          video_url: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string | null;
          updated_at?: string | null;
          user_id?: string | null;
          title?: string | null;
          notes?: string | null;
          csv_file_path?: string | null;
          video_url?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string | null;
          updated_at?: string | null;
          user_id?: string | null;
          title?: string | null;
          notes?: string | null;
          csv_file_path?: string | null;
          video_url?: string | null;
        };
      };
      moments_of_interest: {
        Row: {
          id: string;
          created_at: string | null;
          session_id: string;
          timestamp: number;
          notes: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string | null;
          session_id: string;
          timestamp: number;
          notes?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string | null;
          session_id?: string;
          timestamp?: number;
          notes?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
