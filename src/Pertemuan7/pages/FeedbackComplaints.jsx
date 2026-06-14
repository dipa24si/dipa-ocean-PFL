import { useEffect, useMemo, useState } from 'react';
import { FiMessageSquare, FiRefreshCw } from 'react-icons/fi';
import PageHeader from '../components/PageHeader';
import { fetchFeedbackComplaints, updateFeedbackComplaint } from '../services/supabaseApi';

const statusOptions = ['new', 'in_progress', 'resolved'];

export default function FeedbackComplaints() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const loadItems = async () => {
    setIsLoading(true);
    setError('');
    try {
      setItems(await fetchFeedbackComplaints());
    } catch (loadError) {
      setError(loadError.message || 'Gagal memuat feedback dan complain.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const filteredItems = useMemo(() => {
    if (filter === 'all') return items;
    return items.filter((item) => item.type === filter || item.status === filter);
  }, [filter, items]);

  const changeStatus = async (itemId, status) => {
    try {
      const updatedItem = await updateFeedbackComplaint(itemId, { status });
      setItems((current) => current.map((item) => (item.id === itemId ? updatedItem : item)));
    } catch (updateError) {
      setError(updateError.message || 'Gagal mengubah status.');
    }
  };

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <PageHeader title="Feedback & Complain" breadcrumb="Member Messages" />
        <button
          type="button"
          onClick={loadItems}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-white border border-coffee-100 rounded-2xl font-bold text-coffee-900 hover:bg-coffee-50"
        >
          <FiRefreshCw /> Refresh
        </button>
      </div>

      {error && <div className="mb-5 p-4 rounded-2xl bg-red-50 text-red-700 font-bold text-sm">{error}</div>}

      <div className="bg-white border border-coffee-100 rounded-[2rem] p-6 shadow-sm">
        <div className="flex flex-wrap gap-3 mb-6">
          {['all', 'feedback', 'complaint', ...statusOptions].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setFilter(option)}
              className={`px-4 py-2 rounded-xl text-sm font-black capitalize ${
                filter === option ? 'bg-coffee-900 text-white' : 'bg-coffee-50 text-coffee-900'
              }`}
            >
              {option.replace('_', ' ')}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="py-16 text-center font-bold text-espresso-400">Memuat pesan...</div>
        ) : filteredItems.length === 0 ? (
          <div className="py-16 text-center font-bold text-espresso-400">Belum ada pesan.</div>
        ) : (
          <div className="space-y-4">
            {filteredItems.map((item) => (
              <article key={item.id} className="border border-coffee-100 rounded-2xl p-5">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <FiMessageSquare className="text-coffee-900" />
                      <span className="text-[10px] uppercase tracking-widest font-black text-espresso-400">
                        {item.type} / {item.status}
                      </span>
                    </div>
                    <h2 className="font-black text-coffee-900 text-lg">{item.subject}</h2>
                    <p className="text-xs text-espresso-400 mt-1">
                      {item.name} - {item.email}
                    </p>
                  </div>
                  <select
                    value={item.status || 'new'}
                    onChange={(event) => changeStatus(item.id, event.target.value)}
                    className="px-4 py-3 bg-coffee-50 rounded-xl font-bold text-coffee-900 outline-none"
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status.replace('_', ' ')}
                      </option>
                    ))}
                  </select>
                </div>
                <p className="mt-4 text-sm leading-6 text-[#5A4A2B]">{item.message}</p>
                {item.created_at && (
                  <p className="mt-4 text-[10px] uppercase tracking-widest font-black text-espresso-400">
                    {new Date(item.created_at).toLocaleString('id-ID')}
                  </p>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
