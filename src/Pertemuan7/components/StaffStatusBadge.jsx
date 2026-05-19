export default function StaffStatusBadge({ status }) {
  return (
    <span className={`inline-block px-2 py-0.5 rounded-lg text-[10px] font-black uppercase mt-1 ${
      status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
    }`}>
      {status}
    </span>
  );
}
