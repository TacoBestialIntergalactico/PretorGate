import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Image, ScrollView } from 'react-native';
import { Box } from 'native-base';
import { useLanguage } from '../LanguageContext';

const SpaServiceScreen = () => {
  const [spaImg, setSpaImg] = useState(null);
  const [texts, setTexts] = useState({});

  const { language } = useLanguage(); // Obtener el idioma del contexto

  useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await fetch('http://10.1.1.2:3000/data/Root.json');
              const data = await response.json();
              const menuData = language === 'es' ? data.MenuES : data.MenuENG;
              const imgData = data.Images;
              setTexts(menuData.ExtraServices);
              setSpaImg(imgData.Services[2]);
          } catch (error) {
              console.error(error);
          }
      };

      fetchData();
  }, [language]); // Actualizar cuando cambie el idioma

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: spaImg }} style={styles.image} />
      <Text style={styles.title}>{texts.title}</Text>
      <Text style={styles.description}>{texts.activity}</Text>
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
  box: {
    marginTop: 36,
    marginBottom: 36,
  },
});

export default SpaServiceScreen;
