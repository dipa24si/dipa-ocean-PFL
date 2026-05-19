import { FiUser } from 'react-icons/fi';

export default function StaffForm({
  staffMember,
  avatarIcons,
  isEditing,
  onChange,
  onSubmit,
  onCancel,
}) {
  const updateStaff = (field, value) => {
    onChange({ ...staffMember, [field]: value });
  };

  return (
    <form onSubmit={onSubmit} className="bg-white rounded-3xl border-2 border-coffee-900/5 p-8 shadow-xl animate-in slide-in-from-top-4 duration-300">
      <h3 className="text-xl font-bold text-coffee-900 mb-6 flex items-center gap-2">
        <FiUser className="text-coffee-600" /> {isEditing ? 'Update Data Staf' : 'Pendaftaran Staf Baru'}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-espresso-400 ml-1">Nama Lengkap</label>
          <input type="text" value={staffMember.name} onChange={(event) => updateStaff('name', event.target.value)} className="w-full px-4 py-3 bg-coffee-50 rounded-xl outline-none focus:ring-2 focus:ring-coffee-200" placeholder="Ahmad..." />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-espresso-400 ml-1">Posisi</label>
          <select value={staffMember.position} onChange={(event) => updateStaff('position', event.target.value)} className="w-full px-4 py-3 bg-coffee-50 rounded-xl outline-none focus:ring-2 focus:ring-coffee-200">
            {Object.keys(avatarIcons).map((position) => <option key={position}>{position}</option>)}
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-espresso-400 ml-1">Shift Kerja</label>
          <select value={staffMember.shift} onChange={(event) => updateStaff('shift', event.target.value)} className="w-full px-4 py-3 bg-coffee-50 rounded-xl outline-none focus:ring-2 focus:ring-coffee-200 font-bold">
            <option>Pagi</option><option>Siang</option><option>Malam</option><option>Full Time</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-espresso-400 ml-1">Email Staf</label>
          <input type="email" value={staffMember.email} onChange={(event) => updateStaff('email', event.target.value)} className="w-full px-4 py-3 bg-coffee-50 rounded-xl outline-none" placeholder="staf@ngopieuy.com" />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-espresso-400 ml-1">No. WhatsApp</label>
          <input type="tel" value={staffMember.phone} onChange={(event) => updateStaff('phone', event.target.value)} className="w-full px-4 py-3 bg-coffee-50 rounded-xl outline-none" placeholder="+62..." />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-espresso-400 ml-1">Gaji Bulanan</label>
          <input type="text" value={staffMember.salary} onChange={(event) => updateStaff('salary', event.target.value)} className="w-full px-4 py-3 bg-coffee-50 rounded-xl outline-none" placeholder="3500000" />
        </div>
      </div>
      <div className="flex justify-end gap-4">
        <button type="button" onClick={onCancel} className="px-6 py-3 font-bold text-espresso-400 hover:text-red-500">Batal</button>
        <button type="submit" className="px-10 py-3 bg-coffee-900 text-white rounded-xl font-bold shadow-lg shadow-coffee-900/20 hover:scale-105 transition-transform">
          {isEditing ? 'Simpan Perubahan' : 'Konfirmasi Staf Baru'}
        </button>
      </div>
    </form>
  );
}
