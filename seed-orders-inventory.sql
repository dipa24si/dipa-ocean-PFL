-- Seeding public.inventory (15 items)
insert into public.inventory (id, name, category, stock, min_stock, unit, price, supplier)
values
  (1, 'Biji Kopi Arabica', 'Biji Kopi', 25, 10, 'kg', 'Rp 150.000', 'PT Kopi Nusantara'),
  (2, 'Susu Full Cream', 'Susu', 8, 15, 'liter', 'Rp 25.000', 'CV Susu Sejahtera'),
  (3, 'Gula Pasir', 'Pemanis', 50, 20, 'kg', 'Rp 15.000', 'Toko Grosir ABC'),
  (4, 'Syrup Vanilla', 'Syrup', 12, 5, 'botol', 'Rp 45.000', 'Importir Syrup'),
  (5, 'Gula Aren', 'Pemanis', 20, 5, 'kg', 'Rp 18.000', 'Toko Grosir ABC'),
  (6, 'Biji Kopi Robusta', 'Biji Kopi', 30, 10, 'kg', 'Rp 120.000', 'PT Kopi Nusantara'),
  (7, 'Syrup Caramel', 'Syrup', 15, 5, 'botol', 'Rp 45.000', 'Importir Syrup'),
  (8, 'Syrup Hazelnut', 'Syrup', 10, 5, 'botol', 'Rp 45.000', 'Importir Syrup'),
  (9, 'Susu Oat', 'Susu', 12, 5, 'liter', 'Rp 35.000', 'CV Susu Sejahtera'),
  (10, 'Cokelat Bubuk', 'Pemanis', 15, 5, 'kg', 'Rp 75.000', 'Toko Grosir ABC'),
  (11, 'Matcha Powder', 'Teh', 8, 3, 'kg', 'Rp 180.000', 'Importir Premium'),
  (12, 'Paper Cup 8oz', 'Kemasan', 500, 100, 'pcs', 'Rp 800', 'Toko Kemasan Jaya'),
  (13, 'Plastic Cup 16oz', 'Kemasan', 800, 150, 'pcs', 'Rp 1.000', 'Toko Kemasan Jaya'),
  (14, 'Sedotan Bambu', 'Kemasan', 300, 50, 'pcs', 'Rp 500', 'Toko Kemasan Jaya'),
  (15, 'Tea Bag Jasmine', 'Teh', 100, 20, 'pcs', 'Rp 1.500', 'Toko Grosir ABC')
on conflict (id) do update set
  name = excluded.name,
  category = excluded.category,
  stock = excluded.stock,
  min_stock = excluded.min_stock,
  unit = excluded.unit,
  price = excluded.price,
  supplier = excluded.supplier;

-- Seeding public.orders (15 items)
insert into public.orders (id, customer_id, items, total, status, order_date, payment_method, delivery_address)
values
  ('#1023', 1, 'Espresso, Croissant', 'Rp 45.000', 'Completed', '2026-06-10', 'Cash', 'Jalan Merdeka No. 45'),
  ('#1024', 2, 'Iced Latte', 'Rp 28.000', 'Processing', '2026-06-12', 'OVO', 'Jalan Sudirman No. 123'),
  ('#1025', 3, 'Latte, Chocolate Cake', 'Rp 63.000', 'Pending', '2026-06-15', 'GoPay', 'Jalan Gatot Subroto No. 67'),
  ('#1026', 4, 'Cappuccino, Blueberry Muffin', 'Rp 45.000', 'Completed', '2026-07-01', 'Cash', 'Jalan Ahmad Yani No. 89'),
  ('#1027', 5, 'Matcha Latte, Croissant', 'Rp 53.000', 'Completed', '2026-07-02', 'Debit', 'Jalan Diponegoro No. 34'),
  ('#1028', 6, 'Americano', 'Rp 20.000', 'Completed', '2026-07-03', 'GoPay', 'Jalan Merdeka No. 102'),
  ('#1029', 7, 'Caramel Macchiato, Chocolate Cake', 'Rp 70.000', 'Processing', '2026-07-04', 'ShopeePay', 'Jalan Sudirman No. 156'),
  ('#1030', 8, 'Ice Tea, Waffle', 'Rp 35.000', 'Pending', '2026-07-04', 'OVO', 'Jalan Gatot Subroto No. 45'),
  ('#1031', 9, 'Vanilla Latte, Brownies', 'Rp 48.000', 'Cancelled', '2026-07-05', 'GoPay', 'Jalan Ahmad Yani No. 78'),
  ('#1032', 10, 'Hazelnut Latte', 'Rp 30.000', 'Completed', '2026-07-05', 'Cash', 'Jalan Diponegoro No. 90'),
  ('#1033', 11, 'Espresso Double, Croissant', 'Rp 50.000', 'Completed', '2026-07-06', 'Debit', 'Jalan Merdeka No. 234'),
  ('#1034', 12, 'Affogato', 'Rp 28.000', 'Completed', '2026-07-06', 'GoPay', 'Jalan Sudirman No. 345'),
  ('#1035', 13, 'Cold Brew, Chocolate Muffin', 'Rp 45.000', 'Processing', '2026-07-06', 'OVO', 'Jalan Gatot Subroto No. 456'),
  ('#1036', 14, 'Flat White', 'Rp 27.000', 'Completed', '2026-07-06', 'Cash', 'Jalan Ahmad Yani No. 567'),
  ('#1037', 15, 'Mocha Latte, Waffle', 'Rp 58.000', 'Completed', '2026-07-06', 'GoPay', 'Jalan Diponegoro No. 678')
on conflict (id) do update set
  customer_id = excluded.customer_id,
  items = excluded.items,
  total = excluded.total,
  status = excluded.status,
  order_date = excluded.order_date,
  payment_method = excluded.payment_method,
  delivery_address = excluded.delivery_address;
