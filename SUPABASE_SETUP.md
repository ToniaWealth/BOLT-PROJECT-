# Supabase Database Setup

Since the database couldn't be configured automatically, you need to run the SQL migrations manually. This takes about 3 minutes.

## Step 1: Run the SQL Migration

1. Go to your Supabase Dashboard → **SQL Editor**
2. Click **New query**
3. Paste the SQL below
4. Click **Run**

```sql
CREATE TABLE IF NOT EXISTS rooms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  price integer NOT NULL DEFAULT 0,
  price_unit text NOT NULL DEFAULT 'night',
  capacity text NOT NULL DEFAULT '2 Guests',
  size text NOT NULL DEFAULT '',
  bed text NOT NULL DEFAULT '',
  image text NOT NULL DEFAULT '',
  amenities text[] NOT NULL DEFAULT '{}',
  sort_order integer NOT NULL DEFAULT 0,
  is_published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_select_rooms" ON rooms;
CREATE POLICY "public_select_rooms"
ON rooms FOR SELECT
TO anon, authenticated
USING (is_published = true OR auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "auth_insert_rooms" ON rooms;
CREATE POLICY "auth_insert_rooms"
ON rooms FOR INSERT
TO authenticated
WITH CHECK (true);

DROP POLICY IF EXISTS "auth_update_rooms" ON rooms;
CREATE POLICY "auth_update_rooms"
ON rooms FOR UPDATE
TO authenticated
USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_rooms" ON rooms;
CREATE POLICY "auth_delete_rooms"
ON rooms FOR DELETE
TO authenticated
USING (true);

CREATE INDEX IF NOT EXISTS rooms_sort_order_idx ON rooms(sort_order);

INSERT INTO rooms (id, name, description, price, price_unit, capacity, size, bed, image, amenities, sort_order, is_published)
VALUES
  ('ocean-suite', 'Ocean Crest Suite', 'A 750 sq ft sanctuary with floor-to-ceiling windows framing the Atlantic. Features a private balcony, king-size bed, and a marble soaking tub.', 150000, 'night', '2 Guests', '750 sq ft', 'King Bed', 'https://images.pexels.com/photos/97083/pexels-photo-97083.jpeg?auto=compress&cs=tinysrgb&w=1260', ARRAY['Private ocean-view balcony','Marble soaking tub','Nespresso bar','Smart climate control','Plush bathrobes & slippers'], 0, true),
  ('garden-villa', 'Garden Villa', 'A freestanding villa nestled in tropical gardens with a private plunge pool, outdoor shower, and direct beach access through a private path.', 220000, 'night', '4 Guests', '1,200 sq ft', 'Two Queen Beds', 'https://images.pexels.com/photos/6434592/pexels-photo-6434592.jpeg?auto=compress&cs=tinysrgb&w=1260', ARRAY['Private plunge pool','Outdoor rainfall shower','Direct beach access','Lounge terrace','Complimentary minibar'], 1, true),
  ('sunset-deluxe', 'Sunset Deluxe Room', 'An intimate room positioned to capture golden-hour light. Features a rain shower, custom furnishings, and a cozy reading nook by the window.', 95000, 'night', '2 Guests', '450 sq ft', 'Queen Bed', 'https://images.pexels.com/photos/2736384/pexels-photo-2736384.jpeg?auto=compress&cs=tinysrgb&w=1260', ARRAY['Sunset-facing window','Rain shower','Reading nook','Premium linens','Daily housekeeping'], 2, true),
  ('presidential-penthouse', 'Presidential Penthouse', 'Our crown jewel — a 2,000 sq ft rooftop penthouse with 360° ocean views, a private rooftop terrace, dedicated butler service, and a chef''s kitchen.', 380000, 'night', '4 Guests', '2,000 sq ft', 'King + Two Singles', 'https://images.pexels.com/photos/8082217/pexels-photo-8082217.jpeg?auto=compress&cs=tinysrgb&w=1260', ARRAY['360° rooftop terrace','Dedicated butler','Chef''s kitchen','Private elevator','In-room spa treatments'], 3, true)
ON CONFLICT (id) DO NOTHING;
```

### Blog Posts Table

Run this separately after the rooms table:

```sql
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text,
  content text,
  cover_image text NOT NULL DEFAULT '',
  published_at timestamptz,
  status text NOT NULL DEFAULT 'draft',
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_select_blog_posts" ON blog_posts;
CREATE POLICY "public_select_blog_posts"
ON blog_posts FOR SELECT
TO anon, authenticated
USING (status = 'published' OR auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "auth_insert_blog_posts" ON blog_posts;
CREATE POLICY "auth_insert_blog_posts"
ON blog_posts FOR INSERT
TO authenticated
WITH CHECK (true);

DROP POLICY IF EXISTS "auth_update_blog_posts" ON blog_posts;
CREATE POLICY "auth_update_blog_posts"
ON blog_posts FOR UPDATE
TO authenticated
USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_blog_posts" ON blog_posts;
CREATE POLICY "auth_delete_blog_posts"
ON blog_posts FOR DELETE
TO authenticated
USING (true);

CREATE INDEX IF NOT EXISTS blog_posts_slug_idx ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS blog_posts_status_idx ON blog_posts(status);
```

## Step 2: Create an Admin User

1. Go to **Authentication → Users**
2. Click **Add user**
3. Enter an email and password
4. Make sure **Auto Confirm User** is checked
5. Click **Create user**

## Step 3: Log In

Go to `/admin/login` in your website and sign in with the credentials you just created.

## What This Does

- Creates a `rooms` table with all the fields your website needs
- Seeds it with your 4 existing rooms so the public site keeps working
- Creates a `blog_posts` table for the blog CMS
- Sets up security so anyone can view published content, but only logged-in admins can add, edit, or delete
