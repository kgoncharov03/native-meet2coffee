import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useState } from 'react';
import AppButton from '../components/AppButton';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AppFormField from '../components/AppFormField';
import { SubmitButton } from '../components/SubmitButton';
// @ts-ignore
import MD5 from 'crypto-js/md5';

import { useNavigation } from '@react-navigation/native';
import { Api } from '../api';
import { ApiCallError } from '../api/typings';

const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label('Email'),
    password: Yup.string().required().min(4).label('Password'),
});

export const LoginScreen = () => {
    const navigation = useNavigation();
    const [loginFailedMessage, setLoginFailedMessage] = useState<string>('');

    const handleSubmit = async ({
        email,
        password,
    }: {
        email: string;
        password: string;
    }) => {
        try {
            await Api.loginWithEmail({
                email,
                password: MD5(password).toString(),
            });
        } catch (err) {
            let errorMessage = '';
            if (err instanceof ApiCallError) {
                errorMessage = err.message;
            }
            setLoginFailedMessage(errorMessage || 'Something went wrong');
            return;
        }

        setLoginFailedMessage('');
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

                        {loginFailedMessage && (
                            <Text>{loginFailedMessage}</Text>
                        )}

                        <SubmitButton title='login' />
                    </>
                )}
            </Formik>
            <AppButton
                title={'Login with LinkedIn'}
                onPress={() => navigation.navigate('LinkedinLogin')}
            />
            {}
        </View>
    );
};

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
