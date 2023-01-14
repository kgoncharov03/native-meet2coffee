import React, { useEffect, useState } from 'react';
import {
    ScrollView,
    Text,
    TouchableOpacity,
    ImageBackground,
    View,
    FlatList,
} from 'react-native';
import { Icon, Message } from '../components';
import DEMO from '../assets/data/demo';
import styles, { DARK_GRAY } from '../assets/styles';
import { ActivityIndicator } from 'react-native';
import { ChatWindow } from './ChatWindow';
import apiClient from '../api/client';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const Messages = () => {
    const [chatData, setChatData] = useState({ chats: [], loading: true });
    useEffect(() => {
        apiClient
            .get('/Chats/', { imgSize: 'SMALL', skip: 0, limit: 1000 }, {})
            .then((res) => {
                console.log(res.data.chats.length);
                setChatData({ chats: res.data.chats, loading: false });
            });
    }, []);
    return (
        <ImageBackground
            source={require('../assets/images/bg.png')}
            style={styles.bg}
        >
            <Stack.Navigator>
                <Stack.Screen
                    name='ChatList'
                    options={{
                        headerShown: false,
                        animationEnabled: false,
                    }}
                >
                    {({ navigation }) => (
                        <View style={styles.containerMessages}>
                            <View style={styles.top}>
                                <Text style={styles.title}>Messages</Text>
                                <TouchableOpacity>
                                    <Icon
                                        name='ellipsis-vertical'
                                        color={DARK_GRAY}
                                        size={20}
                                    />
                                </TouchableOpacity>
                            </View>
                            <FlatList
                                data={chatData.chats}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item }) => {
                                    console.log(item.avatar);
                                    return (
                                        <TouchableOpacity
                                            onPress={() => {
                                                navigation.navigate(
                                                    'MessagesList'
                                                );
                                            }}
                                        >
                                            <Message
                                                image={item.avatar}
                                                name={item.name}
                                                lastMessage={
                                                    item.lastMessagePreview.text
                                                }
                                            />
                                        </TouchableOpacity>
                                    );
                                }}
                            />
                        </View>
                    )}
                </Stack.Screen>
                <Stack.Screen
                    name='MessagesList'
                    options={{
                        headerShown: false,
                        animationEnabled: false,
                    }}
                >
                    {() => (
                        <View style={styles.containerMessages}>
                            <View style={styles.top}>
                                <Text style={styles.title}>Chat</Text>
                                <TouchableOpacity>
                                    <Icon
                                        name='ellipsis-vertical'
                                        color={DARK_GRAY}
                                        size={20}
                                    />
                                </TouchableOpacity>
                            </View>
                            <ChatWindow></ChatWindow>
                        </View>
                    )}
                </Stack.Screen>
            </Stack.Navigator>
        </ImageBackground>
    );
};

export default Messages;
