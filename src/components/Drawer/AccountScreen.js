import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Box, Text, Input, Button, VStack, Divider } from 'native-base';
import {StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

function AccountScreen() {
    const [userInfo, setUserInfo] = useState({});
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    useEffect(() => {
        fetch('http://10.1.1.1:3000/data/Account.json')
            .then(response => response.json())
            .then(data => {
                setUserInfo(data);
                setEmail(data.email);
                setPhoneNumber(data.phone);
            })
            .catch(error => console.error(error));
    }, []);

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
                        <Text fontSize="lg" fontWeight="bold" mb={2}>Account Details</Text>
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
                            <Button onPress={handleUpdate}>Update</Button>
                        </VStack>
                    </Box>
                    <Divider my={4} bg="#ccc" w="90%" />
                    <Box bg="#f8f8f8" p={4} borderRadius={10} w="90%" alignItems="center">
                        <Text fontSize="lg" fontWeight="bold">Credit Card</Text>
                        <MaterialCommunityIcons name="credit-card" size={40} color="black" />
                        <Text>Banco Azteca</Text>
                        <Text>Visa</Text>
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
