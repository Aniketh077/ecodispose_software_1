# Test Your Mobile App Locally - Step by Step

Follow these exact steps to test your mobile app on your phone right now.

## Step 1: Install Expo Go (One-time)

### On iPhone
1. Open **App Store**
2. Search for "**Expo Go**"
3. Install the app

### On Android
1. Open **Play Store**
2. Search for "**Expo Go**"
3. Install the app

## Step 2: Find Your Computer's IP Address

### Windows
1. Press `Windows + R`
2. Type `cmd` and press Enter
3. Type `ipconfig` and press Enter
4. Look for **IPv4 Address** under your WiFi adapter
5. Example: `192.168.1.100`

### Mac
1. Open **System Preferences**
2. Click **Network**
3. Select **Wi-Fi** on the left
4. Your IP is shown on the right
5. Example: `192.168.1.100`

### Linux
1. Open Terminal
2. Type `ifconfig` or `ip addr`
3. Look for your WiFi adapter's inet address
4. Example: `192.168.1.100`

**Write down this IP address - you'll need it!**

## Step 3: Configure the App

1. **Open the file**: `sarvin-mobile/.env`

2. **Edit the BACKEND_URL**:
   ```
   BACKEND_URL=http://YOUR_IP_ADDRESS:5000
   ```

3. **Replace `YOUR_IP_ADDRESS`** with the IP from Step 2

   Example:
   ```
   BACKEND_URL=http://192.168.1.100:5000
   ```

4. **Save the file**

## Step 4: Start Your Backend Server

1. **Open a terminal/command prompt**

2. **Navigate to server directory**:
   ```bash
   cd server
   ```

3. **Start the server**:
   ```bash
   npm start
   ```

4. **Keep this terminal open** - don't close it!

5. You should see: `Server running on port 5000`

## Step 5: Start the Mobile App

1. **Open a NEW terminal/command prompt** (keep the other one running)

2. **Navigate to mobile directory**:
   ```bash
   cd sarvin-mobile
   ```

3. **Start Expo**:
   ```bash
   npm start
   ```

4. **Wait for QR code to appear** (takes 10-30 seconds)

## Step 6: Open on Your Phone

### Make sure:
- ✅ Your phone and computer are on the **SAME WiFi network**
- ✅ Backend server is running (Step 4)
- ✅ Expo development server is running (Step 5)

### On iPhone
1. Open **Camera** app
2. Point camera at the QR code in terminal
3. Tap the notification that appears
4. App opens in Expo Go

### On Android
1. Open **Expo Go** app
2. Tap "**Scan QR code**"
3. Point camera at the QR code in terminal
4. App will start loading

## Step 7: Wait for App to Load

- First time: **30-60 seconds**
- Subsequent times: **5-10 seconds**
- You'll see a loading screen

## Step 8: Test the App!

### Create an Account
1. On the login screen, tap "Register"
2. Fill in your details:
   - Name: Test User
   - Email: test@example.com
   - Phone: 1234567890
   - Password: test123
   - Confirm Password: test123
3. Tap "Register"

### Login
1. Use the credentials you just created
2. Or use: email@example.com / password

### Browse Products
1. Scroll through the home screen
2. Tap on any category card
3. View product listings
4. Tap on a product to see details

### Add to Cart
1. On product detail page
2. Select quantity
3. Tap "Add to Cart"
4. Go to Cart tab at bottom

### Complete Order (Test)
1. Go to Cart tab
2. Review items
3. Tap "Proceed to Checkout"
4. Fill in shipping address
5. Tap "Place Order"
6. **Note**: Payment will fail without Razorpay configuration (this is expected)

## Troubleshooting

### "Cannot connect to backend"

**Solution 1**: Check IP Address
- Make sure you used your actual IP (not localhost)
- Verify IP hasn't changed (router sometimes changes it)

**Solution 2**: Check WiFi
- Phone and computer MUST be on same WiFi
- Try disconnecting and reconnecting to WiFi

**Solution 3**: Check Backend
- Ensure backend terminal is still running
- Try visiting `http://YOUR_IP:5000` in phone's browser
- You should see a response from the backend

**Solution 4**: Check Firewall
- Windows: Allow Node.js through firewall
- Mac: System Preferences → Security → Firewall → Allow Node

### "QR Code won't scan"

**Solution 1**: Manual Entry
1. In Expo Go app, tap "Enter URL manually"
2. Type the URL shown below the QR code
3. It looks like: `exp://192.168.1.100:8081`

**Solution 2**: Try Different Camera
- On Android, use Expo Go's built-in scanner
- On iOS, try the Camera app

### "App crashes immediately"

**Solution 1**: Clear Cache
1. Stop Expo (Ctrl+C in terminal)
2. Run: `npm start -c`

**Solution 2**: Reinstall Dependencies
```bash
rm -rf node_modules
npm install
npm start
```

### "White screen" or "Stuck loading"

**Solution**: Reload App
- Shake your phone
- Tap "Reload"

Or press `r` in the terminal where Expo is running

## What to Test

✅ **Registration** - Create new account
✅ **Login** - Sign in with credentials
✅ **Home Screen** - See products and categories
✅ **Product Browsing** - View products by category
✅ **Product Details** - Open a product
✅ **Search** - Search for products
✅ **Add to Cart** - Add items to cart
✅ **Cart Management** - Update quantities, remove items
✅ **Checkout** - Enter shipping info
✅ **Orders** - View order history (after placing order)
✅ **Account** - View profile
✅ **Logout** - Sign out

## Making Changes

### Edit Code
1. Make changes to any file in `sarvin-mobile/src/`
2. Save the file
3. App automatically reloads on your phone!

### Common Files to Edit

**Colors**: Edit styles in each screen file
**Text**: Edit screen components directly
**Images**: Replace files in `assets/` folder

## Quick Commands Reference

```bash
# Start backend (terminal 1)
cd server
npm start

# Start mobile app (terminal 2)
cd sarvin-mobile
npm start

# Clear cache and restart
npm start -c

# Stop servers
Press Ctrl+C in terminal
```

## Tips

💡 **Keep Both Terminals Open**
- One for backend
- One for mobile app

💡 **Same WiFi Required**
- Both devices must be on same network
- Guest WiFi may not work

💡 **Hot Reload**
- Changes appear instantly
- No need to rebuild

💡 **Shake to Debug**
- Shake phone to open developer menu
- Access debugging tools

## Success Indicators

✅ You should see:
- App loads without errors
- Can register/login
- Products appear on home screen
- Can add items to cart
- Cart updates correctly
- Checkout form works

## Next Steps

After successful testing:
1. Review `README.md` for full documentation
2. Customize branding and colors
3. Add your Razorpay keys for payments
4. Review `APP_STORE_GUIDE.md` for publishing

---

**Still having issues?**
- Check that both servers are running
- Verify IP address in .env file
- Ensure same WiFi network
- Try restarting both servers
- Check terminal for error messages

**Happy Testing! 🎉**
