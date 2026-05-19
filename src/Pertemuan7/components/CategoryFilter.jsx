export default function CategoryFilter({ categories, selectedCategory, onSelect }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => onSelect(category)}
          className={`px-5 py-3 rounded-2xl text-sm font-bold capitalize whitespace-nowrap transition-all ${
            selectedCategory === category
              ? 'bg-coffee-900 text-white shadow-md'
              : 'bg-coffee-50 text-espresso-500 hover:bg-coffee-100'
          }`}
        >
          {category === 'all' ? 'Semua' : category}
        </button>
      ))}
    </div>
  );
}
