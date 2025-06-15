
-- Update reactions table to support emoji-based reactions
ALTER TABLE public.reactions 
DROP CONSTRAINT IF EXISTS reactions_type_check;

ALTER TABLE public.reactions 
ADD CONSTRAINT reactions_type_check 
CHECK (type IN ('heart', 'support', 'strong', 'tears', 'grateful', 'empathy', 'hope', 'strength'));

-- Add real-time support for reactions
ALTER TABLE public.reactions REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.reactions;

-- Add real-time support for comments
ALTER TABLE public.comments REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.comments;

-- Add real-time support for stories (for view counts, etc.)
ALTER TABLE public.stories REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.stories;

-- Drop existing policies if they exist and create new ones
DROP POLICY IF EXISTS "Anyone can view reactions on public stories" ON public.reactions;
DROP POLICY IF EXISTS "Anyone can view comments on public stories" ON public.comments;
DROP POLICY IF EXISTS "Users can view their own reactions" ON public.reactions;
DROP POLICY IF EXISTS "Users can view their own comments" ON public.comments;

-- Allow users to view all reactions on public stories for real-time updates
CREATE POLICY "Anyone can view reactions on public stories" 
  ON public.reactions FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM public.stories 
    WHERE stories.id = reactions.story_id 
    AND stories.privacy IN ('public', 'community')
    AND stories.is_draft = false
  ));

-- Allow users to view all comments on public stories for real-time updates
CREATE POLICY "Anyone can view comments on public stories" 
  ON public.comments FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM public.stories 
    WHERE stories.id = comments.story_id 
    AND stories.privacy IN ('public', 'community')
    AND stories.is_draft = false
  ));

-- Add helpful reactions count function
CREATE OR REPLACE FUNCTION get_reaction_counts(story_uuid UUID)
RETURNS TABLE(reaction_type TEXT, count BIGINT) AS $$
BEGIN
  RETURN QUERY
  SELECT r.type, COUNT(*) as count
  FROM public.reactions r
  WHERE r.story_id = story_uuid
  GROUP BY r.type;
END;
$$ LANGUAGE plpgsql;
