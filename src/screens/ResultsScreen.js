import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { searchActivities } from '../services/activityService';

export default function ResultsScreen({ route, navigation }) {
  const { zipCode, category } = route.params;
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadActivities();
  }, []);

  const loadActivities = async () => {
    try {
      const results = await searchActivities(zipCode, category);
      setActivities(results);
    } catch (error) {
      console.error('Error loading activities:', error);
    } finally {
      setLoading(false);
    }
  };

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

  const renderActivity = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ActivityDetail', { activity: item })}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.categoryIcon}>{getCategoryIcon(item.category)}</Text>
        <View style={styles.cardInfo}>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <Text style={styles.cardProvider}>{item.provider}</Text>
        </View>
      </View>
      <View style={styles.cardDetails}>
        <Text style={styles.detailText}>📍 {item.distance} miles away</Text>
        <Text style={styles.detailText}>👶 Ages {item.ageRange}</Text>
        <Text style={styles.priceTag}>${item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6C63FF" />
        <Text style={styles.loadingText}>Finding activities near {zipCode}...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.resultCount}>
        {activities.length} activities found near {zipCode}
      </Text>
      <FlatList
        data={activities}
        renderItem={renderActivity}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  resultCount: {
    padding: 16,
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
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
