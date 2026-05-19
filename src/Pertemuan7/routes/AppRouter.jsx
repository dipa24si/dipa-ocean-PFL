import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import MainLayout from '../layouts/MainLayout';
import NotFound from '../pages/NotFound';
import LoginV2 from '../pages/LoginV2';
import ErrorPage from '../components/ErrorPage';

// Lazy load pages
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Orders = lazy(() => import('../pages/Orders'));
const Inventory = lazy(() => import('../pages/Inventory'));
const Products = lazy(() => import('../pages/Products'));
const Staff = lazy(() => import('../pages/Staff'));
const CustomerDetail = lazy(() => import('../pages/CustomerDetail'));
const Customers = lazy(() => import('../pages/Customers')); // ✅ Import Customers
const Analytics = lazy(() => import('../pages/Analytics'));
const Settings = lazy(() => import('../pages/Settings'));
const Login = lazy(() => import('../pages/Login'));

/**
 * Loading Fallback Component - Tema Format Ganjil
 */
function PageLoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#FDF8F5]">
      <div className="text-center">
        <div className="relative inline-block">
          <svg className="animate-spin h-16 w-16 text-[#3E2C1C]" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-10" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-80" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-xl animate-pulse">
            ☕
          </div>
        </div>
        <h2 className="text-[#3E2C1C] font-bold text-lg mt-6 tracking-widest uppercase">Format Ganjil</h2>
        <p className="text-[#78675C] text-sm mt-2 animate-pulse">Menyiapkan dashboard kamu...</p>
      </div>
    </div>
  );
}

export default function AppRouter() {
  return (
    <Suspense fallback={<PageLoadingSpinner />}>
      <Routes>
        {/* --- PUBLIC ROUTES --- */}
        <Route path="/login" element={<LoginV2 />} />
        <Route path="/login-old" element={<Login />} />

        {/* --- PROTECTED ROUTES (Hanya bisa diakses setelah login) --- */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          {/* Otomatis arahkan ke dashboard jika akses path "/" */}
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          
          {/* Menu Navigasi Admin */}
          <Route path="orders" element={<Orders />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="products" element={<Products />} />
          <Route path="customers/:id" element={<CustomerDetail />} />
          <Route path="customers" element={<Customers />} /> {/* ✅ Rute Customers Aktif */}
          <Route path="staff" element={<Staff />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* --- ERROR & 404 HANDLER --- */}
        <Route path="/error/400" element={<ErrorPage errorCode={400} errorImage="❌" />} />
        <Route path="/error/401" element={<ErrorPage errorCode={401} errorImage="🔒" />} />
        <Route path="/error/403" element={<ErrorPage errorCode={403} errorImage="🚫" />} />
        
        {/* Jika URL tidak terdaftar, tampilkan NotFound */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
