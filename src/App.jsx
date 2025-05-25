import React, { useContext } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Menubar from './menu/Menubar';
import Dashboard from './pages/DASHBOARD/Dashboard';
import ManageCategory from './pages/MANAGECATEGORY/ManageCategory';
import Explore from './pages/EXPLORE/Expore';
import ManageItems from './pages/MANAGEITEMS/ManageItems';
import ManageUsers from './pages/MANAGEUSERS/ManageUser';
import OrderHistory from './pages/orderHistory/OrderHistory';
import Login from './pages/Login/Login';
import toast, { Toaster } from 'react-hot-toast';
import { AppContext } from './context/AppContext';

// ✅ Correct ProtectedRoute
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { auth } = useContext(AppContext);

  // Check if token or role is missing or explicitly "null" (string)
  if (!auth.token || auth.token === "null" || !auth.role || auth.role === "null") {
  
    return <Navigate to="/login" replace />;
  }

  // Check if role is not allowed
  if (allowedRoles && !allowedRoles.includes(auth.role)) {
    toast.error("You are not authorized to access this page");
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};


// ✅ LoginRoute to prevent access to /login when already logged in
const LoginRoute = ({ children }) => {
  const { auth } = useContext(AppContext);

  if (auth.token && auth.token !== "null") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};


const App = () => {
  const location = useLocation();

  return (
    <div>
      {location.pathname !== "/login" && <Menubar />}
      <Toaster />
      <Routes>
        {/* Dashboard and Explore accessible by both USER and ADMIN */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={['ROLE_USER', 'ROLE_ADMIN']}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/explore"
          element={
            <ProtectedRoute allowedRoles={['ROLE_USER', 'ROLE_ADMIN']}>
              <Explore />
            </ProtectedRoute>
          }
        />

        {/* Admin-only routes */}
        <Route
          path="/category"
          element={
            <ProtectedRoute allowedRoles={['ROLE_ADMIN']}>
              <ManageCategory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute allowedRoles={['ROLE_ADMIN']}>
              <ManageUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/items"
          element={
            <ProtectedRoute allowedRoles={['ROLE_ADMIN']}>
              <ManageItems />
            </ProtectedRoute>
          }
        />

        {/* Order accessible by both */}
        <Route
          path="/order"
          element={
            <ProtectedRoute allowedRoles={['ROLE_USER', 'ROLE_ADMIN']}>
              <OrderHistory />
            </ProtectedRoute>
          }
        />

        {/* Login route */}
        <Route
          path="/login"
          element={
            <LoginRoute>
              <Login />
            </LoginRoute>
          }
        />

        {/* Default and catch-all */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </div>
  );
};

export default App;
