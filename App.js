import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, TouchableOpacity, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

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

import SearchScreen from './src/components/Drawer/SearchScreen';
import SettingsScreen from './src/components/Drawer/SettingsScreen';

// Componentes de navegacion Services - Activities
import ActivityViewScreen from './src/components/Activities/ActivityViewScreen';


import RestaurantScreen from './src/components/Services/RestaurantScreen';
import RoomServiceScreen from './src/components/Services/RoomServiceScreen';
import SpaServiceScreen from './src/components/Services/SpaServiceScreen';

import { NativeBaseProvider } from 'native-base';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const TabNavigatorHome = () => (
  <View style={{ flex: 1 }}>
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarLabel: () => (
          <Text style={{ color: 'black', fontWeight: 'normal' }}>
            {route.name}
          </Text>
        ),
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Services') {
            iconName = 'bell';
          } else if (route.name === 'Activities') {
            iconName = 'calendar';
          }
          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'cyan',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { position: 'absolute', top: 0, left: 0, right: 0 },
        tabBarIndicatorStyle: { backgroundColor: 'cyan' },
        animation: 'shift',
      })}
    >
      <Tab.Screen name="Services" component={ServicesScreen} />
      <Tab.Screen name="Activities" component={ActivitiesScreen} />
    </Tab.Navigator>
  </View>
);

const DrawerNavigatorApp = () => (
  <Drawer.Navigator
    initialRouteName="Home"
    screenOptions={({ navigation }) => ({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <MaterialCommunityIcons name="menu" size={24} color="black" style={{ marginLeft: 16 }} />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <MaterialCommunityIcons name="magnify" size={24} color="black" style={{ marginRight: 16 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <MaterialCommunityIcons name="cog" size={24} color="black" style={{ marginRight: 16 }} />
          </TouchableOpacity>
        </View>
      ),
    })}
  >
    <Drawer.Screen name="Home" component={TabNavigatorHome} options={{ title: 'Resort - Alpine Heights' }} />
    <Drawer.Screen name="Account" component={AccountScreen} />
    <Drawer.Screen name="Room" component={RoomScreen} />
    <Drawer.Screen name="Hosting" component={HostingScreen} />
    <Drawer.Screen name="Devices" component={DevicesScreen} />
  </Drawer.Navigator>
);

const StackNavigatorApp = () => (
  <Stack.Navigator initialRouteName="Beacon">
    <Stack.Screen name="Beacon" component={BeaconScreen} />
    <Stack.Screen
      name="Main"
      component={DrawerNavigatorApp}
      options={{ headerShown: false }} // Ocultar el encabezado en la pantalla Main
    />
    <Stack.Screen name="Search" component={SearchScreen}/>
    <Stack.Screen name="Settings" component={SettingsScreen}/>
    <Stack.Screen name="ActivityViewScreen" component={ActivityViewScreen} options={{ title: 'Activity Details' }} />
    <Stack.Screen name="RestaurantScreen" component={RestaurantScreen} options={{ title: 'Restaurant' }}/>
    <Stack.Screen name="RoomServiceScreen" component={RoomServiceScreen} options={{ title: 'Room Services' }}/>
    <Stack.Screen name="SpaServiceScreen" component={SpaServiceScreen} options={{ title: 'Spa' }}/>
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
