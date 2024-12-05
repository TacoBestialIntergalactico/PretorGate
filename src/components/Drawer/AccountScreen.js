import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Box, Text, Input, Button, VStack, Divider } from 'native-base';
import { StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLanguage } from '../LanguageContext';

function AccountScreen() {
    const [userInfo, setUserInfo] = useState({});
    const [texts, setTexts] = useState({});
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const { language } = useLanguage(); // Obtener el idioma del contexto

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://10.1.1.2:3000/data/Root.json');
                const data = await response.json();
                const menuData = language === 'es' ? data.MenuES : data.MenuENG;
                const accData = data.Account;
                setTexts(menuData.App);
                setUserInfo(accData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [language]); // Actualizar cuando cambie el idioma

    const handleUpdate = () => {
        const updatedUserInfo = { ...userInfo, email, phone, creditcard };
        setUserInfo(updatedUserInfo);
        // Aquí puedes agregar el código para enviar el JSON actualizado al servidor
        console.log('Updated user info:', updatedUserInfo);
    };

    return (
        <View style={styles.container}>
            <Box flex={1} bg="#fff" p={4}>
                <VStack space={4} alignItems="center">
                    <Box bg="#f8f8f8" p={4} borderRadius={10} w="90%" alignItems="center">
                        <MaterialCommunityIcons name="account" size={40} color="black" />
                        <Text fontSize="lg" fontWeight="bold">{userInfo.name}</Text>
                        <Text>{userInfo.email}</Text>
                        <Text>{userInfo.phone}</Text>
                    </Box>
                    <Divider my={4} bg="#ccc" w="90%" />
                    <Box bg="#f8f8f8" p={4} borderRadius={10} w="90%">
                        <Text fontSize="lg" fontWeight="bold" mb={2}>{texts.accDetails}</Text>
                        <VStack space={4}>
                            <Input
                                placeholder="Email"
                                value={email}
                                onChangeText={setEmail}
                            />
                            <Input
                                placeholder="Phone number"
                                value={phoneNumber}
                                onChangeText={setPhoneNumber}
                            />
                            <Button onPress={handleUpdate}>{texts.update}</Button>
                        </VStack>
                    </Box>
                    <Divider my={4} bg="#ccc" w="90%" />
                    <Box bg="#f8f8f8" p={4} borderRadius={10} w="90%" alignItems="center">
                        <Text fontSize="lg" fontWeight="bold">{texts.creditcard}</Text>
                        <MaterialCommunityIcons name="credit-card" size={40} color="black" />
                        <Text>{userInfo.creditcardService}</Text>
                        <Text>{userInfo.creditcardType}</Text>
                        <Text>{userInfo.creditcard}</Text>
                    </Box>
                </VStack>
                <StatusBar style="auto" />
            </Box>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
});

export default AccountScreen;
