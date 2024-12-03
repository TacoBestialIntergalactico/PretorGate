import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Box, Text, Switch, Checkbox, VStack, HStack, Center, NativeBaseProvider, Divider } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Import the icon library

function SettingsScreen() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isAutoConnect, setIsAutoConnect] = useState(false);
    const [isAutoPay, setIsAutoPay] = useState(true);
    const [isEventNotifications, setIsEventNotifications] = useState(false);
    const [isEmailReceipts, setIsEmailReceipts] = useState(true);
    const [isSpanish, setIsSpanish] = useState(false);
    const [isEnglish, setIsEnglish] = useState(true);
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        fetch('http://10.1.1.1:3000/data/Account.json')
            .then(response => response.json())
            .then(data => setUserInfo(data))
            .catch(error => console.error(error));
    }, []);

    const handleLanguageChange = (language) => {
        if (language === 'Spanish') {
            setIsSpanish(true);
            setIsEnglish(false);
        } else if (language === 'English') {
            setIsSpanish(false);
            setIsEnglish(true);
        }
    };

    return (
        <NativeBaseProvider>
            <Box flex={1} bg="#fff" p={4}>

                <VStack space={4} alignItems="center">
                    <Box bg="#f8f8f8" p={4} borderRadius={10} w="90%">
                        <HStack alignItems="center" mb={2}>
                            <Checkbox isChecked={isAutoConnect} onChange={setIsAutoConnect} />
                            <Text ml={2}>Automatic connection to IoT devices</Text>
                        </HStack>
                        <HStack alignItems="center" mb={2}>
                            <Checkbox isChecked={isAutoPay} onChange={setIsAutoPay} />
                            <Text ml={2}>Auto-Pay for extra services</Text>
                        </HStack>
                        <HStack alignItems="center" mb={2}>
                            <Checkbox isChecked={isEventNotifications} onChange={setIsEventNotifications} />
                            <Text ml={2}>Events notifications</Text>
                        </HStack>
                        <HStack alignItems="center">
                            <Checkbox isChecked={isEmailReceipts} onChange={setIsEmailReceipts} />
                            <Text ml={2}>Receive payment receipts by email</Text>
                        </HStack>
                    </Box>
                    <Divider my={4} bg="#ccc" w="90%" />
                    <Box bg="#f8f8f8" p={4} borderRadius={10} w="90%" alignItems="center">
                        <MaterialCommunityIcons name="account" size={40} color="black" /> {/* Add the icon */}
                        <Text fontSize="lg" fontWeight="bold">{userInfo.name}</Text>
                        <Text>{userInfo.email}</Text>
                        <Text>{userInfo.role}</Text>
                    </Box>
                    <Divider my={4} bg="#ccc" w="90%" />
                    <Box bg="#f8f8f8" p={4} borderRadius={10} w="90%" alignItems="center">
                        <HStack alignItems="center" mb={2}>
                            <Text>Dark Mode</Text>
                            <Switch ml={2} isChecked={isDarkMode} onToggle={setIsDarkMode} />
                        </HStack>
                        <HStack alignItems="center">
                            <HStack alignItems="center" mr={6}>
                                <Text>Spanish</Text>
                                <Checkbox ml={2} isChecked={isSpanish} onChange={() => handleLanguageChange('Spanish')} />
                            </HStack>
                            <HStack alignItems="center">
                                <Text>English</Text>
                                <Checkbox ml={2} isChecked={isEnglish} onChange={() => handleLanguageChange('English')} />
                            </HStack>
                        </HStack>
                    </Box>
                </VStack>
                <StatusBar style="auto" />
            </Box>
        </NativeBaseProvider>
    );
}

export default SettingsScreen;
