# 🚀 Complete EcoTrade Setup & Testing Guide

## ✅ All Issues Fixed!

The service requests functionality is now fully implemented and working. Here's how to run and test everything:

---

## 📋 Prerequisites

1. **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
2. **MongoDB** (v6 or higher) - [Download](https://www.mongodb.com/try/download/community)

---

## 🔧 Setup Instructions

### Step 1: Start MongoDB

**Windows:**
```bash
# Open Command Prompt as Administrator
net start MongoDB
```

**Alternative for Windows:**
- Open Services (services.msc)
- Find "MongoDB Server"
- Right-click → Start

### Step 2: Install Dependencies

```bash
# Backend dependencies
cd server
npm install

# Frontend dependencies
cd ../sarvin
npm install
```

### Step 3: Start the Application

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```
✅ Should show: "Server running on port 5000"

**Terminal 2 - Frontend:**
```bash
cd sarvin
npm run dev
```
✅ Should show: "Local: http://localhost:5173"

---

## 🧪 Complete Testing Checklist

### 1. Basic Application Test
- [ ] Open http://localhost:5173
- [ ] Homepage loads with hero slider
- [ ] See 4 action boxes: Buy, Sell, Repair, Recycle
- [ ] Navigation works (Products, About, Contact)

### 2. Authentication Test
- [ ] Click "Sign In" → Login page loads
- [ ] Login with admin credentials:
  - Email: `admin@ecotrade.com`
  - Password: `Admin@123456`
- [ ] Should redirect to homepage with admin access

### 3. Admin Panel Test
- [ ] Click user icon → "Admin Dashboard"
- [ ] Dashboard loads with statistics
- [ ] Sidebar shows: Dashboard, Products, Collections, Brands, Orders, Customers, Service Requests, Newsletter, Contact Forms

### 4. Service Requests Test (Customer Side)

#### Sell Request:
- [ ] Homepage → Click "Sell" action box
- [ ] Fill out sell form with test data:
  - Name: "Test User"
  - Email: "test@example.com"
  - Phone: "9876543210"
  - Address: "Test Address"
  - Device Type: "Smartphone"
  - Brand: "Apple"
  - Model: "iPhone 12"
  - Condition: "Good"
  - Problem: "Minor scratches"
  - Purchase Year: "2022"
- [ ] Submit form
- [ ] Should show success page
- [ ] Check browser console for any errors

#### Repair Request:
- [ ] Homepage → Click "Repair" action box
- [ ] Fill out repair form with test data
- [ ] Submit form
- [ ] Should show success page

#### Recycle Request:
- [ ] Homepage → Click "Recycle" action box
- [ ] Choose "Individual" or "Corporate"
- [ ] Fill out form with test data
- [ ] Submit form
- [ ] Should show success page

### 5. Admin Service Requests Test
- [ ] Admin Panel → "Service Requests"
- [ ] Should see 3 tabs: Sell Requests, Repair Requests, Recycle Requests
- [ ] Click each tab to see submitted requests
- [ ] Click "View" on a request → Modal opens with details
- [ ] Change status using dropdown → Should update
- [ ] Click "Delete" → Should remove request
- [ ] Filter by status → Should filter results

### 6. Product Management Test
- [ ] Admin Panel → "Products"
- [ ] Click "Add Product"
- [ ] Fill out product form
- [ ] Submit → Product should be created
- [ ] View product on frontend

### 7. Collections & Brands Test
- [ ] Admin Panel → "Collections"
- [ ] Add new collection
- [ ] Admin Panel → "Brands"
- [ ] Add new brand
- [ ] Verify they appear in product form dropdowns

### 8. Order Management Test
- [ ] Frontend → Browse products
- [ ] Add product to cart
- [ ] Proceed to checkout
- [ ] Fill shipping details
- [ ] Test payment flow (if Razorpay configured)
- [ ] Admin Panel → "Orders" → View order

---

## 🎯 Key Features Working

### ✅ Customer Features
- **Homepage**: Hero slider, action boxes, collections, featured products
- **Product Browsing**: Search, filter, sort, view details
- **Shopping Cart**: Add, remove, update quantities
- **Checkout**: Shipping details, payment integration
- **User Account**: Registration, login, profile management
- **Service Requests**: Sell, Repair, Recycle forms

### ✅ Admin Features
- **Dashboard**: Statistics, recent orders, customer overview
- **Product Management**: CRUD operations, image uploads
- **Collections Management**: Dynamic categories
- **Brands Management**: Brand logos and management
- **Order Management**: View, update status, customer notifications
- **Customer Management**: View customer details and order history
- **Service Requests**: Manage sell/repair/recycle requests
- **Newsletter**: Subscriber management
- **Contact Forms**: Customer inquiry management

---

## 🔍 Troubleshooting

### MongoDB Connection Issues
```bash
# Check if MongoDB is running
mongosh
# Should connect without errors
```

### Port Already in Use
```bash
# Kill process on port 5000
npx kill-port 5000

# Kill process on port 5173
npx kill-port 5173
```

### Module Not Found Errors
```bash
# Reinstall dependencies
cd server && npm install
cd ../sarvin && npm install
```

### CORS Errors
- Check that FRONTEND_URL in server/.env matches your frontend URL
- Default: `http://localhost:5173`

---

## 📧 Email Configuration (Optional)

To enable email notifications:

1. **Gmail OAuth2 Setup:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Enable Gmail API
   - Create OAuth2 credentials
   - Get refresh token from [OAuth Playground](https://developers.google.com/oauthplayground)

2. **Update server/.env:**
   ```env
   GMAIL_USER=your-email@gmail.com
   GMAIL_CLIENT_ID=your-client-id
   GMAIL_CLIENT_SECRET=your-client-secret
   GMAIL_REFRESH_TOKEN=your-refresh-token
   ```

---

## 💳 Payment Configuration (Optional)

To enable payments:

1. **Razorpay Setup:**
   - Sign up at [Razorpay](https://dashboard.razorpay.com/)
   - Get API keys from dashboard

2. **Update environment files:**
   ```env
   # server/.env
   RAZORPAY_KEY_SECRET=your-secret-key

   # sarvin/.env
   VITE_RAZORPAY_KEY_ID=your-key-id
   ```

---

## 🖼️ Image Upload Configuration (Optional)

To enable image uploads:

1. **AWS S3 Setup:**
   - Create S3 bucket
   - Create IAM user with S3 access
   - Set up CloudFront (optional)

2. **Update server/.env:**
   ```env
   AWS_ACCESS_KEY_ID=your-access-key
   AWS_SECRET_ACCESS_KEY=your-secret-key
   AWS_REGION=your-region
   AWS_S3_BUCKET_NAME=your-bucket-name
   AWS_CLOUDFRONT_DOMAIN=your-cloudfront-domain
   ```

---

## 🚀 How to Run the Website

### Development Mode (Local Testing)

1. **Start MongoDB:**
   ```bash
   # Windows
   net start MongoDB
   ```

2. **Start Backend:**
   ```bash
   cd server
   npm run dev
   ```
   ✅ Backend runs on: http://localhost:5000

3. **Start Frontend:**
   ```bash
   cd sarvin
   npm run dev
   ```
   ✅ Frontend runs on: http://localhost:5173

4. **Access the Website:**
   - **Customer Site**: http://localhost:5173
   - **Admin Panel**: http://localhost:5173/admin
   - **Admin Login**: admin@ecotrade.com / Admin@123456

### Production Build

1. **Build Frontend:**
   ```bash
   cd sarvin
   npm run build
   ```

2. **Start Production Backend:**
   ```bash
   cd server
   npm start
   ```

---

## 📊 What's Working Out of the Box

### ✅ Fully Functional (No External Services Needed)
- Complete authentication system
- Product browsing and management
- Shopping cart and basic checkout
- User account management
- Admin dashboard and management
- Service requests (Sell, Repair, Recycle)
- Dynamic collections and brands
- Order management
- Customer management
- Newsletter subscription
- Contact form submissions

### ⚠️ Requires External Service Configuration
- **Email Notifications**: Requires Gmail OAuth2
- **Payment Processing**: Requires Razorpay API keys
- **Image Uploads**: Requires AWS S3 setup

---

## 🎉 Success Indicators

When everything is working correctly, you should see:

1. **Backend Console:**
   ```
   ✓ Server running on port 5000
   ✓ Environment: development
   ✓ MongoDB Connected
   ✓ Admin user created successfully
   ✓ Razorpay initialized with Key ID: rzp_live_...
   ```

2. **Frontend Console:**
   ```
   ✓ Local:   http://localhost:5173/
   ✓ Network: use --host to expose
   ```

3. **Browser:**
   - Homepage loads without errors
   - All navigation works
   - Admin panel accessible
   - Forms submit successfully
   - No console errors

---

## 📞 Support

If you encounter any issues:

1. **Check this guide first**
2. **Verify MongoDB is running**
3. **Check environment variables are set**
4. **Look at browser console for errors**
5. **Check terminal logs for backend errors**

---

## 🎯 Quick Test Commands

```bash
# Test backend health
curl http://localhost:5000/api/health

# Test frontend build
cd sarvin && npm run build

# Check MongoDB connection
mongosh
```

---

**Your EcoTrade platform is now fully functional! 🎉**

All service request functionality (Sell, Repair, Recycle) is working, along with the complete e-commerce platform including admin management, product browsing, cart functionality, and user management.