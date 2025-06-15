
-- Create stories table
CREATE TABLE public.stories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  emotion_tags TEXT[] NOT NULL DEFAULT '{}',
  privacy TEXT NOT NULL CHECK (privacy IN ('public', 'community', 'anonymous')),
  category TEXT NOT NULL,
  is_anonymous BOOLEAN NOT NULL DEFAULT false,
  is_draft BOOLEAN NOT NULL DEFAULT false,
  view_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create reactions table
CREATE TABLE public.reactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  story_id UUID REFERENCES public.stories(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('heart', 'support', 'empathy', 'strength')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(story_id, user_id, type)
);

-- Create comments table
CREATE TABLE public.comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  story_id UUID REFERENCES public.stories(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users NOT NULL,
  content TEXT NOT NULL,
  is_supportive BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_collections table for organizing stories
CREATE TABLE public.user_collections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  is_public BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create collection_stories junction table
CREATE TABLE public.collection_stories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  collection_id UUID REFERENCES public.user_collections(id) ON DELETE CASCADE NOT NULL,
  story_id UUID REFERENCES public.stories(id) ON DELETE CASCADE NOT NULL,
  added_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(collection_id, story_id)
);

-- Create bookmarks table
CREATE TABLE public.bookmarks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  story_id UUID REFERENCES public.stories(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, story_id)
);

-- Update profiles table with enhanced fields
ALTER TABLE public.profiles 
ADD COLUMN bio TEXT,
ADD COLUMN location TEXT,
ADD COLUMN website TEXT,
ADD COLUMN avatar_url TEXT,
ADD COLUMN story_count INTEGER DEFAULT 0,
ADD COLUMN follower_count INTEGER DEFAULT 0,
ADD COLUMN following_count INTEGER DEFAULT 0,
ADD COLUMN is_verified BOOLEAN DEFAULT false,
ADD COLUMN privacy_settings JSONB DEFAULT '{"show_email": false, "show_location": true}';

-- Enable Row Level Security
ALTER TABLE public.stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collection_stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;

-- RLS Policies for stories
CREATE POLICY "Users can view public and community stories" 
  ON public.stories FOR SELECT 
  USING (privacy IN ('public', 'community') AND is_draft = false);

CREATE POLICY "Users can view their own stories" 
  ON public.stories FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own stories" 
  ON public.stories FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own stories" 
  ON public.stories FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own stories" 
  ON public.stories FOR DELETE 
  USING (auth.uid() = user_id);

-- RLS Policies for reactions
CREATE POLICY "Anyone can view reactions on public stories" 
  ON public.reactions FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM public.stories 
    WHERE stories.id = reactions.story_id 
    AND stories.privacy IN ('public', 'community')
    AND stories.is_draft = false
  ));

CREATE POLICY "Users can create reactions" 
  ON public.reactions FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own reactions" 
  ON public.reactions FOR DELETE 
  USING (auth.uid() = user_id);

-- RLS Policies for comments
CREATE POLICY "Anyone can view comments on public stories" 
  ON public.comments FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM public.stories 
    WHERE stories.id = comments.story_id 
    AND stories.privacy IN ('public', 'community')
    AND stories.is_draft = false
  ));

CREATE POLICY "Users can create comments" 
  ON public.comments FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own comments" 
  ON public.comments FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own comments" 
  ON public.comments FOR DELETE 
  USING (auth.uid() = user_id);

-- RLS Policies for collections
CREATE POLICY "Users can view public collections" 
  ON public.user_collections FOR SELECT 
  USING (is_public = true);

CREATE POLICY "Users can view their own collections" 
  ON public.user_collections FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own collections" 
  ON public.user_collections FOR ALL 
  USING (auth.uid() = user_id);

-- RLS Policies for collection_stories
CREATE POLICY "Users can view collection stories for accessible collections" 
  ON public.collection_stories FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM public.user_collections 
    WHERE user_collections.id = collection_stories.collection_id 
    AND (user_collections.is_public = true OR user_collections.user_id = auth.uid())
  ));

CREATE POLICY "Users can manage their own collection stories" 
  ON public.collection_stories FOR ALL 
  USING (EXISTS (
    SELECT 1 FROM public.user_collections 
    WHERE user_collections.id = collection_stories.collection_id 
    AND user_collections.user_id = auth.uid()
  ));

-- RLS Policies for bookmarks
CREATE POLICY "Users can manage their own bookmarks" 
  ON public.bookmarks FOR ALL 
  USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX idx_stories_user_id ON public.stories(user_id);
CREATE INDEX idx_stories_privacy ON public.stories(privacy);
CREATE INDEX idx_stories_created_at ON public.stories(created_at DESC);
CREATE INDEX idx_stories_emotion_tags ON public.stories USING GIN(emotion_tags);
CREATE INDEX idx_reactions_story_id ON public.reactions(story_id);
CREATE INDEX idx_comments_story_id ON public.comments(story_id);
CREATE INDEX idx_bookmarks_user_id ON public.bookmarks(user_id);

-- Create function to update story count
CREATE OR REPLACE FUNCTION update_user_story_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.profiles 
    SET story_count = story_count + 1 
    WHERE id = NEW.user_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.profiles 
    SET story_count = story_count - 1 
    WHERE id = OLD.user_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update story count
CREATE TRIGGER trigger_update_story_count
  AFTER INSERT OR DELETE ON public.stories
  FOR EACH ROW EXECUTE FUNCTION update_user_story_count();
