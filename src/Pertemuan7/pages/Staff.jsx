import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import { FiPlus, FiSearch, FiMail, FiPhone, FiCalendar } from 'react-icons/fi';

const avatarIcons = {
  'Barista Junior': '👨‍🍳',
  'Barista Senior': '👨‍🍳',
  Kasir: '👩‍💼',
  Manager: '👩‍💼',
  Cleaner: '👨‍🔧',
  Supervisor: '👨‍💼',
  Chef: '👨‍🍳'
};

const generateInitialStaff = () => {
  const names = [
    'Ahmad Rahman', 'Siti Nurhaliza', 'Budi Santoso', 'Maya Sari', 'Rizki Pratama',
    'Lina Wibowo', 'Andi Saputra', 'Dewi Anggraeni', 'Rian Hidayat', 'Nina Astuti'
  ];
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
      id: index + 1,
      name,
      position,
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

const defaultStaff = {
  name: '',
  position: 'Barista Junior',
  email: '',
  phone: '',
  shift: 'Pagi',
  salary: '',
  status: 'active'
};

/**
 * Staff Page Component
 * Halaman untuk mengelola data staf menggunakan data JSON
 */
export default function Staff() {
  const [staff, setStaff] = useState(generateInitialStaff);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newStaff, setNewStaff] = useState(defaultStaff);
  const [editingStaffId, setEditingStaffId] = useState(null);

  const filteredStaff = staff.filter((member) => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || member.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    return status === 'active'
      ? 'bg-green-100 text-green-800'
      : 'bg-red-100 text-red-800';
  };

  const startEditStaff = (member) => {
    setEditingStaffId(member.id);
    setNewStaff({
      name: member.name,
      position: member.position,
      email: member.email,
      phone: member.phone,
      shift: member.shift,
      salary: member.salary,
      status: member.status
    });
    setShowAddForm(true);
  };

  const cancelEditStaff = () => {
    setEditingStaffId(null);
    setNewStaff(defaultStaff);
    setShowAddForm(false);
  };

  const removeStaff = (staffId) => {
    setStaff(staff.filter((member) => member.id !== staffId));
  };

  const handleSubmitStaff = (e) => {
    e.preventDefault();
    if (!newStaff.name || !newStaff.email || !newStaff.phone || !newStaff.salary) {
      return;
    }

    const position = newStaff.position;
    const staffMember = {
      id: editingStaffId || staff.length + 1,
      name: newStaff.name,
      position,
      email: newStaff.email,
      phone: newStaff.phone,
      shift: newStaff.shift,
      joinDate: editingStaffId ? staff.find((member) => member.id === editingStaffId)?.joinDate || new Date().toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10),
      salary: newStaff.salary.trim().startsWith('Rp') ? newStaff.salary.trim() : `Rp ${newStaff.salary.trim()}`,
      status: newStaff.status,
      avatar: avatarIcons[position] || '👤'
    };

    if (editingStaffId) {
      setStaff(staff.map((member) =>
        member.id === editingStaffId ? staffMember : member
      ));
      cancelEditStaff();
      return;
    }

    setStaff([staffMember, ...staff]);
    setShowAddForm(false);
    setNewStaff(defaultStaff);
  };

  return (
    <>
      <PageHeader
        title="Staf"
        breadcrumb={[
          { label: 'Dashboard', path: '/dashboard' },
          { label: 'Staf' }
        ]}
      >
        <button
          onClick={() => setShowAddForm((prev) => !prev)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-coffee-600 text-white rounded-lg hover:bg-coffee-700 transition-colors"
        >
          <FiPlus className="w-4 h-4" />
          Tambah Staf
        </button>
      </PageHeader>

      <div className="bg-white rounded-lg shadow-sm border border-espresso-200 p-6 mb-6 space-y-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-espresso-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Cari staf..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-espresso-300 rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-espresso-300 rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
          >
            <option value="all">Semua Status</option>
            <option value="active">Aktif</option>
            <option value="inactive">Tidak Aktif</option>
          </select>
        </div>

        {showAddForm && (
          <form onSubmit={handleSubmitStaff} className="bg-espresso-50 rounded-xl border border-espresso-200 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-espresso-700 mb-2">Nama Staf</label>
                <input
                  type="text"
                  value={newStaff.name}
                  onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                  className="w-full px-3 py-2 border border-espresso-300 rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
                  placeholder="Contoh: Ahmad Rahman"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-espresso-700 mb-2">Posisi</label>
                <select
                  value={newStaff.position}
                  onChange={(e) => setNewStaff({ ...newStaff, position: e.target.value })}
                  className="w-full px-3 py-2 border border-espresso-300 rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
                >
                  <option>Barista Senior</option>
                  <option>Barista Junior</option>
                  <option>Kasir</option>
                  <option>Manager</option>
                  <option>Cleaner</option>
                  <option>Supervisor</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-espresso-700 mb-2">Email</label>
                <input
                  type="email"
                  value={newStaff.email}
                  onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
                  className="w-full px-3 py-2 border border-espresso-300 rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
                  placeholder="Contoh: nama@ngopieuy.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-espresso-700 mb-2">Telepon</label>
                <input
                  type="tel"
                  value={newStaff.phone}
                  onChange={(e) => setNewStaff({ ...newStaff, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-espresso-300 rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
                  placeholder="Contoh: +62 812-3456-7890"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-espresso-700 mb-2">Shift</label>
                <select
                  value={newStaff.shift}
                  onChange={(e) => setNewStaff({ ...newStaff, shift: e.target.value })}
                  className="w-full px-3 py-2 border border-espresso-300 rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
                >
                  <option>Pagi</option>
                  <option>Siang</option>
                  <option>Malam</option>
                  <option>Full Time</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-espresso-700 mb-2">Gaji</label>
                <input
                  type="text"
                  value={newStaff.salary}
                  onChange={(e) => setNewStaff({ ...newStaff, salary: e.target.value })}
                  className="w-full px-3 py-2 border border-espresso-300 rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
                  placeholder="Rp 3.500.000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-espresso-700 mb-2">Status</label>
                <select
                  value={newStaff.status}
                  onChange={(e) => setNewStaff({ ...newStaff, status: e.target.value })}
                  className="w-full px-3 py-2 border border-espresso-300 rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
                >
                  <option value="active">Aktif</option>
                  <option value="inactive">Tidak Aktif</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3">
              <button
                type="button"
                onClick={cancelEditStaff}
                className="px-4 py-2 rounded-lg border border-espresso-300 text-espresso-800 hover:bg-espresso-50 transition-colors"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-coffee-600 text-white hover:bg-coffee-700 transition-colors"
              >
                {editingStaffId ? 'Simpan Perubahan' : 'Tambah Staf'}
              </button>
            </div>
          </form>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStaff.map((member) => (
          <div key={member.id} className="bg-white rounded-lg shadow-sm border border-espresso-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <div className="text-4xl mr-4">{member.avatar}</div>
              <div className="flex-1">
                <h3 className="font-semibold text-espresso-900">{member.name}</h3>
                <p className="text-sm text-espresso-600">{member.position}</p>
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full mt-1 ${getStatusColor(member.status)}`}>
                  {member.status === 'active' ? 'Aktif' : 'Tidak Aktif'}
                </span>
              </div>
            </div>
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-espresso-700">
                <FiMail className="w-4 h-4 mr-2 text-espresso-500" />
                {member.email}
              </div>
              <div className="flex items-center text-sm text-espresso-700">
                <FiPhone className="w-4 h-4 mr-2 text-espresso-500" />
                {member.phone}
              </div>
              <div className="flex items-center text-sm text-espresso-700">
                <FiCalendar className="w-4 h-4 mr-2 text-espresso-500" />
                Bergabung: {new Date(member.joinDate).toLocaleDateString('id-ID')}
              </div>
            </div>
            <div className="pt-4 border-t border-espresso-100 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-espresso-600">Shift:</span>
                <span className="font-medium text-espresso-900">{member.shift}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-espresso-600">Gaji:</span>
                <span className="font-medium text-espresso-900">{member.salary}</span>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={() => startEditStaff(member)}
                className="flex-1 px-3 py-2 text-sm bg-coffee-600 text-white rounded hover:bg-coffee-700 transition-colors"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => removeStaff(member.id)}
                className="px-3 py-2 text-sm border border-red-200 text-red-600 rounded hover:bg-red-50 transition-colors"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredStaff.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">👥</div>
          <h3 className="text-lg font-medium text-espresso-900 mb-2">Tidak ada staf ditemukan</h3>
          <p className="text-espresso-600">Coba ubah kata kunci pencarian atau filter status.</p>
        </div>
      )}
    </>
  );
}