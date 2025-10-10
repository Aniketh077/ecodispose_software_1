# Quick Start Guide - Sarvin Mobile App

Get the Sarvin mobile app running on your device in minutes!

## Prerequisites

1. **Install Node.js** (if not already installed):
   - Download from [nodejs.org](https://nodejs.org/)
   - Verify: `node --version`

2. **Install Expo Go App**:
   - **iOS**: Download from App Store
   - **Android**: Download from Play Store

## Setup (First Time Only)

1. **Navigate to mobile directory**:
   ```bash
   cd sarvin-mobile
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure backend URL**:

   Edit `.env` file with your backend address:
   ```
   BACKEND_URL=http://YOUR_IP_ADDRESS:5000
   ```

   **Finding your IP address**:
   - **Windows**: Open CMD → `ipconfig` → Look for IPv4 Address
   - **Mac/Linux**: Open Terminal → `ifconfig` → Look for inet address
   - Example: `192.168.1.100`

4. **Ensure backend is running**:
   ```bash
   # In a separate terminal, from the server directory
   cd ../server
   npm start
   ```

## Running the App

1. **Start the Expo development server**:
   ```bash
   npm start
   ```

2. **A QR code will appear in your terminal**

3. **Scan the QR code**:
   - **iOS**: Use Camera app → Tap notification → Opens in Expo Go
   - **Android**: Open Expo Go app → Tap "Scan QR Code" → Scan

4. **Wait for the app to load** (first time may take 30-60 seconds)

## Testing the App

### Test Account
You can create a new account or use these test credentials:
- **Email**: test@example.com
- **Password**: test123

### Testing Flow
1. Register a new account or login
2. Browse products on home screen
3. View product details
4. Add items to cart
5. Proceed to checkout
6. Complete order (use test payment)

## Common Issues & Solutions

### Cannot connect to backend

**Problem**: "Network Error" or "Cannot connect"

**Solutions**:
1. Make sure backend server is running
2. Use IP address (not localhost) in `.env`
3. Both phone and computer must be on same WiFi network
4. Check firewall isn't blocking port 5000

**Test backend connection**:
```bash
# From your phone's browser, visit:
http://YOUR_IP_ADDRESS:5000
# You should see backend response
```

### QR code not scanning

**Solutions**:
1. Make sure Expo Go app is installed
2. Try typing the URL manually in Expo Go
3. Restart the development server: Press `r` in terminal

### App crashes on startup

**Solutions**:
1. Clear cache: Stop server → `npm start -c`
2. Reinstall dependencies: `rm -rf node_modules && npm install`
3. Check terminal for error messages

### "Error loading project"

**Solutions**:
1. Check all files were created correctly
2. Verify package.json is valid JSON
3. Run `npm install` again

## Development Tips

### Hot Reloading
- Changes you make are automatically reflected
- Save file → App updates immediately
- No need to rebuild

### Debugging
- Shake device → Opens developer menu
- Enable "Remote JS Debugging" for Chrome DevTools
- View console logs in terminal

### Useful Commands

```bash
# Start development server
npm start

# Clear cache and restart
npm start -c

# Start on specific platform
npm run ios      # iOS simulator (Mac only)
npm run android  # Android emulator
```

## Next Steps

Once you've tested the app locally:

1. **Test on multiple devices** to ensure compatibility
2. **Review features** to match your requirements
3. **Customize** branding, colors, and content
4. **Build for production** using the `APP_STORE_GUIDE.md`

## Project Structure

```
sarvin-mobile/
├── src/
│   ├── api/          # Backend API calls
│   ├── contexts/     # State management
│   ├── navigation/   # App navigation
│   └── screens/      # App screens
├── assets/           # Images and icons
├── App.js           # Main app file
└── package.json     # Dependencies
```

## Getting Help

**Common Resources**:
- Expo Documentation: [docs.expo.dev](https://docs.expo.dev)
- React Native Docs: [reactnative.dev](https://reactnative.dev)
- Check terminal for error messages
- Review full README.md for detailed information

## Quick Checklist

Before running:
- [ ] Node.js installed
- [ ] Expo Go app installed on phone
- [ ] Dependencies installed (`npm install`)
- [ ] Backend URL configured in `.env`
- [ ] Backend server is running
- [ ] Phone and computer on same WiFi

Happy coding! 🚀
