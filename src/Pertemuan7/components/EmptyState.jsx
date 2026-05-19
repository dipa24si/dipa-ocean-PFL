export default function EmptyState({
  icon = '!',
  title,
  description,
  actionLabel,
  onAction,
  className = '',
}) {
  return (
    <div className={`text-center py-20 bg-white rounded-3xl border border-dashed border-coffee-200 ${className}`}>
      <div className="text-6xl mb-6 grayscale opacity-30">{icon}</div>
      <h3 className="text-xl font-bold text-coffee-900 mb-2">{title}</h3>
      {description && <p className="text-espresso-500 max-w-xs mx-auto">{description}</p>}
      {actionLabel && (
        <button
          type="button"
          onClick={onAction}
          className="mt-6 text-coffee-600 font-bold hover:underline"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
