-- Step 1: Create the most restrictive RLS policies possible
-- Drop existing policies first
DROP POLICY IF EXISTS "Anyone can submit memories" ON public.memories;
DROP POLICY IF EXISTS "Admins can view all memory data" ON public.memories;

-- Step 2: Create ultra-restrictive policies
-- Only allow INSERT for memory submission (no SELECT access to raw table)
CREATE POLICY "Allow memory submission only" 
ON public.memories 
FOR INSERT 
WITH CHECK (true);

-- NO SELECT policy on the raw table - this means no one can directly read from memories table
-- All reads must go through the public_memories view which excludes emails

-- Step 3: Ensure the public_memories view is the ONLY way to access memory data
-- Revoke all direct access to the memories table
REVOKE ALL ON public.memories FROM anon, authenticated;

-- Grant only INSERT permission for submissions
GRANT INSERT ON public.memories TO anon, authenticated;

-- Grant SELECT only on the safe view
GRANT SELECT ON public.public_memories TO anon, authenticated;

-- Step 4: Create a secure admin function for when auth is implemented
CREATE OR REPLACE FUNCTION public.admin_get_memories_with_emails()
RETURNS TABLE (
  id uuid,
  name text,
  email text,
  title text,
  story text,
  category text,
  relationship text,
  memorable_date date,
  is_featured boolean,
  is_approved boolean,
  created_at timestamp with time zone,
  updated_at timestamp with time zone
)
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  -- This function will need to be updated when authentication is implemented
  -- For now, it returns no data to prevent any email exposure
  SELECT 
    m.id,
    m.name,
    m.email,
    m.title,
    m.story,
    m.category,
    m.relationship,
    m.memorable_date,
    m.is_featured,
    m.is_approved,
    m.created_at,
    m.updated_at
  FROM public.memories m
  WHERE false; -- Returns no data until proper admin authentication is implemented
$$;

-- Step 5: Add a comment to document the security approach
COMMENT ON TABLE public.memories IS 'SECURITY: Direct access restricted. Use public_memories view for safe access without email exposure. Admin access requires authentication via admin_get_memories_with_emails() function.';

COMMENT ON VIEW public.public_memories IS 'SECURITY: Safe public access to memories without exposing email addresses or personal contact information.';