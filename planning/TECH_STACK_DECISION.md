# Technology Stack Decision

## Decision Status
🟡 **PENDING** - Awaiting final decision

## Context
Building a companion app for Arc Raiders that will run on iPhone/iOS devices. Development environment is WSL2/Linux which impacts tooling choices.

## Options Analysis

### Option 1: Native iOS (Swift + SwiftUI)
**Pros:**
- Best performance and native feel
- Full access to iOS APIs and features
- SwiftUI provides modern, declarative UI
- Best integration with Apple ecosystem
- No bridge overhead

**Cons:**
- ❌ Requires macOS with Xcode (not available on WSL2)
- ❌ iOS only (no Android support)
- ❌ Would need Mac VM, remote Mac, or separate Mac hardware
- Steeper learning curve for Swift
- Limited to Apple platforms only

**Development Options:**
- Remote Mac (MacStadium, AWS Mac instances)
- macOS VM on Windows
- Use separate Mac hardware
- GitHub Codespaces with Xcode (experimental)

---

### Option 2: React Native + Expo (RECOMMENDED)
**Pros:**
- ✅ Works perfectly from WSL2 environment
- ✅ Cross-platform (iOS + Android from same codebase)
- ✅ Hot reload for fast development
- ✅ Large ecosystem of libraries
- ✅ JavaScript/TypeScript (widely known)
- ✅ Expo provides managed workflow and easy builds
- ✅ Can build iOS apps without local Mac (via EAS Build)
- Cost-effective (no Mac required for development)

**Cons:**
- Slightly less performance than native (negligible for this app)
- Bridge overhead for some native features
- Larger app bundle size
- Some advanced iOS features require native modules

**Expo Specific Benefits:**
- EAS Build: Build iOS apps in the cloud (no Mac needed!)
- EAS Submit: Submit to App Store from anywhere
- OTA Updates: Push updates without App Store review
- Expo Go: Test on physical devices easily
- Managed workflow reduces config complexity

---

### Option 3: Flutter
**Pros:**
- ✅ Works from WSL2
- ✅ Cross-platform
- Excellent performance (compiles to native)
- Single codebase
- Hot reload

**Cons:**
- Dart language (less common than JS/TS)
- Smaller ecosystem than React Native
- Less web dev transferability

---

## Recommendation

### **Option 2: React Native + Expo** 🎯

**Rationale:**
1. **Environment Compatibility**: Works seamlessly in WSL2 without requiring macOS
2. **Cross-Platform Future**: If we want Android support later, it's already done
3. **Cloud Building**: Expo EAS Build can create iOS builds without a Mac
4. **Development Speed**: Hot reload and Expo's managed workflow accelerate development
5. **Cost Effective**: No need to pay for Mac hardware/VMs during development
6. **Modern Tooling**: Great developer experience with Metro bundler and Expo tools

## Implementation Plan (If React Native + Expo Selected)

### 1. Initialize Expo Project
```bash
cd app/
npx create-expo-app ArcRaidersCompanion --template blank-typescript
```

### 2. Project Structure
```
app/ArcRaidersCompanion/
├── app/                    # App screens (Expo Router)
│   ├── (tabs)/            # Tab navigation
│   ├── index.tsx          # Home screen
│   └── _layout.tsx        # Root layout
├── components/            # Reusable components
│   ├── common/           # Buttons, inputs, etc.
│   └── game/             # Game-specific components
├── services/             # API calls, data fetching
├── hooks/                # Custom React hooks
├── types/                # TypeScript types
├── constants/            # Colors, dimensions, etc.
├── assets/               # Images, fonts, icons
└── utils/                # Helper functions
```

### 3. Key Dependencies
```json
{
  "dependencies": {
    "expo": "~50.0.0",
    "expo-router": "~3.5.0",
    "react-native": "0.73.0",
    "@tanstack/react-query": "^5.0.0",  // Data fetching
    "zustand": "^4.5.0",                 // State management
    "react-native-svg": "^14.0.0"        // Vector graphics
  }
}
```

### 4. Development Workflow
1. Develop on WSL2 using `npx expo start`
2. Test on physical iPhone via Expo Go app
3. Test on Android emulator on Windows host
4. Build iOS binary via EAS Build cloud service
5. Submit to App Store via EAS Submit

### 5. Build Configuration
```bash
# Install EAS CLI
npm install -g eas-cli

# Configure project for EAS
eas build:configure

# Build iOS app (no Mac required!)
eas build --platform ios --profile production
```

## Alternative: Hybrid Approach

If native iOS features are critical later, we can:
1. Start with React Native + Expo
2. Build MVP and validate concept
3. Add native modules as needed (Expo dev client)
4. Optionally rewrite in Swift later if performance is critical

## Next Steps

1. **User Decision**: Choose between Native iOS vs React Native + Expo
2. **If React Native**: Initialize Expo project and configure
3. **If Native iOS**: Set up Mac development environment
4. **Document Decision**: Update FYI.md with final choice and rationale

## Questions to Consider

1. Do we plan to support Android in the future?
2. Is native iOS performance critical for planned features?
3. Do we have budget for Mac hardware/cloud resources?
4. What's the timeline for MVP release?
5. What's the team's existing expertise (Swift vs React/JS)?

## Resources

**React Native + Expo:**
- [Expo Documentation](https://docs.expo.dev/)
- [React Native Docs](https://reactnative.dev/)
- [EAS Build](https://docs.expo.dev/build/introduction/)

**Native iOS:**
- [SwiftUI Tutorials](https://developer.apple.com/tutorials/swiftui)
- [Apple Developer](https://developer.apple.com/)
