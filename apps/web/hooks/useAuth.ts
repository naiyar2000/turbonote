'use client';

import { useEffect, useState } from 'react';

export const useAuth = () => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only runs in the browser
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
    setLoading(false);
  }, []);

  return { token, loading, isAuthenticated: !!token };
};
