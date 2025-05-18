### Farm-to-Table E-Commerce Website
A web application developed for the Department of Agriculture (DA) to facilitate direct transactions between farmers and consumers. This e-commerce platform enables customers to shop directly from farmers’ inventories, while the DA manages the catalog of products and handles order fulfillment.

## Team Members
- Member 1: Nestor Victus T. Bulatao III
- Member 2: Maria Gracy E. de Guzman
- Member 3: Raphael Andrei M. Meneses
- Member 4: Arimathea Charmille H. Suarez

## Project Features
User Registration & Authentication
 Customers can register with their email, while the Department of Agriculture (DA) has an admin account to manage the e-commerce process.
Product Listings & Sorting
 Products are categorized (Crops/Poultry) and sorted based on price, quantity, or name. The DA can add, update, and delete products.
Order Management
 Customers can add items to the cart, review orders, and place them. The DA confirms and manages order fulfillment.
Sales Reports
 The DA can view reports on products sold, income generated, and total sales.
Dashboard
 An admin dashboard for the DA that includes account management, product listing, order fulfillment, and sales reporting.

## Technologies Used
- Frontend: React.js
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JWT (JSON Web Tokens)
- Version Control: Git, GitHub

## Usage Guidelines
1. Customer
Can register and log in using their email.
Can browse and purchase products.
Can cancel unconfirmed orders.
2. Department of Agriculture (Admin)
No registration needed; account is pre-created.
Can manage product inventory, update prices, and manage product types.
Can oversee user accounts, order fulfillment, and view sales reports.


LIBRARY STRUCTURE
farm-to-table/
├── backend/
│   ├── models/
│   │   ├── Product.js
│   │   ├── User.js
│   │   └── UserTransaction.js
│   ├── routers/
│   │   ├── ProductRouter.js
│   │   ├── UserRouter.js
│   │   ├── UserTransaction.js
│   │   └── UserTransactionRouter.js
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   │   ├── auth.js
│   │   │   ├── product.js
│   │   │   └── transaction.js
│   │   ├── components/
│   │   │   ├── user/
│   │   │   │   ├── Cart.css
│   │   │   │   ├── Cart.jsx
│   │   │   │   ├── Checkout.jsx
│   │   │   │   ├── CustomerNavBar.css
│   │   │   │   ├── CustomerNavBar.jsx
│   │   │   │   ├── OrderConfirmation.jsx
│   │   │   │   ├── OrderHistory.jsx
│   │   │   │   ├── ProductList.css
│   │   │   │   ├── ProductList.jsx
│   │   ├── context/
│   │   │   ├── CartContext.jsx   // Manages login state
│   │   │   ├── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── admin/
│   │   │   │   ├── AdminDashboard.jsx
│   │   │   │   ├── AdminOrders.jsx
│   │   │   │   ├── AdminProductListings.jsx
│   │   │   │   ├── AdminSalesReport.jsx
│   │   │   │   └── AdminUserList.jsx
│   │   │   ├── user/
│   │   │   │   ├── Shop.jsx
│   │   │   │   ├── UserCart.jsx
│   │   │   │   ├── Checkout.jsx
│   │   │   │   ├── OrderConfirmation.jsx
│   │   │   │   ├── OrderHistory.jsx
│   │   │   │   └── UserHome.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Logout.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── requiredPages.md
│   │   │   └── Unauthorized.jsx
│   │   ├── routes/
│   │   │   └── AppRoutes.jsx
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .gitignore
│   ├── App.js
│   ├── eslint.config.js
│   ├── index.html
│   └── index.js
