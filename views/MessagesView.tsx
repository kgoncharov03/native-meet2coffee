import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from '../components';

import styles, { DARK_GRAY } from '../assets/styles';
import { ChatWindow } from '../screens/ChatWindow';

export const ChatView = () => {
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
            <ChatWindow></ChatWindow>
        </View>
    );
};
