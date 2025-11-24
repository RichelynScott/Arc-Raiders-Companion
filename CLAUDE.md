# Arc Raiders Companion App - Claude Configuration

## Project Overview
A companion application for the video game **Arc Raiders**, designed to enhance player experience through data tracking, interactive maps, and guides.

## Commands

### Development
```bash
# Development commands (specific to chosen tech stack)
# See TECH_STACK_DECISION.md for details

# If React Native + Expo (Recommended):
# npx expo start              # Start development server
# npm run ios                 # Run on iOS simulator
# npm run android             # Run on Android emulator
# npm test                    # Run tests
# npm run lint                # Lint code

# If Native iOS:
# Command+R in Xcode          # Run simulator
# Command+B in Xcode          # Build
```

### Project Management
```bash
# View project tasks
npx task-master list

# Check git status
git status

# Create feature branch
git checkout -b feature/your-feature-name

# Push to GitHub
git push origin feature/your-feature-name
```

## Architecture Overview

### Directory Structure
- `/app` - Mobile application source code (tech stack TBD)
  - See `/planning/TECH_STACK_DECISION.md` for options
  - Will contain React Native + Expo OR native iOS project
- `/docs` - All project documentation
  - `/api` - API documentation for game data sources
  - `/architecture` - System design and architecture docs
  - `/guides` - User and developer guides
- `/planning` - Project planning and design
  - `/design` - UI/UX designs and mockups
  - `/features` - Feature specifications
  - `/research` - Game mechanics research and notes
  - `PRD_TEMPLATE.md` - Product requirements document
  - `TECH_STACK_DECISION.md` - Technology evaluation
- `/resources` - Game-related resources
  - `/assets` - Icons, images, graphics
  - `/game-data` - Arc Raiders game data, APIs, references
- `/scripts` - Utility scripts for automation

### Technology Stack (Pending Final Decision)
**See [TECH_STACK_DECISION.md](planning/TECH_STACK_DECISION.md) for detailed analysis**

**Option 1: React Native + Expo (RECOMMENDED)**
- ✅ Works from WSL2 environment
- ✅ Cross-platform (iOS + Android)
- ✅ Can build iOS without Mac (EAS Build)
- JavaScript/TypeScript
- Hot reload development

**Option 2: Native iOS (Swift + SwiftUI)**
- Best performance and native feel
- iOS only
- Requires macOS with Xcode
- Steeper learning curve

### Key Technical Considerations

1. **Development Environment**
   - Primary: WSL2 (Ubuntu) on Windows 11
   - React Native + Expo recommended for seamless WSL2 development
   - If Native iOS: Requires macOS with Xcode (remote Mac or VM)

2. **Game Data Integration**
   - Research Arc Raiders API availability (official or community)
   - Investigate data mining from game files
   - Scrape community wikis and databases if needed
   - Store static game data locally (bundled with app)
   - Plan for data updates via remote JSON feeds or OTA updates

3. **App Features (Planned - See PRD)**
   - Player stats tracking (manual entry initially)
   - Interactive game maps with resource locations
   - Equipment/loadout builder with stat calculations
   - Strategy guides and tutorials
   - Community tips and tricks

4. **Data Storage**
   - **Local**: AsyncStorage (React Native) or CoreData (iOS) for user data
   - **Remote**: Firebase, Supabase, or custom backend (Phase 2)
   - **Caching**: Implement aggressive caching for offline support
   - **Sync**: Consider cloud sync for user data across devices

5. **Architecture Pattern**
   - **React Native**: Component-based with hooks, context API or Zustand for state
   - **Native iOS**: MVVM (Model-View-ViewModel) with SwiftUI
   - Clean architecture principles
   - Repository pattern for data access
   - Separation of UI, business logic, and data layers

## Development Workflow

### Phase 1: Planning & Research (Current)
1. Research Arc Raiders game mechanics and data sources
2. Define MVP feature set
3. Create technical specifications
4. Design UI/UX mockups

### Phase 2: Project Setup
1. Initialize Xcode project
2. Set up project structure
3. Configure dependencies (if any)
4. Create base SwiftUI views

### Phase 3: Core Development
1. Implement data models
2. Build UI components
3. Integrate game data
4. Add user preferences

### Phase 4: Testing & Polish
1. Write unit tests
2. UI/UX refinements
3. Performance optimization
4. App Store preparation

## Testing Strategy
- **Unit Tests**: Jest (React Native) or XCTest (iOS) for business logic
- **Component Tests**: React Testing Library for UI components
- **E2E Tests**: Detox (React Native) or XCTest UI (iOS) for user flows
- **Manual Testing**: Physical devices and simulators/emulators
- **Coverage Goal**: 70%+ for core features, 80%+ for critical paths

## Git Workflow
- **Main Branch**: `main` - stable, production-ready code
- **Feature Branches**: `feature/feature-name`
- **Commit Frequency**: Every 30-60 minutes during active development
- **Commit Format**: Conventional commits (feat, fix, docs, etc.)

## Documentation Standards
- **Code Comments**: WHY, not WHAT
- **FYI.md**: Document all architectural and technical decisions (append-only)
- **README.md**: Keep updated with setup instructions
- **Inline Docs**: JSDoc (React Native) or SwiftDoc (iOS) for public APIs
- **PRD**: Keep PRD_TEMPLATE.md updated as requirements evolve

## Security Considerations
- No sensitive API keys in code (use .env files, never commit)
- Secure storage for user data:
  - **React Native**: react-native-keychain or Encrypted AsyncStorage
  - **iOS**: Keychain Services
- Input validation for all user-entered data
- HTTPS only for API communications
- Follow OWASP mobile security guidelines
- No personal data collection without consent (GDPR compliant)

## Overrides to Global Configuration
- Mobile-first development approach
- Development works from WSL2 if React Native chosen
- App Store (iOS) and/or Play Store (Android) guidelines compliance required
- Consider App Store review times (7-14 days) in planning

## Resources
- [Arc Raiders Official Site](https://www.arcraiders.com/)
- [Arc Raiders Steam Page](https://store.steampowered.com/app/1471270/Arc_Raiders/)
- [Arc Raiders Reddit](https://www.reddit.com/r/ArcRaiders/) (check if active)
- [React Native Docs](https://reactnative.dev/)
- [Expo Documentation](https://docs.expo.dev/)
- [Apple Developer Documentation](https://developer.apple.com/documentation/)

## Future Enhancements
- Push notifications for game events and updates
- Social features (share loadouts, friend lists)
- Real-time game data integration (if API becomes available)
- Apple Watch companion app (if iOS native)
- Tablet optimization with enhanced layouts
- Cloud sync across devices (CloudKit or Firebase)
- Multiple language support (Phase 3)
- Dark/Light theme toggle
- Achievements and player progression tracking
