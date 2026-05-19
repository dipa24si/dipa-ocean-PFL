import { FiCalendar, FiClock, FiDollarSign, FiEdit3, FiMail, FiPhone, FiTrash2 } from 'react-icons/fi';
import StaffStatusBadge from './StaffStatusBadge';

const getInitials = (name) => {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase();
};

export default function StaffCard({ member, onEdit, onRemove }) {
  const initials = getInitials(member.name) || 'ST';

  return (
    <div className="bg-white rounded-[2rem] border border-coffee-100 p-6 shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden relative">
      <div className={`absolute top-0 right-0 w-24 h-24 rounded-full -mr-8 -mt-8 opacity-5 ${member.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`}></div>

      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 shrink-0 bg-coffee-900 text-white rounded-2xl flex items-center justify-center text-lg font-black shadow-inner group-hover:scale-110 transition-transform">
          {initials}
        </div>
        <div>
          <h3 className="font-bold text-coffee-900 text-lg leading-tight">{member.name}</h3>
          <p className="text-sm font-medium text-espresso-400">{member.position}</p>
          <StaffStatusBadge status={member.status} />
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
          <span className="text-sm font-bold text-coffee-900 flex items-center gap-1"><FiClock size={12} /> {member.shift}</span>
        </div>
        <div className="flex flex-col text-right">
          <span className="text-[10px] font-bold text-espresso-300 uppercase">Gaji</span>
          <span className="text-sm font-bold text-coffee-900 flex items-center gap-1 justify-end"><FiDollarSign size={12} /> {member.salary}</span>
        </div>
      </div>

      <div className="flex gap-2">
        <button type="button" onClick={() => onEdit(member)} className="flex-1 flex items-center justify-center gap-2 py-3 bg-coffee-50 text-coffee-900 rounded-xl font-bold hover:bg-coffee-900 hover:text-white transition-all">
          <FiEdit3 size={14} /> Edit
        </button>
        <button type="button" onClick={() => onRemove(member.id)} className="px-4 py-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all">
          <FiTrash2 size={16} />
        </button>
      </div>
    </div>
  );
}
