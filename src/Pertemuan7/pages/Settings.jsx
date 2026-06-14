import { useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader';
import { FiSave, FiUser, FiLock, FiPrinter, FiCamera } from 'react-icons/fi';
import { getCurrentSession, getUserProfile, uploadAvatarAndUpdateProfile } from '../services/supabaseApi';

const defaultUser = { name: 'Dipa Tranggana', role: 'Owner', avatar: 'DT' };

export default function Settings() {
  // Ambil data user dengan proteksi agar tidak crash jika localStorage kosong
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('user');
      return savedUser ? { ...defaultUser, ...JSON.parse(savedUser) } : defaultUser;
    } catch {
      return defaultUser;
    }
  });
  const [selectedAvatarFile, setSelectedAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState('');
  const [profileMessage, setProfileMessage] = useState('');
  const [profileError, setProfileError] = useState('');
  const [profileSaving, setProfileSaving] = useState(false);

  const [settings, setSettings] = useState({
    storeName: 'Format Ganjil Coffee',
    address: 'Jl. Kopi No. 45, Jakarta',
    phone: '+62 812-3456-7890',
    email: 'hello@FormatGanjil.com',
    taxRate: 11,
    currency: 'IDR',
    notifications: {
      email: true,
      sms: false,
      push: true
    },
    printer: {
      enabled: true,
      type: 'thermal',
      paperSize: '80mm'
    }
  });

  const handleInputChange = (field, value) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleNestedChange = (parent, field, value) => {
    setSettings(prev => ({
      ...prev,
      [parent]: { ...prev[parent], [field]: value }
    }));
  };

  const handleSave = () => {
    alert('Pengaturan toko berhasil disimpan!');
  };

  useEffect(() => {
    let isMounted = true;

    const loadProfile = async () => {
      try {
        const session = await getCurrentSession();
        if (!session?.user?.id) return;

        const profile = await getUserProfile(session.user.id);
        if (!profile || !isMounted) return;

        const nextUser = {
          id: profile.id,
          email: profile.email || session.user.email,
          name: profile.name || session.user.email,
          role: profile.role || 'member',
          status: profile.status || 'active',
          avatar: profile.avatar || '',
        };

        setUser((prev) => ({ ...prev, ...nextUser }));
        localStorage.setItem('user', JSON.stringify(nextUser));
        window.dispatchEvent(new Event('profile-updated'));
      } catch (error) {
        console.error('[Settings] Gagal memuat profil:', error);
      }
    };

    loadProfile();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleProfilePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedAvatarFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const isAvatarImage = (value) => {
    return typeof value === 'string' && (value.startsWith('http') || value.startsWith('data:image'));
  };

  const handleSaveProfile = async () => {
    setProfileMessage('');
    setProfileError('');
    setProfileSaving(true);

    try {
      const updatedProfile = await uploadAvatarAndUpdateProfile({
        file: selectedAvatarFile,
        name: user.name,
        role: user.role,
        currentAvatar: user.avatar,
      });

      const nextUser = { ...user, ...updatedProfile };
      setUser(nextUser);
      setSelectedAvatarFile(null);
      setAvatarPreview('');
      localStorage.setItem('user', JSON.stringify(nextUser));
      window.dispatchEvent(new Event('profile-updated'));
      setProfileMessage('Profil admin berhasil diperbarui.');
    } catch (error) {
      setProfileError(error.message || 'Profil gagal diperbarui.');
    } finally {
      setProfileSaving(false);
    }
  };

  const displayedAvatar = avatarPreview || user.avatar;

  return (
    <div className="animate-in fade-in duration-500 pb-10">
      {/* breadcrumb diganti jadi string agar tidak error di PageHeader */}
      <PageHeader 
        title="Pengaturan" 
        breadcrumb="Settings" 
      />

      <div className="space-y-6 mt-6">
        {/* Profile Photo Section */}
        <div className="bg-white rounded-[2rem] shadow-sm border border-coffee-100 p-8">
          <div className="flex items-center mb-6">
            <FiCamera className="w-5 h-5 text-coffee-900 mr-3" />
            <h3 className="text-lg font-black text-coffee-900">Foto Profil Admin</h3>
          </div>

          {profileMessage && (
            <div className="mb-5 p-4 rounded-2xl bg-green-50 text-green-700 text-sm font-bold">
              {profileMessage}
            </div>
          )}
          {profileError && (
            <div className="mb-5 p-4 rounded-2xl bg-red-50 text-red-700 text-sm font-bold">
              {profileError}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-[10px] font-black uppercase text-espresso-400 mb-2 ml-1">Nama Admin</label>
              <input
                type="text"
                value={user.name}
                onChange={(event) => setUser((prev) => ({ ...prev, name: event.target.value }))}
                className="w-full px-5 py-4 bg-coffee-50 border-none rounded-2xl focus:ring-2 focus:ring-coffee-200 outline-none font-bold text-coffee-900"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase text-espresso-400 mb-2 ml-1">Role</label>
              <input
                type="text"
                value={user.role}
                onChange={(event) => setUser((prev) => ({ ...prev, role: event.target.value }))}
                className="w-full px-5 py-4 bg-coffee-50 border-none rounded-2xl focus:ring-2 focus:ring-coffee-200 outline-none font-bold text-coffee-900"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-[2rem] overflow-hidden bg-coffee-900 flex items-center justify-center mb-4 shadow-lg text-white">
                {isAvatarImage(displayedAvatar) ? (
                  <img src={displayedAvatar} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-4xl font-black">{user.name?.charAt(0) || 'A'}</span>
                )}
              </div>
              <p className="text-xs font-bold text-espresso-400 uppercase tracking-widest">Avatar Saat Ini</p>
            </div>

            <div className="flex-1 w-full">
              <label className="block mb-4">
                <div className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-coffee-200 rounded-[2rem] cursor-pointer hover:bg-coffee-50 transition-all">
                  <FiCamera className="w-8 h-8 text-coffee-300 mb-2" />
                  <p className="text-sm text-espresso-700 font-bold">Klik untuk ganti foto</p>
                  <input type="file" accept="image/*" onChange={handleProfilePhotoChange} className="hidden" />
                </div>
              </label>
              <button
                onClick={handleSaveProfile}
                disabled={profileSaving}
                className="w-full bg-coffee-900 text-white font-bold py-4 rounded-2xl hover:bg-black transition-all active:scale-95"
              >
                {profileSaving ? 'Menyimpan...' : 'Simpan Profil'}
              </button>
            </div>
          </div>
        </div>

        {/* Store Information */}
        <div className="bg-white rounded-[2rem] shadow-sm border border-coffee-100 p-8">
          <div className="flex items-center mb-8">
            <FiUser className="w-5 h-5 text-coffee-900 mr-3" />
            <h3 className="text-lg font-black text-coffee-900">Informasi Toko</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[10px] font-black uppercase text-espresso-400 mb-2 ml-1">Nama Toko</label>
              <input
                type="text"
                value={settings.storeName}
                onChange={(e) => handleInputChange('storeName', e.target.value)}
                className="w-full px-5 py-4 bg-coffee-50 border-none rounded-2xl focus:ring-2 focus:ring-coffee-200 outline-none font-bold text-coffee-900"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase text-espresso-400 mb-2 ml-1">Email Bisnis</label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-5 py-4 bg-coffee-50 border-none rounded-2xl focus:ring-2 focus:ring-coffee-200 outline-none font-bold text-coffee-900"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-[10px] font-black uppercase text-espresso-400 mb-2 ml-1">Alamat Lengkap</label>
              <textarea
                value={settings.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                rows={2}
                className="w-full px-5 py-4 bg-coffee-50 border-none rounded-2xl focus:ring-2 focus:ring-coffee-200 outline-none font-bold text-coffee-900"
              />
            </div>
          </div>
        </div>

        {/* Business & Printer Settings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-[2rem] shadow-sm border border-coffee-100 p-8">
            <h3 className="text-lg font-black text-coffee-900 mb-6 flex items-center gap-2">
              <FiLock className="text-coffee-900" /> Sistem
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-black text-espresso-400 mb-2">Pajak (%)</label>
                <input
                  type="number"
                  value={settings.taxRate}
                  onChange={(e) => handleInputChange('taxRate', e.target.value)}
                  className="w-full px-5 py-3 bg-coffee-50 border-none rounded-xl font-bold"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-espresso-400 mb-2">Mata Uang</label>
                <select 
                  value={settings.currency}
                  onChange={(e) => handleInputChange('currency', e.target.value)}
                  className="w-full px-5 py-3 bg-coffee-50 border-none rounded-xl font-bold"
                >
                  <option value="IDR">IDR (Rp)</option>
                  <option value="USD">USD ($)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[2rem] shadow-sm border border-coffee-100 p-8">
            <h3 className="text-lg font-black text-coffee-900 mb-6 flex items-center gap-2">
              <FiPrinter className="text-coffee-900" /> Struk / Printer
            </h3>
            <div className="space-y-4">
               <div className="flex items-center justify-between p-4 bg-coffee-50 rounded-2xl">
                  <span className="text-sm font-bold text-coffee-900">Status Printer</span>
                  <input 
                    type="checkbox" 
                    checked={settings.printer.enabled}
                    onChange={(e) => handleNestedChange('printer', 'enabled', e.target.checked)}
                    className="w-5 h-5 accent-coffee-900"
                  />
               </div>
               <select 
                  value={settings.printer.paperSize}
                  onChange={(e) => handleNestedChange('printer', 'paperSize', e.target.value)}
                  className="w-full px-5 py-3 bg-coffee-50 border-none rounded-xl font-bold"
                >
                  <option value="58mm">Thermal 58mm</option>
                  <option value="80mm">Thermal 80mm</option>
                </select>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-4">
          <button
            onClick={handleSave}
            className="inline-flex items-center gap-3 px-10 py-4 bg-coffee-900 text-white rounded-2xl hover:bg-black transition-all font-black uppercase tracking-widest shadow-xl shadow-coffee-900/20 active:scale-95"
          >
            <FiSave /> Simpan Semua
          </button>
        </div>
      </div>
    </div>
  );
}
