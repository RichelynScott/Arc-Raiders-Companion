# Arc Raiders Companion App

A mobile companion application for the video game Arc Raiders, built with React Native and Expo.

## Features (Planned)

- **Search & Browse**: Search for items, weapons, ARCs (enemies), and game data
- **Interactive Maps**: Explore game maps with resource locations and points of interest
- **Loadout Builder**: Create and save custom equipment loadouts
- **Offline Support**: Cached data for offline access (24-hour cache)
- **Dark Theme**: Sleek dark UI inspired by Arc Raiders' sci-fi aesthetic

## Tech Stack

- **Framework**: React Native + Expo
- **Navigation**: Expo Router (file-based routing)
- **State Management**: Zustand + React Query
- **Data Fetching**: TanStack React Query with AsyncStorage caching
- **Search**: Fuse.js for fuzzy search
- **Language**: TypeScript
- **UI**: Custom components with dark theme

## Project Structure

```
app/ArcRaidersCompanion/
├── app/                    # Expo Router screens (file-based routing)
│   ├── (tabs)/            # Tab navigation
│   │   ├── index.tsx      # Search/Home screen
│   │   ├── maps.tsx       # Maps screen
│   │   ├── loadouts.tsx   # Loadouts screen
│   │   └── settings.tsx   # Settings screen
│   ├── _layout.tsx        # Root layout with providers
│   └── item/[id].tsx      # Item detail screen (dynamic route)
├── components/            # Reusable UI components
│   ├── common/           # Button, Input, Card, etc.
│   └── game/             # ItemCard, MapView, etc.
├── services/             # API integration layer
│   ├── api.ts           # Backend proxy API calls
│   └── cache.ts         # AsyncStorage caching utilities
├── hooks/                # Custom React hooks
├── types/                # TypeScript type definitions
│   ├── Item.ts          # Item types
│   ├── ARC.ts           # ARC (enemy) types
│   ├── Map.ts           # Map types
│   └── index.ts         # Shared types
├── constants/            # App constants and theme
│   ├── Colors.ts        # Dark theme colors
│   └── index.ts         # Other constants
├── utils/                # Helper functions
└── assets/               # Images, fonts, icons
```

## Installation & Setup

### Prerequisites

- Node.js 18+ and npm
- Expo Go app on your mobile device (iOS or Android)
- Git

### Development Setup

1. **Navigate to the app directory**:
   ```bash
   cd /home/riche/Proj/Arc_Raiders_App/app/ArcRaidersCompanion
   ```

2. **Install dependencies** (already done if following initialization):
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npx expo start
   ```

4. **Run on device**:
   - Install Expo Go on your phone (iOS/Android)
   - Scan the QR code from the terminal with Expo Go
   - The app will load on your device

### Development Commands

```bash
# Start development server
npx expo start

# Start with cache cleared
npx expo start -c

# Run on specific platform (requires setup)
npm run android    # Requires Android Studio
npm run ios        # Requires macOS with Xcode
npm run web        # Run in browser

# Type checking
npx tsc --noEmit

# Lint (when configured)
npm run lint
```

## Environment Variables

Create a `.env` file in the app root for configuration:

```env
# Backend API URL (when backend is deployed)
EXPO_PUBLIC_API_URL=http://localhost:3000/api
```

## API Integration

The app uses a backend proxy to fetch data from MetaForge (Arc Raiders data source):

- **fetchItems()**: Get all items/weapons
- **fetchARCs()**: Get all ARCs (enemies)
- **fetchMaps()**: Get all game maps
- **Caching**: 24-hour AsyncStorage cache with fallback to expired cache on network errors

### API Service Example

```typescript
import { fetchItems } from './services/api';

// In a React component with React Query
const { data: items, isLoading, error } = useQuery({
  queryKey: ['items'],
  queryFn: fetchItems,
});
```

## React Query Configuration

React Query is configured in `app/_layout.tsx`:

- **Stale Time**: 5 minutes (data considered fresh)
- **Cache Time**: 24 hours (data kept in memory)
- **Automatic refetching**: On window focus and network reconnect

## Dark Theme

The app uses a custom dark theme defined in `constants/Colors.ts`:

- **Primary**: Electric blue (`#00bfff`)
- **Secondary**: Neon purple (`#b366ff`)
- **Background**: Dark navy (`#0a0e13`)
- **Rarity Colors**: Common, Uncommon, Rare, Epic, Legendary
- **Difficulty Colors**: 1-5 difficulty levels

## Navigation Structure

Using Expo Router (file-based routing):

- `/` → Search/Home (index.tsx)
- `/maps` → Maps screen
- `/loadouts` → Loadouts screen
- `/settings` → Settings screen
- `/item/[id]` → Item detail (dynamic route)

## TypeScript Types

### Item Type
```typescript
interface Item {
  id: string;
  name: string;
  description: string;
  type: 'weapon' | 'armor' | 'consumable' | 'material' | 'mod' | 'utility';
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  stats?: { damage?: number; armor?: number; ... };
  imageUrl?: string;
  craftingRecipe?: { materials: [...]; craftingTime?: number };
}
```

### ARC Type
```typescript
interface ARC {
  id: string;
  name: string;
  type: 'basic' | 'elite' | 'boss' | 'special';
  difficulty: 1 | 2 | 3 | 4 | 5;
  stats: { health: number; damage: number; ... };
  abilities?: [...];
  weaknesses?: string[];
  loot?: [...];
}
```

### Map Type
```typescript
interface GameMap {
  id: string;
  name: string;
  size: 'small' | 'medium' | 'large';
  difficulty: 1 | 2 | 3 | 4 | 5;
  locations: MapLocation[];
  tips?: string[];
}
```

## Next Development Steps

1. **Implement Search Screen**:
   - Add search input with Fuse.js fuzzy search
   - Create ItemCard component
   - Implement filtering (type, rarity)
   - Add pull-to-refresh

2. **Build Backend Proxy** (separate project):
   - Node.js/Express server
   - MetaForge API integration
   - Caching layer
   - Deploy to VPS or cloud

3. **Implement Maps Screen**:
   - Interactive map component
   - Location markers
   - Zoom/pan functionality
   - Resource filtering

4. **Build Loadout Builder**:
   - Loadout creation UI
   - Local storage with AsyncStorage
   - Share loadout functionality

5. **Polish & Testing**:
   - Add unit tests (Jest)
   - E2E tests (Detox)
   - Performance optimization
   - App Store preparation

## Testing

```bash
# Run tests (when configured)
npm test

# Run with coverage
npm run test:coverage

# Watch mode
npm run test:watch
```

## Building for Production

### iOS (EAS Build - No Mac Required)

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo account
eas login

# Configure build
eas build:configure

# Build for iOS
eas build --platform ios
```

### Android

```bash
# Build APK
eas build --platform android --profile preview

# Build for Play Store
eas build --platform android --profile production
```

## Troubleshooting

### Metro bundler issues
```bash
npx expo start -c  # Clear cache
```

### TypeScript errors
```bash
npx tsc --noEmit  # Check types
```

### Dependencies issues
```bash
rm -rf node_modules
npm install
```

## Contributing

This is a personal project. See main project README for contribution guidelines.

## Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [Expo Router Documentation](https://docs.expo.dev/router/introduction/)
- [React Query Documentation](https://tanstack.com/query/latest)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## License

See main project LICENSE file.
