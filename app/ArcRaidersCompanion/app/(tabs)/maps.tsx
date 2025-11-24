import { StyleSheet, View, Text } from 'react-native';
import { Colors } from '../../constants/Colors';

export default function MapsScreen() {
  const colors = Colors.dark;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>
        Interactive Maps
      </Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
        Explore Arc Raiders maps with resource locations
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
