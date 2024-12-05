import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Modal, TextInput, Animated, ScrollView, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { VStack } from 'native-base';
import { useLanguage } from './LanguageContext';

const BeaconScreen = ({ navigation }) => {
  const [connections, setConnections] = useState([
    { id: '1', name: 'NS News' },
    { id: '2', name: 'Jewelry Azic' },
    { id: '3', name: 'LiveTraffic' },
    { id: '4', name: 'Resort Alpine Heights' },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newConnection, setNewConnection] = useState('');
  const [fadeAnim] = useState(new Animated.Value(1));
  const [logo, setLogo] = useState(null);
  const { language } = useLanguage(); // Obtener el idioma del contexto
  const [texts, setTexts] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://10.1.1.2:3000/data/Root.json');
        const data = await response.json();
        const menuData = language === 'es' ? data.MenuES : data.MenuENG;
        const imgData = data.Images;
        setTexts(menuData.App); // Establecer los textos traducidos
        setLogo(imgData.logo.image); // Establecer la URL de la imagen del logo
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [language]); // Actualizar cuando cambie el idioma

  const handleAddConnection = () => {
    if (newConnection.trim()) {
      setConnections([...connections, { id: Date.now().toString(), name: newConnection }]);
      setNewConnection('');
      setModalVisible(false);
    }
  };

  const handleConnectionPress = (connection) => {
    if (connection.name === 'Resort Alpine Heights') {
      navigation.navigate('Main');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.topSection}>
        {logo && <Image source={{ uri: logo }} style={styles.imageStyle} />}
      </View>
      <Animated.View style={[styles.bottomSection, { opacity: fadeAnim }]}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <VStack style={styles.connectionsContainer}>
            <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
              <MaterialCommunityIcons name="plus" size={24} color="white" />
              <Text style={styles.addButtonText}>{texts.beaconplus}</Text>
            </TouchableOpacity>
            <FlatList
              data={connections}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.connectionButton} onPress={() => handleConnectionPress(item)}>
                  <Text style={styles.connectionText}>{item.name}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id}
              numColumns={2}
            />
          </VStack>
        </ScrollView>
      </Animated.View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{texts.beaconplus}</Text>
          <TextInput
            style={styles.input}
            value={newConnection}
            onChangeText={setNewConnection}
          />
          <TouchableOpacity style={styles.modalButton} onPress={handleAddConnection}>
            <Text style={styles.modalButtonText}>{texts.add}</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomSection: {
    flex: 1,
    backgroundColor: '#E0F7FA',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 10,
    width: '70%',
    alignSelf: 'center',
  },
  imageStyle: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  beaconsText: {
    fontSize: 14,
    fontWeight: 'normal',
    marginBottom: 20,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  connectionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0F7FA',
    padding: 10,
    borderRadius: 10,
  },
  connectionButton: {
    margin: 5,
    backgroundColor: '#00796B',
    padding: 10,
    borderRadius: 10,
    width: '45%',
    alignItems: 'center',
  },
  connectionText: {
    color: 'white',
    textAlign: 'center',
  },
  addButton: {
    margin: 5,
    backgroundColor: '#004D40',
    padding: 10,
    borderRadius: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    marginLeft: 8,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    width: '100%',
  },
  modalButton: {
    backgroundColor: '#00796B',
    padding: 10,
    borderRadius: 10,
  },
  modalButtonText: {
    color: 'white',
  },
});

export default BeaconScreen;
