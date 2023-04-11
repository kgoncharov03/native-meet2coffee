import React, { useEffect, useState } from 'react';
import {
    Text,
    TouchableOpacity,
    ImageBackground,
    View,
    FlatList,
} from 'react-native';
import { Icon, Message } from '../components';
import styles, { DARK_GRAY } from '../assets/styles';
import { createStackNavigator } from '@react-navigation/stack';
// import AuthContext from '../auth/context';
import { ChatItem } from '../api/typings';
import { Api } from '../api';
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
