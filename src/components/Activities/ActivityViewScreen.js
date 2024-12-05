import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useLanguage } from '../LanguageContext';

function ActivityViewScreen({ route }) {
  const { activity, language } = route.params;
  const [activityData, setActivityData] = useState({});

  useEffect(() => {
    const fetchActivityData = async () => {
      try {
        const response = await fetch('http://10.1.1.2:3000/data/Root.json');
        const data = await response.json();
        const menuData = language === 'es' ? data.MenuES : data.MenuENG;
        const activityInfo = menuData.Activities.find(item => item.id === activity.id);
        setActivityData(activityInfo);
      } catch (error) {
        console.error(error);
      }
    };

    fetchActivityData();
  }, [language, activity.id]);

  return (
    <View style={styles.container}>
      <Image source={{ uri: activity.image }} style={styles.image} />
      <Text style={styles.title}>{activityData.title}</Text>
      <Text style={styles.description}>{activityData.activity}</Text>
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
