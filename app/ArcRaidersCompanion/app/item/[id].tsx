import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { fetchItemById } from '../../services/api';
import { Colors } from '../../constants/Colors';

export default function ItemDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const colors = Colors.dark;

  const { data: item, isLoading, error } = useQuery({
    queryKey: ['item', id],
    queryFn: () => fetchItemById(id),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (error || !item) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.errorText, { color: colors.error }]}>
          Failed to load item
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>{item.name}</Text>
      <Text style={[styles.description, { color: colors.textSecondary }]}>
        {item.description}
      </Text>
      <View style={styles.detailsContainer}>
        <Text style={[styles.label, { color: colors.textTertiary }]}>Type:</Text>
        <Text style={[styles.value, { color: colors.text }]}>{item.type}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={[styles.label, { color: colors.textTertiary }]}>Rarity:</Text>
        <Text
          style={[
            styles.value,
            { color: colors.rarity[item.rarity] || colors.text },
          ]}
        >
          {item.rarity}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    lineHeight: 24,
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    marginRight: 10,
    fontWeight: '600',
  },
  value: {
    fontSize: 14,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
  },
});
