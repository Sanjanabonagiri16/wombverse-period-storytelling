
-- Create community_guidelines table
CREATE TABLE public.community_guidelines (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'Heart',
  color TEXT NOT NULL DEFAULT 'from-red-500 to-red-600',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create community_rules table
CREATE TABLE public.community_rules (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  rule TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create support_categories table
CREATE TABLE public.support_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'Heart',
  items TEXT[] NOT NULL DEFAULT '{}',
  color TEXT NOT NULL DEFAULT 'from-red-500 to-red-600',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create crisis_resources table
CREATE TABLE public.crisis_resources (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  service TEXT NOT NULL,
  number TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create external_resources table for the real-time external resources
CREATE TABLE public.external_resources (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  url TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'General',
  focus TEXT NOT NULL DEFAULT 'Support',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create resource_categories table
CREATE TABLE public.resource_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'BookOpen',
  color TEXT NOT NULL DEFAULT 'from-red-500 to-red-600',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create resource_topics table
CREATE TABLE public.resource_topics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category_id UUID REFERENCES public.resource_categories(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create downloadable_resources table
CREATE TABLE public.downloadable_resources (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'PDF',
  size TEXT NOT NULL DEFAULT '1 MB',
  url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create external_organizations table
CREATE TABLE public.external_organizations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  url TEXT NOT NULL,
  focus TEXT NOT NULL DEFAULT 'Support',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.community_guidelines ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crisis_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.external_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resource_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resource_topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.downloadable_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.external_organizations ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (these are informational resources)
CREATE POLICY "Allow public read access to community_guidelines" 
  ON public.community_guidelines FOR SELECT 
  USING (true);

CREATE POLICY "Allow public read access to community_rules" 
  ON public.community_rules FOR SELECT 
  USING (true);

CREATE POLICY "Allow public read access to support_categories" 
  ON public.support_categories FOR SELECT 
  USING (true);

CREATE POLICY "Allow public read access to crisis_resources" 
  ON public.crisis_resources FOR SELECT 
  USING (true);

CREATE POLICY "Allow public read access to external_resources" 
  ON public.external_resources FOR SELECT 
  USING (true);

CREATE POLICY "Allow public read access to resource_categories" 
  ON public.resource_categories FOR SELECT 
  USING (true);

CREATE POLICY "Allow public read access to resource_topics" 
  ON public.resource_topics FOR SELECT 
  USING (true);

CREATE POLICY "Allow public read access to downloadable_resources" 
  ON public.downloadable_resources FOR SELECT 
  USING (true);

CREATE POLICY "Allow public read access to external_organizations" 
  ON public.external_organizations FOR SELECT 
  USING (true);

-- Insert some default data
INSERT INTO public.external_resources (name, description, url, category, focus) VALUES
('Period Equity', 'Fighting for menstrual equity through advocacy and education', 'https://periodequity.org', 'Advocacy', 'Menstrual Rights'),
('The Pad Project', 'Providing menstrual health education globally', 'https://thepadproject.org', 'Education', 'Global Health'),
('ACOG', 'Medical guidelines and women''s health resources', 'https://acog.org', 'Medical', 'Healthcare'),
('Bloody Good Period', 'Providing period products to those who need them', 'https://bloodygoodperiod.com', 'Support', 'Product Access'),
('Red Moon Gang', 'Menstrual health education and community support', 'https://redmoongang.com', 'Community', 'Education'),
('Days for Girls', 'Increasing access to menstrual care and education', 'https://daysforgirls.org', 'Global', 'Product Access');
