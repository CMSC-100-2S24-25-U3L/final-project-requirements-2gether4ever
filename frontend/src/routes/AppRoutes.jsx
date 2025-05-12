//AppRoutes.jsx

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

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

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Auth Routes */}

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />}/>
        <Route path="/admin/orders" element={<AdminOrders />}/>
        <Route path="/admin/products-list" element={<AdminProductListing />}/>
        <Route path="/admin/sales-report" element={<AdminSalesReport />}/>
        <Route path="/admin/users-list" element={<AdminUserList />}/>
        {/* Merchant Routes */}
        <Route path="/merchant" element={<MerchantDashboard />}/>
        <Route path="/merchant/inventory" element={<MerchantInventory />}/>
        <Route path="/merchant/orders" element={<MerchantOrders />}/>
        <Route path="/merchant/sales-report" element={<MerchantSalesReport />}/>
        
        {/* User Routes */}
        <Route path="/home" element={<UserHome />}/>
        <Route path="/cart" element={<UserCart />}/>
        <Route path="/shop" element={<UserShop />}/>
        <Route path="/orders" element={<UserOrders />}/>

      </Routes>
    </Router>
  )
} 

export default AppRoutes;