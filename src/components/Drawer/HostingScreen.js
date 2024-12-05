import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Box, Text, VStack, NativeBaseProvider, Divider } from 'native-base';
import { Calendar } from 'react-native-calendars'; // Import the calendar component
import { useLanguage } from '../LanguageContext';

function HostingScreen() {
    const [member, setMember] = useState({});
    const [texts, setTexts] = useState({});
    const [markedDates, setMarkedDates] = useState({});
    const [initialMonth, setInitialMonth] = useState('');

    const { language } = useLanguage(); // Obtener el idioma del contexto

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://10.1.1.2:3000/data/Root.json');
                const data = await response.json();
                const menuData = language === 'es' ? data.MenuES : data.MenuENG;
                setTexts(menuData.App);
                setMember(menuData.Membership);

                const dates = data.Account.staydate.split('-');
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
                    <Box bg="#f8f8f8" p={4} borderRadius={10} w="90%" shadow={2}>
                        <Text fontSize="lg" fontWeight="bold">{texts.membership} - {texts.tierPremium}</Text>
                        <Text>
                            {member.tierPremium}
                        </Text>
                    </Box>
                    <Divider my={4} bg="#ccc" w="90%" />
                    <Box bg="#f8f8f8" p={4} borderRadius={10} w="90%" shadow={2}>
                        <Text fontSize="lg" fontWeight="bold">{texts.lengthStay}</Text>
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
