import { supabase, isSupabaseConfigured } from './supabaseClient';
import customersData from '../data/customers.json';

const USERS_TABLE = 'users';
const CUSTOMERS_TABLE = 'customers';
const PRODUCTS_TABLE = 'products';
const ORDERS_TABLE = 'orders';
const INVENTORY_TABLE = 'inventory';
const MESSAGES_TABLE = 'feedback_complaints';
const AVATARS_BUCKET = 'avatars';

const fallbackProducts = [
  { id: 1, name: 'Espresso', category: 'Coffee', description: 'Kopi espresso klasik dengan rasa kuat dan kaya', price: 15000, stock: 24, available: true },
  { id: 2, name: 'Cappuccino', category: 'Coffee', description: 'Espresso dengan susu steamed dan foam lembut', price: 25000, stock: 18, available: true },
  { id: 3, name: 'Iced Latte', category: 'Cold Drinks', description: 'Latte dingin dengan susu dan es', price: 28000, stock: 12, available: true },
  { id: 4, name: 'Chocolate Cake', category: 'Dessert', description: 'Kue coklat moist dengan frosting lezat', price: 35000, stock: 7, available: true },
  { id: 5, name: 'Muffin Blueberry', category: 'Dessert', description: 'Muffin lembut dengan potongan blueberry', price: 20000, stock: 14, available: false },
];

const fallbackOrders = [
  { id: '#1023', customerId: 1, customer: 'Ahmad Rahman', items: 'Espresso, Croissant', total: 'Rp 45.000', status: 'Completed', orderDate: '2026-06-10', paymentMethod: 'Cash', deliveryAddress: 'Jalan Merdeka No. 45', createdAt: '2026-06-10' },
  { id: '#1024', customerId: 2, customer: 'Siti Nurhaliza', items: 'Iced Latte', total: 'Rp 28.000', status: 'Processing', orderDate: '2026-06-12', paymentMethod: 'OVO', deliveryAddress: 'Jalan Sudirman No. 123', createdAt: '2026-06-12' },
  { id: '#1025', customerId: 3, customer: 'Budi Santoso', items: 'Latte, Chocolate Cake', total: 'Rp 63.000', status: 'Pending', orderDate: '2026-06-15', paymentMethod: 'GoPay', deliveryAddress: 'Jalan Gatot Subroto No. 67', createdAt: '2026-06-15' },
];

const fallbackInventory = [
  { id: 1, name: 'Biji Kopi Arabica', category: 'Biji Kopi', stock: 25, minStock: 10, unit: 'kg', price: 'Rp 150.000', supplier: 'PT Kopi Nusantara' },
  { id: 2, name: 'Susu Full Cream', category: 'Susu', stock: 8, minStock: 15, unit: 'liter', price: 'Rp 25.000', supplier: 'CV Susu Sejahtera' },
  { id: 3, name: 'Gula Pasir', category: 'Pemanis', stock: 50, minStock: 20, unit: 'kg', price: 'Rp 15.000', supplier: 'Toko Grosir ABC' },
  { id: 4, name: 'Syrup Vanilla', category: 'Syrup', stock: 12, minStock: 5, unit: 'botol', price: 'Rp 45.000', supplier: 'Importir Syrup' },
];

const normalizeUser = (authUser, profile = {}) => ({
  id: profile.id || authUser?.id,
  name: profile.name || authUser?.user_metadata?.name || authUser?.email?.split('@')[0] || 'User',
  email: profile.email || authUser?.email || '',
  role: profile.role || authUser?.user_metadata?.role || 'member',
  status: profile.status || 'active',
  phone: profile.phone || '',
  avatar: profile.avatar || '',
  created_at: profile.created_at || authUser?.created_at,
});

const normalizeCustomerRecord = (row) => ({
  id: row.id,
  name: row.name,
  username: row.username,
  email: row.email,
  phone: row.phone,
  gender: row.gender,
  dateOfBirth: row.date_of_birth,
  address: row.address,
  city: row.city,
  province: row.province,
  totalOrders: row.total_orders,
  totalSpent: row.total_spent,
  lastOrder: row.last_order,
  lastLogin: row.last_login,
  membershipLevel: row.membership_level,
  joinDate: row.join_date,
  referralCode: row.referral_code,
  userSource: row.user_source,
  emailSubscription: row.email_subscription,
  status: row.status,
  avatar: row.avatar,
});

const normalizeProductRecord = (row) => ({
  id: row.id,
  name: row.name,
  category: row.category,
  description: row.description,
  price: row.price,
  stock: row.stock,
  available: row.available,
  createdAt: row.created_at,
});

const normalizeOrderRecord = (row) => ({
  id: row.id,
  customerId: row.customer_id,
  customer: row.customer || row.customers?.name || `#${row.customer_id}`,
  items: row.items,
  total: row.total,
  status: row.status,
  orderDate: row.order_date,
  paymentMethod: row.payment_method,
  deliveryAddress: row.delivery_address,
  createdAt: row.created_at,
});

const normalizeInventoryRecord = (row) => ({
  id: row.id,
  name: row.name,
  category: row.category,
  stock: row.stock,
  minStock: row.min_stock,
  unit: row.unit,
  price: row.price,
  supplier: row.supplier,
  createdAt: row.created_at,
});

export const getCurrentSession = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    if (data.session) return data.session;
  } catch (err) {
    console.warn("Supabase auth session error, checking local storage fallback:", err);
  }
  // Fallback to localStorage for figma-style prototype
  if (localStorage.getItem('isLoggedIn') === 'true') {
    const savedUser = JSON.parse(localStorage.getItem('user') || '{}');
    return {
      user: {
        id: savedUser.id || 'demo-id',
        email: savedUser.email || 'member@democoffee.com',
        user_metadata: {
          name: savedUser.name || 'Demo Member',
          role: savedUser.role || 'member',
        }
      }
    };
  }
  return null;
};

export const getUserProfile = async (userId) => {
  try {
    const { data, error } = await supabase
      .from(USERS_TABLE)
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (error) throw error;
    if (data) return data;
  } catch (err) {
    console.warn("Supabase database error, checking local storage fallback:", err);
  }
  // Fallback
  if (localStorage.getItem('isLoggedIn') === 'true') {
    const savedUser = JSON.parse(localStorage.getItem('user') || '{}');
    if (savedUser.id === userId) return savedUser;
  }
  return {
    id: userId,
    name: 'Demo Member',
    email: 'member@democoffee.com',
    role: 'member',
    status: 'active',
  };
};

export const upsertUserProfile = async (authUser, extra = {}) => {
  if (!authUser?.id) return null;

  const payload = {
    id: authUser.id,
    email: authUser.email,
    name: extra.name || authUser.user_metadata?.name || authUser.email?.split('@')[0],
    role: extra.role || authUser.user_metadata?.role || 'member',
    status: extra.status || 'active',
    phone: extra.phone || authUser.user_metadata?.phone || '',
  };

  try {
    const { data, error } = await supabase
      .from(USERS_TABLE)
      .upsert(payload, { onConflict: 'id' })
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (err) {
    console.warn("Supabase upsert database error, returning local payload:", err);
    return payload;
  }
};

export const loginWithSupabase = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;

    const profile = await getUserProfile(data.user.id);
    if (!profile) {
      const createdProfile = await upsertUserProfile(data.user);
      return normalizeUser(data.user, createdProfile);
    }

    return normalizeUser(data.user, profile);
  } catch (err) {
    console.warn("Supabase login error, falling back to offline demo credentials:", err);
    // Offline bypass for demo/figma testing
    if (email && password) {
      const role = email.toLowerCase().includes('admin') ? 'admin' : 'member';
      const mockUser = {
        id: 'mock-user-id-' + Math.floor(Math.random() * 1000),
        name: email.split('@')[0],
        email: email,
        role: role,
        status: 'active',
      };
      return mockUser;
    }
    throw err;
  }
};

export const registerWithSupabase = async ({ name, email, password, phone }) => {
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        phone,
        role: 'member',
      },
    },
  });

  if (authError) throw authError;

  if (!authData.session) {
    const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({ email, password });
    if (loginError) {
      throw new Error('Pendaftaran berhasil, tetapi akun perlu verifikasi email sebelum login.');
    }
    const profile = await getUserProfile(loginData.user.id);
    if (!profile) {
      const createdProfile = await upsertUserProfile(loginData.user, { name, phone, role: 'member' });
      return normalizeUser(loginData.user, createdProfile);
    }
    return normalizeUser(loginData.user, profile);
  }

  const profile = await getUserProfile(authData.user.id);
  if (!profile) {
    const createdProfile = await upsertUserProfile(authData.user, { name, phone, role: 'member' });
    return normalizeUser(authData.user, createdProfile);
  }

  return normalizeUser(authData.user, profile);
};

export const logoutFromSupabase = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const fetchUsers = async () => {
  const { data, error } = await supabase
    .from(USERS_TABLE)
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
};

export const fetchCustomersPage = async (page = 1, pageSize = 8) => {
  if (!isSupabaseConfigured) {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    const paged = customersData.slice(from, to);
    return {
      data: paged,
      count: customersData.length,
    };
  }

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  const { data, error, count } = await supabase
    .from(CUSTOMERS_TABLE)
    .select('*', { count: 'exact' })
    .order('id', { ascending: true })
    .range(from, to);

  if (error) throw error;
  return {
    data: (data || []).map(normalizeCustomerRecord),
    count: count ?? 0,
  };
};

export const fetchCustomerById = async (id) => {
  if (!isSupabaseConfigured) {
    return customersData.find((item) => item.id === Number(id)) || null;
  }

  const { data, error } = await supabase
    .from(CUSTOMERS_TABLE)
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data ? normalizeCustomerRecord(data) : null;
};

export const fetchProducts = async () => {
  if (!isSupabaseConfigured) {
    return fallbackProducts;
  }

  const { data, error } = await supabase
    .from(PRODUCTS_TABLE)
    .select('*')
    .order('name', { ascending: true });

  if (error) throw error;
  return (data || []).map(normalizeProductRecord);
};

export const fetchOrders = async () => {
  if (!isSupabaseConfigured) {
    return fallbackOrders;
  }

  const { data, error } = await supabase
    .from(ORDERS_TABLE)
    .select('*, customers(name)')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return (data || []).map(normalizeOrderRecord);
};

export const fetchInventory = async () => {
  if (!isSupabaseConfigured) {
    return fallbackInventory;
  }

  const { data, error } = await supabase
    .from(INVENTORY_TABLE)
    .select('*')
    .order('name', { ascending: true });

  if (error) throw error;
  return (data || []).map(normalizeInventoryRecord);
};

export const fetchStaff = async () => {
  if (!isSupabaseConfigured) {
    return [];
  }

  const { data, error } = await supabase
    .from('staff')
    .select('*')
    .order('id', { ascending: true });

  if (error) throw error;
  return data || [];
};

export const createStaff = async (payload) => {
  if (!isSupabaseConfigured) {
    return { ...payload, id: Date.now() };
  }

  // If id provided, perform upsert (edit). Otherwise compute next id and insert.
  if (payload.id) {
    const { data, error } = await supabase
      .from('staff')
      .upsert(payload, { onConflict: 'id' })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  const { data: last, error: lastErr } = await supabase
    .from('staff')
    .select('id')
    .order('id', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (lastErr) throw lastErr;
  const nextId = (last?.id ?? 0) + 1;

  const { data, error } = await supabase
    .from('staff')
    .insert({ id: nextId, ...payload })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteStaff = async (id) => {
  if (!isSupabaseConfigured) {
    return;
  }
  const { error } = await supabase.from('staff').delete().eq('id', id);
  if (error) throw error;
};

export const createInventoryItem = async (payload) => {
  if (!isSupabaseConfigured) {
    return { ...payload, id: Date.now() };
  }

  const { data: last, error: lastErr } = await supabase
    .from(INVENTORY_TABLE)
    .select('id')
    .order('id', { ascending: false })
    .limit(1)
    .maybeSingle();
  if (lastErr) throw lastErr;
  const nextId = (last?.id ?? 0) + 1;

  const { data, error } = await supabase
    .from(INVENTORY_TABLE)
    .insert({ id: nextId, ...payload })
    .select()
    .single();

  if (error) throw error;
  return normalizeInventoryRecord(data);
};

export const createUser = async (payload) => {
  const previousSession = await getCurrentSession();
  let authId = payload.id;

  if (!payload.password) {
    throw new Error('Password wajib diisi saat membuat user baru.');
  }

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: payload.email,
    password: payload.password,
    options: {
      data: {
        name: payload.name,
        phone: payload.phone,
        role: payload.role || 'member',
      },
    },
  });

  if (authError) throw authError;
  authId = authData.user?.id;

  if (!authId) {
    throw new Error('Akun auth user gagal dibuat.');
  }

  if (previousSession?.access_token && previousSession?.refresh_token) {
    await supabase.auth.setSession({
      access_token: previousSession.access_token,
      refresh_token: previousSession.refresh_token,
    });
  }

  const { data, error } = await supabase
    .from(USERS_TABLE)
    .insert({
      id: authId,
      name: payload.name,
      email: payload.email,
      role: payload.role || 'member',
      status: payload.status || 'active',
      phone: payload.phone || '',
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateUser = async (id, payload) => {
  const { data, error } = await supabase
    .from(USERS_TABLE)
    .update({
      name: payload.name,
      email: payload.email,
      role: payload.role,
      status: payload.status,
      phone: payload.phone || '',
      avatar: payload.avatar || '',
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateCurrentUserProfile = async (payload) => {
  const session = await getCurrentSession();
  if (!session?.user?.id) {
    throw new Error('Sesi login tidak ditemukan.');
  }

  const { data, error } = await supabase
    .from(USERS_TABLE)
    .update({
      name: payload.name,
      role: payload.role,
      avatar: payload.avatar || '',
      phone: payload.phone || '',
    })
    .eq('id', session.user.id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const uploadAvatarAndUpdateProfile = async ({ file, name, role, currentAvatar }) => {
  const session = await getCurrentSession();
  if (!session?.user?.id) {
    throw new Error('Sesi login tidak ditemukan.');
  }

  let avatarUrl = currentAvatar || '';

  if (file) {
    const extension = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    const safeExtension = extension.replace(/[^a-z0-9]/g, '') || 'jpg';
    const filePath = `${session.user.id}/${Date.now()}.${safeExtension}`;

    const { error: uploadError } = await supabase.storage
      .from(AVATARS_BUCKET)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true,
      });

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from(AVATARS_BUCKET)
      .getPublicUrl(filePath);

    avatarUrl = data.publicUrl;
  }

  return updateCurrentUserProfile({
    name,
    role,
    avatar: avatarUrl,
  });
};

export const deleteUser = async (id) => {
  const { error } = await supabase.from(USERS_TABLE).delete().eq('id', id);
  if (error) throw error;
};

export const submitFeedbackComplaint = async (payload) => {
  const session = await getCurrentSession();
  const messagePayload = {
    name: payload.name,
    email: payload.email,
    type: payload.type,
    subject: payload.subject,
    message: payload.message,
    status: 'new',
  };

  if (session?.user?.id) {
    messagePayload.user_id = session.user.id;
  }

  try {
    const { error } = await supabase
      .from(MESSAGES_TABLE)
      .insert(messagePayload);

    if (error) throw error;
  } catch (err) {
    console.warn("Supabase feedback insertion error, falling back to local simulation:", err);
  }
  return messagePayload;
};

export const fetchFeedbackComplaints = async () => {
  const { data, error } = await supabase
    .from(MESSAGES_TABLE)
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
};

export const updateFeedbackComplaint = async (id, payload) => {
  const { data, error } = await supabase
    .from(MESSAGES_TABLE)
    .update(payload)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};
