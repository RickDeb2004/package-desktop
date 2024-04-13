"use client";
import React, { createContext, useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { app } from '../firebase';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribed = auth.onIdTokenChanged((user) => {
      if (user?.uid) {
        setUser(user);
        if (user.accessToken !== localStorage.getItem('accessToken')) {
          localStorage.setItem('accessToken', user.accessToken);
          window.location.reload();
        }
        setIsLoading(false);
        return;
      }

      
      setIsLoading(false);
      setUser({});
      localStorage.clear();
    });

    return () => {
      unsubscribed();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  return (
    <AuthContext.Provider value={{ user, auth }}> 
        {!isLoading && children}
    </AuthContext.Provider>
  );
};