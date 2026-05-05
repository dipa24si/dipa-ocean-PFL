import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  // Cek apakah di browser tersimpan status login
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  if (!isLoggedIn) {
    // Jika tidak ada data login, paksa user kembali ke halaman login
    return <Navigate to="/login" replace />;
  }

  // Jika sudah login, izinkan akses ke halaman yang diminta
  return children;
}