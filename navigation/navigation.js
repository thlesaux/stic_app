import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from "react-native-vector-icons/Ionicons";
// import globalStyle from '../assets/styles/globalStyle';
import consts from '../src/consts';

import Login from '../screens/connection/Login';

import Home from '../screens/house/Home';


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
    <Tab.Navigator tabBarOptions={{ activeTintColor: consts.BROWN, inactiveTintColor: '#4E4D53' }}>
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


      <Stack.Screen name="Stackstabs" component={StackTabs} options={{ title: '', headerShown: false, headerLeft: null, gestureEnabled: false }} />

    </Stack.Navigator>
  );
}



function HomeComponent() {
  return (
    <Stack.Navigator initialRouteName='Connection' screenOptions={{ animationEnabled: false }}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ title: '', headerTransparent: true, gestureEnabled: false, headerLeft: null }}
      />
   
      <Stack.Screen name="Stackstabs" component={StackTabs} options={{ title: '', headerShown: false, headerLeft: null, gestureEnabled: false }} />

    </Stack.Navigator>
  );
}

export default MainStackNavigator;