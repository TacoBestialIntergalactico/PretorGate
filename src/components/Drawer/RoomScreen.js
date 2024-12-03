import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Box, Text, Image, VStack, NativeBaseProvider } from 'native-base';

function RoomScreen() {
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        fetch('http://10.1.1.1:3000/data/Account.json')
            .then(response => response.json())
            .then(data => setUserInfo(data))
            .catch(error => console.error(error));
    }, []);

    return (
        <NativeBaseProvider>
            <Box flex={1} bg="#fff" p={4}>
                <VStack space={4} alignItems="center">
                    <Box bg="#f8f8f8" borderRadius={10} w="90%" shadow={2}>
                        <Image
                            source={{ uri: userInfo.roomimage }}
                            alt="Room Image"
                            size="2xl"
                            borderTopRadius={10}
                            resizeMode="cover"
                            w="100%"
                            h={200}
                        />
                        <Box p={4}>
                            <Text fontSize="lg" fontWeight="bold" mt={2}>{userInfo.room}</Text>
                            <Text>{userInfo.roomdescription}</Text>
                        </Box>
                    </Box>
                    <Box bg="#f8f8f8" borderRadius={10} w="90%" shadow={2}>
                        <Image
                            source={{ uri: userInfo.hotelmap }} // Reemplaza con la URL real del croquis del hotel
                            alt="Hotel Map"
                            size="2xl"
                            borderTopRadius={10}
                            resizeMode="cover"
                            w="100%"
                            h={200}
                        />
                    </Box>
                </VStack>
                <StatusBar style="auto" />
            </Box>
        </NativeBaseProvider>
    );
}

export default RoomScreen;
