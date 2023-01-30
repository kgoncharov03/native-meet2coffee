import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import querystring from 'querystring-es3';
import { WebView } from 'react-native-webview';

import authStorage from '../auth/storage';

import { ActivityIndicator } from 'react-native';

import apiClient from '../api/client';
import AuthContext from '../auth/context';

import { useNavigation } from '@react-navigation/native';

const REDIRECT_URI = 'https://meet2coffee.com/linkedin-signin'; // this needs to be the same as your linkedin app panel
const AUTH_ENDPOINT = `https://www.linkedin.com/oauth/v2/authorization?client_id=773ov8eihsewkg&redirect_uri=${REDIRECT_URI}&response_type=code&scope=r_liteprofile%20r_emailaddress`;

export default function LinkedinLogin() {

    const navigation = useNavigation();

    const [token, setToken] = useState(false);
    //const [loginFailed, setLoginFailed] = useState(false);

    const { user, setUser } = useContext(AuthContext);

    const [isLoading, setisLoading] = useState(false);

    const handleSubmit = async ({ code }) => {
        const result = await apiClient.post('/Login/', { code });

        if (!result.ok) return;

        setUser(result.data['token']);

        authStorage.storeToken(result.data['token']);

    };

 
    const handleFail = () => navigation.navigate('LoginScreen');



    loadStart = ({ url }) => {
       // console.log(url)


        if(url == "https://meet2coffee.com/linkedin-signin?error=user_cancelled_login&error_description=The+user+cancelled+LinkedIn+login") {
            
        handleFail();
        }

        if(url == "https://meet2coffee.com/") {
            
        handleFail();
        }

        if (!url) {
            return;
        }

        const matches = url.match(REDIRECT_URI);

        if (matches && matches.length) {
            const obj = querystring.parse(url.split('?').pop());

            if (obj.code) {
                handleSubmit(obj);
                setToken(obj.code);
            }
        }
    };

    const uri = AUTH_ENDPOINT;

    return (
        <View style={styles.container}>
            {
                //   Hide the webview when we do have the token
                user ? (
                    <ActivityIndicator color={'#000000'} />
                ) : (
                    <WebView
                        style={styles.wv}
                        source={{ uri }}
                        javaScriptEnabled
                        domStorageEnabled
                        onNavigationStateChange={loadStart}
                    />
                )
            }
        </View>
    );
}

// Adding basic styles for the container and webview
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    wv: {
        flex: 1,
        width: 380,
        height: 300,
        marginVertical: 20,
        borderWidth: 1,
        borderColor: '#333',
    },
});
