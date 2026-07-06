create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  email text not null unique,
  role text not null default 'member',
  status text not null default 'active',
  phone text default '',
  avatar text default '',
  created_at timestamptz not null default now()
);

create table if not exists public.customers (
  id int8 primary key,
  name text not null,
  username text not null unique,
  email text not null unique,
  phone text default '',
  gender text,
  date_of_birth text,
  address text,
  city text,
  province text,
  total_orders int8 default 0,
  total_spent text default '',
  last_order text,
  last_login text,
  membership_level text,
  join_date text,
  referral_code text,
  user_source text,
  email_subscription boolean default false,
  status text default 'active',
  avatar text default ''
);

alter table public.customers enable row level security;

create policy "Authenticated users can read customers"
  on public.customers for select
  to authenticated
  using (true);

create policy "Admins can manage customers"
  on public.customers for all
  to authenticated
  using (public.is_admin_user())
  with check (public.is_admin_user());

create table if not exists public.products (
  id int8 primary key,
  name text not null,
  category text not null,
  description text,
  price int8 not null,
  stock int8 not null default 0,
  available boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.products enable row level security;

create policy "Authenticated users can read products"
  on public.products for select
  to authenticated
  using (true);

create policy "Admins can manage products"
  on public.products for all
  to authenticated
  using (public.is_admin_user())
  with check (public.is_admin_user());

create table if not exists public.orders (
  id text primary key,
  customer_id int8 references public.customers(id),
  items text,
  total text,
  status text not null,
  order_date text,
  payment_method text,
  delivery_address text,
  created_at timestamptz not null default now()
);

alter table public.orders enable row level security;

create policy "Authenticated users can read orders"
  on public.orders for select
  to authenticated
  using (true);

create policy "Admins can manage orders"
  on public.orders for all
  to authenticated
  using (public.is_admin_user())
  with check (public.is_admin_user());

create table if not exists public.inventory (
  id int8 primary key,
  name text not null,
  category text not null,
  stock int8 not null,
  min_stock int8 not null,
  unit text not null,
  price text not null,
  supplier text,
  created_at timestamptz not null default now()
);

alter table public.inventory enable row level security;

create policy "Authenticated users can read inventory"
  on public.inventory for select
  to authenticated
  using (true);

create policy "Admins can manage inventory"
  on public.inventory for all
  to authenticated
  using (public.is_admin_user())
  with check (public.is_admin_user());

create table if not exists public.staff (
  id int8 primary key,
  name text not null,
  position text not null,
  email text,
  phone text,
  shift text,
  join_date text,
  salary text,
  status text default 'active',
  avatar text,
  created_at timestamptz not null default now()
);

alter table public.staff enable row level security;

create policy "Authenticated users can read staff"
  on public.staff for select
  to authenticated
  using (true);

create policy "Admins can manage staff"
  on public.staff for all
  to authenticated
  using (public.is_admin_user())
  with check (public.is_admin_user());

insert into public.products (id, name, category, description, price, stock, available)
values
  (1, 'Espresso', 'Coffee', 'Kopi espresso klasik dengan rasa kuat dan kaya', 15000, 24, true),
  (2, 'Cappuccino', 'Coffee', 'Espresso dengan susu steamed dan foam lembut', 25000, 18, true),
  (3, 'Iced Latte', 'Cold Drinks', 'Latte dingin dengan susu dan es', 28000, 12, true),
  (4, 'Chocolate Cake', 'Dessert', 'Kue coklat moist dengan frosting lezat', 35000, 7, true),
  (5, 'Muffin Blueberry', 'Dessert', 'Muffin lembut dengan potongan blueberry', 20000, 14, false)
on conflict (id) do update set
  name = excluded.name,
  category = excluded.category,
  description = excluded.description,
  price = excluded.price,
  stock = excluded.stock,
  available = excluded.available;

insert into public.orders (id, customer_id, items, total, status, order_date, payment_method, delivery_address)
values
  ('#1023', 1, 'Espresso, Croissant', 'Rp 45.000', 'Completed', '2026-06-10', 'Cash', 'Jalan Merdeka No. 45'),
  ('#1024', 2, 'Iced Latte', 'Rp 28.000', 'Processing', '2026-06-12', 'OVO', 'Jalan Sudirman No. 123'),
  ('#1025', 3, 'Latte, Chocolate Cake', 'Rp 63.000', 'Pending', '2026-06-15', 'GoPay', 'Jalan Gatot Subroto No. 67')
on conflict (id) do update set
  customer_id = excluded.customer_id,
  items = excluded.items,
  total = excluded.total,
  status = excluded.status,
  order_date = excluded.order_date,
  payment_method = excluded.payment_method,
  delivery_address = excluded.delivery_address;

insert into public.inventory (id, name, category, stock, min_stock, unit, price, supplier)
values
  (1, 'Biji Kopi Arabica', 'Biji Kopi', 25, 10, 'kg', 'Rp 150.000', 'PT Kopi Nusantara'),
  (2, 'Susu Full Cream', 'Susu', 8, 15, 'liter', 'Rp 25.000', 'CV Susu Sejahtera'),
  (3, 'Gula Pasir', 'Pemanis', 50, 20, 'kg', 'Rp 15.000', 'Toko Grosir ABC'),
  (4, 'Syrup Vanilla', 'Syrup', 12, 5, 'botol', 'Rp 45.000', 'Importir Syrup')
on conflict (id) do update set
  name = excluded.name,
  category = excluded.category,
  stock = excluded.stock,
  min_stock = excluded.min_stock,
  unit = excluded.unit,
  price = excluded.price,
  supplier = excluded.supplier;

insert into public.customers (
  id, name, username, email, phone, gender, date_of_birth, address, city, province, total_orders, total_spent, last_order, last_login, membership_level, join_date, referral_code, user_source, email_subscription, status, avatar
)
values
  (1, 'Ahmad Rahman', 'ahmad_rahman_123', 'ahmad.rahman@email.com', '+62 812-3456-7890', 'Laki-laki', '1990-05-15', 'Jalan Merdeka No. 45', 'Jakarta', 'DKI Jakarta', 45, 'Rp 1.250.000', '2026-01-20', '2026-01-23', 'Gold', '2023-01-10', 'REFCUST000001', 'Instagram', true, 'active', '👨‍💼'),
  (2, 'Siti Nurhaliza', 'siti_nurhaliza_456', 'siti.nurhaliza@email.com', '+62 811-2345-6789', 'Perempuan', '1995-08-22', 'Jalan Sudirman No. 123', 'Bandung', 'Jawa Barat', 28, 'Rp 750.000', '2026-01-18', '2026-01-22', 'Silver', '2023-02-05', 'REFCUST000002', 'TikTok', true, 'active', '👩‍💻'),
  (3, 'Budi Santoso', 'budi_santoso_789', 'budi.santoso@email.com', '+62 813-4567-8901', 'Laki-laki', '1988-03-30', 'Jalan Gatot Subroto No. 67', 'Surabaya', 'Jawa Timur', 67, 'Rp 2.100.000', '2026-01-19', '2026-01-23', 'Platinum', '2023-01-20', 'REFCUST000003', 'Google Search', true, 'active', '👨‍🎓'),
  (4, 'Maya Sari', 'maya_sari_234', 'maya.sari@email.com', '+62 814-5678-9012', 'Perempuan', '1992-12-08', 'Jalan Ahmad Yani No. 89', 'Medan', 'Sumatera Utara', 15, 'Rp 420.000', '2026-11-25', '2026-01-10', 'Bronze', '2023-03-12', 'REFCUST000004', 'Referral', false, 'inactive', '👩‍🎨'),
  (5, 'Rizki Pratama', 'rizki_pratama_567', 'rizki.pratama@email.com', '+62 815-6789-0123', 'Laki-laki', '1998-07-19', 'Jalan Diponegoro No. 34', 'Semarang', 'Jawa Tengah', 32, 'Rp 890.000', '2026-01-17', '2026-01-21', 'Silver', '2023-04-08', 'REFCUST000005', 'Facebook', true, 'active', '👨‍🔧'),
  (6, 'Dewi Lestari', 'dewi_lestari_890', 'dewi.lestari@email.com', '+62 816-7890-1234', 'Perempuan', '1991-09-14', 'Jalan Merdeka No. 102', 'Makassar', 'Sulawesi Selatan', 51, 'Rp 1.450.000', '2026-01-16', '2026-01-19', 'Gold', '2023-05-20', 'REFCUST000006', 'Instagram', true, 'active', '👩‍🔬'),
  (7, 'Hendra Gunawan', 'hendra_gunawan_123', 'hendra.gunawan@email.com', '+62 817-8901-2345', 'Laki-laki', '1989-11-25', 'Jalan Sudirman No. 156', 'Palembang', 'Sumatera Selatan', 78, 'Rp 2.450.000', '2026-01-20', '2026-01-24', 'Platinum', '2023-06-03', 'REFCUST000007', 'Website Direct', true, 'active', '👨‍💼'),
  (8, 'Gita Wijaya', 'gita_wijaya_456', 'gita.wijaya@email.com', '+62 818-9012-3456', 'Perempuan', '1994-02-17', 'Jalan Gatot Subroto No. 45', 'Yogyakarta', 'DI Yogyakarta', 38, 'Rp 1.050.000', '2026-01-14', '2026-01-18', 'Silver', '2023-07-15', 'REFCUST000008', 'TikTok', true, 'active', '👩‍🎨'),
  (9, 'Iwan Setiawan', 'iwan_setiawan_789', 'iwan.setiawan@email.com', '+62 819-0123-4567', 'Laki-laki', '1986-06-08', 'Jalan Ahmad Yani No. 78', 'Bogor', 'Jawa Barat', 12, 'Rp 340.000', '2026-12-10', '2026-01-08', 'Bronze', '2023-08-22', 'REFCUST000009', 'Advertisement', false, 'suspended', '👨‍💻'),
  (10, 'Karina Kusuma', 'karina_kusuma_234', 'karina.kusuma@email.com', '+62 820-1234-5678', 'Perempuan', '1997-10-03', 'Jalan Diponegoro No. 90', 'Bekasi', 'Jawa Barat', 44, 'Rp 1.200.000', '2026-01-21', '2026-01-25', 'Gold', '2023-09-10', 'REFCUST000010', 'Referral', true, 'active', '👩‍💼'),
  (11, 'Farid Harjanto', 'farid_harjanto_345', 'farid.harjanto@email.com', '+62 821-2345-6789', 'Laki-laki', '1993-04-12', 'Jalan Merdeka No. 234', 'Depok', 'Jawa Barat', 55, 'Rp 1.650.000', '2026-01-15', '2026-01-20', 'Gold', '2023-02-28', 'REFCUST000011', 'Instagram', true, 'active', '👨‍🏫'),
  (12, 'Nia Setiawan', 'nia_setiawan_567', 'nia.setiawan@email.com', '+62 822-3456-7890', 'Perempuan', '1996-07-29', 'Jalan Sudirman No. 345', 'Tangerang', 'Banten', 22, 'Rp 620.000', '2026-01-12', '2026-01-17', 'Silver', '2023-03-15', 'REFCUST000012', 'Facebook', true, 'active', '👩‍⚕️'),
  (13, 'Eka Saputra', 'eka_saputra_678', 'eka.saputra@email.com', '+62 823-4567-8901', 'Laki-laki', '1991-01-07', 'Jalan Gatot Subroto No. 456', 'Bandung', 'Jawa Barat', 63, 'Rp 1.890.000', '2026-01-22', '2026-01-26', 'Platinum', '2023-04-22', 'REFCUST000013', 'Google Search', true, 'active', '👨‍🎤'),
  (14, 'Putri Handini', 'putri_handini_789', 'putri.handini@email.com', '+62 824-5678-9012', 'Perempuan', '1994-09-18', 'Jalan Ahmad Yani No. 567', 'Surabaya', 'Jawa Timur', 19, 'Rp 540.000', '2026-01-11', '2026-01-16', 'Bronze', '2023-05-10', 'REFCUST000014', 'TikTok', false, 'active', '👩‍🔧'),
  (15, 'Cahyo Widodo', 'cahyo_widodo_890', 'cahyo.widodo@email.com', '+62 825-6789-0123', 'Laki-laki', '1987-11-22', 'Jalan Diponegoro No. 678', 'Jakarta', 'DKI Jakarta', 72, 'Rp 2.200.000', '2026-01-24', '2026-01-27', 'Platinum', '2023-01-05', 'REFCUST000015', 'Website Direct', true, 'active', '👨‍⚖️')
on conflict (id) do update set
  name = excluded.name,
  username = excluded.username,
  email = excluded.email,
  phone = excluded.phone,
  gender = excluded.gender,
  date_of_birth = excluded.date_of_birth,
  address = excluded.address,
  city = excluded.city,
  province = excluded.province,
  total_orders = excluded.total_orders,
  total_spent = excluded.total_spent,
  last_order = excluded.last_order,
  last_login = excluded.last_login,
  membership_level = excluded.membership_level,
  join_date = excluded.join_date,
  referral_code = excluded.referral_code,
  user_source = excluded.user_source,
  email_subscription = excluded.email_subscription,
  status = excluded.status,
  avatar = excluded.avatar;

create table if not exists public.feedback_complaints (
  id bigint generated always as identity primary key,
  user_id uuid references auth.users(id) on delete set null,
  name text not null,
  email text not null,
  type text not null check (type in ('feedback', 'complaint')),
  subject text not null,
  message text not null,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict (id) do update
set public = excluded.public;

alter table public.users enable row level security;
alter table public.feedback_complaints enable row level security;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.users (id, name, email, role, status, phone)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    new.email,
    coalesce(new.raw_user_meta_data->>'role', 'member'),
    'active',
    coalesce(new.raw_user_meta_data->>'phone', '')
  )
  on conflict (id) do update
  set
    name = excluded.name,
    email = excluded.email,
    role = excluded.role,
    phone = excluded.phone;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

create or replace function public.is_admin_user()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.users
    where id = auth.uid()
      and role in ('admin', 'owner', 'Manager', 'Owner')
  );
$$;

drop policy if exists "Users can read profiles" on public.users;
drop policy if exists "Users can create their own profile" on public.users;
drop policy if exists "Users can update their own profile" on public.users;
drop policy if exists "Admins can manage users" on public.users;

create policy "Users can read profiles"
on public.users for select
to authenticated
using (true);

create policy "Users can create their own profile"
on public.users for insert
to authenticated
with check (auth.uid() = id);

create policy "Users can update their own profile"
on public.users for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

create policy "Admins can manage users"
on public.users for all
to authenticated
using (public.is_admin_user())
with check (public.is_admin_user());

drop policy if exists "Public can read avatars" on storage.objects;
drop policy if exists "Users can upload own avatars" on storage.objects;
drop policy if exists "Users can update own avatars" on storage.objects;
drop policy if exists "Users can delete own avatars" on storage.objects;

create policy "Public can read avatars"
on storage.objects for select
to anon, authenticated
using (bucket_id = 'avatars');

create policy "Users can upload own avatars"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'avatars'
  and auth.uid()::text = (storage.foldername(name))[1]
);

create policy "Users can update own avatars"
on storage.objects for update
to authenticated
using (
  bucket_id = 'avatars'
  and auth.uid()::text = (storage.foldername(name))[1]
)
with check (
  bucket_id = 'avatars'
  and auth.uid()::text = (storage.foldername(name))[1]
);

create policy "Users can delete own avatars"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'avatars'
  and auth.uid()::text = (storage.foldername(name))[1]
);

drop policy if exists "Members can submit messages" on public.feedback_complaints;
drop policy if exists "Anyone can submit feedback complaints" on public.feedback_complaints;

create policy "Anyone can submit feedback complaints"
on public.feedback_complaints for insert
to anon, authenticated
with check (true);

create policy "Admins can manage messages"
on public.feedback_complaints for all
to authenticated
using (public.is_admin_user())
with check (public.is_admin_user());
