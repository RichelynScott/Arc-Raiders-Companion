import { StyleSheet, View, Text } from 'react-native';
import { Colors, APP_CONFIG } from '../../constants';

export default function SettingsScreen() {
  const colors = Colors.dark;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Settings</Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
        App preferences and configuration
      </Text>
      <View style={styles.versionContainer}>
        <Text style={[styles.version, { color: colors.textTertiary }]}>
          {APP_CONFIG.APP_NAME}
        </Text>
        <Text style={[styles.version, { color: colors.textTertiary }]}>
          Version {APP_CONFIG.VERSION}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
  },
  versionContainer: {
    marginTop: 50,
    alignItems: 'center',
  },
  version: {
    fontSize: 12,
    marginTop: 5,
  },
});
