import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Box, Text, VStack, NativeBaseProvider, Button, Modal, Input, FlatList, HStack } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLanguage } from '../LanguageContext';

function DevicesScreen() {
    const [devices, setDevices] = useState([]);
    const [texts, setTexts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newDeviceName, setNewDeviceName] = useState('');

    const { language } = useLanguage(); // Obtener el idioma del contexto

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://10.1.1.2:3000/data/Root.json');
                const data = await response.json();
                const menuData = language === 'es' ? data.MenuES : data.MenuENG;
                setTexts(menuData.App);
                setDevices(menuData.Devices);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [language]); // Actualizar cuando cambie el idioma

    const addDevice = () => {
        if (newDeviceName.trim()) {
            setDevices([...devices, { name: newDeviceName }]);
            setNewDeviceName('');
            setShowModal(false);
        }
    };

    const renderItem = ({ item }) => (
        <Box bg="#f8f8f8" p={4} borderRadius={10} w="90%" alignItems="center" shadow={2} mb={4}>
            <HStack alignItems="center">
                <MaterialCommunityIcons name="devices" size={24} color="black" />
                <Text ml={2}>{item.name}</Text>
            </HStack>
        </Box>
    );

    return (
        <NativeBaseProvider>
            <Box flex={1} bg="#fff" p={4}>
                <VStack space={4} alignItems="center">
                    <FlatList
                        data={devices}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                    />
                    <Button onPress={() => setShowModal(true)}>{texts.addDevice}</Button>
                </VStack>
                <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                    <Modal.Content maxWidth="400px">
                        <Modal.CloseButton />
                        <Modal.Header>{texts.addNDevice}</Modal.Header>
                        <Modal.Body>
                            <Input
                                placeholder={texts.device}
                                value={newDeviceName}
                                onChangeText={setNewDeviceName}
                            />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onPress={addDevice}>{texts.add}</Button>
                        </Modal.Footer>
                    </Modal.Content>
                </Modal>
                <StatusBar style="auto" />
            </Box>
        </NativeBaseProvider>
    );
}

export default DevicesScreen;
