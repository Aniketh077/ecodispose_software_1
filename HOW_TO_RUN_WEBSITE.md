# 🚀 How to Run EcoTrade Website - Complete Guide

## ✅ All Errors Fixed!

The service requests functionality is now fully implemented and all errors have been resolved.

---

## 📋 Prerequisites

1. **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
2. **MongoDB** (v6 or higher) - [Download](https://www.mongodb.com/try/download/community)

---

## 🔧 Quick Setup (5 Minutes)

### Step 1: Start MongoDB

**Windows:**
```bash
# Open Command Prompt as Administrator
net start MongoDB
```

**Alternative:**
- Press `Win + R` → type `services.msc` → Enter
- Find "MongoDB Server" → Right-click → Start

**Verify MongoDB is running:**
```bash
mongosh
# Should connect without errors, then type 'exit'
```

### Step 2: Start Backend Server

```bash
cd server
npm run dev
```

**Expected Output:**
```
✓ Server running on port 5000
✓ Environment: development
✓ MongoDB Connected
✓ Admin user created successfully
✓ Razorpay initialized with Key ID: rzp_live_...
```

### Step 3: Start Frontend Server

**Open a new terminal:**
```bash
cd sarvin
npm run dev
```

**Expected Output:**
```
✓ Local:   http://localhost:5173/
✓ ready in 1234ms
```

### Step 4: Access the Website

- **Main Website**: http://localhost:5173
- **Admin Panel**: http://localhost:5173/admin

**Admin Login Credentials:**
- Email: `admin@ecotrade.com`
- Password: `Admin@123456`

---

## 🧪 Complete Testing Guide

### 1. Homepage Test ✅

- [ ] Open http://localhost:5173
- [ ] Should see hero slider with 3 rotating images
- [ ] Should see 4 action boxes: **Buy**, **Sell**, **Repair**, **Recycle**
- [ ] Navigation menu should work
- [ ] Search functionality should work
- [ ] No console errors

### 2. Service Requests Test (Customer Side) ✅

#### Test Sell Request:
1. **Click "Sell" action box**
2. **Fill form with test data:**
   ```
   Personal Information:
   - Full Name: John Doe
   - Email: john@example.com
   - Phone: +91 9876543210
   - Address: 123 Test Street, Test City

   Device Information:
   - Device Type: Smartphone
   - Brand: Apple
   - Model: iPhone 12 Pro
   - Condition: Excellent
   - Purchase Year: 2022
   - Expected Price: 45000

   Additional Details:
   - Problem Description: Minor scratches on back, everything works perfectly
   - Accessories: Original box, charger, earphones
   ```
3. **Submit form**
4. **Should show success page**
5. **Should redirect to homepage after 3 seconds**

#### Test Repair Request:
1. **Click "Repair" action box**
2. **Fill form with test data:**
   ```
   Contact Information:
   - Full Name: Jane Smith
   - Email: jane@example.com
   - Phone: +91 9876543210
   - Address: 456 Test Avenue, Test City

   Device Details:
   - Device Type: Laptop
   - Brand: Dell
   - Model: Inspiron 15 3000
   - Warranty Status: Expired

   Repair Details:
   - Problem Description: Screen flickering and battery not charging properly
   - Urgency: Normal (3-5 days)
   - Preferred Date: [Select tomorrow's date]
   ```
3. **Submit form**
4. **Should show success page**

#### Test Recycle Request:
1. **Click "Recycle" action box**
2. **Choose "Individual" or "Corporate"**
3. **Fill form with test data:**

   **For Individual:**
   ```
   Contact Information:
   - Full Name: Mike Johnson
   - Email: mike@example.com
   - Phone: +91 9876543210

   Pickup Details:
   - Pickup Address: 789 Test Road, Test City, 123456
   - E-waste Items: 2 old smartphones, 1 laptop, 1 tablet, old chargers
   - Preferred Pickup Date: [Select tomorrow's date]
   ```

   **For Corporate:**
   ```
   Organization Information:
   - Company Name: Test Corp Ltd
   - GST Number: 12ABCDE3456F7GH
   - Contact Person Name: Corporate Manager
   - Email: manager@testcorp.com
   - Phone: +91 9876543210
   - Estimated Quantity: 50 devices

   Pickup Details:
   - Pickup Address: Corporate Office, Business District, Test City
   - E-waste Items: Old computers, printers, monitors, networking equipment
   - Preferred Pickup Date: [Select tomorrow's date]
   ```
4. **Submit form**
5. **Should show success page**

### 3. Admin Panel Test ✅

#### Login to Admin:
1. **Go to**: http://localhost:5173/admin
2. **Login with:**
   - Email: `admin@ecotrade.com`
   - Password: `Admin@123456`
3. **Should redirect to admin dashboard**

#### Test Service Requests Management:
1. **Click "Service Requests" in sidebar**
2. **Should see 3 tabs:**
   - Sell Requests
   - Repair Requests
   - Recycle Requests
3. **Test each tab:**
   - Should show submitted requests from customer tests
   - Click "View" → Modal opens with full details
   - Change status using dropdown → Should update
   - Filter by status → Should filter results
   - Click "Delete" → Should remove after confirmation

### 4. Product Management Test ✅

#### Add Test Product:
1. **Admin Panel → "Products"**
2. **Click "Add Product"**
3. **Fill form:**
   ```
   Product Classification:
   - Category: Smartphones
   - Brand: Apple

   Product Details:
   - Product Name: iPhone 13 Pro Max 256GB Certified Refurbished
   - Condition: Like New
   - Description: Premium certified refurbished iPhone in excellent condition
   - Regular Price: 85000
   - Discount Price: 75000
   - Stock: 5
   - Warranty: 1 Year

   Main Image: https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg

   Features:
   - 6.7-inch Super Retina XDR display
   - A15 Bionic chip
   - Pro camera system
   - 5G connectivity

   Product Tags:
   ✓ Featured Product
   ✓ New Arrival
   ```
4. **Submit → Product should be created**
5. **Go to frontend → Should see product in listings**

### 5. Complete E-commerce Flow Test ✅

#### Customer Journey:
1. **Browse products** → Should see test product
2. **Click product** → Product details page opens
3. **Add to cart** → Cart icon shows count
4. **View cart** → Should show added product
5. **Proceed to checkout** → Checkout form opens
6. **Fill shipping details:**
   ```
   Full Name: Test Customer
   Email: customer@example.com
   Phone: 9876543210
   Address: Customer Address
   City: Test City
   State: Test State
   Pincode: 123456
   ```
7. **Click "Pay with Razorpay"** → Payment modal opens
8. **Order should be created** (even without payment completion)

#### Admin Order Management:
1. **Admin Panel → "Orders"**
2. **Should see test order**
3. **Click "View"** → Order details open
4. **Change status** → Should update successfully
5. **Add admin notes** → Should save

### 6. Collections & Brands Test ✅

#### Test Collections:
1. **Admin Panel → "Collections"**
2. **Click "Add Collection"**
3. **Create test collection:**
   ```
   Name: Test Cameras
   Description: Professional cameras and accessories
   Parent Category: Electronics
   Display Order: 1
   Status: Active
   ```
4. **Submit** → Should appear in product form dropdown

#### Test Brands:
1. **Admin Panel → "Brands"**
2. **Click "Add Brand"**
3. **Create test brand:**
   ```
   Name: Test Brand
   Logo: [Upload or paste URL]
   ```
4. **Submit** → Should appear in product form dropdown

---

## 🎯 All Features Working

### ✅ Customer Features
- **Homepage**: Hero slider, action boxes, collections, featured products
- **Product Browsing**: Search, filter, sort, view details
- **Shopping Cart**: Add, remove, update quantities
- **Checkout**: Shipping details, payment integration
- **User Account**: Registration, login, profile management
- **Service Requests**: Sell, Repair, Recycle forms ✨ **NEW!**
- **Newsletter**: Subscription functionality
- **Contact**: Contact form submission

### ✅ Admin Features
- **Dashboard**: Statistics, recent orders, customer overview
- **Product Management**: CRUD operations, image uploads
- **Collections Management**: Dynamic categories
- **Brand Management**: Brand logos and management
- **Order Management**: View, update status, customer notifications
- **Customer Management**: View customer details and order history
- **Service Requests Management**: Manage sell/repair/recycle requests ✨ **NEW!**
- **Newsletter Management**: Subscriber management
- **Contact Form Management**: Customer inquiry management

---

## 🔍 Troubleshooting

### MongoDB Issues
```bash
# Check if MongoDB is running
mongosh

# If connection fails, start MongoDB
net start MongoDB

# Check MongoDB status
sc query MongoDB
```

### Port Issues
```bash
# If port 5000 is in use
npx kill-port 5000

# If port 5173 is in use
npx kill-port 5173
```

### Module Issues
```bash
# If you get module not found errors
cd server && npm install
cd ../sarvin && npm install
```

### CORS Issues
- Ensure `FRONTEND_URL=http://localhost:5173` in `server/.env`
- Restart backend server after changing .env

---

## 📊 Expected Results

### When Everything Works:

#### Backend Console:
```
✓ Server running on port 5000
✓ Environment: development
✓ MongoDB Connected
✓ Admin user created successfully
✓ Razorpay initialized
✓ CORS enabled for: Development + Production URLs
```

#### Frontend Console:
```
✓ Local:   http://localhost:5173/
✓ Network: use --host to expose
✓ ready in 1234ms
```

#### Browser:
- ✅ Homepage loads without errors
- ✅ All 4 action boxes work (Buy, Sell, Repair, Recycle)
- ✅ Forms submit successfully
- ✅ Admin panel accessible
- ✅ Service requests appear in admin panel
- ✅ No console errors

---

## 🎉 Success Checklist

### Basic Functionality:
- [ ] MongoDB connected
- [ ] Backend server running on port 5000
- [ ] Frontend server running on port 5173
- [ ] Homepage loads correctly
- [ ] Admin panel accessible

### Service Requests:
- [ ] Sell form submits successfully
- [ ] Repair form submits successfully
- [ ] Recycle form submits successfully
- [ ] Admin can view all requests
- [ ] Admin can update request status
- [ ] Admin can delete requests

### E-commerce:
- [ ] Products display correctly
- [ ] Cart functionality works
- [ ] Checkout process works
- [ ] Admin can manage products
- [ ] Orders appear in admin panel

### Admin Panel:
- [ ] Dashboard shows statistics
- [ ] All management sections work
- [ ] Collections and brands can be created
- [ ] Customer management works
- [ ] Newsletter and contact management works

---

## 🚀 How to Run the Website

### Development Mode (Recommended):

```bash
# Terminal 1: Start MongoDB
net start MongoDB

# Terminal 2: Start Backend
cd server
npm run dev

# Terminal 3: Start Frontend
cd sarvin
npm run dev
```

**Access URLs:**
- **Website**: http://localhost:5173
- **Admin Panel**: http://localhost:5173/admin
- **API Health**: http://localhost:5000/api/health

### Production Mode:

```bash
# Build frontend
cd sarvin
npm run build

# Start production backend
cd server
npm start
```

---

## 📞 Support

If you encounter any issues:

1. **Check MongoDB is running**: `mongosh`
2. **Verify both servers are running**
3. **Check browser console for errors**
4. **Check terminal logs for backend errors**
5. **Ensure environment files exist**: `server/.env` and `sarvin/.env`

---

## 🎯 What's Working Out of the Box

### ✅ Fully Functional (No External Services Needed):
- Complete authentication system
- Product browsing and management
- Shopping cart and checkout
- User account management
- Admin dashboard and management
- **Service requests (Sell, Repair, Recycle)** ✨
- Dynamic collections and brands
- Order management
- Customer management
- Newsletter subscription
- Contact form submissions

### ⚠️ Optional External Services:
- **Email Notifications**: Requires Gmail OAuth2 setup
- **Payment Processing**: Requires Razorpay API keys
- **Image Uploads**: Requires AWS S3 setup

---

## 🎉 Your Website is Ready!

**EcoTrade** is now a fully functional e-commerce platform for certified refurbished electronics with complete service request management.

**Key Features:**
- 🛒 **E-commerce**: Browse, cart, checkout, orders
- 📱 **Service Requests**: Sell, Repair, Recycle devices
- 👨‍💼 **Admin Panel**: Complete management interface
- 🔐 **Authentication**: User registration and login
- 📊 **Analytics**: Dashboard with statistics
- 📧 **Communication**: Newsletter and contact forms

**Start testing and enjoy your premium refurbished electronics marketplace!**