import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ScrollView, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { Box } from 'native-base';
import { useLanguage } from './LanguageContext';

function ActivitiesScreen({ navigation }) {
  const [activities, setActivities] = useState([]);
  const { language } = useLanguage(); // Obtener el idioma del contexto

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://10.1.1.2:3000/data/Root.json');
        const data = await response.json();
        const menuData = language === 'es' ? data.MenuES : data.MenuENG;
        setActivities(menuData.Activities.map((activities, index) => ({
          ...activities,
          image: data.Images.Activities[index],
        }))); // Combinar servicios con URLs de imágenes
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [language]); // Actualizar cuando cambie el idioma

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('ActivityViewScreen', { activity: item, language })}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <FlatList
        data={activities}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
      <Box style={styles.box}></Box>
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
  card: {
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    marginTop: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  box: {
    marginTop: 36,
    marginBottom: 36,
  },
});

export default ActivitiesScreen;
