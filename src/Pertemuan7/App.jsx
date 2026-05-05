import { BrowserRouter } from 'react-router-dom';
import AppRouter from './routes/AppRouter';
import './custom.css';

/**
 * NgopiEuy Main App Component
 * 
 * FITUR YANG DIIMPLEMENTASIKAN:
 * 1. ✅ React Router - BrowserRouter + Routes untuk navigation
 * 2. ✅ Multi Layout - MainLayout & AuthLayout untuk berbagai halaman
 * 3. ✅ Nested Routes - Protected routes untuk authenticated pages
 * 4. ✅ Lazy Loading + Suspense - Code splitting untuk performa
 * 5. ✅ NavLink - Active state styling untuk navigasi
 * 6. ✅ 404 Page - Not Found handler untuk route yang tidak ada
 * 7. ✅ Login API + Axios - Integration dengan API backend
 * 8. ✅ Custom Font - Playfair Display, Poppins, Inter di Tailwind
 * 9. ✅ Custom Color - Coffee, Brew, Espresso palette di Tailwind
 * 10. ✅ React Icons - FiIcons, MdIcons untuk UI yang lebih baik
 */
export default function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

