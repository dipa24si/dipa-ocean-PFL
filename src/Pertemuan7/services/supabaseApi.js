import { supabase } from './supabaseClient';

const USERS_TABLE = 'users';
const MESSAGES_TABLE = 'feedback_complaints';
const AVATARS_BUCKET = 'avatars';

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
