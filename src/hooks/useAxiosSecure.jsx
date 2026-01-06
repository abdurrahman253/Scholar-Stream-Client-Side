// src/hooks/useAxiosSecure.js

import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const useAxiosSecure = () => {
  const { logOut, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {

    const requestIntercept = axiosSecure.interceptors.request.use(
      async (config) => {
        if (user) {
          try {
         
            const token = await user.getIdToken(true); 
            config.headers.Authorization = `Bearer ${token}`;
          } catch (error) {
            console.error('Error getting fresh token:', error);
          }
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );


    const responseIntercept = axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        const status = error.response?.status;

      
        if (status === 401 || status === 403) {
          console.error('Token expired or unauthorized. Logging out...');
          await logOut();
          navigate('/login');
        }

        return Promise.reject(error);
      }
    );

    // Cleanup interceptors
    return () => {
      axiosSecure.interceptors.request.eject(requestIntercept);
      axiosSecure.interceptors.response.eject(responseIntercept);
    };
  }, [user, logOut, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;