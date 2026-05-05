import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import { FiPlus, FiSearch, FiMail, FiPhone, FiCalendar, FiUser, FiDollarSign, FiClock, FiTrash2, FiEdit3 } from 'react-icons/fi';

const avatarIcons = {
  'Barista Junior': '👨‍🍳',
  'Barista Senior': '👨‍🍳',
  Kasir: '👩‍💼',
  Manager: '👩‍💼',
  Cleaner: '👨‍🔧',
  Supervisor: '👨‍💼',
  Chef: '👨‍🍳'
};

// ... (Fungsi generateInitialStaff dan defaultStaff kamu tetap sama di sini) ...
const generateInitialStaff = () => {
  const names = ['Ahmad Rahman', 'Siti Nurhaliza', 'Budi Santoso', 'Maya Sari', 'Rizki Pratama', 'Lina Wibowo', 'Andi Saputra', 'Dewi Anggraeni', 'Rian Hidayat', 'Nina Astuti'];
  const positions = ['Barista Senior', 'Kasir', 'Barista Junior', 'Manager', 'Cleaner', 'Supervisor'];
  const shifts = ['Pagi', 'Siang', 'Malam', 'Full Time'];
  const statuses = ['active', 'inactive'];
  return Array.from({ length: 30 }, (_, index) => {
    const name = names[index % names.length] + (index >= names.length ? ` ${Math.floor(index / names.length)}` : '');
    const position = positions[index % positions.length];
    const salaryBase = 2800000 + (index % 6) * 500000;
    const joinDay = 10 + (index % 20);
    const joinMonth = 1 + Math.floor((index % 12));
    return {
      id: index + 1, name, position,
      email: `${name.toLowerCase().replace(/\s+/g, '.')}@ngopieuy.com`,
      phone: `+62 8${String(110000000 + index * 20000).slice(-10)}`,
      shift: shifts[index % shifts.length],
      joinDate: `2023-${String(joinMonth).padStart(2, '0')}-${String(joinDay).padStart(2, '0')}`,
      salary: `Rp ${salaryBase.toLocaleString('id-ID')}`,
      status: statuses[index % statuses.length],
      avatar: avatarIcons[position] || '👤'
    };
  });
};

const defaultStaff = { name: '', position: 'Barista Junior', email: '', phone: '', shift: 'Pagi', salary: '', status: 'active' };

export default function Staff() {
  const [staff, setStaff] = useState(generateInitialStaff);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newStaff, setNewStaff] = useState(defaultStaff);
  const [editingStaffId, setEditingStaffId] = useState(null);

  // Logika Filter Kamu
  const filteredStaff = staff.filter((member) => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || member.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // Handler functions (StartEdit, Cancel, Remove, Submit tetap sama fungsinya)
  const startEditStaff = (member) => { setEditingStaffId(member.id); setNewStaff({...member}); setShowAddForm(true); };
  const cancelEditStaff = () => { setEditingStaffId(null); setNewStaff(defaultStaff); setShowAddForm(false); };
  const removeStaff = (staffId) => { setStaff(staff.filter((member) => member.id !== staffId)); };
  const handleSubmitStaff = (e) => {
    e.preventDefault();
    if (!newStaff.name || !newStaff.email) return;
    const staffMember = {
      ...newStaff,
      id: editingStaffId || staff.length + 1,
      joinDate: editingStaffId ? staff.find(m => m.id === editingStaffId).joinDate : new Date().toISOString().slice(0, 10),
      salary: newStaff.salary.toString().startsWith('Rp') ? newStaff.salary : `Rp ${newStaff.salary}`,
      avatar: avatarIcons[newStaff.position] || '👤'
    };
    if (editingStaffId) {
      setStaff(staff.map(m => m.id === editingStaffId ? staffMember : m));
    } else {
      setStaff([staffMember, ...staff]);
    }
    cancelEditStaff();
  };

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <PageHeader title="Tim Barista & Staf" breadcrumb="Staff Management" />
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-coffee-900 text-white rounded-2xl font-bold hover:bg-black transition-all shadow-lg shadow-coffee-900/20"
        >
          <FiPlus /> {showAddForm ? 'Tutup Form' : 'Tambah Staf'}
        </button>
      </div>

      {/* Filter & Form Section */}
      <div className="space-y-6 mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-espresso-400" />
            <input
              type="text"
              placeholder="Cari nama atau posisi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-coffee-100 rounded-2xl focus:ring-2 focus:ring-coffee-200 outline-none transition-all shadow-sm"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-6 py-3 bg-white border border-coffee-100 rounded-2xl font-bold text-coffee-900 outline-none focus:ring-2 focus:ring-coffee-200 shadow-sm"
          >
            <option value="all">Semua Status</option>
            <option value="active">🟢 Aktif</option>
            <option value="inactive">🔴 Off</option>
          </select>
        </div>

        {showAddForm && (
          <form onSubmit={handleSubmitStaff} className="bg-white rounded-3xl border-2 border-coffee-900/5 p-8 shadow-xl animate-in slide-in-from-top-4 duration-300">
            <h3 className="text-xl font-bold text-coffee-900 mb-6 flex items-center gap-2">
              <FiUser className="text-coffee-600" /> {editingStaffId ? 'Update Data Staf' : 'Pendaftaran Staf Baru'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-espresso-400 ml-1">Nama Lengkap</label>
                <input type="text" value={newStaff.name} onChange={(e) => setNewStaff({...newStaff, name: e.target.value})} className="w-full px-4 py-3 bg-coffee-50 rounded-xl outline-none focus:ring-2 focus:ring-coffee-200" placeholder="Ahmad..." />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-espresso-400 ml-1">Posisi</label>
                <select value={newStaff.position} onChange={(e) => setNewStaff({...newStaff, position: e.target.value})} className="w-full px-4 py-3 bg-coffee-50 rounded-xl outline-none focus:ring-2 focus:ring-coffee-200">
                  {Object.keys(avatarIcons).map(pos => <option key={pos}>{pos}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-espresso-400 ml-1">Shift Kerja</label>
                <select value={newStaff.shift} onChange={(e) => setNewStaff({...newStaff, shift: e.target.value})} className="w-full px-4 py-3 bg-coffee-50 rounded-xl outline-none focus:ring-2 focus:ring-coffee-200 font-bold">
                  <option>Pagi</option><option>Siang</option><option>Malam</option><option>Full Time</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-espresso-400 ml-1">Email Staf</label>
                <input type="email" value={newStaff.email} onChange={(e) => setNewStaff({...newStaff, email: e.target.value})} className="w-full px-4 py-3 bg-coffee-50 rounded-xl outline-none" placeholder="staf@ngopieuy.com" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-espresso-400 ml-1">No. WhatsApp</label>
                <input type="tel" value={newStaff.phone} onChange={(e) => setNewStaff({...newStaff, phone: e.target.value})} className="w-full px-4 py-3 bg-coffee-50 rounded-xl outline-none" placeholder="+62..." />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-espresso-400 ml-1">Gaji Bulanan</label>
                <input type="text" value={newStaff.salary} onChange={(e) => setNewStaff({...newStaff, salary: e.target.value})} className="w-full px-4 py-3 bg-coffee-50 rounded-xl outline-none" placeholder="3500000" />
              </div>
            </div>
            <div className="flex justify-end gap-4">
              <button type="button" onClick={cancelEditStaff} className="px-6 py-3 font-bold text-espresso-400 hover:text-red-500">Batal</button>
              <button type="submit" className="px-10 py-3 bg-coffee-900 text-white rounded-xl font-bold shadow-lg shadow-coffee-900/20 hover:scale-105 transition-transform">
                {editingStaffId ? 'Simpan Perubahan' : 'Konfirmasi Staf Baru'}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Staff Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStaff.map((member) => (
          <div key={member.id} className="bg-white rounded-[2rem] border border-coffee-100 p-6 shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden relative">
            <div className={`absolute top-0 right-0 w-24 h-24 rounded-full -mr-8 -mt-8 opacity-5 ${member.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`}></div>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-coffee-50 rounded-2xl flex items-center justify-center text-4xl shadow-inner group-hover:scale-110 transition-transform">
                {member.avatar}
              </div>
              <div>
                <h3 className="font-bold text-coffee-900 text-lg leading-tight">{member.name}</h3>
                <p className="text-sm font-medium text-espresso-400">{member.position}</p>
                <span className={`inline-block px-2 py-0.5 rounded-lg text-[10px] font-black uppercase mt-1 ${
                  member.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {member.status}
                </span>
              </div>
            </div>

            <div className="space-y-3 mb-6 bg-coffee-50/50 p-4 rounded-2xl border border-coffee-50">
              <div className="flex items-center text-xs text-espresso-600 font-medium">
                <FiMail className="mr-3 text-coffee-600" /> {member.email}
              </div>
              <div className="flex items-center text-xs text-espresso-600 font-medium">
                <FiPhone className="mr-3 text-coffee-600" /> {member.phone}
              </div>
              <div className="flex items-center text-xs text-espresso-600 font-medium">
                <FiCalendar className="mr-3 text-coffee-600" /> Bergabung: {new Date(member.joinDate).toLocaleDateString('id-ID')}
              </div>
            </div>

            <div className="flex justify-between items-center px-1 mb-6">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-espresso-300 uppercase">Shift</span>
                <span className="text-sm font-bold text-coffee-900 flex items-center gap-1"><FiClock size={12}/> {member.shift}</span>
              </div>
              <div className="flex flex-col text-right">
                <span className="text-[10px] font-bold text-espresso-300 uppercase">Gaji</span>
                <span className="text-sm font-bold text-coffee-900 flex items-center gap-1 justify-end"><FiDollarSign size={12}/> {member.salary}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button onClick={() => startEditStaff(member)} className="flex-1 flex items-center justify-center gap-2 py-3 bg-coffee-50 text-coffee-900 rounded-xl font-bold hover:bg-coffee-900 hover:text-white transition-all">
                <FiEdit3 size={14}/> Edit
              </button>
              <button onClick={() => removeStaff(member.id)} className="px-4 py-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all">
                <FiTrash2 size={16}/>
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredStaff.length === 0 && (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">☕</div>
          <h3 className="text-xl font-bold text-coffee-900">Staf tidak ditemukan</h3>
          <p className="text-espresso-400">Mungkin mereka sedang ambil shift libur?</p>
        </div>
      )}
    </div>
  );
}