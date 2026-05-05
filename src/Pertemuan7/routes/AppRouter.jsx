import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
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
const Analytics = lazy(() => import('../pages/Analytics'));
const Settings = lazy(() => import('../pages/Settings'));
const Login = lazy(() => import('../pages/Login'));

/**
 * Loading Fallback Component
 */
function PageLoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-coffee-50 to-brew-50">
      <div className="text-center">
        <div className="inline-block">
          <svg className="animate-spin h-12 w-12 text-coffee-600 mb-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
        <p className="text-espresso-700 font-medium mt-4">Memuat NgopiEuy...</p>
        <div className="mt-4 text-4xl animate-bounce">☕</div>
      </div>
    </div>
  );
}

/**
 * App Router dengan Multi Layout & Nested Routes
 * Structure:
 * - Public Routes (Login) - tanpa layout
 * - Protected Routes (Dashboard) - dengan MainLayout
 * - NotFound (404) - fallback
 */
export default function AppRouter() {
  return (
    <Suspense fallback={<PageLoadingSpinner />}>
      <Routes>
        {/* Public Routes - Auth */}
        <Route path="/login" element={<LoginV2 />} />
        <Route path="/login-old" element={<Login />} />

        {/* Protected Routes with MainLayout */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="orders" element={<Orders />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="products" element={<Products />} />
          <Route path="staff" element={<Staff />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Error Pages for Testing */}
        <Route path="/error/400" element={<ErrorPage errorCode={400} errorImage="❌" />} />
        <Route path="/error/401" element={<ErrorPage errorCode={401} errorImage="🔒" />} />
        <Route path="/error/403" element={<ErrorPage errorCode={403} errorImage="🚫" />} />


        {/* NotFound - Harus paling akhir */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

// Import Navigate untuk redirect
import { Navigate } from 'react-router-dom';
