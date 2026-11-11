# Soheli's - Modern Nakshi Kantha E-Commerce Platform

Welcome to the full-stack MERN e-commerce web application for **Soheli's** ("Heritage Woven Modern"), celebrating authentic Bangladeshi Nakshi Kantha craftsmanship across contemporary silhouettes (saris, three-pieces, and two-pieces).

---

## 🏛️ System Architecture

```text
Soheli's E-Commerce Platform
├── client/                     # React + Vite + Tailwind CSS Frontend
│   ├── src/
│   │   ├── components/         # Navbar, Footer, ProductCard
│   │   ├── context/            # CartContext, AuthContext
│   │   ├── pages/              # Home, Shop, ProductDetail, Cart, Checkout, AdminDashboard, AdminLogin, About
│   │   └── services/           # api.js (Axios API Client)
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── server/                     # Node.js + Express + Mongoose REST API
│   ├── config/                 # db.js, memoryStore.js (graceful fallback)
│   ├── controllers/            # productController, orderController, authController
│   ├── middleware/             # authMiddleware (JWT), errorMiddleware
│   ├── models/                 # Product, Order, User (Mongoose Schemas)
│   ├── routes/                 # productRoutes, orderRoutes, authRoutes
│   ├── seed.js                 # Database Seeder (Authentic Nakshi Kantha catalog & Admin)
│   ├── server.js               # Express Server & CORS Middleware
│   ├── test-e2e.js             # Automated 11-step End-to-End Test Suite
│   └── .env                    # PORT, MONGO_URI, JWT_SECRET
│
└── docs/                       # Brand blueprint, operational workflow, content calendar
```

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- Node.js (v18+)
- npm (v9+)
- MongoDB (optional - built-in zero-dependency memory store fallback enables full out-of-the-box demo without running MongoDB locally)

### 2. Backend Setup
```bash
cd server
npm install
npm test            # Runs the full 11-step E2E verification suite
npm start           # Starts API server on http://localhost:5000
```

### 3. Frontend Setup
```bash
cd client
npm install
npm run dev         # Launches Vite dev server on http://localhost:3000
npm run build       # Production build verification
```

---

## 🔑 Default Credentials & Demo Data

- **Admin Portal**: `/admin/login`
- **Admin Email**: `admin@sohelis.com`
- **Admin Password**: `admin123`
- **Customer Checkout**: Full support for Cash on Delivery (ক্যাশ অন ডেলিভারি) and bKash / Nagad with automated shipping fee calculation (Dhaka ৳80, Outside Dhaka ৳150).

---

## 📡 RESTful API Endpoints

### Authentication (`/api/auth`)
- `POST /api/auth/login` — Authenticate admin or customer, return JWT token.
- `POST /api/auth/register` — Register new user account.
- `GET /api/auth/me` — Retrieve authenticated user profile (Bearer token required).

### Products (`/api/products`)
- `GET /api/products` — Retrieve all products (supports `?category=`, `?search=`, and `?featured=true`).
- `GET /api/products/:id` — Retrieve single product details.
- `POST /api/products` — Create new product (*Admin only*).
- `PUT /api/products/:id` — Update product details, stock, or price (*Admin only*).
- `DELETE /api/products/:id` — Remove product (*Admin only*).

### Orders (`/api/orders`)
- `POST /api/orders` — Submit customer order, validates & decrements stock.
- `GET /api/orders` — List all orders & dashboard metrics (*Admin only*).
- `GET /api/orders/:id` — Retrieve specific order details.
- `PUT /api/orders/:id/status` — Update order status (Pending → Processing → Shipped → Delivered / Cancelled) (*Admin only*).
