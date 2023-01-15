import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TextInput } from 'react-native';
import { Platform } from 'react-native';

function AppTextInput({ icon, MyText, ...otherProps }) {
    return (
        <View style={styles.container}>
            {icon && (
                <MaterialCommunityIcons
                    size={20}
                    name={icon}
                    style={styles.icon}
                />
            )}
            <TextInput
                style={{ flex: 1, margin: 0, height: 50 }}
                {...otherProps}
            />
        </View>
    );
}

export default AppTextInput;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 10,
        flexDirection: 'row',
        width: '100%',
        padding: 10,
        marginVertical: 2,
        borderWidth: 0.2,
        alignItems: 'center',
    },
    TextInput: {
        fontSize: 18,
        fontFamily: Platform.OS == 'android' ? 'Roboto' : 'Avenir',
        color: '#000000',
    },
    icon: {
        marginRight: 20,
    },
});
