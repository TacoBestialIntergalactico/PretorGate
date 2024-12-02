import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';

function ActivityViewScreen({ route }) {
  const { activity } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: activity.image }} style={styles.image} />
      <Text style={styles.title}>{activity.title}</Text>
      <Text style={styles.description}>{activity.activity}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },
});

export default ActivityViewScreen;
