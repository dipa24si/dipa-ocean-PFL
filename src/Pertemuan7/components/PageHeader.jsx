import { Link } from 'react-router-dom';
import { FiChevronRight, FiHome } from 'react-icons/fi';

/**
 * PageHeader Component
 * Komponen header halaman yang reusable dengan title, breadcrumb, dan children
 * @param {string} title - Judul halaman
 * @param {string|Array} breadcrumb - Breadcrumb sebagai string atau array objek {label, path}
 * @param {ReactNode} children - Konten tambahan di header
 */
export default function PageHeader({ title, breadcrumb, children }) {
  // Handle breadcrumb sebagai string atau array
  const breadcrumbItems = Array.isArray(breadcrumb)
    ? breadcrumb
    : breadcrumb ? [{ label: breadcrumb, path: null }] : [];

  return (
    <div className="mb-8">
      {/* Breadcrumb */}
      {breadcrumbItems.length > 0 && (
        <nav className="flex items-center space-x-2 text-sm text-espresso-600 mb-4">
          <Link
            to="/dashboard"
            className="flex items-center hover:text-espresso-800 transition-colors"
          >
            <FiHome className="w-4 h-4 mr-1" />
            Dashboard
          </Link>
          {breadcrumbItems.map((item, index) => (
            <div key={index} className="flex items-center">
              <FiChevronRight className="w-4 h-4 mx-2" />
              {item.path ? (
                <Link
                  to={item.path}
                  className="hover:text-espresso-800 transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-espresso-900 font-medium">{item.label}</span>
              )}
            </div>
          ))}
        </nav>
      )}

      {/* Title and Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-display text-espresso-900">
            {title}
          </h1>
        </div>

        {/* Additional content/actions */}
        {children && (
          <div className="flex items-center gap-3">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}