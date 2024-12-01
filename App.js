import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons'

import theme from './theme';
import ToggleDarkMode from './ToggleDarkMode';

// Pantalla splash Animada
import SplashScreen from './src/components/SplashScreen';
// Pantalla de inicio
import BeaconScreen from './src/components/BeaconScreen';
// Pantallas Home que usaran tab navigator y tendran acceso el drawer
import ServicesScreen from './src/components/ServicesScreen';
import ActivitiesScreen from './src/components/ActivitiesScreen';
// Componentes dentro del drawer
import AccountScreen from './src/components/Drawer/AccountScreen';
import RoomScreen from './src/components/Drawer/RoomScreen';
import HostingScreen from './src/components/Drawer/HostingScreen';
import DevicesScreen from './src/components/Drawer/DevicesScreen';
import AccessCodeScreen from './src/components/AccessCodeScreen';

// Componentes de navegacion Services - Activities
import ActMustangMountainsScreen from './src/components/Activities/ActMustangMountainsScreen';
import ActRoyalValleyScreen from './src/components/Activities/ActRoyalValleyScreen';
import ActSkiAlpineHeightsScreen from './src/components/Activities/ActSkiAlpineHeightsScreen';
import ActSkyDivingAlpineHeightsScreen from './src/components/Activities/ActSkyDivingAlpineHeightsScreen';

import ServRestaurantScreen from './src/components/Services/ServRestaurantScreen';
import ServRoomServicesScreen from './src/components/Services/ServRoomServicesScreen';
import ServSpaScreen from './src/components/Services/ServSpaScreen';

import { NativeBaseProvider, useColorMode, useColorModeValue } from 'native-base';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const TabNavigatorHome = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'Services') {
          iconName = focused ? 'information' : 'information-outline';
        } else if (route.name === 'Activities') {
          iconName = focused ? 'format-list-bulleted' : 'format-list-bulleted-type';
        }
        return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'gray',
    })}
  >
    <Tab.Screen name="Services" component={ServicesScreen} />
    <Tab.Screen name="Activities" component={ActivitiesScreen} />
  </Tab.Navigator>
);

const DrawerNavigatorApp = () => (
  <Drawer.Navigator initialRouteName="Home">
    <Drawer.Screen name="Home" component={TabNavigatorHome} />
    <Drawer.Screen name="Account" component={AccountScreen} />
    <Drawer.Screen name="Room" component={RoomScreen} />
    <Drawer.Screen name="Hosting" component={HostingScreen} />
    <Drawer.Screen name="Devices" component={DevicesScreen} />
  </Drawer.Navigator>
);

const StackNavigatorApp = () => (
  <Stack.Navigator initialRouteName="Beacon">
    <Stack.Screen name="Beacon" component={BeaconScreen} />
    <Stack.Screen name="Access" component={AccessCodeScreen} />
    <Stack.Screen name="Main" component={DrawerNavigatorApp} />
    <Stack.Screen name="Resort - Royal Valley" component={ActRoyalValleyScreen} />
    <Stack.Screen name="Mustang Mountains" component={ActMustangMountainsScreen} />
    <Stack.Screen name="Ski - Alpine Heights" component={ActSkiAlpineHeightsScreen} />
    <Stack.Screen name="Sky Diving - Alpine Heights" component={ActSkyDivingAlpineHeightsScreen} />
    <Stack.Screen name="Restaurant" component={ServRestaurantScreen} />
    <Stack.Screen name="Room Services" component={ServRoomServicesScreen} />
    <Stack.Screen name="Spa" component={ServSpaScreen} />
  </Stack.Navigator>
);

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Ajusta el tiempo según la duración de tu animación de splash
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <StackNavigatorApp />
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;

