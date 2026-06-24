import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

const CATEGORIES = [
  { id: 'sports', label: '⚽ Sports', color: '#FF6B6B' },
  { id: 'arts', label: '🎨 Arts', color: '#4ECDC4' },
  { id: 'stem', label: '🔬 STEM', color: '#45B7D1' },
  { id: 'music', label: '🎵 Music', color: '#96CEB4' },
  { id: 'dance', label: '💃 Dance', color: '#FECA57' },
  { id: 'outdoors', label: '🌲 Outdoors', color: '#A8E6CF' },
];

export default function HomeScreen({ navigation }) {
  const [zipCode, setZipCode] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleSearch = () => {
    navigation.navigate('Results', {
      zipCode: zipCode || '98101', // Default to Seattle
      category: selectedCategory,
    });
  };

  return (
    <ScrollView style={styles.container}>
      {/* Hero Section */}
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>Find Amazing Activities{'\n'}for Your Kids! 🎉</Text>
        <Text style={styles.heroSubtitle}>
          Discover courses, camps, and classes near you
        </Text>
      </View>

      {/* Search Section */}
      <View style={styles.searchSection}>
        <Text style={styles.label}>📍 Your Location</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter zip code (e.g., 98101)"
          value={zipCode}
          onChangeText={setZipCode}
          keyboardType="numeric"
          maxLength={5}
        />
      </View>

      {/* Categories */}
      <View style={styles.categorySection}>
        <Text style={styles.label}>🏷️ Category</Text>
        <View style={styles.categoryGrid}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={[
                styles.categoryChip,
                { backgroundColor: cat.color + '30' },
                selectedCategory === cat.id && {
                  backgroundColor: cat.color,
                  borderColor: cat.color,
                },
              ]}
              onPress={() =>
                setSelectedCategory(
                  selectedCategory === cat.id ? null : cat.id
                )
              }
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === cat.id && styles.categoryTextSelected,
                ]}
              >
                {cat.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Search Button */}
      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.searchButtonText}>🔍 Find Activities</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  hero: {
    backgroundColor: '#6C63FF',
    padding: 30,
    paddingTop: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#E8E6FF',
    textAlign: 'center',
    marginTop: 10,
  },
  searchSection: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  categorySection: {
    paddingHorizontal: 20,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  categoryTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
  searchButton: {
    backgroundColor: '#6C63FF',
    margin: 20,
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
