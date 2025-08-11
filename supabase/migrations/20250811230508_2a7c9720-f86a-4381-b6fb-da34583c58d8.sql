-- Create a simple function to promote a user to admin (for initial setup)
-- This should only be used once to create the first admin user
CREATE OR REPLACE FUNCTION public.promote_user_to_admin(user_email text)
RETURNS text
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  UPDATE public.profiles 
  SET role = 'admin', updated_at = now()
  WHERE email = user_email
  RETURNING 'User ' || email || ' promoted to admin';
$$;

-- Add helpful comment
COMMENT ON FUNCTION public.promote_user_to_admin(text) IS 'ADMIN SETUP: Function to promote the first user to admin. Should be used sparingly and only by system administrators.';

-- Grant execute permission to authenticated users (will be removed after initial setup)
GRANT EXECUTE ON FUNCTION public.promote_user_to_admin(text) TO authenticated;