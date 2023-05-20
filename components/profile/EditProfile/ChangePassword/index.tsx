import React, { useState } from 'react';
import { styles } from './styles';
import { Button, Text, View } from 'react-native';
import { LabelledInput } from '../../../atoms/LabelledInput';
import { Api } from '../../../../api';
// @ts-ignore
import MD5 from 'crypto-js/md5';
import { ApiCallError } from '../../../../api/typings';

export const ChangePassword = ({ onSave }: { onSave: () => void }) => {
    const [inputData, setInputData] = useState({
        old: {
            value: '',
            error: '',
        },
        new: {
            value: '',
            error: '',
        },
        repeated: {
            value: '',
            error: '',
        },
        error: '',
    });

    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);

    const validateState = () => {
        const {
            new: { value: newValue },
            repeated: { value: repeatedValue },
        } = inputData;

        if (newValue !== repeatedValue) {
            setInputData((prevData) => ({
                ...prevData,
                repeated: {
                    ...prevData.repeated,
                    error: "Repeated password doesn't match",
                },
            }));
            return false;
        }
        if (newValue.length < 8) {
            setInputData((prevData) => ({
                ...prevData,
                new: {
                    ...prevData.new,
                    error: 'Password length should be more than 8 symbols',
                },
            }));
            return false;
        }
        return true;
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            if (!validateState()) {
                setSaving(false);
                return;
            }
            await Api.reset({
                oldPassword: MD5(inputData.old.value).toString(),
                newPassword: MD5(inputData.new.value).toString(),
            });
            setSuccess(true);
        } catch (err) {
            setInputData((prevData) => ({
                ...prevData,
                error: (err as ApiCallError).message || 'Something went wrong!',
            }));
            // TODO handle error properly
        }
        setSaving(false);
    };

    return (
        <View style={styles.wrapper}>
            {success ? (
                <View
                    style={{
                        height: 100,
                        borderRadius: 5,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Text
                        style={{
                            fontSize: 20,
                        }}
                    >
                        Your password saved successfully!
                    </Text>
                    <Button onPress={onSave} title='Close'></Button>
                </View>
            ) : (
                <>
                    <LabelledInput
                        label='Old password'
                        textContentType='password'
                        value={inputData.old.value}
                        styles={{ input: styles.input }}
                        secureTextEntry={true}
                        onChangeText={(value) => {
                            setInputData((prevData) => ({
                                ...prevData,
                                old: {
                                    value,
                                    error: '',
                                },
                                error: '',
                            }));
                        }}
                    ></LabelledInput>
                    <LabelledInput
                        label='New password'
                        textContentType='password'
                        value={inputData.new.value}
                        styles={{ input: styles.input }}
                        secureTextEntry={true}
                        error={inputData.new.error}
                        onChangeText={(value) => {
                            setInputData((prevData) => ({
                                ...prevData,
                                new: {
                                    value,
                                    error: '',
                                },
                                error: '',
                            }));
                        }}
                    ></LabelledInput>
                    <LabelledInput
                        label='Repeat new password'
                        textContentType='password'
                        value={inputData.repeated.value}
                        styles={{ input: styles.input }}
                        secureTextEntry={true}
                        error={inputData.repeated.error}
                        onChangeText={(value) => {
                            setInputData((prevData) => ({
                                ...prevData,
                                repeated: {
                                    value,
                                    error: '',
                                },
                                error: '',
                            }));
                        }}
                    ></LabelledInput>
                    {inputData.error ? (
                        <Text style={{ color: 'red', alignSelf: 'center' }}>
                            {inputData.error}
                        </Text>
                    ) : null}
                    <Button
                        disabled={saving}
                        title='Save changes'
                        onPress={handleSave}
                    ></Button>
                </>
            )}
        </View>
    );
};
