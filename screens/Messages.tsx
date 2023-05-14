import React from 'react';
import { ImageBackground } from 'react-native';
import styles from '../assets/styles';
import { createStackNavigator } from '@react-navigation/stack';
import { MessageList } from '../components/chats/MessageList';
import { ChatList } from '../components/chats/ChatList';

const Stack = createStackNavigator();

const Messages = () => {
    return (
        <ImageBackground
            // source={require('../assets/images/bg.png')}
            style={styles.bg}
        >
            <Stack.Navigator>
                <Stack.Screen
                    name='ChatList'
                    options={{
                        headerShown: false,
                        animationEnabled: false,
                    }}
                    component={ChatList}
                ></Stack.Screen>
                <Stack.Screen
                    name='MessageList'
                    options={{
                        headerShown: false,
                        animationEnabled: false,
                    }}
                    component={MessageList}
                ></Stack.Screen>
            </Stack.Navigator>
        </ImageBackground>
    );
};

export default Messages;
