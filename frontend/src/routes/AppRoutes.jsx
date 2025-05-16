import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";

// import admin (Dept of Agriculture) pages
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminOrders from "../pages/admin/AdminOrders";
import AdminProductListing from "../pages/admin/AdminProductListings";
import AdminSalesReport from "../pages/admin/AdminSalesReport";
import AdminUserList from "../pages/admin/AdminUserList";

// import merchant user pages
import MerchantDashboard from "../pages/merchant/merchantDashboard";
import MerchantInventory from "../pages/merchant/MerchantInventory";
import MerchantOrders from "../pages/merchant/MerchantOrders";
import MerchantSalesReport from "../pages/merchant/MerchantSalesReport";

// import user pages
import UserCart from "../pages/user/UserCart";
import UserHome from "../pages/user/UserHome";
import UserOrders from "../pages/user/userOrders";
import UserShop from "../pages/user/UserShop";
import Login from "../pages/Login";

// import misc pages
import Logout from "../pages/Logout";
import Unauthorized from "../pages/Unauthorized";
import Register from "../pages/Register";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        {/* Admin Routes */}
        <Route path="/admin" element={
          <PrivateRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </PrivateRoute>
        } />
        <Route path="/admin/orders" element={
          <PrivateRoute allowedRoles={['admin']}>
            <AdminOrders />
          </PrivateRoute>
        } />
        <Route path="/admin/products-list" element={
          <PrivateRoute allowedRoles={['admin']}>
            <AdminProductListing />
          </PrivateRoute>
        } />
        <Route path="/admin/sales-report" element={
          <PrivateRoute allowedRoles={['admin']}>
            <AdminSalesReport />
          </PrivateRoute>
        } />
        <Route path="/admin/users-list" element={
          <PrivateRoute allowedRoles={['admin']}>
            <AdminUserList />
          </PrivateRoute>
        } />

        {/* Merchant Routes */}
        <Route path="/merchant" element={
          <PrivateRoute allowedRoles={['merchant']}>
            <MerchantDashboard />
          </PrivateRoute>
        } />
        <Route path="/merchant/inventory" element={
          <PrivateRoute allowedRoles={['merchant']}>
            <MerchantInventory />
          </PrivateRoute>
        } />
        <Route path="/merchant/orders" element={
          <PrivateRoute allowedRoles={['merchant']}>
            <MerchantOrders />
          </PrivateRoute>
        } />
        <Route path="/merchant/sales-report" element={
          <PrivateRoute allowedRoles={['merchant']}>
            <MerchantSalesReport />
          </PrivateRoute>
        } />

        {/* User Routes */}
        <Route path="/home" element={
          <PrivateRoute allowedRoles={['Customer']}>
            <UserHome />
          </PrivateRoute>
        } />
        <Route path="/cart" element={
          <PrivateRoute allowedRoles={['Customer']}>
            <UserCart />
          </PrivateRoute>
        } />
        <Route path="/shop" element={
          <PrivateRoute allowedRoles={['Customer']}>
            <UserShop />
          </PrivateRoute>
        } />
        <Route path="/orders" element={
          <PrivateRoute allowedRoles={['Customer']}>
            <UserOrders />
          </PrivateRoute>
        } />
        {/* Misc Routes */}
        <Route path="/logout" element={
          <PrivateRoute allowedRoles={['admin', 'merchant', 'Customer']}>
            <Logout />
          </PrivateRoute>
        } />
        <Route path="/unauthorized" element={
          <Unauthorized />
        } />
        {/* <Route path="/profile" element={
          <PrivateRoute allowedRoles={['admin', 'merchant', 'Customer']}>
            <UserProfile />
          </PrivateRoute>
        } /> */}


      </Routes>
    </Router>
  )
} 

export default AppRoutes;