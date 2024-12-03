import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Animated, ScrollView, Image, FlatList, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

function RestaurantScreen() {
    const [roomServiceImages, setRoomServiceImages] = useState([]);
    const [isCalling, setIsCalling] = useState(false);
    const [fadeAnim] = useState(new Animated.Value(1));

    useEffect(() => {
        fetch('http://10.1.1.1:3000/data/Restaurant.json')
            .then(response => response.json())
            .then(data => setRoomServiceImages(data))
            .catch(error => console.error(error));
    }, []);

    const handleCallRoomService = () => {
        setIsCalling(true);
        Animated.loop(
            Animated.sequence([
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                }),
            ]),
        ).start();
        setTimeout(() => {
            setIsCalling(false);
        }, 3000); // Simulate calling for 3 seconds
    };

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Image
                source={{ uri: item.image }}
                style={styles.image}
            />
        </View>
    );

    return (
        <ScrollView style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={handleCallRoomService}>
                <MaterialCommunityIcons name="phone" size={24} color="black" />
                <Text style={styles.buttonText}>Make a Reservation</Text>
            </TouchableOpacity>
            {isCalling && (
                <Animated.View style={[styles.callingBox, { opacity: fadeAnim }]}>
                    <MaterialCommunityIcons name="phone" size={24} color="white" />
                    <Text style={styles.callingText}>Calling Restaurant...</Text>
                </Animated.View>
            )}
            <FlatList
                data={roomServiceImages}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                numColumns={3}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
            />
            <StatusBar style="auto" />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
        marginBottom: 16,
    },
    buttonText: {
        color: 'black',
        marginLeft: 8,
    },
    callingBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
        marginBottom: 16,
    },
    callingText: {
        color: 'white',
        marginLeft: 8,
    },
    card: {
        backgroundColor: '#f8f8f8',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
        marginBottom: 16,
        width: '30%',
    },
    image: {
        width: '100%',
        height: 100,
        borderRadius: 10,
    },
});

export default RestaurantScreen;
