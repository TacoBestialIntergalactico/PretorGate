import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';

const SpaServiceScreen = () => {
  const [service, setService] = useState(null);

  useEffect(() => {
    fetch('http://10.1.1.1:3000/data/ExtraServices.json')
      .then(response => response.json())
      .then(data => setService(data[0])) // Asumiendo que solo hay un servicio en el JSON
      .catch(error => console.error(error));
  }, []);

  if (!service) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: service.image }} style={styles.image} />
      <Text style={styles.title}>{service.title}</Text>
      <Text style={styles.description}>{service.activity}</Text>
      <StatusBar style="auto" />
    </ScrollView>
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

export default SpaServiceScreen;
