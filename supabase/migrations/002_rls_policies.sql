-- Enable Row Level Security on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Policies for users table
-- Users can read their own profile
CREATE POLICY "Users can view own profile"
  ON public.users FOR SELECT
  USING (auth.uid() = id);

-- Users can update their own profile (but not role)
CREATE POLICY "Users can update own profile"
  ON public.users FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id AND role = (SELECT role FROM public.users WHERE id = auth.uid()));

-- Allow user creation on signup (via trigger)
CREATE POLICY "Enable insert for authenticated users only"
  ON public.users FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Policies for categories table
-- Anyone can view categories
CREATE POLICY "Categories are viewable by everyone"
  ON public.categories FOR SELECT
  TO PUBLIC
  USING (true);

-- Only admins can insert/update/delete categories
CREATE POLICY "Only admins can insert categories"
  ON public.categories FOR INSERT
  TO authenticated
  WITH CHECK ((SELECT role FROM public.users WHERE id = auth.uid()) = 'admin');

CREATE POLICY "Only admins can update categories"
  ON public.categories FOR UPDATE
  TO authenticated
  USING ((SELECT role FROM public.users WHERE id = auth.uid()) = 'admin')
  WITH CHECK ((SELECT role FROM public.users WHERE id = auth.uid()) = 'admin');

CREATE POLICY "Only admins can delete categories"
  ON public.categories FOR DELETE
  TO authenticated
  USING ((SELECT role FROM public.users WHERE id = auth.uid()) = 'admin');

-- Policies for products table
-- Anyone can view published products
CREATE POLICY "Published products are viewable by everyone"
  ON public.products FOR SELECT
  TO PUBLIC
  USING (published = true OR (SELECT role FROM public.users WHERE id = auth.uid()) = 'admin');

-- Only admins can insert/update/delete products
CREATE POLICY "Only admins can insert products"
  ON public.products FOR INSERT
  TO authenticated
  WITH CHECK ((SELECT role FROM public.users WHERE id = auth.uid()) = 'admin');

CREATE POLICY "Only admins can update products"
  ON public.products FOR UPDATE
  TO authenticated
  USING ((SELECT role FROM public.users WHERE id = auth.uid()) = 'admin')
  WITH CHECK ((SELECT role FROM public.users WHERE id = auth.uid()) = 'admin');

CREATE POLICY "Only admins can delete products"
  ON public.products FOR DELETE
  TO authenticated
  USING ((SELECT role FROM public.users WHERE id = auth.uid()) = 'admin');

-- Policies for product_variants table
-- Anyone can view variants of published products
CREATE POLICY "Product variants are viewable by everyone"
  ON public.product_variants FOR SELECT
  TO PUBLIC
  USING (
    EXISTS (
      SELECT 1 FROM public.products 
      WHERE id = product_variants.product_id 
      AND (published = true OR (SELECT role FROM public.users WHERE id = auth.uid()) = 'admin')
    )
  );

-- Only admins can modify variants
CREATE POLICY "Only admins can manage product variants"
  ON public.product_variants FOR ALL
  TO authenticated
  USING ((SELECT role FROM public.users WHERE id = auth.uid()) = 'admin')
  WITH CHECK ((SELECT role FROM public.users WHERE id = auth.uid()) = 'admin');

-- Policies for orders table
-- Users can view their own orders, admins can view all
CREATE POLICY "Users can view own orders"
  ON public.orders FOR SELECT
  TO authenticated
  USING (
    auth.uid() = user_id OR
    (SELECT role FROM public.users WHERE id = auth.uid()) = 'admin'
  );

-- Users can create their own orders
CREATE POLICY "Users can create own orders"
  ON public.orders FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Only admins can update orders
CREATE POLICY "Only admins can update orders"
  ON public.orders FOR UPDATE
  TO authenticated
  USING ((SELECT role FROM public.users WHERE id = auth.uid()) = 'admin')
  WITH CHECK ((SELECT role FROM public.users WHERE id = auth.uid()) = 'admin');

-- Policies for order_items table
-- Users can view items of their own orders
CREATE POLICY "Users can view own order items"
  ON public.order_items FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.orders 
      WHERE id = order_items.order_id 
      AND (user_id = auth.uid() OR (SELECT role FROM public.users WHERE id = auth.uid()) = 'admin')
    )
  );

-- Users can create order items for their own orders
CREATE POLICY "Users can create own order items"
  ON public.order_items FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.orders 
      WHERE id = order_id AND user_id = auth.uid()
    )
  );

-- Policies for addresses table
-- Users can view their own addresses
CREATE POLICY "Users can view own addresses"
  ON public.addresses FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can create their own addresses
CREATE POLICY "Users can create own addresses"
  ON public.addresses FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own addresses
CREATE POLICY "Users can update own addresses"
  ON public.addresses FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their own addresses
CREATE POLICY "Users can delete own addresses"
  ON public.addresses FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Policies for reviews table
-- Anyone can view verified reviews
CREATE POLICY "Verified reviews are viewable by everyone"
  ON public.reviews FOR SELECT
  TO PUBLIC
  USING (
    verified = true OR 
    auth.uid() = user_id OR 
    (SELECT role FROM public.users WHERE id = auth.uid()) = 'admin'
  );

-- Authenticated users can create reviews
CREATE POLICY "Authenticated users can create reviews"
  ON public.reviews FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own reviews
CREATE POLICY "Users can update own reviews"
  ON public.reviews FOR UPDATE
  TO authenticated
  USING (
    auth.uid() = user_id OR 
    (SELECT role FROM public.users WHERE id = auth.uid()) = 'admin'
  )
  WITH CHECK (
    auth.uid() = user_id OR 
    (SELECT role FROM public.users WHERE id = auth.uid()) = 'admin'
  );

-- Users can delete their own reviews
CREATE POLICY "Users can delete own reviews"
  ON public.reviews FOR DELETE
  TO authenticated
  USING (
    auth.uid() = user_id OR 
    (SELECT role FROM public.users WHERE id = auth.uid()) = 'admin'
  );
