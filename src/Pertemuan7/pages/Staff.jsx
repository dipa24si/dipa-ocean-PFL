import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import EmptyState from '../components/EmptyState';
import StaffCard from '../components/StaffCard';
import StaffFilterBar from '../components/StaffFilterBar';
import StaffForm from '../components/StaffForm';
import { FiPlus } from 'react-icons/fi';

const avatarIcons = {
  'Barista Junior': 'Barista',
  'Barista Senior': 'Barista',
  Kasir: 'Cashier',
  Manager: 'Manager',
  Cleaner: 'Cleaner',
  Supervisor: 'Lead',
  Chef: 'Chef',
};

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
    const joinMonth = 1 + Math.floor(index % 12);

    return {
      id: index + 1,
      name,
      position,
      email: `${name.toLowerCase().replace(/\s+/g, '.')}@FormatGanjil.com`,
      phone: `+62 8${String(110000000 + index * 20000).slice(-10)}`,
      shift: shifts[index % shifts.length],
      joinDate: `2023-${String(joinMonth).padStart(2, '0')}-${String(joinDay).padStart(2, '0')}`,
      salary: `Rp ${salaryBase.toLocaleString('id-ID')}`,
      status: statuses[index % statuses.length],
      avatar: avatarIcons[position] || 'Staff',
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
  status: 'active',
};

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

  const startEditStaff = (member) => {
    setEditingStaffId(member.id);
    setNewStaff({ ...member });
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

  const handleSubmitStaff = (event) => {
    event.preventDefault();
    if (!newStaff.name || !newStaff.email) return;

    const staffMember = {
      ...newStaff,
      id: editingStaffId || staff.length + 1,
      joinDate: editingStaffId ? staff.find((member) => member.id === editingStaffId).joinDate : new Date().toISOString().slice(0, 10),
      salary: newStaff.salary.toString().startsWith('Rp') ? newStaff.salary : `Rp ${newStaff.salary}`,
      avatar: avatarIcons[newStaff.position] || 'Staff',
    };

    if (editingStaffId) {
      setStaff(staff.map((member) => (member.id === editingStaffId ? staffMember : member)));
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
          type="button"
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-coffee-900 text-white rounded-2xl font-bold hover:bg-black transition-all shadow-lg shadow-coffee-900/20"
        >
          <FiPlus /> {showAddForm ? 'Tutup Form' : 'Tambah Staf'}
        </button>
      </div>

      <div className="space-y-6 mb-8">
        <StaffFilterBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filterStatus={filterStatus}
          onStatusChange={setFilterStatus}
        />

        {showAddForm && (
          <StaffForm
            staffMember={newStaff}
            avatarIcons={avatarIcons}
            isEditing={Boolean(editingStaffId)}
            onChange={setNewStaff}
            onSubmit={handleSubmitStaff}
            onCancel={cancelEditStaff}
          />
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStaff.map((member) => (
          <StaffCard
            key={member.id}
            member={member}
            onEdit={startEditStaff}
            onRemove={removeStaff}
          />
        ))}
      </div>

      {filteredStaff.length === 0 && (
        <EmptyState
          icon="Staff"
          title="Staf tidak ditemukan"
          description="Coba ubah kata kunci atau filter status."
        />
      )}
    </div>
  );
}
