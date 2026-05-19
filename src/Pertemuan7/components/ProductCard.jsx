import { FiCheckCircle, FiEdit, FiTag, FiTrash2, FiXCircle } from 'react-icons/fi';

export default function ProductCard({ product, onEdit, onRemove }) {
  return (
    <div className="bg-white rounded-[2.5rem] border border-coffee-100 p-5 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group overflow-hidden">
      <div className="aspect-[4/3] bg-coffee-50 rounded-3xl overflow-hidden mb-5">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(event) => {
            event.currentTarget.src = 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80';
          }}
        />
      </div>

      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-tighter text-espresso-400 mb-1">
              <FiTag size={10} /> {product.category}
            </span>
            <h3 className="font-bold text-coffee-900 text-lg leading-tight group-hover:text-coffee-600 transition-colors">
              {product.name}
            </h3>
          </div>
          <div className={`p-1 rounded-full ${product.available ? 'text-green-500' : 'text-red-400'}`}>
            {product.available ? <FiCheckCircle size={20} /> : <FiXCircle size={20} />}
          </div>
        </div>

        <p className="text-xs text-espresso-500 font-medium line-clamp-2 min-h-[2.5rem]">
          {product.description}
        </p>

        <div className="pt-4 flex items-center justify-between border-t border-coffee-50">
          <span className="text-xl font-black text-coffee-900">{product.price}</span>
          <div className="flex gap-2">
            <button type="button" onClick={() => onEdit(product)} className="p-3 bg-coffee-50 text-coffee-900 rounded-2xl hover:bg-coffee-900 hover:text-white transition-all">
              <FiEdit size={16} />
            </button>
            <button type="button" onClick={() => onRemove(product.id)} className="p-3 bg-red-50 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all">
              <FiTrash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
