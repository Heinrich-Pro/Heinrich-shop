-- Create automatic user profile on signup using trigger
-- File: 006_auto_create_user_profile.sql

-- First, drop existing problematic policies
DROP POLICY IF EXISTS "Allow user creation on signup" ON public.users;
DROP POLICY IF EXISTS "Service role can manage users" ON public.users;

-- Create a simpler policy that works with the trigger
CREATE POLICY "Enable insert for authenticated users"
  ON public.users FOR INSERT
  WITH CHECK (true);

-- Create function to automatically create user profile
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, name, role, created_at, updated_at)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    'customer',
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to call function on new auth user
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
