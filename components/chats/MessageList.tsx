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
import { eventEmitter } from '../../event';
import { Event } from '../../event/typings';
import { unique } from '../../utils/unique';

export const MessageList = ({
    route,
}: {
    route: RouteProp<{ params: { id: string } }, 'params'>;
}) => {
    const { id } = route.params;
    const [user, setUser] = useState<any>();
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
        setUser(user);
        setMessagesData({
            loading: false,
            messages: processMessages({ messages, self, user }) as any,
        });
        return user;
    };

    const initMessages = async () => {
        const user = await fetchMessages();
        eventEmitter.on(Event.NEW_MESSAGE, (message) => {
            setMessagesData((data) => ({
                ...data,
                messages: GiftedChat.append(
                    data.messages,
                    processMessages({
                        messages: [
                            {
                                ...message,
                                fromId: message.user_id,
                                ctime: new Date(message.ctime),
                            },
                        ],
                        self,
                        user,
                    }) as any
                ),
            }));
        });
    };

    useEffect(() => {
        initMessages();
    }, []);

    useEffect(() => {
        setMessagesData((prevData) => ({
            ...prevData,
            loading: true,
        }));
        initMessages();
    }, [route.params.id]);

    const onSend = useCallback((messages: any[] = []) => {
        setMessagesData((data) => ({
            ...data,
            messages: GiftedChat.append(data.messages, messages as never),
        }));
        Api.sendMessage({
            chatId: id,
            text: messages[0].text,
        });
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
                        messages={unique(messages, '_id')}
                        onSend={onSend}
                        user={self}
                        showUserAvatar
                        bottomOffset={0}
                        wrapInSafeArea={false}
                    />
                </View>
            )}
        </View>
    );
};
