import { Tabs } from 'expo-router';
import { Text } from 'react-native';
import { Colors } from '../../constants/Colors';

export default function TabLayout() {
  const colors = Colors.dark;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.tabBarActive,
        tabBarInactiveTintColor: colors.tabBarInactive,
        tabBarStyle: {
          backgroundColor: colors.tabBarBackground,
          borderTopColor: colors.border,
          borderTopWidth: 1,
        },
        headerStyle: {
          backgroundColor: colors.backgroundSecondary,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Search',
          tabBarIcon: ({ color }) => (
            <Text style={{ color, fontSize: 24 }}>🔍</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="maps"
        options={{
          title: 'Maps',
          tabBarIcon: ({ color }) => (
            <Text style={{ color, fontSize: 24 }}>🗺️</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="loadouts"
        options={{
          title: 'Loadouts',
          tabBarIcon: ({ color }) => (
            <Text style={{ color, fontSize: 24 }}>⚔️</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => (
            <Text style={{ color, fontSize: 24 }}>⚙️</Text>
          ),
        }}
      />
    </Tabs>
  );
}
