import React from 'react';
import { styles as selfStyles } from './styles';
import { View, Text, ViewStyle, TextInput, TextInputProps } from 'react-native';

type LabelledInputProps = {
    styles?: { wrapper?: ViewStyle; input?: ViewStyle };
    label?: string;
    value?: string;
    placeholder?: string;
    onChangeText: (s: string) => void;
    error?: string;
} & TextInputProps;

export const LabelledInput = ({
    styles,
    label,
    value,
    placeholder,
    onChangeText,
    error,
    ...rest
}: LabelledInputProps) => {
    return (
        <View
            style={{
                ...selfStyles.container,
                ...styles?.wrapper,
            }}
        >
            {label ? <Text style={selfStyles.label}>{label}</Text> : null}
            <TextInput
                style={{ ...selfStyles.input, ...styles?.input }}
                placeholder={placeholder}
                onChangeText={onChangeText}
                {...rest}
            >
                {value}
            </TextInput>
            {error ? <Text style={selfStyles.error}>{error}</Text> : null}
        </View>
    );
};
