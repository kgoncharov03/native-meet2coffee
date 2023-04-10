import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native';
import colors from '../config/colors';

function AppButton({ title, color = 'primary', ...otherProps }) {
    return (
        <TouchableOpacity
            style={[styles.AppButton, { backgroundColor: '#467BEA' }]}
            {...otherProps}
        >
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
}
export default AppButton;

const styles = StyleSheet.create({
    AppButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 20,
        width: '90%',
        padding: 15,
        margin: 10,
        fontWeight: 'bold',
    },

    text: {
        fontSize: 18,
        color: '#fff',
        textTransform: 'uppercase',
    },
});
