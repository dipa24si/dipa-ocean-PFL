import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getCurrentSession, getUserProfile } from '../services/supabaseApi';

export default function ProtectedRoute({ children, allowedRoles }) {
  const [status, setStatus] = useState('checking');
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      try {
        const session = await getCurrentSession();
        if (!session?.user) {
          localStorage.removeItem('user');
          localStorage.removeItem('isLoggedIn');
          if (isMounted) setStatus('guest');
          return;
        }

        const profile = await getUserProfile(session.user.id);
        const role = profile?.role || session.user.user_metadata?.role || 'member';
        const currentUser = {
          id: session.user.id,
          email: session.user.email,
          name: profile?.name || session.user.user_metadata?.name || session.user.email,
          role,
          status: profile?.status || 'active',
          avatar: profile?.avatar || '',
        };

        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', session.user.email || '');
        localStorage.setItem('user', JSON.stringify(currentUser));

        if (isMounted) {
          setUserRole(role);
          setStatus('authenticated');
        }
      } catch (error) {
        console.error('[ProtectedRoute] Auth check failed:', error);
        if (isMounted) setStatus('guest');
      }
    };

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  if (status === 'checking') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDF8F5] text-[#3E2C1C] font-bold">
        Memeriksa sesi login...
      </div>
    );
  }

  if (status === 'guest') {
    return <Navigate to="/login" state={{ fromRedirect: true }} replace />;
  }

  if (allowedRoles?.length && !allowedRoles.includes(userRole)) {
    return <Navigate to={userRole === 'member' ? '/member' : '/dashboard'} replace />;
  }

  return children;
}
