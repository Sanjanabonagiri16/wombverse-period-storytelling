export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      analytics_events: {
        Row: {
          comment_id: string | null
          created_at: string
          event_type: string
          id: string
          ip_address: unknown | null
          metadata: Json | null
          reaction_type: string | null
          story_id: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          comment_id?: string | null
          created_at?: string
          event_type: string
          id?: string
          ip_address?: unknown | null
          metadata?: Json | null
          reaction_type?: string | null
          story_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          comment_id?: string | null
          created_at?: string
          event_type?: string
          id?: string
          ip_address?: unknown | null
          metadata?: Json | null
          reaction_type?: string | null
          story_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "analytics_events_comment_id_fkey"
            columns: ["comment_id"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "analytics_events_story_id_fkey"
            columns: ["story_id"]
            isOneToOne: false
            referencedRelation: "stories"
            referencedColumns: ["id"]
          },
        ]
      }
      blocked_entities: {
        Row: {
          blocked_by: string | null
          created_at: string
          entity_type: string
          entity_value: string
          expires_at: string | null
          id: string
          reason: string | null
        }
        Insert: {
          blocked_by?: string | null
          created_at?: string
          entity_type: string
          entity_value: string
          expires_at?: string | null
          id?: string
          reason?: string | null
        }
        Update: {
          blocked_by?: string | null
          created_at?: string
          entity_type?: string
          entity_value?: string
          expires_at?: string | null
          id?: string
          reason?: string | null
        }
        Relationships: []
      }
      bookmarks: {
        Row: {
          created_at: string
          id: string
          story_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          story_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          story_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookmarks_story_id_fkey"
            columns: ["story_id"]
            isOneToOne: false
            referencedRelation: "stories"
            referencedColumns: ["id"]
          },
        ]
      }
      collection_stories: {
        Row: {
          added_at: string
          collection_id: string
          id: string
          story_id: string
        }
        Insert: {
          added_at?: string
          collection_id: string
          id?: string
          story_id: string
        }
        Update: {
          added_at?: string
          collection_id?: string
          id?: string
          story_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "collection_stories_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "user_collections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "collection_stories_story_id_fkey"
            columns: ["story_id"]
            isOneToOne: false
            referencedRelation: "stories"
            referencedColumns: ["id"]
          },
        ]
      }
      comments: {
        Row: {
          content: string
          created_at: string
          id: string
          is_supportive: boolean
          story_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          is_supportive?: boolean
          story_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          is_supportive?: boolean
          story_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_story_id_fkey"
            columns: ["story_id"]
            isOneToOne: false
            referencedRelation: "stories"
            referencedColumns: ["id"]
          },
        ]
      }
      community_posts: {
        Row: {
          content: string
          created_at: string
          id: string
          is_active: boolean
          is_pinned: boolean
          media_url: string | null
          poll_options: Json | null
          poll_votes: Json | null
          title: string | null
          type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          is_active?: boolean
          is_pinned?: boolean
          media_url?: string | null
          poll_options?: Json | null
          poll_votes?: Json | null
          title?: string | null
          type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          is_active?: boolean
          is_pinned?: boolean
          media_url?: string | null
          poll_options?: Json | null
          poll_votes?: Json | null
          title?: string | null
          type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      content_moderation: {
        Row: {
          content_id: string
          content_type: string
          created_at: string
          flag_reason: string
          flag_type: string
          flagged_by: string | null
          id: string
          moderator_id: string | null
          moderator_notes: string | null
          status: string
          updated_at: string
        }
        Insert: {
          content_id: string
          content_type: string
          created_at?: string
          flag_reason: string
          flag_type: string
          flagged_by?: string | null
          id?: string
          moderator_id?: string | null
          moderator_notes?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          content_id?: string
          content_type?: string
          created_at?: string
          flag_reason?: string
          flag_type?: string
          flagged_by?: string | null
          id?: string
          moderator_id?: string | null
          moderator_notes?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      media_files: {
        Row: {
          created_at: string
          file_name: string
          file_size: number
          id: string
          is_processed: boolean | null
          metadata: Json | null
          mime_type: string
          storage_path: string
          user_id: string
        }
        Insert: {
          created_at?: string
          file_name: string
          file_size: number
          id?: string
          is_processed?: boolean | null
          metadata?: Json | null
          mime_type: string
          storage_path: string
          user_id: string
        }
        Update: {
          created_at?: string
          file_name?: string
          file_size?: number
          id?: string
          is_processed?: boolean | null
          metadata?: Json | null
          mime_type?: string
          storage_path?: string
          user_id?: string
        }
        Relationships: []
      }
      mood_tags: {
        Row: {
          color_hex: string | null
          created_at: string
          description: string | null
          id: string
          name: string
        }
        Insert: {
          color_hex?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          color_hex?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          display_name: string | null
          follower_count: number | null
          following_count: number | null
          id: string
          is_verified: boolean | null
          location: string | null
          privacy_settings: Json | null
          story_count: number | null
          updated_at: string
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          follower_count?: number | null
          following_count?: number | null
          id: string
          is_verified?: boolean | null
          location?: string | null
          privacy_settings?: Json | null
          story_count?: number | null
          updated_at?: string
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          follower_count?: number | null
          following_count?: number | null
          id?: string
          is_verified?: boolean | null
          location?: string | null
          privacy_settings?: Json | null
          story_count?: number | null
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      rate_limits: {
        Row: {
          action_type: string
          count: number
          created_at: string
          id: string
          ip_address: unknown | null
          user_id: string | null
          window_start: string
        }
        Insert: {
          action_type: string
          count?: number
          created_at?: string
          id?: string
          ip_address?: unknown | null
          user_id?: string | null
          window_start?: string
        }
        Update: {
          action_type?: string
          count?: number
          created_at?: string
          id?: string
          ip_address?: unknown | null
          user_id?: string | null
          window_start?: string
        }
        Relationships: []
      }
      reactions: {
        Row: {
          created_at: string
          id: string
          story_id: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          story_id: string
          type: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          story_id?: string
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reactions_story_id_fkey"
            columns: ["story_id"]
            isOneToOne: false
            referencedRelation: "stories"
            referencedColumns: ["id"]
          },
        ]
      }
      stories: {
        Row: {
          category: string
          content: string
          created_at: string
          emotion_tags: string[]
          id: string
          is_anonymous: boolean
          is_draft: boolean
          privacy: string
          title: string
          updated_at: string
          user_id: string
          view_count: number
        }
        Insert: {
          category: string
          content: string
          created_at?: string
          emotion_tags?: string[]
          id?: string
          is_anonymous?: boolean
          is_draft?: boolean
          privacy: string
          title: string
          updated_at?: string
          user_id: string
          view_count?: number
        }
        Update: {
          category?: string
          content?: string
          created_at?: string
          emotion_tags?: string[]
          id?: string
          is_anonymous?: boolean
          is_draft?: boolean
          privacy?: string
          title?: string
          updated_at?: string
          user_id?: string
          view_count?: number
        }
        Relationships: []
      }
      story_moods: {
        Row: {
          created_at: string
          id: string
          intensity: number | null
          mood_tag_id: string
          story_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          intensity?: number | null
          mood_tag_id: string
          story_id: string
        }
        Update: {
          created_at?: string
          id?: string
          intensity?: number | null
          mood_tag_id?: string
          story_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "story_moods_mood_tag_id_fkey"
            columns: ["mood_tag_id"]
            isOneToOne: false
            referencedRelation: "mood_tags"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "story_moods_story_id_fkey"
            columns: ["story_id"]
            isOneToOne: false
            referencedRelation: "stories"
            referencedColumns: ["id"]
          },
        ]
      }
      user_collections: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_public: boolean
          name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_public?: boolean
          name: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_public?: boolean
          name?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_privacy_settings: {
        Row: {
          allow_analytics: boolean | null
          allow_content_suggestions: boolean | null
          created_at: string
          data_retention_days: number | null
          deletion_request_date: string | null
          deletion_requested: boolean | null
          gdpr_consent_date: string | null
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          allow_analytics?: boolean | null
          allow_content_suggestions?: boolean | null
          created_at?: string
          data_retention_days?: number | null
          deletion_request_date?: string | null
          deletion_requested?: boolean | null
          gdpr_consent_date?: string | null
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          allow_analytics?: boolean | null
          allow_content_suggestions?: boolean | null
          created_at?: string
          data_retention_days?: number | null
          deletion_request_date?: string | null
          deletion_requested?: boolean | null
          gdpr_consent_date?: string | null
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          granted_by: string | null
          id: string
          role: string
          user_id: string
        }
        Insert: {
          created_at?: string
          granted_by?: string | null
          id?: string
          role: string
          user_id: string
        }
        Update: {
          created_at?: string
          granted_by?: string | null
          id?: string
          role?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_content_toxicity: {
        Args: { content_text: string }
        Returns: boolean
      }
      get_reaction_counts: {
        Args: { story_uuid: string }
        Returns: {
          reaction_type: string
          count: number
        }[]
      }
      get_stories_by_mood: {
        Args: { mood_names: string[] }
        Returns: {
          story_id: string
          title: string
          content: string
          mood_match_count: number
        }[]
      }
      track_analytics_event: {
        Args: {
          event_type_param: string
          user_id_param?: string
          story_id_param?: string
          comment_id_param?: string
          reaction_type_param?: string
          metadata_param?: Json
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
