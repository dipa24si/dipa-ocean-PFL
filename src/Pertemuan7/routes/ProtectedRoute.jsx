import { Navigate } from 'react-router-dom';

/**
 * Protected Route Component
 * Melindungi routes yang memerlukan autentikasi
 */
export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem('authToken');

  if (!token) {
    // Redirect ke login jika tidak ada token
    return <Navigate to="/login" replace />;
  }

  return children;
}
