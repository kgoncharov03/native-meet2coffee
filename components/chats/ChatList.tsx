import React, { useEffect, useState } from 'react';
import styles, { DARK_GRAY } from '../../assets/styles';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import Icon from '../Icon';
import { NavigationScreenProp } from 'react-navigation';
import { ChatItem } from '../../api/typings';
import { Api } from '../../api';
import Message from '../Message';

type ChatListProps = {
    navigation: NavigationScreenProp<any, any>;
};
export const ChatList = ({ navigation }: ChatListProps) => {
    const [chatData, setChatData] = useState<{
        chats: ChatItem[];
        loading: boolean;
    }>({ chats: [], loading: true });

    const fetchChats = async () => {
        const { chats } = await Api.chats({});
        setChatData({
            // TODO: корректно обрабатывать m2c-чат
            chats: chats.filter(({ chatId }) => chatId !== 'm2c'),
            loading: false,
        });
    };

    useEffect(() => {
        fetchChats();
    }, []);

    return (
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
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('MessageList', {
                                    id: item.chatId,
                                });
                            }}
                        >
                            <Message
                                image={item.avatar}
                                name={item.name}
                                lastMessage={item.lastMessagePreview.text}
                            />
                        </TouchableOpacity>
                    );
                }}
            />
        </View>
    );
};
