import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinkedInModal } from './LinkedinModal';
import { CLIENT_ID, REDIRECT_URI_TEST } from './constants';
import { Api } from '../api';

export const LinkedinLogin = () => {
    const navigation = useNavigation();
    const [logging, setLogging] = useState<boolean>(false);
    const loginWithLinkedin = async (token: string) => {
        try {
            const data = await Api.loginWithLinkedin({ code: token });
            console.log(data);
        } catch (err) {
            console.log(err);
            // TODO: redirect with error to LoginScreen
        }
    };
    return (
        <View style={styles.container}>
            {logging ? <ActivityIndicator /> : null}
            <LinkedInModal
                clientID={CLIENT_ID}
                redirectUri={REDIRECT_URI_TEST}
                shouldGetAccessToken={false}
                onSuccess={(result) => {
                    console.log('!!! result:', result);
                    const { authentication_code: token } = result;
                    if (!token) {
                        return;
                    }
                    setLogging(true);
                    loginWithLinkedin(token);
                }}
                onClose={() => {
                    navigation.navigate('LoginScreen');
                }}
            ></LinkedInModal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
