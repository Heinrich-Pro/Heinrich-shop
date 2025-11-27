-- Fix RLS policy for user creation during signup
-- File: 005_fix_user_insert_policy.sql

-- Drop the problematic policy
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.users;

-- Create new policy that allows insert during signup
-- This allows the authenticated user to insert their own record
CREATE POLICY "Allow user creation on signup"
  ON public.users FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Also add a policy to allow service role (for admin operations)
CREATE POLICY "Service role can manage users"
  ON public.users FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
