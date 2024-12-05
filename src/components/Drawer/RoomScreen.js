import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Box, Text, Image, VStack, NativeBaseProvider } from 'native-base';
import { useLanguage } from '../LanguageContext';

function RoomScreen() {
    const [userInfo, setUserInfo] = useState({});
    const [texts, setTexts] = useState({});
    const [roomDesc, setRoomDesc] = useState({});
    const [roomImg, setRoomImg] = useState({});
    const { language } = useLanguage(); // Obtener el idioma del contexto

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://10.1.1.2:3000/data/Root.json');
                const data = await response.json();
                const menuData = language === 'es' ? data.MenuES : data.MenuENG;
                const accData = data.Account;
                const imgData = data.Images;
                setTexts(menuData.App);
                setUserInfo(accData);
                setRoomDesc(menuData.Room)
                setRoomImg(imgData.Room)
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [language]); // Actualizar cuando cambie el idioma
    
    return (
        <NativeBaseProvider>
            <Box flex={1} bg="#fff" p={4}>
                <VStack space={4} alignItems="center">
                    <Box bg="#f8f8f8" borderRadius={10} w="90%" shadow={2}>
                        <Image
                            source={{ uri: roomImg.roomImage }}
                            alt="Room Image"
                            size="2xl"
                            borderTopRadius={10}
                            resizeMode="cover"
                            w="100%"
                            h={200}
                        />
                        <Box p={4}>
                            <Text fontSize="lg" fontWeight="bold" mt={2}>{texts.room} {userInfo.roomID}</Text>
                            <Text>{roomDesc.roomdescription}</Text>
                        </Box>
                    </Box>
                    <Box bg="#f8f8f8" borderRadius={10} w="90%" shadow={2}>
                        <Image
                            source={{ uri: roomImg.hotelMap }} // Reemplaza con la URL real del croquis del hotel
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
