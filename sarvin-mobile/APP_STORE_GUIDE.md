# Complete Guide: Publishing to App Store & Play Store

This guide provides step-by-step instructions for building and publishing the Sarvin mobile app to both Google Play Store and Apple App Store.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Preparing Your App](#preparing-your-app)
3. [Building the App](#building-the-app)
4. [Google Play Store Submission](#google-play-store-submission)
5. [Apple App Store Submission](#apple-app-store-submission)
6. [Common Issues](#common-issues)

---

## Prerequisites

### Required Accounts

1. **Expo Account** (Free)
   - Sign up at [expo.dev](https://expo.dev)
   - Required for building apps with EAS

2. **Google Play Console Account** ($25 one-time)
   - Sign up at [play.google.com/console](https://play.google.com/console)
   - Required for Android app distribution

3. **Apple Developer Account** ($99/year)
   - Enroll at [developer.apple.com](https://developer.apple.com)
   - Required for iOS app distribution

### Required Tools

1. **EAS CLI**:
   ```bash
   npm install -g eas-cli
   ```

2. **Expo CLI** (if not installed):
   ```bash
   npm install -g expo-cli
   ```

---

## Preparing Your App

### 1. Update App Configuration

Edit `app.json`:

```json
{
  "expo": {
    "name": "Sarvin",
    "slug": "sarvin-mobile",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.sarvin.app",
      "buildNumber": "1"
    },
    "android": {
      "package": "com.sarvin.app",
      "versionCode": 1,
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      }
    }
  }
}
```

### 2. Prepare App Assets

#### Required Images

Create the following images in the `assets/` directory:

1. **icon.png** (1024x1024 PNG)
   - App icon shown on home screen
   - Should be square with no transparency

2. **splash.png** (1284x2778 PNG)
   - Launch screen image
   - Should look good on all screen sizes

3. **adaptive-icon.png** (1024x1024 PNG - Android only)
   - Foreground layer for Android adaptive icon
   - Center 66% is the safe zone

4. **favicon.png** (48x48 PNG)
   - Browser favicon for web version

#### App Store Screenshots

**For Google Play Store:**
- Phone: 1080x1920 (portrait) or 1920x1080 (landscape)
- 7-inch Tablet: 1536x2048 or 2048x1536
- 10-inch Tablet: 2048x2732 or 2732x2048
- Minimum 2 screenshots, maximum 8

**For Apple App Store:**
- iPhone 6.7": 1290x2796
- iPhone 6.5": 1242x2688
- iPhone 5.5": 1242x2208
- iPad Pro (12.9"): 2048x2732
- Minimum 3 screenshots per device

### 3. Update Environment Variables

Ensure your `.env` file has production values:

```
BACKEND_URL=https://your-production-api.com
SUPABASE_URL=your-production-supabase-url
SUPABASE_ANON_KEY=your-production-supabase-key
```

### 4. Update Razorpay Keys

In `src/screens/CheckoutScreen.js`, use production Razorpay keys:

```javascript
const options = {
  key: 'rzp_live_xxxxxxxxxxxxx', // Replace with your live key
  // ... other options
};
```

---

## Building the App

### 1. Login to Expo

```bash
eas login
```

### 2. Configure EAS Build

If not already configured:

```bash
eas build:configure
```

This creates `eas.json` with build configurations.

### 3. Build for Android

**Build APK (for testing)**:
```bash
eas build --platform android --profile preview
```

**Build AAB (for Play Store)**:
```bash
eas build --platform android --profile production
```

The build process will:
- Upload your code to Expo servers
- Build the Android app in the cloud
- Provide a download link when complete (15-30 minutes)

Download the `.aab` file for Play Store submission.

### 4. Build for iOS

**Prerequisites**:
- Apple Developer Account
- App Store Connect setup

**Build for App Store**:
```bash
eas build --platform ios --profile production
```

During the build:
- You'll be prompted to login to Apple Developer Account
- EAS will handle code signing automatically
- Build takes 15-30 minutes

Download the `.ipa` file or use automatic submission.

---

## Google Play Store Submission

### Step 1: Create App in Play Console

1. Go to [Google Play Console](https://play.google.com/console)
2. Click **Create app**
3. Fill in app details:
   - App name: Sarvin
   - Default language: English (United States)
   - App or game: App
   - Free or paid: Free

### Step 2: Set Up App Content

#### Privacy Policy
1. Create a privacy policy (required)
2. Host it on a public URL
3. Add URL in Play Console

#### App Access
- Indicate if your app requires login
- Provide test credentials if needed

#### Ads
- Indicate if app contains ads

#### Content Ratings
1. Complete the questionnaire
2. Select appropriate age rating
3. Apply ratings

#### Target Audience
- Select target age groups
- Indicate if app is designed for children

#### App Category
- Category: Shopping
- Tags: E-commerce, Online Shopping

### Step 3: Store Listing

1. **App Details**:
   - Short description (80 characters)
   - Full description (4000 characters)

2. **Graphics**:
   - App icon (512x512 PNG)
   - Feature graphic (1024x500 JPG/PNG)
   - Phone screenshots (minimum 2)
   - Tablet screenshots (optional)

3. **Categorization**:
   - Application: Shopping
   - Store listing contact details

### Step 4: Create Release

1. Go to **Production** → **Create new release**
2. Upload the `.aab` file from EAS build
3. Add release notes
4. Review and roll out

### Step 5: Pricing & Distribution

1. Select countries/regions
2. Set pricing (Free)
3. Verify all sections are complete
4. Submit for review

**Review Time**: 1-3 days

---

## Apple App Store Submission

### Step 1: App Store Connect Setup

1. Go to [App Store Connect](https://appstoreconnect.apple.com)
2. Click **My Apps** → **+** → **New App**
3. Fill in details:
   - Platform: iOS
   - Name: Sarvin
   - Primary Language: English
   - Bundle ID: com.sarvin.app (must match app.json)
   - SKU: SARVIN001

### Step 2: App Information

1. **General Information**:
   - Category: Shopping
   - Content rights: Required
   - Age rating: Complete questionnaire

2. **Privacy Policy**:
   - Add privacy policy URL

3. **App Previews and Screenshots**:
   - Upload screenshots for all required device sizes
   - Add app preview videos (optional)

### Step 3: Build Upload

#### Option A: Automatic (via EAS)
```bash
eas submit --platform ios
```

#### Option B: Manual
1. Download `.ipa` from EAS build
2. Use **Transporter** app to upload to App Store Connect
3. Wait for processing (15-30 minutes)

### Step 4: Version Information

1. **Description**:
   - Promotional text (170 characters)
   - Description (4000 characters)
   - Keywords (100 characters, comma-separated)
   - Support URL

2. **Screenshots**:
   - Upload for all required device sizes
   - Minimum 3 per device

3. **General App Information**:
   - Icon (automatically pulled from build)
   - Version: 1.0.0
   - Copyright

### Step 5: App Review Information

1. **Contact Information**:
   - First name, last name
   - Phone number
   - Email address

2. **Demo Account** (if login required):
   - Username
   - Password
   - Additional notes

3. **Notes**:
   - Any special instructions for reviewers
   - Features to test

### Step 6: Version Release

1. Select **Automatically release this version**
2. Save changes

### Step 7: Submit for Review

1. Click **Add for Review**
2. Confirm all sections are complete
3. Click **Submit to App Review**

**Review Time**: 1-3 days (sometimes longer for first submission)

---

## Post-Submission

### Monitoring Review Status

**Google Play**:
- Check status in Play Console
- Email notifications for updates

**Apple App Store**:
- Check status in App Store Connect
- Email notifications for updates

### Common Rejection Reasons

1. **Missing Information**:
   - Incomplete metadata
   - Missing privacy policy
   - Missing screenshots

2. **Technical Issues**:
   - App crashes
   - Broken features
   - Network errors

3. **Policy Violations**:
   - Misleading content
   - Inappropriate content
   - Privacy issues

### After Approval

1. **Monitor Reviews**:
   - Respond to user feedback
   - Track ratings

2. **Analytics**:
   - Set up app analytics
   - Track downloads and usage

3. **Updates**:
   - Increment version numbers
   - Follow same submission process

---

## Common Issues

### Build Errors

**Issue**: Build fails on EAS
- Check `app.json` for syntax errors
- Verify all dependencies are compatible
- Review error logs from EAS

**Issue**: Native module linking errors
- Ensure all native modules are listed in dependencies
- Use Expo-compatible versions

### Submission Errors

**Issue**: Bundle ID/Package name already taken
- Choose a unique identifier
- Update in `app.json`

**Issue**: Missing metadata
- Complete all required fields
- Add privacy policy URL

### Review Rejections

**Issue**: App crashes during review
- Test thoroughly before submission
- Provide clear demo credentials
- Include test instructions

**Issue**: Guideline violations
- Review platform guidelines
- Make necessary changes
- Resubmit with explanation

---

## Testing Before Submission

### Internal Testing

**Google Play**:
1. Create internal testing track
2. Add testers by email
3. Upload build and test

**Apple**:
1. Use TestFlight
2. Add internal testers
3. Upload build and test

### Pre-Submission Checklist

- [ ] All features tested and working
- [ ] No console errors or warnings
- [ ] Privacy policy accessible
- [ ] Test accounts provided
- [ ] Screenshots captured
- [ ] App icon and splash screen ready
- [ ] Appropriate age ratings selected
- [ ] Pricing and distribution set
- [ ] Contact information provided
- [ ] Release notes written

---

## Useful Resources

- [Expo Documentation](https://docs.expo.dev)
- [EAS Build Documentation](https://docs.expo.dev/build/introduction/)
- [Google Play Console Help](https://support.google.com/googleplay/android-developer)
- [App Store Connect Help](https://developer.apple.com/help/app-store-connect/)
- [React Native Documentation](https://reactnative.dev)

---

## Need Help?

If you encounter issues:
1. Check Expo forums
2. Review platform documentation
3. Contact support:
   - Expo: [expo.dev/support](https://expo.dev/support)
   - Google: Play Console support
   - Apple: Developer support

Good luck with your app submission! 🚀
