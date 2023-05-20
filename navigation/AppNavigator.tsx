import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Matches, Messages, Profile } from '../screens';
import { PRIMARY_COLOR, DARK_GRAY, BLACK, WHITE } from '../assets/styles';
import TabBarIcon from '../components/TabBarIcon';
import { RootState } from '../redux/reducers';
import { useSelector } from 'react-redux';
import { Api } from '../api';
import { Socket, io } from 'socket.io-client';
import { subscribeSocketMessages } from '../utils/subscribeSocketMessages';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AppNavigator = () => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const token = useSelector((state: RootState) => state.token);
    const fetchSocket = async () => {
        if (socket && socket.connected) {
            return;
        }
        const { address: socketUrl } = await Api.getSocket();
        const connectedSocket = io(socketUrl + '?token=' + token);
        connectedSocket.on('connect', () => console.log('connected'));
        connectedSocket.on('disconnect', () => console.log('disconnected'));
        setSocket(connectedSocket);
        subscribeSocketMessages(connectedSocket);
    };

    useEffect(() => {
        fetchSocket();
        return () => {
            if (!socket) {
                return;
            }
            socket.close();
        };
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name='Tab'
                    options={{ headerShown: false, animationEnabled: false }}
                >
                    {() => (
                        <Tab.Navigator
                            tabBarOptions={{
                                showLabel: false,
                                activeTintColor: PRIMARY_COLOR,
                                inactiveTintColor: DARK_GRAY,
                                labelStyle: {
                                    fontSize: 14,
                                    textTransform: 'uppercase',
                                    paddingTop: 10,
                                },
                                style: {
                                    backgroundColor: WHITE,
                                    borderTopWidth: 0,
                                    marginBottom: 0,
                                    shadowOpacity: 0.05,
                                    shadowRadius: 10,
                                    shadowColor: BLACK,
                                    shadowOffset: { height: 0, width: 0 },
                                },
                            }}
                        >
                            <Tab.Screen
                                name='Explore'
                                component={Home}
                                options={{
                                    tabBarIcon: ({ focused }) => (
                                        <TabBarIcon
                                            focused={focused}
                                            iconName='search'
                                            text='Explore'
                                        />
                                    ),
                                }}
                            />

                            <Tab.Screen
                                name='Matches'
                                component={Matches}
                                options={{
                                    tabBarIcon: ({ focused }) => (
                                        <TabBarIcon
                                            focused={focused}
                                            iconName='heart'
                                            text='Matches'
                                        />
                                    ),
                                }}
                            />

                            <Tab.Screen
                                name='Chat'
                                component={Messages}
                                options={{
                                    tabBarIcon: ({ focused }) => (
                                        <TabBarIcon
                                            focused={focused}
                                            iconName='chatbubble'
                                            text='Chat'
                                        />
                                    ),
                                }}
                            />

                            <Tab.Screen
                                name='Profile'
                                component={Profile}
                                options={{
                                    tabBarIcon: ({ focused }) => (
                                        <TabBarIcon
                                            focused={focused}
                                            iconName='person'
                                            text='Profile'
                                        />
                                    ),
                                }}
                            />
                        </Tab.Navigator>
                    )}
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export { AppNavigator };
