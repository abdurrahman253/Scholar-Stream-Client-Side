// src/routes/Routes.jsx
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home/Home';
import ErrorPage from '../pages/ErrorPage';
import Login from '../pages/Login/Login';
import SignUp from '../pages/SignUp/SignUp';
import PrivateRoute from './PrivateRoute';
import DashboardLayout from '../layouts/DashboardLayout'; // এটাই মেইন ড্যাশবোর্ড

import AllScholarships from '../pages/AllScholarships';
import ScholarshipDetails from '../pages/ScholarshipDetails/ScholarshipDetails';
import PaymentSuccess from '../pages/Payment/PaymentSuccess';
import PaymentCancel from '../pages/Payment/PaymentCancel';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/all-scholarships', element: <AllScholarships /> },
      { path: '/scholarships/:id', element: <ScholarshipDetails /> },
      { path: '/matches', element: <AllScholarships /> }, 
      {
        path: '/payment-success',
        element: (
          <PrivateRoute>
            <PaymentSuccess />
          </PrivateRoute>
        ),
      },
      {
        path: '/payment-cancel',
        element: (
          <PrivateRoute>
            <PaymentCancel />
          </PrivateRoute>
        ),
      },
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },

 
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
  },
]);