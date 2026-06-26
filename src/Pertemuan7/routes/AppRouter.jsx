import { lazy, Suspense } from 'react';

import { Routes, Route, Navigate } from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute';

import MainLayout from '../layouts/MainLayout';

import NotFound from '../pages/NotFound';

import LoginV2 from '../pages/LoginV2';

import GuestHome from '../pages/GuestHome';

import ErrorPage from '../components/ErrorPage';

import GuestHomeV1 from '../../Pertemuan8/pages/GuestHomeV1';
import GuestHomeV2 from '../../Pertemuan8/pages/GuestHomeV2';
import CRMDashboardV3 from '../../Pertemuan8/pages/CRMDashboardV3';
import MenuPage from '../../Pertemuan8/pages/MenuPage';
import PRDPage1 from '../../Pertemuan8/pages/PRDPage1';
import PRDPage2 from '../../Pertemuan8/pages/PRDPage2';
import PRDPage3 from '../../Pertemuan8/pages/PRDPage3';




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

const Register = lazy(() => import('../pages/Register'));

const MemberHome = lazy(() => import('../pages/MemberHome'));

const UsersAdmin = lazy(() => import('../pages/UsersAdmin'));

const FeedbackComplaints = lazy(() => import('../pages/FeedbackComplaints'));



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

        {/* --- PUBLIC ROUTES (Guest) --- */}
        {/* Landing Page - Tampilan Guest dengan Promo */}
        <Route index element={<GuestHome />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
       
        <Route path="/login" element={<LoginV2 />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login-old" element={<Login />} />
        <Route path="/v1" element={<GuestHomeV1 />} />
        <Route path="/v2" element={<GuestHomeV2 />} />
        <Route path="/v3" element={<CRMDashboardV3 />} />
        <Route path="/menu" element={<MenuPage />} />
        {/* PRD Documentation Pages */}
        <Route path="/prd/v1" element={<PRDPage1 />} />
        <Route path="/prd/v2" element={<PRDPage2 />} />
        <Route path="/prd/v3" element={<PRDPage3 />} />
        <Route
          path="/member"
          element={
            <ProtectedRoute allowedRoles={['member', 'admin', 'owner', 'Manager', 'Owner']}>
              <MemberHome />
            </ProtectedRoute>
          }
        />



        {/* --- PROTECTED ROUTES (Hanya bisa diakses setelah login) --- */}

        <Route

          path="/dashboard-app"

          element={

            <ProtectedRoute allowedRoles={['admin', 'owner', 'Manager', 'Owner']}>

              <MainLayout />

            </ProtectedRoute>

          }

        >

          {/* Otomatis arahkan ke dashboard jika akses path "/dashboard-app" */}

          <Route index element={<Dashboard />} />

          <Route path="dashboard" element={<Dashboard />} />

         

          {/* Menu Navigasi Admin */}

          <Route path="orders" element={<Orders />} />

          <Route path="inventory" element={<Inventory />} />

          <Route path="products" element={<Products />} />

          <Route path="customers/:id" element={<CustomerDetail />} />

          <Route path="customers" element={<Customers />} /> {/* ✅ Rute Customers Aktif */}

          <Route path="staff" element={<Staff />} />

          <Route path="users" element={<UsersAdmin />} />

          <Route path="feedback-complaints" element={<FeedbackComplaints />} />

          <Route path="analytics" element={<Analytics />} />

          <Route path="settings" element={<Settings />} />

        </Route>



        {/* Protected route untuk dashboard dengan path yang lebih singkat */}

        <Route

          path="/dashboard/*"

          element={

            <ProtectedRoute allowedRoles={['admin', 'owner', 'Manager', 'Owner']}>

              <MainLayout />

            </ProtectedRoute>

          }

        >

          <Route index element={<Dashboard />} />

          <Route path="dashboard" element={<Dashboard />} />

          <Route path="orders" element={<Orders />} />

          <Route path="inventory" element={<Inventory />} />

          <Route path="products" element={<Products />} />

          <Route path="customers/:id" element={<CustomerDetail />} />

          <Route path="customers" element={<Customers />} />

          <Route path="staff" element={<Staff />} />

          <Route path="users" element={<UsersAdmin />} />

          <Route path="feedback-complaints" element={<FeedbackComplaints />} />

          <Route path="analytics" element={<Analytics />} />

          <Route path="settings" element={<Settings />} />

        </Route>



        {/* --- ERROR & 404 HANDLER --- */}

        <Route path="/error/400" element={<ErrorPage errorCode={400} errorImage="error" />} />

        <Route path="/error/401" element={<ErrorPage errorCode={401} errorImage="lock" />} />

        <Route path="/error/403" element={<ErrorPage errorCode={403} errorImage="forbidden" />} />

        <Route path="*" element={<NotFound />} />

      </Routes>

    </Suspense>

  );

} 

