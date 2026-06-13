-- ====================================================
-- 🇹🇳 سوق بلادي - شغّل هذا في Supabase SQL Editor
-- ====================================================

-- جدول المشرفين (Admins)
CREATE TABLE IF NOT EXISTS admins (
  id BIGSERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- السماح بالكتابة والقراءة للمشرفين
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
CREATE POLICY "allow_all_admins" ON admins FOR ALL USING (true) WITH CHECK (true);

-- جدول الطلبات
CREATE TABLE IF NOT EXISTS orders (
  id BIGSERIAL PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_address TEXT NOT NULL,
  governorate TEXT NOT NULL,
  payment_method TEXT DEFAULT 'cod',
  currency TEXT DEFAULT 'TND',
  total_tnd DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending'
    CHECK (status IN ('pending','confirmed','shipped','delivered','cancelled')),
  items JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- السماح بالكتابة والقراءة
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "allow_all" ON orders FOR ALL USING (true) WITH CHECK (true);

-- جدول المنتجات (اختياري)
CREATE TABLE IF NOT EXISTS products (
  id BIGSERIAL PRIMARY KEY,
  name_ar TEXT NOT NULL,
  description_ar TEXT,
  price_tnd DECIMAL(10,2) NOT NULL,
  old_price_tnd DECIMAL(10,2) DEFAULT 0,
  category TEXT DEFAULT 'electronics',
  image_url TEXT DEFAULT '',
  stock INTEGER DEFAULT 0,
  discount_pct INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "allow_all_products" ON products FOR ALL USING (true) WITH CHECK (true);

SELECT 'تم إعداد قاعدة البيانات بنجاح ✅' as message;
