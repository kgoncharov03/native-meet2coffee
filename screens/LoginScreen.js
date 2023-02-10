import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useContext, useState } from 'react';
import AppButton from '../components/AppButton';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AppFormField from '../components/AppFormField';
import SubmitButton from '../components/SubmitButton';
import authApi from '../api/auth';
import MD5 from 'crypto-js/md5';

import AuthContext from '../auth/context';
import authStorage from '../auth/storage';

import { useNavigation } from '@react-navigation/native';

const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label('Email'),

    password: Yup.string().required().min(4).label('Password'),
});

export default function LoginScreen() {
    const navigation = useNavigation();
    const [loginFailed, setLoginFailed] = useState(false);
    const authContext = useContext(AuthContext);

    const handleSubmit = async ({ email, password }) => {
        const result = await authApi.login(email, MD5(password).toString());

        if (!result.ok) return setLoginFailed(true);

        authContext.setUser(result.data['token']);

        authStorage.storeToken(result.data['token']);

        setLoginFailed(false);
    };

    return (
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={require('../assets/data/m2c_logo.png')}
            />

            <Formik
                initialValues={{ email: '', password: '' }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            >
                {() => (
                    <>
                        <AppFormField
                            keyboardType='email-address'
                            autoCapitalize='none'
                            autoCorrect={false}
                            icon='email'
                            placeholder='Email'
                            textContentType='emailAddress'
                            name='email'
                        />

                        <AppFormField
                            autoCapitalize='none'
                            autoCorrect={false}
                            icon='lock'
                            placeholder='Password'
                            textContentType='password'
                            secureTextEntry={true}
                            name='password'
                        />

                        {loginFailed && <Text>Wrong Email or Password</Text>}

                        <SubmitButton title1='login' />
                    </>
                )}
            </Formik>

            <AppButton
                title={'Login with LinkedIn'}
                onPress={() => navigation.navigate('LinkedInLogin')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 125,
        padding: 20,
        backgroundColor: '#fff',
        flex: 1,
    },
    logo: {
        width: 200,
        height: 100,
        alignSelf: 'center',

        marginBottom: 30,
    },
});
