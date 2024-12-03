import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Box, Text, VStack, Center, NativeBaseProvider, Divider } from 'native-base';
import { Calendar } from 'react-native-calendars'; // Import the calendar component

function HostingScreen() {
    const [userInfo, setUserInfo] = useState({});
    const [markedDates, setMarkedDates] = useState({});
    const [initialMonth, setInitialMonth] = useState('');

    useEffect(() => {
        fetch('http://10.1.1.1:3000/data/Account.json')
            .then(response => response.json())
            .then(data => {
                setUserInfo(data);
                const dates = data.staydate.split('-');
                const startDate = dates[0];
                const endDate = dates[1];
                const marked = {};
                let currentDate = new Date(startDate.split('/').reverse().join('-'));
                const end = new Date(endDate.split('/').reverse().join('-'));
                while (currentDate <= end) {
                    const formattedDate = currentDate.toISOString().split('T')[0];
                    marked[formattedDate] = { selected: true, marked: true, selectedColor: 'blue' };
                    currentDate.setDate(currentDate.getDate() + 1);
                }
                setMarkedDates(marked);
                setInitialMonth(startDate.split('/').reverse().join('-').slice(0, 7)); // Set the initial month to the start date
            })
            .catch(error => console.error(error));
    }, []);

    return (
        <NativeBaseProvider>
            <Box flex={1} bg="#fff" p={4}>
                <Center>
                    <Text fontSize="2xl" fontWeight="bold" mb={4}>Hosting Screen</Text>
                </Center>
                <VStack space={4} alignItems="center">
                    <Box bg="#f8f8f8" p={4} borderRadius={10} w="90%" shadow={2}>
                        <Text fontSize="lg" fontWeight="bold">Membership - Premium</Text>
                        <Text>
                            The hotel's premium membership gives you access to various activities within the hotel free of charge, except for any alcoholic beverages you may consume during your stay.
                        </Text>
                    </Box>
                    <Divider my={4} bg="#ccc" w="90%" />
                    <Box bg="#f8f8f8" p={4} borderRadius={10} w="90%" shadow={2}>
                        <Text fontSize="lg" fontWeight="bold">Length of stay</Text>
                        <Calendar
                            markedDates={markedDates}
                            current={initialMonth} // Set the initial month
                            theme={{
                                selectedDayBackgroundColor: 'blue',
                                todayTextColor: 'red',
                                arrowColor: 'blue',
                            }}
                        />
                    </Box>
                </VStack>
                <StatusBar style="auto" />
            </Box>
        </NativeBaseProvider>
    );
}

export default HostingScreen;
