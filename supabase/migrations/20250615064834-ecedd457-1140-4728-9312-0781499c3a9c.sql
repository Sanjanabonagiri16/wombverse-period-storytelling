
-- First create the user roles table and basic structure
CREATE TABLE public.user_roles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('admin', 'moderator', 'user')),
  granted_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Content moderation table for tracking flagged content
CREATE TABLE public.content_moderation (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  content_type TEXT NOT NULL CHECK (content_type IN ('story', 'comment')),
  content_id UUID NOT NULL,
  flagged_by UUID REFERENCES auth.users(id),
  flag_reason TEXT NOT NULL,
  flag_type TEXT NOT NULL CHECK (flag_type IN ('manual', 'auto_profanity', 'auto_ai', 'auto_toxic')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'removed')),
  moderator_id UUID REFERENCES auth.users(id),
  moderator_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Community wall posts table
CREATE TABLE public.community_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id),
  type TEXT NOT NULL CHECK (type IN ('poll', 'image', 'affirmation', 'text')),
  title TEXT,
  content TEXT NOT NULL,
  media_url TEXT,
  poll_options JSONB,
  poll_votes JSONB DEFAULT '{}',
  is_pinned BOOLEAN NOT NULL DEFAULT false,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Mood tags for enhanced story categorization
CREATE TABLE public.mood_tags (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  color_hex TEXT DEFAULT '#6B7280',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Story mood mappings
CREATE TABLE public.story_moods (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  story_id UUID NOT NULL REFERENCES public.stories(id) ON DELETE CASCADE,
  mood_tag_id UUID NOT NULL REFERENCES public.mood_tags(id) ON DELETE CASCADE,
  intensity INTEGER DEFAULT 1 CHECK (intensity >= 1 AND intensity <= 5),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(story_id, mood_tag_id)
);

-- Analytics tracking table
CREATE TABLE public.analytics_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id),
  story_id UUID REFERENCES public.stories(id),
  comment_id UUID REFERENCES public.comments(id),
  reaction_type TEXT,
  metadata JSONB DEFAULT '{}',
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Rate limiting table
CREATE TABLE public.rate_limits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  ip_address INET,
  action_type TEXT NOT NULL,
  count INTEGER NOT NULL DEFAULT 1,
  window_start TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, ip_address, action_type, window_start)
);

-- Blocked IPs and users
CREATE TABLE public.blocked_entities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  entity_type TEXT NOT NULL CHECK (entity_type IN ('ip', 'user')),
  entity_value TEXT NOT NULL,
  blocked_by UUID REFERENCES auth.users(id),
  reason TEXT,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(entity_type, entity_value)
);

-- User privacy settings
CREATE TABLE public.user_privacy_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) UNIQUE,
  data_retention_days INTEGER DEFAULT 365,
  allow_analytics BOOLEAN DEFAULT true,
  allow_content_suggestions BOOLEAN DEFAULT true,
  gdpr_consent_date TIMESTAMP WITH TIME ZONE,
  deletion_requested BOOLEAN DEFAULT false,
  deletion_request_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Media storage tracking
CREATE TABLE public.media_files (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id),
  file_name TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  mime_type TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  is_processed BOOLEAN DEFAULT false,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert default mood tags
INSERT INTO public.mood_tags (name, description, color_hex) VALUES
('angry', 'Feeling anger or frustration', '#EF4444'),
('sad', 'Feeling sadness or melancholy', '#3B82F6'),
('anxious', 'Feeling worry or nervousness', '#F59E0B'),
('grateful', 'Feeling thankfulness and appreciation', '#10B981'),
('empowered', 'Feeling strong and confident', '#8B5CF6'),
('calm', 'Feeling peaceful and relaxed', '#06B6D4'),
('hopeful', 'Feeling optimistic about the future', '#EC4899'),
('frustrated', 'Feeling blocked or irritated', '#F97316'),
('joyful', 'Feeling happiness and contentment', '#FDE047'),
('overwhelmed', 'Feeling stressed or burdened', '#6B7280'),
('peaceful', 'Feeling serene and tranquil', '#84CC16'),
('excited', 'Feeling enthusiastic and energetic', '#F472B6');

-- Enable RLS on all new tables
ALTER TABLE public.content_moderation ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mood_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.story_moods ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blocked_entities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_privacy_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_files ENABLE ROW LEVEL SECURITY;

-- RLS Policies for content moderation (admin/moderator access)
CREATE POLICY "Moderators can view all moderation content" 
  ON public.content_moderation FOR SELECT 
  USING (auth.uid() IN (
    SELECT user_id FROM public.user_roles WHERE role IN ('admin', 'moderator')
  ));

CREATE POLICY "Users can flag content" 
  ON public.content_moderation FOR INSERT 
  WITH CHECK (auth.uid() = flagged_by);

-- RLS Policies for community posts
CREATE POLICY "Anyone can view active community posts" 
  ON public.community_posts FOR SELECT 
  USING (is_active = true);

CREATE POLICY "Users can create community posts" 
  ON public.community_posts FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own posts" 
  ON public.community_posts FOR UPDATE 
  USING (auth.uid() = user_id);

-- RLS Policies for mood tags (public read)
CREATE POLICY "Anyone can view mood tags" 
  ON public.mood_tags FOR SELECT 
  USING (true);

-- RLS Policies for story moods
CREATE POLICY "Anyone can view story moods for public stories" 
  ON public.story_moods FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM public.stories 
    WHERE stories.id = story_moods.story_id 
    AND stories.privacy IN ('public', 'community')
    AND stories.is_draft = false
  ));

CREATE POLICY "Users can add moods to their stories" 
  ON public.story_moods FOR INSERT 
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.stories 
    WHERE stories.id = story_moods.story_id 
    AND stories.user_id = auth.uid()
  ));

-- RLS Policies for analytics (admin only)
CREATE POLICY "Admins can view analytics" 
  ON public.analytics_events FOR SELECT 
  USING (auth.uid() IN (
    SELECT user_id FROM public.user_roles WHERE role = 'admin'
  ));

-- RLS Policies for privacy settings
CREATE POLICY "Users can manage their privacy settings" 
  ON public.user_privacy_settings FOR ALL 
  USING (auth.uid() = user_id) 
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for media files
CREATE POLICY "Users can manage their media files" 
  ON public.media_files FOR ALL 
  USING (auth.uid() = user_id) 
  WITH CHECK (auth.uid() = user_id);

-- Real-time support for new tables
ALTER TABLE public.content_moderation REPLICA IDENTITY FULL;
ALTER TABLE public.community_posts REPLICA IDENTITY FULL;
ALTER TABLE public.story_moods REPLICA IDENTITY FULL;
ALTER TABLE public.analytics_events REPLICA IDENTITY FULL;

ALTER PUBLICATION supabase_realtime ADD TABLE public.content_moderation;
ALTER PUBLICATION supabase_realtime ADD TABLE public.community_posts;
ALTER PUBLICATION supabase_realtime ADD TABLE public.story_moods;
ALTER PUBLICATION supabase_realtime ADD TABLE public.analytics_events;

-- Functions for content moderation
CREATE OR REPLACE FUNCTION public.check_content_toxicity(content_text TEXT)
RETURNS BOOLEAN AS $$
DECLARE
  toxic_phrases TEXT[] := ARRAY[
    'kill yourself', 'kys', 'die', 'hate you', 'stupid', 'idiot', 
    'loser', 'worthless', 'pathetic', 'disgusting', 'freak'
  ];
  phrase TEXT;
BEGIN
  content_text := LOWER(content_text);
  
  FOREACH phrase IN ARRAY toxic_phrases
  LOOP
    IF content_text LIKE '%' || phrase || '%' THEN
      RETURN true;
    END IF;
  END LOOP;
  
  RETURN false;
END;
$$ LANGUAGE plpgsql;

-- Function to auto-flag toxic content
CREATE OR REPLACE FUNCTION public.auto_flag_toxic_content()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if content is toxic
  IF public.check_content_toxicity(NEW.content) THEN
    INSERT INTO public.content_moderation (
      content_type, 
      content_id, 
      flag_reason, 
      flag_type
    ) VALUES (
      TG_TABLE_NAME::TEXT,
      NEW.id,
      'Auto-detected toxic language',
      'auto_toxic'
    );
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for auto-moderation
CREATE TRIGGER auto_flag_story_content
  AFTER INSERT ON public.stories
  FOR EACH ROW EXECUTE FUNCTION public.auto_flag_toxic_content();

CREATE TRIGGER auto_flag_comment_content
  AFTER INSERT ON public.comments
  FOR EACH ROW EXECUTE FUNCTION public.auto_flag_toxic_content();

-- Analytics tracking function
CREATE OR REPLACE FUNCTION public.track_analytics_event(
  event_type_param TEXT,
  user_id_param UUID DEFAULT NULL,
  story_id_param UUID DEFAULT NULL,
  comment_id_param UUID DEFAULT NULL,
  reaction_type_param TEXT DEFAULT NULL,
  metadata_param JSONB DEFAULT '{}'
)
RETURNS VOID AS $$
BEGIN
  INSERT INTO public.analytics_events (
    event_type,
    user_id,
    story_id,
    comment_id,
    reaction_type,
    metadata
  ) VALUES (
    event_type_param,
    user_id_param,
    story_id_param,
    comment_id_param,
    reaction_type_param,
    metadata_param
  );
END;
$$ LANGUAGE plpgsql;

-- Function to get stories by mood
CREATE OR REPLACE FUNCTION public.get_stories_by_mood(mood_names TEXT[])
RETURNS TABLE(
  story_id UUID,
  title TEXT,
  content TEXT,
  mood_match_count BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    s.id,
    s.title,
    s.content,
    COUNT(sm.mood_tag_id) as mood_match_count
  FROM public.stories s
  JOIN public.story_moods sm ON s.id = sm.story_id
  JOIN public.mood_tags mt ON sm.mood_tag_id = mt.id
  WHERE 
    mt.name = ANY(mood_names)
    AND s.privacy IN ('public', 'community')
    AND s.is_draft = false
  GROUP BY s.id, s.title, s.content
  ORDER BY mood_match_count DESC, s.created_at DESC;
END;
$$ LANGUAGE plpgsql;
