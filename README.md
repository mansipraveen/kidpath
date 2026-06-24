# 🎯 KidPath

Find amazing activities, courses, and camps for your kids — all in one app!

## 🚀 Quick Start

### Prerequisites
- Node.js (LTS) installed
- Expo Go app on your iPhone

### Setup

```bash
# 1. Navigate to the project folder
cd kidpath

# 2. Install dependencies
npm install

# 3. Start the development server
npx expo start
```

### Run on Your iPhone

1. Make sure your PC and iPhone are on the **same Wi-Fi network**
2. Run `npx expo start`
3. Scan the QR code with your iPhone camera
4. The app opens in Expo Go!

## 📁 Project Structure

```
kidpath/
├── App.js                    # Entry point + navigation
├── app.json                  # Expo configuration
├── package.json              # Dependencies
├── assets/                   # Icons, splash screen
├── src/
│   ├── screens/
│   │   ├── HomeScreen.js     # Search + categories
│   │   ├── ResultsScreen.js  # Activity list
│   │   └── ActivityDetailScreen.js  # Full details
│   ├── components/
│   │   └── ActivityCard.js   # Reusable card component
│   └── services/
│       └── activityService.js  # API / data layer
```

## 🗺️ Roadmap

- [ ] Connect to ACTIVE.com API for real data
- [ ] Add user location (GPS)
- [ ] Favorites / saved activities
- [ ] Filter by age, price range, day of week
- [ ] User accounts & reviews
- [ ] Push notifications for new activities
- [ ] Publish to App Store

## 🛠️ Tech Stack

- **React Native** + **Expo** (cross-platform mobile)
- **React Navigation** (screen navigation)
- **ACTIVE.com Kids API** (activity data)

## 📱 Publishing to App Store

```bash
# Build for iOS (no Mac needed!)
eas build --platform ios

# Submit to App Store
eas submit --platform ios
```

Requires Apple Developer Program membership ($99/year).
