import { useEffect, useState } from 'react';
import useAuth from './useAuth';

const useRole = () => {
  const { user } = useAuth();
  const [role, setRole] = useState('student');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRole = async () => {
      if (!user?.email) {
        setRole('student');
        setLoading(false);
        return;
      }
      try {
        const token = await user.getIdToken();
        const res = await fetch(`${import.meta.env.VITE_API_URL}/user/role`, {  
          headers: { authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error('Failed to fetch role');
        const data = await res.json();
        setRole(data.role || 'student');
      } catch (err) {
        console.error('Role fetch error:', err);
        setError(err.message);
        setRole('student');
      } finally {
        setLoading(false);
      }
    };
    fetchRole();
  }, [user?.email]);

  return { role, loading, error };
};

export default useRole;