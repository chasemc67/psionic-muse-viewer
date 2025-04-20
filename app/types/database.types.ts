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
          video_start_time: string | null;
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
          video_start_time?: string | null;
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
          video_start_time?: string | null;
        };
        Relationships: [];
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
        Relationships: [
          {
            foreignKeyName: 'moments_of_interest_session_id_fkey';
            columns: ['session_id'];
            isOneToOne: false;
            referencedRelation: 'eeg_sessions';
            referencedColumns: ['id'];
          },
        ];
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
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
