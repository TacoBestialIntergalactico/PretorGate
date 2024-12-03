import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Box, Text, VStack, Center, NativeBaseProvider, Button, Modal, Input, FlatList, HStack } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';

function DevicesScreen() {
    const [devices, setDevices] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newDeviceName, setNewDeviceName] = useState('');

    useEffect(() => {
        fetch('http://10.1.1.1:3000/data/Devices.json')
            .then(response => response.json())
            .then(data => setDevices(data))
            .catch(error => console.error(error));
    }, []);

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
                <Center>
                    <Text fontSize="2xl" fontWeight="bold" mb={4}>Devices Screen</Text>
                </Center>
                <VStack space={4} alignItems="center">
                    <FlatList
                        data={devices}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                    />
                    <Button onPress={() => setShowModal(true)}>Add Device</Button>
                </VStack>
                <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                    <Modal.Content maxWidth="400px">
                        <Modal.CloseButton />
                        <Modal.Header>Add New Device</Modal.Header>
                        <Modal.Body>
                            <Input
                                placeholder="Device Name"
                                value={newDeviceName}
                                onChangeText={setNewDeviceName}
                            />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onPress={addDevice}>Add</Button>
                        </Modal.Footer>
                    </Modal.Content>
                </Modal>
                <StatusBar style="auto" />
            </Box>
        </NativeBaseProvider>
    );
}

export default DevicesScreen;
