-- Step 1: Create user profiles table with admin roles
CREATE TABLE public.profiles (
  id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email text,
  full_name text,
  role text NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin', 'moderator')),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  PRIMARY KEY (id)
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create profiles policies
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = id);

-- Create trigger for auto-updating timestamps
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Step 2: Create function to handle new user signups
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    new.id,
    new.email,
    new.raw_user_meta_data ->> 'full_name'
  );
  RETURN new;
END;
$$;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user();

-- Step 3: Create security definer function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM public.profiles 
    WHERE id = auth.uid() 
    AND role = 'admin'
  );
$$;

-- Step 4: Update email_notifications policies to use proper admin check
DROP POLICY IF EXISTS "Admin can view all notifications" ON public.email_notifications;

CREATE POLICY "Admins can view all notifications" 
ON public.email_notifications 
FOR SELECT 
USING (public.is_admin());

-- Create policy for admins to update notifications
CREATE POLICY "Admins can update notifications" 
ON public.email_notifications 
FOR UPDATE 
USING (public.is_admin());

-- Create policy for admins to delete notifications
CREATE POLICY "Admins can delete notifications" 
ON public.email_notifications 
FOR DELETE 
USING (public.is_admin());

-- Step 5: Create admin function to manage email notifications
CREATE OR REPLACE FUNCTION public.admin_get_email_notifications()
RETURNS TABLE (
  id uuid,
  name text,
  email text,
  is_confirmed boolean,
  reminder_sent boolean,
  created_at timestamp with time zone,
  updated_at timestamp with time zone
)
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT 
    n.id,
    n.name,
    n.email,
    n.is_confirmed,
    n.reminder_sent,
    n.created_at,
    n.updated_at
  FROM public.email_notifications n
  WHERE public.is_admin();
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.admin_get_email_notifications() TO authenticated;

-- Add helpful comments
COMMENT ON FUNCTION public.is_admin() IS 'Security function to check if current user has admin role';
COMMENT ON FUNCTION public.admin_get_email_notifications() IS 'Admin function to securely access email notifications list';
COMMENT ON TABLE public.profiles IS 'User profiles with role-based access control for admin functionality';