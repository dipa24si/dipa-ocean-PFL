import { FiSearch } from 'react-icons/fi';

export default function SearchInput({
  value,
  onChange,
  placeholder,
  className = '',
  inputClassName = '',
}) {
  return (
    <div className={`relative ${className}`}>
      <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-espresso-400 w-5 h-5" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={`w-full pl-12 pr-4 py-3 bg-coffee-50 border-none rounded-2xl focus:ring-2 focus:ring-coffee-200 outline-none text-coffee-900 font-medium transition-all placeholder:text-espresso-300 ${inputClassName}`}
      />
    </div>
  );
}
