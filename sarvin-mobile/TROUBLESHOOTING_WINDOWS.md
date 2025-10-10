# Troubleshooting Guide for Windows

## Issue: "expo-asset cannot be found"

**Fixed!** The missing packages have been installed.

### What Was Fixed

Added the following required Expo packages:
- `expo-asset` - For asset management
- `expo-font` - For font loading
- `expo-constants` - For app constants

These are core Expo packages that were missing from the initial setup.

---

## How to Run the App Now

### Step 1: Install Dependencies (If You Haven't)

```powershell
# In VS Code terminal, inside sarvin-mobile folder
npm install
```

### Step 2: Start the Mobile App

```powershell
npm start
```

You should now see:
```
Starting Metro Bundler
› Metro waiting on exp://192.168.x.x:8081
› Scan the QR code above with Expo Go (Android) or the Camera app (iOS)
```

### Step 3: Open on Your Phone

**iPhone:**
1. Open Camera app
2. Scan QR code from terminal
3. Tap notification

**Android:**
1. Open Expo Go app
2. Tap "Scan QR code"
3. Scan code from terminal

---

## Common Windows Issues & Solutions

### Issue 1: Port Already in Use

**Error:** `Port 8081 already in use`

**Solution:**
```powershell
# Kill process on port 8081
netstat -ano | findstr :8081
taskkill /PID <PID_NUMBER> /F

# Or restart with different port
npx expo start --port 8082
```

### Issue 2: Cannot Find IP Address

**Find your IP:**
```powershell
ipconfig
```

Look for "IPv4 Address" under your WiFi adapter.

Example: `192.168.1.100`

Update `.env`:
```
BACKEND_URL=http://192.168.1.100:5000
```

### Issue 3: Backend Not Running

**Error:** Cannot connect to backend

**Solution:**

**Terminal 1 - Start Backend:**
```powershell
cd ..\server
npm start
```

**Terminal 2 - Start Mobile App:**
```powershell
cd sarvin-mobile
npm start
```

### Issue 4: Firewall Blocking Connection

**Solution:**

1. Open Windows Defender Firewall
2. Click "Allow an app through firewall"
3. Find Node.js
4. Check both Private and Public
5. Click OK

Or run PowerShell as Administrator:
```powershell
New-NetFirewallRule -DisplayName "Node.js" -Direction Inbound -Program "C:\Program Files\nodejs\node.exe" -Action Allow
```

### Issue 5: npm Warnings About Deprecated Packages

**These warnings are safe to ignore:**
```
npm warn deprecated inflight@1.0.6
npm warn deprecated rimraf@3.0.2
```

These are dependency warnings and don't affect your app.

### Issue 6: WiFi Network Issues

**Problem:** Phone can't connect to development server

**Solutions:**

1. **Use Same WiFi:**
   - Phone and PC must be on same network
   - Don't use Guest WiFi
   - Corporate WiFi may block connections

2. **Use Tunnel (if WiFi doesn't work):**
   ```powershell
   npx expo start --tunnel
   ```
   This works on any network but is slower.

3. **Check WiFi Isolation:**
   - Some routers have "AP Isolation" enabled
   - This blocks devices from seeing each other
   - Check router settings or use tunnel mode

---

## VS Code Specific Tips for Windows

### Opening Multiple Terminals

**Method 1: Split Terminal**
- Click the split icon (next to +) in terminal panel
- Or press `Ctrl+Shift+5`

**Method 2: New Terminal**
- Click the + icon
- Or press `Ctrl+Shift+``

### Terminal Types

VS Code on Windows supports:
- **PowerShell** (recommended)
- **Command Prompt**
- **Git Bash**

To change default terminal:
1. Press `Ctrl+Shift+P`
2. Type "Terminal: Select Default Profile"
3. Choose PowerShell

### Running Commands

**Use PowerShell, not CMD:**
```powershell
# Good (PowerShell)
cd ..\server

# Avoid (CMD - may have issues)
cd ../server
```

---

## Quick Commands Reference (Windows)

```powershell
# Navigate to mobile app
cd C:\Users\LENOVO\Downloads\mobile\project\sarvin-mobile

# Install dependencies
npm install

# Start app
npm start

# Clear cache and start
npx expo start -c

# Check IP address
ipconfig

# Check what's running on port
netstat -ano | findstr :8081
netstat -ano | findstr :5000

# Kill process
taskkill /PID <PID> /F
```

---

## Testing Checklist for Windows

Before testing, ensure:

- [ ] Node.js installed (`node --version`)
- [ ] npm working (`npm --version`)
- [ ] Expo Go installed on phone
- [ ] Phone and PC on same WiFi
- [ ] IP address found (`ipconfig`)
- [ ] `.env` updated with IP
- [ ] Backend running (`cd ..\server && npm start`)
- [ ] Mobile app started (`npm start`)
- [ ] Firewall allows Node.js
- [ ] QR code visible in terminal

---

## Complete Working Setup (Windows)

### Terminal 1 - Backend
```powershell
# Start in project root
cd C:\Users\LENOVO\Downloads\mobile\project

# Go to server
cd server

# Start backend
npm start

# Should see: "Server running on port 5000"
```

### Terminal 2 - Mobile App
```powershell
# Start in project root
cd C:\Users\LENOVO\Downloads\mobile\project

# Go to mobile app
cd sarvin-mobile

# Start Expo
npm start

# Scan QR code with phone
```

---

## Still Having Issues?

### Quick Reset

```powershell
# Stop all servers (Ctrl+C in both terminals)

# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
Remove-Item -Recurse -Force node_modules
npm install

# Start fresh
npm start
```

### Check Logs

Expo error logs location:
```
C:\Users\LENOVO\.expo\
```

### Update Expo

```powershell
# Update Expo CLI globally
npm install -g expo-cli@latest

# Update project packages
npx expo install --fix
```

---

## Success Indicators

✅ **Backend Running:**
```
Server is running on http://localhost:5000
MongoDB connected successfully
```

✅ **Mobile App Running:**
```
Metro waiting on exp://192.168.x.x:8081
› Scan the QR code above with Expo Go
```

✅ **App Loaded on Phone:**
- Expo Go shows your app
- Login screen appears
- No error messages

---

## Need More Help?

1. Check terminal output for specific errors
2. Read error messages carefully
3. Try the solutions in this guide
4. Restart both servers
5. Restart VS Code
6. Restart your phone

**Your app should now work perfectly on Windows!** 🎉
