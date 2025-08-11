-- Fix security warnings by updating functions with proper search_path settings

-- 1. Update get_public_memories function to fix search path mutable warning
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

-- 2. Update is_admin_user function to fix search path mutable warning
CREATE OR REPLACE FUNCTION public.is_admin_user()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  -- For now, return false since no admin system is implemented
  -- This can be updated when authentication/admin roles are added
  SELECT false;
$$;

-- 3. Update the existing update_updated_at_column function to fix search path
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- 4. Replace the security definer view with a regular view
-- First drop the existing view
DROP VIEW IF EXISTS public.public_memories;

-- Create a regular view instead of security definer view
CREATE VIEW public.public_memories AS
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

-- Grant access to the view
GRANT SELECT ON public.public_memories TO anon, authenticated;