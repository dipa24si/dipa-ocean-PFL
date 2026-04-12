export default function UmkmCard({ data }) {
  return (
    <div className="group bg-white rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 overflow-hidden flex flex-col">
      
      <div className="relative overflow-hidden">
        <img 
          src={data.image} 
          alt={data.name} 
          className="w-full h-52 object-cover transform group-hover:scale-110 transition-transform duration-700" 
        />
        <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full shadow">
          <span className="text-amber-500 font-bold text-sm">★ {data.rating}</span>
        </div>
      </div>

      <div className="p-6 flex-grow">
        <div className="flex gap-2 mb-3">
          <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded">
            {data.category}
          </span>
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded">
            {data.price_range}
          </span>
        </div>

        <h2 className="text-lg font-bold text-slate-800">
          {data.name}
        </h2>

        <p className="text-sm text-slate-400 mb-4">
          📍 {data.location.city}, {data.location.province}
        </p>

        <div className="flex justify-between text-sm">
          <span>📅 {data.details.since}</span>
          <span className="text-indigo-500">{data.social.instagram}</span>
        </div>
      </div>
    </div>
  );
}