import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import { FiSave, FiUser, FiLock, FiBell, FiPrinter, FiCamera } from 'react-icons/fi';

/**
 * Settings Page Component
 * Halaman untuk pengaturan aplikasi
 */
export default function Settings() {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user') || '{}'));
  const [settings, setSettings] = useState({
    storeName: 'NgopiEuy Coffee Shop',
    address: 'Jl. Sudirman No. 123, Jakarta',
    phone: '+62 21-1234-5678',
    email: 'info@ngopieuy.com',
    taxRate: 10,
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
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNestedChange = (parent, field, value) => {
    setSettings(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value
      }
    }));
  };

  const handleSave = () => {
    // Update user in localStorage
    localStorage.setItem('user', JSON.stringify(user));
    // Simpan pengaturan (dalam aplikasi nyata, ini akan dikirim ke API)
    alert('Pengaturan berhasil disimpan!');
  };

  const handleProfilePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      setUser(prev => ({
        ...prev,
        avatar: base64String
      }));
    };
    reader.readAsDataURL(file);
  };

  const isAvatarImage = (value) => {
    return typeof value === 'string' && (value.startsWith('http') || value.startsWith('/') || value.startsWith('data:'));
  };

  const handleSaveProfile = () => {
    localStorage.setItem('user', JSON.stringify(user));
    alert('Foto profil berhasil diubah!');
  };

  return (
    <>
      <PageHeader
        title="Pengaturan"
        breadcrumb={[
          { label: "Dashboard", path: "/dashboard" },
          { label: "Pengaturan" }
        ]}
      />

      <div className="space-y-6">
        {/* Profile Photo Section */}
        <div className="bg-white rounded-lg shadow-sm border border-espresso-200 p-6">
          <div className="flex items-center mb-6">
            <FiCamera className="w-5 h-5 text-coffee-600 mr-2" />
            <h3 className="text-lg font-semibold text-espresso-900">Foto Profil</h3>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-8">
            {/* Current Profile Photo */}
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-coffee-500 to-brew-500 flex items-center justify-center mb-4">
                {isAvatarImage(user.avatar) ? (
                  <img
                    src={user.avatar}
                    alt={user.name || 'Profile'}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-5xl font-bold text-white">{user.avatar || 'JD'}</span>
                )}
              </div>
              <p className="text-sm text-espresso-600 text-center">Foto Profil Saat Ini</p>
            </div>

            {/* Upload Section */}
            <div className="flex-1">
              <label className="block mb-4">
                <div className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-espresso-300 rounded-lg cursor-pointer hover:bg-espresso-50 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <FiCamera className="w-8 h-8 text-coffee-600 mb-2" />
                    <p className="text-sm text-espresso-700"><span className="font-semibold">Klik untuk pilih foto</span></p>
                    <p className="text-xs text-espresso-600">atau drag & drop di sini</p>
                    <p className="text-xs text-espresso-500 mt-1">PNG, JPG, GIF sampai 5MB</p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePhotoChange}
                    className="hidden"
                  />
                </div>
              </label>
              <button
                onClick={handleSaveProfile}
                className="w-full bg-coffee-600 hover:bg-coffee-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Simpan Foto Profil
              </button>
            </div>
          </div>
        </div>

        {/* Store Information */}

        <div className="bg-white rounded-lg shadow-sm border border-espresso-200 p-6">
          <div className="flex items-center mb-6">
            <FiUser className="w-5 h-5 text-coffee-600 mr-2" />
            <h3 className="text-lg font-semibold text-espresso-900">Informasi Toko</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-espresso-700 mb-2">
                Nama Toko
              </label>
              <input
                type="text"
                value={settings.storeName}
                onChange={(e) => handleInputChange('storeName', e.target.value)}
                className="w-full px-3 py-2 border border-espresso-300 rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-espresso-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-3 py-2 border border-espresso-300 rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-espresso-700 mb-2">
                Alamat
              </label>
              <textarea
                value={settings.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-espresso-300 rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-espresso-700 mb-2">
                Telepon
              </label>
              <input
                type="tel"
                value={settings.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full px-3 py-2 border border-espresso-300 rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Business Settings */}
        <div className="bg-white rounded-lg shadow-sm border border-espresso-200 p-6">
          <h3 className="text-lg font-semibold text-espresso-900 mb-6">Pengaturan Bisnis</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-espresso-700 mb-2">
                Pajak (%)
              </label>
              <input
                type="number"
                value={settings.taxRate}
                onChange={(e) => handleInputChange('taxRate', parseFloat(e.target.value))}
                className="w-full px-3 py-2 border border-espresso-300 rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-espresso-700 mb-2">
                Mata Uang
              </label>
              <select
                value={settings.currency}
                onChange={(e) => handleInputChange('currency', e.target.value)}
                className="w-full px-3 py-2 border border-espresso-300 rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
              >
                <option value="IDR">IDR (Rupiah)</option>
                <option value="USD">USD (Dollar)</option>
                <option value="EUR">EUR (Euro)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-lg shadow-sm border border-espresso-200 p-6">
          <div className="flex items-center mb-6">
            <FiBell className="w-5 h-5 text-coffee-600 mr-2" />
            <h3 className="text-lg font-semibold text-espresso-900">Notifikasi</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-espresso-700">Email</label>
                <p className="text-sm text-espresso-600">Kirim notifikasi melalui email</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications.email}
                  onChange={(e) => handleNestedChange('notifications', 'email', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-espresso-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-coffee-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-coffee-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-espresso-700">SMS</label>
                <p className="text-sm text-espresso-600">Kirim notifikasi melalui SMS</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications.sms}
                  onChange={(e) => handleNestedChange('notifications', 'sms', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-espresso-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-coffee-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-coffee-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-espresso-700">Push Notification</label>
                <p className="text-sm text-espresso-600">Kirim notifikasi push di aplikasi</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications.push}
                  onChange={(e) => handleNestedChange('notifications', 'push', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-espresso-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-coffee-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-coffee-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Printer Settings */}
        <div className="bg-white rounded-lg shadow-sm border border-espresso-200 p-6">
          <div className="flex items-center mb-6">
            <FiPrinter className="w-5 h-5 text-coffee-600 mr-2" />
            <h3 className="text-lg font-semibold text-espresso-900">Pengaturan Printer</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-espresso-700 mb-2">
                Status Printer
              </label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.printer.enabled}
                  onChange={(e) => handleNestedChange('printer', 'enabled', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-espresso-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-coffee-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-coffee-600"></div>
                <span className="ml-3 text-sm font-medium text-espresso-700">
                  {settings.printer.enabled ? 'Aktif' : 'Non-aktif'}
                </span>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-espresso-700 mb-2">
                Tipe Printer
              </label>
              <select
                value={settings.printer.type}
                onChange={(e) => handleNestedChange('printer', 'type', e.target.value)}
                className="w-full px-3 py-2 border border-espresso-300 rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
              >
                <option value="thermal">Thermal</option>
                <option value="inkjet">Inkjet</option>
                <option value="laser">Laser</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-espresso-700 mb-2">
                Ukuran Kertas
              </label>
              <select
                value={settings.printer.paperSize}
                onChange={(e) => handleNestedChange('printer', 'paperSize', e.target.value)}
                className="w-full px-3 py-2 border border-espresso-300 rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
              >
                <option value="58mm">58mm</option>
                <option value="80mm">80mm</option>
                <option value="A4">A4</option>
              </select>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-6 py-3 bg-coffee-600 text-white rounded-lg hover:bg-coffee-700 transition-colors font-medium"
          >
            <FiSave className="w-4 h-4" />
            Simpan Pengaturan
          </button>
        </div>
      </div>
    </>
  );
}