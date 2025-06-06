import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";

// AUTH PAGES
import Login from "../pages/Login";
import Register from "../pages/Register";
import Logout from "../pages/Logout";
import Unauthorized from "../pages/Unauthorized";
import Redirector from "../pages/Redirector";


// ADMIN PAGES
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminOrders from "../pages/admin/AdminOrders";
import AdminProductListings from "../pages/admin/AdminProductListings";
import AdminSalesReport from "../pages/admin/AdminSalesReport";
import AdminUserList from "../pages/admin/AdminUserList";

// CUSTOMER PAGES
import UserHome from "../pages/user/UserHome";
import ShopPage from "../pages/user/ShopPage";
import CartPage from "../pages/user/CartPage";
import CheckoutPage from "../pages/user/CheckoutPage";
import OrderConfirmationPage from "../pages/user/OrderConfirmationPage";
import OrderHistoryPage from '../pages/user/OrderHistoryPage';
import Profile from "../pages/user/Profile"; 


const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Landing */}
      <Route path="/" element={<Redirector />} />

      {/* Auth Pages */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Customer Pages */}
      <Route
        path="/home"
        element={
          <PrivateRoute allowedRoles={['Customer']}>
            <UserHome />
          </PrivateRoute>
        }
      />

      <Route
        path="/shop"
        element={
          <PrivateRoute allowedRoles={['Customer']}>
            <ShopPage />
          </PrivateRoute>
        }
      />

      <Route
        path="/shop/cart"
        element={
          <PrivateRoute allowedRoles={['Customer']}>
            <CartPage />
          </PrivateRoute>
        }
      />

      <Route
        path="/shop/checkout"
        element={
          <PrivateRoute allowedRoles={['Customer']}>
            <CheckoutPage />
          </PrivateRoute>
        }
      />

      <Route
        path="shop/confirmation"
        element={
          <PrivateRoute allowedRoles={['Customer']}>
            <OrderConfirmationPage />
          </PrivateRoute>
        }
      />
      <Route
        path="shop/order-history"
        element={
          <PrivateRoute allowedRoles={['Customer']}>
            <OrderHistoryPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute allowedRoles={['Customer']}>
            <Profile />
          </PrivateRoute>
        }
      />


      {/* Admin Pages */}
      <Route
        path="/admin/*"
        element={
          <PrivateRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/orders"
        element={
          <PrivateRoute allowedRoles={['admin']}>
            <AdminOrders />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/products"
        element={
          <PrivateRoute allowedRoles={['admin']}>
            <AdminProductListings />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/sales-report"
        element={
          <PrivateRoute allowedRoles={['admin']}>
            <AdminSalesReport />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <PrivateRoute allowedRoles={['admin']}>
            <AdminUserList />
          </PrivateRoute>
        }
      />
    </Routes>

  );
};

export default AppRoutes;
