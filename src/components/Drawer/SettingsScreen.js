import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Box, Text, Switch, Checkbox, VStack, HStack, NativeBaseProvider, Divider } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLanguage } from '../LanguageContext';

function SettingsScreen() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAutoConnect, setIsAutoConnect] = useState(false);
  const [isAutoPay, setIsAutoPay] = useState(true);
  const [isEventNotifications, setIsEventNotifications] = useState(false);
  const [isEmailReceipts, setIsEmailReceipts] = useState(true);
  const [userInfo, setUserInfo] = useState({});
  const { language, toggleLanguage } = useLanguage();
  const [texts, setTexts] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://10.1.1.2:3000/data/Root.json');
        const data = await response.json();
        const menuData = language === 'es' ? data.MenuES : data.MenuENG;
        const accData = data.Account;
        setTexts(menuData.App); // Establecer los textos traducidos
        setUserInfo(accData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [language]); // Actualizar cuando cambie el idioma

  const handleLanguageChange = (lang) => {
    toggleLanguage(lang);
  };

  return (
    <NativeBaseProvider>
      <Box flex={1} bg="#fff" p={4}>
        <VStack space={4} alignItems="center">
          <Box bg="#f8f8f8" p={4} borderRadius={10} w="90%">
            <HStack alignItems="center" mb={2}>
              <Checkbox isChecked={isAutoConnect} onChange={setIsAutoConnect} />
              <Text ml={2}>{texts.settingsC1}</Text>
            </HStack>
            <HStack alignItems="center" mb={2}>
              <Checkbox isChecked={isAutoPay} onChange={setIsAutoPay} />
              <Text ml={2}>{texts.settingsC2}</Text>
            </HStack>
            <HStack alignItems="center" mb={2}>
              <Checkbox isChecked={isEventNotifications} onChange={setIsEventNotifications} />
              <Text ml={2}>{texts.settingsC3}</Text>
            </HStack>
            <HStack alignItems="center">
              <Checkbox isChecked={isEmailReceipts} onChange={setIsEmailReceipts} />
              <Text ml={2}>{texts.settingsC4}</Text>
            </HStack>
          </Box>
          <Divider my={4} bg="#ccc" w="90%" />
          <Box bg="#f8f8f8" p={4} borderRadius={10} w="90%" alignItems="center">
            <MaterialCommunityIcons name="account" size={40} color="black" />
            <Text fontSize="lg" fontWeight="bold">{userInfo.name}</Text>
            <Text>{userInfo.email}</Text>
            <Text>{userInfo.role}</Text>
          </Box>
          <Divider my={4} bg="#ccc" w="90%" />
          <Box bg="#f8f8f8" p={4} borderRadius={10} w="90%" alignItems="center">
            <HStack alignItems="center" mb={2}>
              <Text>{texts.DLmode}</Text>
              <Switch ml={2} isChecked={isDarkMode} onToggle={setIsDarkMode} />
            </HStack>
            <HStack alignItems="center">
              <HStack alignItems="center" mr={6}>
                <Text>Español</Text>
                <Checkbox ml={2} isChecked={language === 'es'} onChange={() => handleLanguageChange('es')} />
              </HStack>
              <HStack alignItems="center">
                <Text>English</Text>
                <Checkbox ml={2} isChecked={language === 'en'} onChange={() => handleLanguageChange('en')} />
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
