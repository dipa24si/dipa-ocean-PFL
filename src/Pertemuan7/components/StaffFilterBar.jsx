import SearchInput from './SearchInput';

export default function StaffFilterBar({ searchTerm, onSearchChange, filterStatus, onStatusChange }) {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <SearchInput
        value={searchTerm}
        onChange={onSearchChange}
        placeholder="Cari nama atau posisi..."
        className="flex-1"
        inputClassName="bg-white border border-coffee-100 rounded-2xl shadow-sm"
      />
      <select
        value={filterStatus}
        onChange={(event) => onStatusChange(event.target.value)}
        className="px-6 py-3 bg-white border border-coffee-100 rounded-2xl font-bold text-coffee-900 outline-none focus:ring-2 focus:ring-coffee-200 shadow-sm"
      >
        <option value="all">Semua Status</option>
        <option value="active">Aktif</option>
        <option value="inactive">Off</option>
      </select>
    </div>
  );
}
