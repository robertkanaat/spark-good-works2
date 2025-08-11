-- ULTIMATE SECURITY FIX: Block ALL direct access to memories table
-- Step 1: Remove the permissive INSERT policy and create restrictive ones

DROP POLICY IF EXISTS "Allow memory submission only" ON public.memories;

-- Step 2: Create a policy that blocks ALL SELECT operations
CREATE POLICY "Block all direct reads" 
ON public.memories 
FOR SELECT 
USING (false); -- This explicitly denies all SELECT operations

-- Step 3: Create a very restrictive INSERT policy that only allows specific operations
CREATE POLICY "Allow memory submission with restrictions" 
ON public.memories 
FOR INSERT 
WITH CHECK (
  -- Only allow INSERT if all required fields are provided and reasonable
  length(name) > 0 AND length(name) < 500 AND
  length(email) > 5 AND length(email) < 255 AND
  length(title) > 0 AND length(title) < 500 AND
  length(story) > 0 AND length(story) < 10000 AND
  length(category) > 0 AND length(category) < 100
);

-- Step 4: Completely revoke and re-grant minimal permissions
REVOKE ALL ON public.memories FROM public, anon, authenticated;
GRANT INSERT ON public.memories TO anon, authenticated;

-- Step 5: Create a completely secure view that uses security definer approach
-- Drop the existing view first
DROP VIEW IF EXISTS public.public_memories;

-- Create a security definer function instead of a view to have better control
CREATE OR REPLACE FUNCTION public.get_safe_memories()
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
SET search_path = public
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

-- Grant execute permission on the function
GRANT EXECUTE ON FUNCTION public.get_safe_memories() TO anon, authenticated;

-- Step 6: Add comprehensive security comments
COMMENT ON FUNCTION public.get_safe_memories() IS 'SECURITY: Only safe way to access memory data without email exposure. Function uses SECURITY DEFINER to bypass RLS restrictions safely.';

COMMENT ON POLICY "Block all direct reads" ON public.memories IS 'SECURITY: Prevents all direct SELECT queries to protect email addresses from spam harvesting.';