import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";

// AUTH PAGES
import Login from "../pages/Login";
import Register from "../pages/Register";
import Logout from "../pages/Logout";
import Unauthorized from "../pages/Unauthorized";


// ADMIN PAGES
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminOrders from "../pages/admin/AdminOrders";
import AdminProductListing from "../pages/admin/AdminProductListing";
import AdminSalesReport from "../pages/admin/AdminSalesReport";
import AdminUserList from "../pages/admin/AdminUserList";

// CUSTOMER PAGES
import UserHome from "../pages/user/UserHome";
import ShopPage from "../pages/user/ShopPage";
import CartPage from "../pages/user/CartPage";
import CheckoutPage from "../pages/user/CheckoutPage";
import OrderConfirmationPage from "../pages/user/OrderConfirmationPage";
import OrderHistoryPage from '../pages/user/OrderHistoryPage';


const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Landing */}
      <Route path="/" element={<h1>Welcome to 2gether4ever Customer Portal</h1>} />

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


      {/* Admin Pages */}
      <Route
        path="/admin"
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
        path="/admin/products-list"
        element={
          <PrivateRoute allowedRoles={['admin']}>
            <AdminProductListing />
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
        path="/admin/users-list"
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
