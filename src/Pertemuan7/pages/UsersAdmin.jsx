import { useEffect, useMemo, useState } from 'react';
import { FiEdit2, FiPlus, FiRefreshCw, FiTrash2 } from 'react-icons/fi';
import PageHeader from '../components/PageHeader';
import { createUser, deleteUser, fetchUsers, updateUser } from '../services/supabaseApi';

const emptyForm = {
  name: '',
  email: '',
  phone: '',
  role: 'member',
  status: 'active',
  password: '',
};

export default function UsersAdmin() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  const loadUsers = async () => {
    setIsLoading(true);
    setError('');
    try {
      setUsers(await fetchUsers());
    } catch (loadError) {
      setError(loadError.message || 'Gagal memuat data user.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    const keyword = searchTerm.toLowerCase();
    return users.filter((user) =>
      [user.name, user.email, user.role, user.status].some((value) =>
        String(value || '').toLowerCase().includes(keyword)
      )
    );
  }, [users, searchTerm]);

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!form.name || !form.email) {
      setError('Nama dan email wajib diisi.');
      return;
    }

    if (!editingId && !form.password) {
      setError('Password wajib diisi untuk membuat akun login baru.');
      return;
    }

    if (!editingId && form.password.length < 6) {
      setError('Password minimal 6 karakter.');
      return;
    }

    setIsSaving(true);
    try {
      if (editingId) {
        const updatedUser = await updateUser(editingId, form);
        setUsers((current) => current.map((user) => (user.id === editingId ? updatedUser : user)));
      } else {
        const createdUser = await createUser(form);
        setUsers((current) => [createdUser, ...current]);
      }
      resetForm();
    } catch (saveError) {
      setError(saveError.message || 'Gagal menyimpan user.');
    } finally {
      setIsSaving(false);
    }
  };

  const startEdit = (user) => {
    setEditingId(user.id);
    setForm({
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || '',
      role: user.role || 'member',
      status: user.status || 'active',
      password: '',
    });
  };

  const handleDelete = async (userId) => {
    const confirmed = window.confirm('Hapus user ini dari tabel users?');
    if (!confirmed) return;

    try {
      await deleteUser(userId);
      setUsers((current) => current.filter((user) => user.id !== userId));
    } catch (deleteError) {
      setError(deleteError.message || 'Gagal menghapus user.');
    }
  };

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <PageHeader title="Data User" breadcrumb="Supabase User CRUD" />
        <button
          type="button"
          onClick={loadUsers}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-white border border-coffee-100 rounded-2xl font-bold text-coffee-900 hover:bg-coffee-50"
        >
          <FiRefreshCw /> Refresh
        </button>
      </div>

      {error && <div className="mb-5 p-4 rounded-2xl bg-red-50 text-red-700 font-bold text-sm">{error}</div>}

      <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-6">
        <form onSubmit={handleSubmit} className="bg-white border border-coffee-100 rounded-[2rem] p-6 shadow-sm h-fit">
          <div className="flex items-center gap-2 mb-5">
            <FiPlus className="text-coffee-900" />
            <h2 className="font-black text-coffee-900">{editingId ? 'Edit User' : 'Tambah User'}</h2>
          </div>

          <div className="space-y-4">
            <input
              value={form.name}
              onChange={(event) => updateField('name', event.target.value)}
              className="w-full px-5 py-4 bg-coffee-50 rounded-2xl outline-none focus:ring-2 focus:ring-coffee-200"
              placeholder="Nama"
            />
            <input
              type="email"
              value={form.email}
              onChange={(event) => updateField('email', event.target.value)}
              className="w-full px-5 py-4 bg-coffee-50 rounded-2xl outline-none focus:ring-2 focus:ring-coffee-200"
              placeholder="Email"
            />
            <input
              value={form.phone}
              onChange={(event) => updateField('phone', event.target.value)}
              className="w-full px-5 py-4 bg-coffee-50 rounded-2xl outline-none focus:ring-2 focus:ring-coffee-200"
              placeholder="No. HP"
            />
            <div className="grid grid-cols-2 gap-3">
              <select
                value={form.role}
                onChange={(event) => updateField('role', event.target.value)}
                className="px-4 py-4 bg-coffee-50 rounded-2xl outline-none focus:ring-2 focus:ring-coffee-200 font-bold"
              >
                <option value="member">Member</option>
                <option value="admin">Admin</option>
                <option value="owner">Owner</option>
              </select>
              <select
                value={form.status}
                onChange={(event) => updateField('status', event.target.value)}
                className="px-4 py-4 bg-coffee-50 rounded-2xl outline-none focus:ring-2 focus:ring-coffee-200 font-bold"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            {!editingId && (
              <input
                type="password"
                value={form.password}
                onChange={(event) => updateField('password', event.target.value)}
                className="w-full px-5 py-4 bg-coffee-50 rounded-2xl outline-none focus:ring-2 focus:ring-coffee-200"
                placeholder="Password login baru"
              />
            )}
          </div>

          <div className="flex gap-3 mt-5">
            <button
              type="submit"
              disabled={isSaving}
              className="flex-1 py-4 bg-coffee-900 text-white rounded-2xl font-black hover:bg-black disabled:opacity-70"
            >
              {isSaving ? 'Menyimpan...' : 'Simpan'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="px-5 py-4 bg-coffee-50 rounded-2xl font-black text-coffee-900"
              >
                Batal
              </button>
            )}
          </div>
        </form>

        <section className="bg-white border border-coffee-100 rounded-[2rem] p-6 shadow-sm">
          <input
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className="w-full px-5 py-4 bg-coffee-50 rounded-2xl outline-none focus:ring-2 focus:ring-coffee-200 mb-5"
            placeholder="Cari nama, email, role, status..."
          />

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] uppercase tracking-widest text-espresso-400 border-b border-coffee-100">
                  <th className="py-3">User</th>
                  <th className="py-3">Role</th>
                  <th className="py-3">Status</th>
                  <th className="py-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-espresso-400 font-bold">Memuat data...</td>
                  </tr>
                ) : filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-espresso-400 font-bold">Belum ada user.</td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b border-coffee-50">
                      <td className="py-4">
                        <p className="font-black text-coffee-900">{user.name}</p>
                        <p className="text-xs text-espresso-400">{user.email}</p>
                      </td>
                      <td className="py-4 font-bold text-coffee-900 capitalize">{user.role}</td>
                      <td className="py-4">
                        <span className="px-3 py-1 rounded-full bg-coffee-50 text-xs font-black capitalize text-coffee-900">
                          {user.status}
                        </span>
                      </td>
                      <td className="py-4">
                        <div className="flex justify-end gap-2">
                          <button onClick={() => startEdit(user)} className="p-3 rounded-xl bg-blue-50 text-blue-700">
                            <FiEdit2 />
                          </button>
                          <button onClick={() => handleDelete(user.id)} className="p-3 rounded-xl bg-red-50 text-red-700">
                            <FiTrash2 />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
