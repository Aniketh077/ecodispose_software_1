# EcoTrade - Complete Setup Instructions

## Quick Start (5 Minutes)

### 1. Prerequisites
- Node.js 18+ installed
- MongoDB installed and running

### 2. Clone and Install Dependencies

```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies  
cd ../sarvin
npm install
```

### 3. Environment Setup

**Backend Environment (.env):**
```bash
cd server
# Copy the existing .env file or create one with these values:
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecotrade-electronics
JWT_SECRET=ecotrade-super-secret-jwt-key-change-this-in-production-12345
ADMIN_EMAIL=admin@ecotrade.com
ADMIN_PASSWORD=Admin@123456
APP_NAME=EcoTrade
FRONTEND_URL=http://localhost:5173
```

**Frontend Environment (.env):**
```bash
cd ../sarvin
# Copy the existing .env file or create one with these values:
VITE_BACKEND_URL=http://localhost:5000
VITE_FRONTEND_URL=http://localhost:5173
VITE_RAZORPAY_KEY_ID=rzp_test_your_key_id
```

### 4. Start MongoDB

**Windows:**
```bash
net start MongoDB
```

**macOS:**
```bash
brew services start mongodb-community
```

**Linux:**
```bash
sudo systemctl start mongodb
```

### 5. Run the Application

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd sarvin
npm run dev
```

### 6. Access the Application

- **Frontend:** http://localhost:5173
- **Admin Panel:** http://localhost:5173/admin
- **Admin Login:** admin@ecotrade.com / Admin@123456

## What Works Out of the Box

✅ **Complete Authentication System**
- User registration and login
- Email verification (when email configured)
- Password reset
- Admin panel access

✅ **Product Management**
- Browse certified refurbished products
- Search and filter products
- View product details with specifications
- Admin can add/edit/delete products

✅ **Shopping Cart & Checkout**
- Add products to cart
- Update quantities
- Secure checkout process
- Order placement

✅ **Order Management**
- View order history
- Track order status
- Admin can manage all orders
- Email notifications (when configured)

✅ **Dynamic Collections & Brands**
- Admin can create product collections
- Admin can manage brands with logos
- Real-time updates across the website

## Optional External Services

For full functionality, configure these services:

### Email Notifications (Optional)
- Requires Gmail OAuth2 setup
- See SETUP_GUIDE.md for detailed instructions

### Payment Processing (Optional)
- Requires Razorpay account and API keys
- See SETUP_GUIDE.md for setup instructions

### Image Uploads (Optional)
- Requires AWS S3 bucket configuration
- See SETUP_GUIDE.md for AWS setup

## Troubleshooting

### MongoDB Connection Error
```bash
# Ensure MongoDB is running
mongosh  # Test connection
```

### Port Already in Use
```bash
# Kill process on port 5000
npx kill-port 5000

# Kill process on port 5173  
npx kill-port 5173
```

### Module Not Found
```bash
# Reinstall dependencies
cd server && npm install
cd ../sarvin && npm install
```

## Next Steps

1. **Test Basic Functionality:**
   - Register a new user
   - Browse products
   - Add items to cart
   - Test admin panel

2. **Add Sample Data:**
   - Login to admin panel
   - Create product collections
   - Add brands with logos
   - Add sample products

3. **Configure External Services (Optional):**
   - Set up email notifications
   - Configure payment gateway
   - Set up image uploads

Your EcoTrade platform is now ready to use! 🚀