-- First, let's create a security definer function that returns memories without exposing email addresses
CREATE OR REPLACE FUNCTION public.get_public_memories()
RETURNS TABLE (
  id uuid,
  name text,
  title text,
  story text,
  category text,
  relationship text,
  memorable_date date,
  is_featured boolean,
  created_at timestamp with time zone,
  updated_at timestamp with time zone
)
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT 
    m.id,
    m.name,
    m.title,
    m.story,
    m.category,
    m.relationship,
    m.memorable_date,
    m.is_featured,
    m.created_at,
    m.updated_at
  FROM public.memories m
  WHERE m.is_approved = true;
$$;

-- Create a function to check if user is admin (for full access)
CREATE OR REPLACE FUNCTION public.is_admin_user()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  -- For now, return false since no admin system is implemented
  -- This can be updated when authentication/admin roles are added
  SELECT false;
$$;

-- Drop existing RLS policies
DROP POLICY IF EXISTS "Anyone can view approved memories" ON public.memories;
DROP POLICY IF EXISTS "Anyone can submit memories" ON public.memories;

-- Create new restrictive RLS policies
-- Policy 1: Only allow INSERT for memory submission (no email exposure on read)
CREATE POLICY "Anyone can submit memories" 
ON public.memories 
FOR INSERT 
WITH CHECK (true);

-- Policy 2: Only authenticated admins can view full memory data including emails
CREATE POLICY "Admins can view all memory data" 
ON public.memories 
FOR SELECT 
USING (public.is_admin_user());

-- Create a public view that excludes email addresses for public access
CREATE OR REPLACE VIEW public.public_memories AS
SELECT 
  id,
  name,
  title,
  story,
  category,
  relationship,
  memorable_date,
  is_featured,
  created_at,
  updated_at
FROM public.memories
WHERE is_approved = true;

-- Grant public access to the view (not the underlying table)
GRANT SELECT ON public.public_memories TO anon, authenticated;