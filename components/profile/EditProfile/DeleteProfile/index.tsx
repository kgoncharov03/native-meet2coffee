import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { Api } from '../../../../api';

export const DeleteProfile = () => {
    const handleDelete = async () => {
        setButtonDisabled(true);
        try {
            await Api.remove({});
        } catch (err) {
            // TODO: handle error properly
        }
        setButtonDisabled(false);
    };

    const [buttonDisabled, setButtonDisabled] = useState(false);

    return (
        <View
            style={{
                height: 150,
                justifyContent: 'space-around',
                backgroundColor: '#fff',
                borderRadius: 5,
                padding: 10,
            }}
        >
            <Text style={{ fontSize: 16 }}>
                Attention! You will lost all personal data and information about
                your previous matches.
            </Text>
            <Button
                disabled={buttonDisabled}
                color='red'
                title='Delete my profile'
                onPress={handleDelete}
            ></Button>
        </View>
    );
};
