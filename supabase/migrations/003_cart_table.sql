-- Migration to add carts table for saving user carts
-- File: 003_cart_table.sql

-- Create carts table
CREATE TABLE IF NOT EXISTS public.carts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  items JSONB NOT NULL DEFAULT '[]',
  promo_code TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Create index
CREATE INDEX IF NOT EXISTS idx_carts_user_id ON public.carts(user_id);

-- Enable RLS
ALTER TABLE public.carts ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own cart"
  ON public.carts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own cart"
  ON public.carts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own cart"
  ON public.carts FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own cart"
  ON public.carts FOR DELETE
  USING (auth.uid() = user_id);

-- Updated trigger
CREATE OR REPLACE FUNCTION update_carts_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER carts_updated_at
  BEFORE UPDATE ON public.carts
  FOR EACH ROW
  EXECUTE FUNCTION update_carts_updated_at();
