import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import AppTextInput from './AppTextInput';
import { useFormikContext } from 'formik';
import AppText from './AppText';

export default function AppFormField({ name, ...otherProps }) {
    const {
        setFieldTouched,
        handleChange,
        errors,
        touched,
        values,
        setFieldValue,
    } = useFormikContext();

    return (
        <>
            <AppTextInput
                {...otherProps}
                value={values[name]}
                onChangeText={(text) => setFieldValue(name, text)}
                onEndEditing={() => setFieldTouched(name)}
            />

            {touched[name] && (
                <AppText style={{ color: 'red' }}>{errors[name]}</AppText>
            )}
        </>
    );
}
