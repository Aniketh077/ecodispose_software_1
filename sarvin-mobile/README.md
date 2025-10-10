# Sarvin Mobile App

A React Native e-commerce mobile application built with Expo, featuring product browsing, cart management, order tracking, and Razorpay payment integration.

## Features

- 🔐 User Authentication (Login/Register)
- 🛍️ Product Browsing & Search
- 🛒 Shopping Cart Management
- 💳 Razorpay Payment Integration
- 📦 Order Tracking
- 👤 User Account Management
- 📱 Cross-platform (iOS & Android)

## Tech Stack

- **Framework**: React Native with Expo
- **Navigation**: React Navigation
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Payment Gateway**: Razorpay
- **Storage**: AsyncStorage & Expo SecureStore

## Prerequisites

Before you begin, ensure you have installed:

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Expo Go](https://expo.dev/client) app on your mobile device

## Installation

1. **Navigate to the mobile app directory**:
   ```bash
   cd sarvin-mobile
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:

   Update the `.env` file with your backend URL:
   ```
   BACKEND_URL=http://your-backend-url:5000
   SUPABASE_URL=your-supabase-url
   SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

4. **Update Razorpay configuration**:

   In `src/screens/CheckoutScreen.js`, replace `YOUR_RAZORPAY_KEY_ID` with your actual Razorpay key.

## Running the App Locally

### Start the Development Server

```bash
npm start
```

This will start the Expo development server and display a QR code in your terminal.

### Run on Physical Device

1. Install **Expo Go** from App Store (iOS) or Play Store (Android)
2. Scan the QR code from your terminal using:
   - **iOS**: Camera app
   - **Android**: Expo Go app

### Run on Simulator/Emulator

**iOS Simulator** (macOS only):
```bash
npm run ios
```

**Android Emulator**:
```bash
npm run android
```

## Project Structure

```
sarvin-mobile/
├── src/
│   ├── api/                 # API integration
│   │   ├── axios.js
│   │   ├── authAPI.js
│   │   ├── productAPI.js
│   │   ├── cartAPI.js
│   │   ├── orderAPI.js
│   │   └── collectionAPI.js
│   ├── contexts/            # React Context providers
│   │   ├── AuthContext.js
│   │   └── CartContext.js
│   ├── navigation/          # Navigation configuration
│   │   └── AppNavigator.js
│   ├── screens/             # App screens
│   │   ├── LoginScreen.js
│   │   ├── RegisterScreen.js
│   │   ├── HomeScreen.js
│   │   ├── ProductsScreen.js
│   │   ├── ProductDetailScreen.js
│   │   ├── CartScreen.js
│   │   ├── CheckoutScreen.js
│   │   ├── OrdersScreen.js
│   │   ├── OrderDetailScreen.js
│   │   ├── AccountScreen.js
│   │   └── SearchScreen.js
│   └── components/          # Reusable components
├── assets/                  # Images, fonts, etc.
├── App.js                   # Main app component
├── app.json                 # Expo configuration
├── package.json             # Dependencies
└── README.md               # This file
```

## Backend Connection

The app connects to your existing Node.js/Express backend. Ensure:

1. Your backend server is running
2. The `BACKEND_URL` in `.env` points to your backend
3. CORS is enabled on your backend for mobile requests

### Local Development with Backend

If running backend locally:
- Use your computer's IP address (not localhost)
- Example: `BACKEND_URL=http://192.168.1.100:5000`
- Find your IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)

## Building for Production

### Prerequisites for Building

1. **Install EAS CLI**:
   ```bash
   npm install -g eas-cli
   ```

2. **Create Expo account**: Sign up at [expo.dev](https://expo.dev)

3. **Login to Expo**:
   ```bash
   eas login
   ```

### Configure EAS Build

1. **Initialize EAS**:
   ```bash
   eas build:configure
   ```

2. This creates an `eas.json` file with build profiles

### Build for Android

**Development Build**:
```bash
eas build --platform android --profile development
```

**Production Build (APK)**:
```bash
eas build --platform android --profile production
```

**Production Build (AAB for Play Store)**:
```bash
eas build --platform android --profile production
```

### Build for iOS

**Note**: iOS builds require an Apple Developer Account ($99/year)

**Development Build**:
```bash
eas build --platform ios --profile development
```

**Production Build**:
```bash
eas build --platform ios --profile production
```

### Submit to App Stores

**Submit to Google Play Store**:
```bash
eas submit --platform android
```

**Submit to Apple App Store**:
```bash
eas submit --platform ios
```

## App Store & Play Store Submission

### Google Play Store

1. **Prepare Assets**:
   - App icon (512x512 PNG)
   - Feature graphic (1024x500 JPG/PNG)
   - Screenshots (various sizes)
   - Privacy policy URL

2. **Create Developer Account**:
   - Go to [Google Play Console](https://play.google.com/console)
   - Pay $25 one-time registration fee
   - Complete account setup

3. **Create App**:
   - Create new app in Play Console
   - Fill in app details
   - Upload build (AAB file from EAS)
   - Complete content rating questionnaire
   - Set pricing & distribution

4. **Submit for Review**:
   - Review all information
   - Submit for review
   - Wait 1-3 days for approval

### Apple App Store

1. **Prepare Assets**:
   - App icon (1024x1024 PNG)
   - Screenshots for all device sizes
   - Privacy policy URL
   - App preview videos (optional)

2. **Apple Developer Account**:
   - Enroll at [developer.apple.com](https://developer.apple.com)
   - Pay $99 annual fee
   - Complete account setup

3. **App Store Connect**:
   - Create new app in [App Store Connect](https://appstoreconnect.apple.com)
   - Fill in app information
   - Upload build from EAS
   - Add app metadata

4. **Submit for Review**:
   - Complete all required information
   - Submit for review
   - Wait 1-3 days for approval

## Troubleshooting

### Cannot Connect to Backend

- Ensure backend is running
- Check `BACKEND_URL` in `.env`
- Use IP address (not localhost) for physical devices
- Verify CORS is enabled on backend

### Razorpay Issues

- Verify Razorpay key is correct
- Check API keys are for correct mode (test/live)
- Ensure react-native-razorpay is properly linked

### Build Errors

- Clear cache: `expo start -c`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Update Expo: `expo upgrade`

### Navigation Issues

- Ensure react-native-gesture-handler is imported first
- Check navigation stack structure
- Verify screen names match routes

## API Endpoints Used

The app consumes the following backend endpoints:

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/me` - Get current user
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/collection/:name` - Get products by collection
- `GET /api/collections` - Get all collections
- `GET /api/cart` - Get user cart
- `POST /api/cart` - Add to cart
- `PUT /api/cart/:productId` - Update cart item
- `DELETE /api/cart/:productId` - Remove from cart
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get order details

## Environment Variables

Required environment variables:

```
BACKEND_URL=http://your-backend-url:5000
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-supabase-anon-key
```

## Testing

### Test on Physical Device

1. Install Expo Go app
2. Scan QR code from terminal
3. App will load on your device

### Test Payments

Use Razorpay test mode credentials:
- Test Card: 4111 1111 1111 1111
- Expiry: Any future date
- CVV: Any 3 digits

## Performance Optimization

- Images are loaded on-demand
- API calls are cached when appropriate
- Navigation uses lazy loading
- Bundle size is optimized with Expo

## Security

- Tokens stored in AsyncStorage/SecureStore
- API calls use interceptors
- Sensitive data never logged
- Environment variables for secrets

## License

This project is proprietary and confidential.

## Support

For issues or questions:
- Check documentation
- Review troubleshooting section
- Contact development team
