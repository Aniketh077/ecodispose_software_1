# Windows Quick Start - 5 Minutes ⚡

## ✅ Problem Fixed!

The missing `expo-asset` package has been installed. Your app is ready to run!

---

## Run Your App Now (3 Steps)

### Step 1: Find Your IP Address

Open PowerShell or CMD:
```powershell
ipconfig
```

Look for **IPv4 Address** (example: `192.168.1.100`)

### Step 2: Update .env File

Open `sarvin-mobile\.env` in VS Code

Change this line:
```
BACKEND_URL=http://YOUR_IP:5000
```

Replace `YOUR_IP` with your actual IP from Step 1.

Example:
```
BACKEND_URL=http://192.168.1.100:5000
```

Save the file (Ctrl+S)

### Step 3: Start the App

**In VS Code, open TWO terminals:**

**Terminal 1 (Backend):**
```powershell
cd ..\server
npm start
```

**Terminal 2 (Mobile App):**
```powershell
npm start
```

A QR code will appear in Terminal 2!

### Step 4: Open on Your Phone

1. Install **Expo Go** app (App Store or Play Store)
2. Make sure phone is on **same WiFi** as your PC
3. **iPhone**: Open Camera → Scan QR code
4. **Android**: Open Expo Go → Scan QR code

**Done!** 🎉 The app will load on your phone in 30-60 seconds.

---

## VS Code Layout

Your VS Code should look like this:

```
┌─────────────────────────────────────┐
│ Explorer          │ Code Editor     │
│                   │                 │
│ sarvin-mobile/    │ [QR CODE]      │
│ ├── src/          │                 │
│ ├── .env          │                 │
│ └── package.json  │                 │
├───────────────────┴─────────────────┤
│ Terminal 1        │ Terminal 2      │
│ (Backend)         │ (Mobile App)    │
│ Server running... │ Expo running... │
└───────────────────┴─────────────────┘
```

**To create this:**
1. Open VS Code
2. Click Terminal → New Terminal
3. Click the **+** icon to add Terminal 2
4. Run commands in each terminal

---

## Quick Commands

```powershell
# Find IP
ipconfig

# Start backend
cd ..\server
npm start

# Start mobile app
cd sarvin-mobile
npm start

# Clear cache (if needed)
npm start -- -c
```

---

## Common Issues (Quick Fixes)

### "Port 8081 already in use"
```powershell
netstat -ano | findstr :8081
taskkill /PID <NUMBER> /F
npm start
```

### "Cannot connect to backend"
- Check backend is running in Terminal 1
- Verify IP address in `.env` is correct
- Make sure phone and PC on same WiFi

### QR code won't scan
- Try tunnel mode: `npx expo start --tunnel`

### Firewall blocking
- Windows Defender → Allow Node.js through firewall

---

## Test Your App

Once loaded on phone:
1. **Register** a new account
2. **Login** with credentials
3. **Browse** products
4. **Add** items to cart
5. **Test** checkout

---

## Making Changes

**Edit any file → Save (Ctrl+S) → App updates on phone automatically!**

Try it:
1. Open `src\screens\HomeScreen.js`
2. Change text "Sarvin" to "My Shop"
3. Save (Ctrl+S)
4. See it update on phone!

---

## Need Help?

- **Detailed guide**: `TROUBLESHOOTING_WINDOWS.md`
- **Full docs**: `README.md`
- **Publishing**: `APP_STORE_GUIDE.md`

---

**Your app is ready!** Just run `npm start` and scan the QR code. 🚀
