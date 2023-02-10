import LoginScreen from '../screens/LoginScreen';
import React from 'react';
import LinkedInLogin from '../screens/LinkedInLogin';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export default function AuthNavigator() {
    const Stack = createStackNavigator();

    const AuthNavigator = () => (
        <Stack.Navigator>
            <Stack.Screen
                name='LoginScreen'
                component={LoginScreen}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name='LinkedInLogin'
                component={LinkedInLogin}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );

    return (
        <NavigationContainer>
            <AuthNavigator />
        </NavigationContainer>
    );
}
