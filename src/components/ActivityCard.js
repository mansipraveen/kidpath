import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function ActivityCard({ activity, onPress }) {
  const getCategoryIcon = (cat) => {
    const icons = {
      sports: '⚽',
      arts: '🎨',
      stem: '🔬',
      music: '🎵',
      dance: '💃',
      outdoors: '🌲',
    };
    return icons[cat] || '📚';
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.cardHeader}>
        <Text style={styles.categoryIcon}>
          {getCategoryIcon(activity.category)}
        </Text>
        <View style={styles.cardInfo}>
          <Text style={styles.cardTitle}>{activity.name}</Text>
          <Text style={styles.cardProvider}>{activity.provider}</Text>
        </View>
      </View>
      <View style={styles.cardDetails}>
        <Text style={styles.detailText}>📍 {activity.distance} mi</Text>
        <Text style={styles.detailText}>👶 Ages {activity.ageRange}</Text>
        <Text style={styles.priceTag}>${activity.price}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryIcon: {
    fontSize: 36,
    marginRight: 12,
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333',
  },
  cardProvider: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  cardDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  detailText: {
    fontSize: 13,
    color: '#888',
  },
  priceTag: {
    marginLeft: 'auto',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6C63FF',
  },
});
