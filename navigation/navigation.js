import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from "react-native-vector-icons/Ionicons";
import consts from '../src/consts';

import Login from '../screens/connection/Login';
import Register from '../screens/connection/Register';

import Home from '../screens/house/Home';
import Rooms from '../screens/house/Rooms';
import Temperature from '../screens/house/Temperature';
import Alarm from '../screens/house/Alarm';
import Lighting from '../screens/house/Lighting'
import Shutter from '../screens/house/Shutter'

import SettingsHome from '../screens/settings/SettingsHome';
import AboutUs from '../screens/settings/AboutUs';
import Help from '../screens/settings/Help';


function MainStackNavigator() {
    return (
        <NavigationContainer>
            <App />
        </NavigationContainer>
    )
}

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


const StackTabs = function MyTabs() {
    return (
        <Tab.Navigator tabBarOptions={{ activeTintColor: consts.BLUE, inactiveTintColor: '#4E4D53' }}>
            <Tab.Screen
                name="Home"
                component={HomeComponent}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="ios-home" size={size} color={color} />
                    ),
                    gestureEnabled: false
                }}
            />
            <Tab.Screen
                name="Settings"
                component={SettingsComponent}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="ios-settings" size={size} color={color} />
                    ),
                    gestureEnabled: false
                }}
            />
        </Tab.Navigator>
    );
}

function App() {
    return (
        <Stack.Navigator initialRouteName='Connection' screenOptions={{ animationEnabled: false }}>

            <Stack.Screen
                name="Login"
                component={Login}
                options={{ title: '', headerTransparent: true, gestureEnabled: false, headerLeft: null }}
            />

            <Stack.Screen
                name="Register"
                component={Register}
                options={{ title: 'Inscription', headerTransparent: false, gestureEnabled: false, headerTintColor: '#FFF', headerStyle: { backgroundColor: consts.BLUE } }}
            />


            <Stack.Screen
                name="Stackstabs" component={StackTabs}
                options={{ title: '', headerShown: false, headerLeft: null, gestureEnabled: false }}
            />

        </Stack.Navigator>
    );
}


function HomeComponent() {
    return (
        <Stack.Navigator initialRouteName='Connection' screenOptions={{ animationEnabled: false, headerBackTitle: 'Retour' }}>
            <Stack.Screen
                name="Home"
                component={Home}
                options={{ title: '', headerTransparent: true, gestureEnabled: false, headerLeft: null }}
            />
            <Stack.Screen
                name="Rooms"
                component={Rooms}
                options={{
                    title: '',
                    headerTransparent: false,
                    gestureEnabled: false,
                    headerTintColor: '#FFF',
                    headerStyle: { backgroundColor: consts.BLUE }
                }}
            />

            <Stack.Screen
                name="Temperature"
                component={Temperature}
                options={{
                    title: 'Température',
                    headerTransparent: false,
                    gestureEnabled: false,
                    headerTintColor: '#FFF',
                    headerStyle: { backgroundColor: consts.BLUE }
                }}
            />

            <Stack.Screen
                name="Alarm"
                component={Alarm}
                options={{
                    title: 'Alarme',
                    headerTransparent: false,
                    gestureEnabled: false,
                    headerTintColor: '#FFF',
                    headerStyle: { backgroundColor: consts.BLUE }
                }}
            />
            <Stack.Screen
                name="Lighting"
                component={Lighting}
                options={{
                    title: 'Éclairage',
                    headerTransparent: false,
                    gestureEnabled: false,
                    headerTintColor: '#FFF',
                    headerStyle: { backgroundColor: consts.BLUE }
                }}
            />
            <Stack.Screen
                name="Shutter"
                component={Shutter}
                options={{
                    title: 'Volets',
                    headerTransparent: false,
                    gestureEnabled: false,
                    headerTintColor: '#FFF',
                    headerStyle: { backgroundColor: consts.BLUE }
                }}
            />

            <Stack.Screen name="Stackstabs" component={StackTabs} options={{ title: '', headerShown: false, headerLeft: null, gestureEnabled: false }} />

        </Stack.Navigator>
    );



}

function SettingsComponent() {
    return (
        <Stack.Navigator initialRouteName='Connection' screenOptions={{ animationEnabled: false }}>
            <Stack.Screen
                name="SettingsHome"
                component={SettingsHome}
                options={{ title: '', headerTransparent: true, gestureEnabled: false, headerLeft: null }}
            />

            <Stack.Screen
                name="AboutUs"
                component={AboutUs}
                options={{ title: 'La team', headerTransparent: false, gestureEnabled: false, headerTintColor: '#FFF', headerStyle: { backgroundColor: consts.BLUE } }}
            />

            <Stack.Screen
                name="Help"
                component={Help}
                options={{ title: 'Aide', headerTransparent: false, gestureEnabled: false, headerTintColor: '#FFF', headerStyle: { backgroundColor: consts.BLUE } }}
            />

            <Stack.Screen name="Stackstabs" component={StackTabs} options={{ title: '', headerShown: false, headerLeft: null, gestureEnabled: false }} />

        </Stack.Navigator>
    );
}


export default MainStackNavigator;
