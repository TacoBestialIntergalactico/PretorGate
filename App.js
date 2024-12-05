import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, TouchableOpacity, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeBaseProvider } from 'native-base';
import { LanguageProvider, useLanguage } from './src/components/LanguageContext';

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

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const TabNavigatorHome = () => {
  const { language } = useLanguage();
  const [componentNames, setComponentNames] = useState({});

  useEffect(() => {
    const fetchComponentNames = async () => {
      try {
        const response = await fetch('http://10.1.1.2:3000/data/Root.json');
        const data = await response.json();
        setComponentNames(language === 'es' ? data.MenuES.Components : data.MenuENG.Components);
      } catch (error) {
        console.error(error);
      }
    };

    fetchComponentNames();
  }, [language]);

  if (Object.keys(componentNames).length === 0) {
    return null; // Devuelve null mientras se cargan los nombres de los componentes
  }

  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarLabel: () => (
            <Text style={{ color: 'black', fontWeight: 'normal' }}>
              {componentNames[route.name]}
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
        <Tab.Screen name="Services" component={ServicesScreen} options={{ title: componentNames.Services }} />
        <Tab.Screen name="Activities" component={ActivitiesScreen} options={{ title: componentNames.Activities }} />
      </Tab.Navigator>
    </View>
  );
};

const DrawerNavigatorApp = () => {
  const { language } = useLanguage();
  const [componentNames, setComponentNames] = useState({});

  useEffect(() => {
    const fetchComponentNames = async () => {
      try {
        const response = await fetch('http://10.1.1.2:3000/data/Root.json');
        const data = await response.json();
        setComponentNames(language === 'es' ? data.MenuES.Components : data.MenuENG.Components);
      } catch (error) {
        console.error(error);
      }
    };

    fetchComponentNames();
  }, [language]);

  if (Object.keys(componentNames).length === 0) {
    return null; // Devuelve null mientras se cargan los nombres de los componentes
  }

  return (
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
      <Drawer.Screen name="Home" component={TabNavigatorHome} options={{ title: componentNames.Home }} />
      <Drawer.Screen name="Account" component={AccountScreen} options={{ title: componentNames.Account }} />
      <Drawer.Screen name="Room" component={RoomScreen} options={{ title: componentNames.Room }} />
      <Drawer.Screen name="Hosting" component={HostingScreen} options={{ title: componentNames.Hosting }} />
      <Drawer.Screen name="Devices" component={DevicesScreen} options={{ title: componentNames.Devices }} />
    </Drawer.Navigator>
  );
};

const StackNavigatorApp = () => {
  const { language } = useLanguage();
  const [componentNames, setComponentNames] = useState({});

  useEffect(() => {
    const fetchComponentNames = async () => {
      try {
        const response = await fetch('http://10.1.1.2:3000/data/Root.json');
        const data = await response.json();
        setComponentNames(language === 'es' ? data.MenuES.Components : data.MenuENG.Components);
      } catch (error) {
        console.error(error);
      }
    };

    fetchComponentNames();
  }, [language]);

  if (Object.keys(componentNames).length === 0) {
    return null; // Devuelve null mientras se cargan los nombres de los componentes
  }

  return (
    <Stack.Navigator initialRouteName="Beacon">
      <Stack.Screen name="Beacon" component={BeaconScreen} />
      <Stack.Screen
        name="Main"
        component={DrawerNavigatorApp}
        options={{ headerShown: false }} // Ocultar el encabezado en la pantalla Main
      />
      <Stack.Screen name="Search" component={SearchScreen} options={{ title: componentNames.Search }} />
      <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: componentNames.Settings }} />
      <Stack.Screen name="ActivityViewScreen" component={ActivityViewScreen} options={{ title: componentNames.ActivityDetails }} />
      <Stack.Screen name="RestaurantScreen" component={RestaurantScreen} options={{ title: componentNames.Restaurant }} />
      <Stack.Screen name="RoomServiceScreen" component={RoomServiceScreen} options={{ title: componentNames.RoomServices }} />
      <Stack.Screen name="SpaServiceScreen" component={SpaServiceScreen} options={{ title: componentNames.Spa }} />
    </Stack.Navigator>
  );
};

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
    <LanguageProvider>
      <NativeBaseProvider>
        <NavigationContainer>
          <StackNavigatorApp />
        </NavigationContainer>
      </NativeBaseProvider>
    </LanguageProvider>
  );
};

export default App;
