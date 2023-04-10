import React from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function ActivityIndicatorScreen() {
    return (
        <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
            <ActivityIndicator color={'#000000'} />
        </View>
    );
}
