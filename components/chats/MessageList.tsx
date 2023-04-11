import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles, { DARK_GRAY } from '../../assets/styles';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from '../Icon';
import { GiftedChat } from 'react-native-gifted-chat';
import { Api } from '../../api';
import { processMessages } from './utils/processMessages';
import { RouteProp } from '@react-navigation/native';
import { RootState } from '../../redux/reducers';

export const MessageList = ({
    route,
}: {
    route: RouteProp<{ params: { id: string } }, 'params'>;
}) => {
    const { id } = route.params;
    const [messagesData, setMessagesData] = useState({
        loading: true,
        messages: [],
    });

    const self = useSelector((state: RootState) => {
        const { avatar, name } = state.user!.spec;
        const { id } = state.user!.meta;
        return {
            _id: id,
            avatar,
            name,
        };
    });

    // TODO: обработать возможные ошибки
    const fetchMessages = async () => {
        const [{ messages }, { spec }] = await Promise.all([
            Api.messages({
                chatId: id,
            }),
            Api.getUser({ id }),
        ]);

        const user = {
            _id: id,
            avatar: spec.avatar,
            name: spec.name,
        };
        setMessagesData({
            loading: false,
            messages: processMessages({ messages, self, user }) as any,
        });
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    const onSend = useCallback((messages = []) => {
        setMessagesData((data) => ({
            ...data,
            messages: GiftedChat.append(data.messages, messages),
        }));
    }, []);
    const { loading, messages } = messagesData;

    return (
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

            {loading ? (
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <ActivityIndicator />
                </View>
            ) : (
                <View style={styles.containerMessages}>
                    <GiftedChat
                        messages={messages}
                        onSend={onSend}
                        user={self}
                        bottomOffset={0}
                        wrapInSafeArea={false}
                    />
                </View>
            )}
        </View>
    );
};
