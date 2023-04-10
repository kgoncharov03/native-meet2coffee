import { StyleSheet, View } from 'react-native';
import React from 'react';
import Constants from 'expo-constants';
import { SafeAreaView } from 'react-native';

// TODO: refactor with PropTypes
export const Screen = ({ children, ...otherProps }: any) => {
    return (
        <SafeAreaView style={styles.screen}>
            <View {...otherProps}>{children}</View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    screen: {
        paddingTop: Constants.statusBarHeight,
        flex: 1,
    },
});
