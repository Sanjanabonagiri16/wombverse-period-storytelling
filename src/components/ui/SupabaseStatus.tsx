import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

const SupabaseStatus = () => {
  const { user, loading: authLoading } = useAuth();
  const [dbStatus, setDbStatus] = useState<'checking' | 'ok' | 'error'>('checking');

  useEffect(() => {
    if (!supabase) {
      setDbStatus('error');
      return;
    }

    const checkDbConnection = async () => {
      try {
        // A lightweight query to check if the database is reachable
        const { error } = await supabase.from('stories').select('id').limit(1);
        if (error && error.code !== '42501') { // 42501 is a row-level security error, which is fine
          throw error;
        }
        setDbStatus('ok');
      } catch (err) {
        console.error('Supabase connection check failed:', err);
        setDbStatus('error');
      }
    };

    checkDbConnection();
  }, []);

  const getStatus = () => {
    if (dbStatus === 'error') {
      return { text: 'Connection Error', color: 'bg-red-500', pulse: true };
    }
    if (authLoading) {
      return { text: 'Connecting...', color: 'bg-yellow-500', pulse: true };
    }
    if (user) {
      return { text: `Connected: ${user.email}`, color: 'bg-green-500', pulse: false };
    }
    return { text: 'Not Logged In', color: 'bg-gray-500', pulse: false };
  };

  const { text, color, pulse } = getStatus();

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '10px',
        right: '10px',
        zIndex: 1000,
        padding: '5px 10px',
        borderRadius: '8px',
        fontSize: '12px',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}
      className={color}
    >
      <div className={`w-3 h-3 rounded-full ${color} ${pulse ? 'animate-pulse' : ''}`}></div>
      <span>{text}</span>
    </div>
  );
};

export default SupabaseStatus; 