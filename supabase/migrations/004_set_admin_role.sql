-- Migration to set admin role for initial admin user
-- File: 004_set_admin_role.sql

UPDATE public.users 
SET role = 'admin' 
WHERE email = 'heinrichtechcraft@gmail.com';
