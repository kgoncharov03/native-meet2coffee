import React from 'react';
import { Text, StyleSheet } from 'react-native';
function AppText({ children, ...otherProps }) {
    return (
        <Text style={styles.text} {...otherProps}>
            {children}
        </Text>
    );
}

export default AppText;

const styles = StyleSheet.create({
    text: {
        color: '#000',
        fontSize: 20,
        fontFamily: 'Avenir',
    },
});
