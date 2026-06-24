import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from 'react-native';

export default function ActivityDetailScreen({ route }) {
  const { activity } = route.params;

  const handleSignUp = () => {
    if (activity.url) {
      Linking.openURL(activity.url);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>{activity.name}</Text>
        <Text style={styles.provider}>by {activity.provider}</Text>
      </View>

      {/* Quick Info */}
      <View style={styles.infoCards}>
        <View style={styles.infoCard}>
          <Text style={styles.infoIcon}>📍</Text>
          <Text style={styles.infoLabel}>Distance</Text>
          <Text style={styles.infoValue}>{activity.distance} mi</Text>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.infoIcon}>👶</Text>
          <Text style={styles.infoLabel}>Ages</Text>
          <Text style={styles.infoValue}>{activity.ageRange}</Text>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.infoIcon}>💰</Text>
          <Text style={styles.infoLabel}>Price</Text>
          <Text style={styles.infoValue}>${activity.price}</Text>
        </View>
      </View>

      {/* Description */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About This Activity</Text>
        <Text style={styles.description}>{activity.description}</Text>
      </View>

      {/* Schedule */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📅 Schedule</Text>
        <Text style={styles.scheduleText}>{activity.schedule}</Text>
      </View>

      {/* Location */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📍 Location</Text>
        <Text style={styles.locationText}>{activity.address}</Text>
      </View>

      {/* Sign Up Button */}
      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
        <Text style={styles.signUpButtonText}>Sign Up Now →</Text>
      </TouchableOpacity>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    backgroundColor: '#6C63FF',
    padding: 24,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  provider: {
    fontSize: 16,
    color: '#E8E6FF',
    marginTop: 4,
  },
  infoCards: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  infoCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  infoIcon: {
    fontSize: 24,
  },
  infoLabel: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 2,
  },
  section: {
    padding: 16,
    paddingTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  description: {
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
  },
  scheduleText: {
    fontSize: 15,
    color: '#555',
  },
  locationText: {
    fontSize: 15,
    color: '#555',
  },
  signUpButton: {
    backgroundColor: '#4CAF50',
    margin: 16,
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
