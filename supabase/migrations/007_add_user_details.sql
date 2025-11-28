-- Add phone and preferences columns to users table
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS phone TEXT,
ADD COLUMN IF NOT EXISTS preferences JSONB DEFAULT '{"email_notifications": true, "sms_notifications": false}'::jsonb;
