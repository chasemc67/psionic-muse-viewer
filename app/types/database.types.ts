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
          created_at: string | null;
          csv_file_path: string | null;
          id: string;
          notes: string | null;
          title: string | null;
          updated_at: string | null;
          user_id: string | null;
        };
        Insert: {
          created_at?: string | null;
          csv_file_path?: string | null;
          id?: string;
          notes?: string | null;
          title?: string | null;
          updated_at?: string | null;
          user_id?: string | null;
        };
        Update: {
          created_at?: string | null;
          csv_file_path?: string | null;
          id?: string;
          notes?: string | null;
          title?: string | null;
          updated_at?: string | null;
          user_id?: string | null;
        };
      };
      moments_of_interest: {
        Row: {
          created_at: string | null;
          id: string;
          note: string;
          session_id: string;
          timestamp: string;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          note: string;
          session_id: string;
          timestamp: string;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          note?: string;
          session_id?: string;
          timestamp?: string;
          updated_at?: string | null;
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
