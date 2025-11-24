import { StyleSheet, View, Text } from 'react-native';
import { Colors } from '../../constants/Colors';

export default function LoadoutsScreen() {
  const colors = Colors.dark;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>
        Loadout Builder
      </Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
        Create and save your custom loadouts
      </Text>
      <Text style={[styles.comingSoon, { color: colors.primary }]}>
        Coming Soon
      </Text>
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
  comingSoon: {
    fontSize: 18,
    fontWeight: '600',
  },
});
