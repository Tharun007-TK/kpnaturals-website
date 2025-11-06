-- Migration for KP Natural Oil Website
-- Run this SQL in your Supabase SQL Editor

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  user_name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_reviews_product_id ON reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON reviews(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Enable read access for all users" ON products
  FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON reviews
  FOR SELECT USING (true);

-- Create policies for authenticated insert (reviews)
CREATE POLICY "Enable insert for all users" ON reviews
  FOR INSERT WITH CHECK (true);

-- Create policies for service role (admin operations)
-- Note: These are automatically handled by service_role key, but we can be explicit
CREATE POLICY "Enable all operations for service role" ON products
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Enable all operations for service role" ON reviews
  FOR ALL USING (auth.role() = 'service_role');

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-update updated_at
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert sample products (optional - for testing)
INSERT INTO products (name, description, price, image_url) VALUES
  (
    'KP Natural Hair Oil - Classic',
    'Our premium sulfur-free hair oil infused with hibiscus, coconut, and rosemary. Perfect for all hair types, promoting healthy growth and shine.',
    145.00,
    '/product1.png'
  ),
  (
    'KP Natural Hair Oil - Intense',
    'Extra strength formula for damaged and weak hair. Contains our secret herbal blend for deep nourishment and repair.',
    185.00,
    '/product2.png'
  ),
  (
    'KP Natural Hair Oil - Gentle',
    'Lightweight formula ideal for daily use. Perfect for sensitive scalps with natural ingredients that soothe and protect.',
    125.00,
    '/product3.png'
  )
ON CONFLICT DO NOTHING;

-- Insert sample reviews (optional - for testing)
INSERT INTO reviews (product_id, user_name, rating, comment) 
SELECT 
  p.id,
  'Priya Sharma',
  5,
  'Amazing results! My hair feels so much healthier after using this for 2 months.'
FROM products p
WHERE p.name = 'KP Natural Hair Oil - Classic'
LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO reviews (product_id, user_name, rating, comment) 
SELECT 
  p.id,
  'Rajesh Kumar',
  5,
  'No more hair fall! The natural ingredients really work. Highly recommended.'
FROM products p
WHERE p.name = 'KP Natural Hair Oil - Classic'
LIMIT 1
ON CONFLICT DO NOTHING;
