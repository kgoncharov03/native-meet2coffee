import React from 'react';
import { LoginScreen } from '../auth/LoginScreen';
import { LinkedinLogin } from '../auth/LinkedInLogin';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export const AuthNavigator = () => {
    const Stack = createStackNavigator();

    const AuthNavigator = () => (
        <Stack.Navigator>
            <Stack.Screen
                name='LoginScreen'
                component={LoginScreen}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name='LinkedinLogin'
                component={LinkedinLogin}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );

    return (
        <NavigationContainer>
            <AuthNavigator />
        </NavigationContainer>
    );
};
