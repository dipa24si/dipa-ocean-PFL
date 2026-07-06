-- Seeding public.products (15 items)
insert into public.products (id, name, category, description, price, stock, available)
values
  (1, 'Espresso', 'Coffee', 'Kopi espresso klasik dengan rasa kuat dan kaya', 15000, 24, true),
  (2, 'Cappuccino', 'Coffee', 'Espresso dengan susu steamed dan foam lembut', 25000, 18, true),
  (3, 'Iced Latte', 'Cold Drinks', 'Latte dingin dengan susu dan es', 28000, 12, true),
  (4, 'Chocolate Cake', 'Dessert', 'Kue coklat moist dengan frosting lezat', 35000, 7, true),
  (5, 'Muffin Blueberry', 'Dessert', 'Muffin lembut dengan potongan blueberry', 20000, 14, false),
  (6, 'Americano', 'Coffee', 'Espresso dicampur air panas untuk rasa kopi yang halus', 18000, 30, true),
  (7, 'Flat White', 'Coffee', 'Espresso dengan susu micro-foam bertekstur halus', 26000, 15, true),
  (8, 'Caramel Macchiato', 'Cold Drinks', 'Kopi susu dingin dengan sirup caramel manis', 32000, 20, true),
  (9, 'Hazelnut Latte', 'Cold Drinks', 'Kopi susu dingin dengan rasa hazelnut gurih', 30000, 18, true),
  (10, 'Matcha Latte', 'Cold Drinks', 'Susu matcha premium khas Jepang yang creamy', 28000, 22, true),
  (11, 'Croissant Butter', 'Dessert', 'Roti pastry mentega Prancis yang renyah dan gurih', 20000, 10, true),
  (12, 'Cinnamon Roll', 'Dessert', 'Roti kayu manis panggang dengan icing gula manis', 22000, 8, true),
  (13, 'Affogato', 'Dessert', 'Es krim vanilla lembut disiram espresso panas', 25000, 12, true),
  (14, 'Cold Brew', 'Coffee', 'Kopi seduh dingin selama 12 jam dengan rasa segar', 25000, 15, true),
  (15, 'Mocha Latte', 'Coffee', 'Espresso dicampur susu cokelat premium dan susu steamed', 28000, 14, true)
on conflict (id) do update set
  name = excluded.name,
  category = excluded.category,
  description = excluded.description,
  price = excluded.price,
  stock = excluded.stock,
  available = excluded.available;
