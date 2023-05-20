import React from 'react';
import { ImageBackground } from 'react-native';
import styles from '../assets/styles';
import { createStackNavigator } from '@react-navigation/stack';
import { Profile as MainProfile } from '../components/profile';
import { EditProfile } from '../components/profile/EditProfile';

const Stack = createStackNavigator();

const Profile = () => {
    return (
        <ImageBackground
            source={require('../assets/images/bg.png')}
            style={styles.bg}
        >
            <Stack.Navigator>
                <Stack.Screen
                    name='MainProfile'
                    options={{
                        headerTitle: 'Profile',
                        headerShown: false,
                        animationEnabled: false,
                    }}
                    component={MainProfile}
                ></Stack.Screen>
                <Stack.Screen
                    name='EditProfile'
                    options={{
                        headerShown: true,
                        headerTitle: 'Edit Profile',
                        animationEnabled: false,
                    }}
                    component={EditProfile}
                ></Stack.Screen>
            </Stack.Navigator>
        </ImageBackground>
    );
};

export default Profile;
