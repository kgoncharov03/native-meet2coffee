import React, { useEffect, useState } from 'react';
import { Button, View } from 'react-native';
import { LabelledInput } from '../../atoms/LabelledInput';
import { styles } from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Modal } from '../../atoms/Modal';
import { ChangePassword } from './ChangePassword';

type EditProfileProps = {
    defaultValues: {
        headline?: string;
        displayedCompany?: string;
        bio?: string;
    };
};

export const EditProfile = ({ defaultValues }: EditProfileProps) => {
    const [inputData, setInputData] = useState<
        Record<string, { value: string; error: string }>
    >({
        headline: {
            value: defaultValues.headline || '',
            error: '',
        },
        bio: {
            value: defaultValues.bio || '',
            error: '',
        },
        company: {
            value: defaultValues.displayedCompany || '',
            error: '',
        },
    });

    const [saveDisabled, setSaveDisabled] = useState(true);
    const [showChangePasswordModal, setShowChangePasswordModal] =
        useState(false);

    useEffect(() => {
        const { headline, bio, company } = inputData;
        setSaveDisabled(
            headline.value === defaultValues.headline &&
                bio.value === defaultValues.bio &&
                company.value === defaultValues.displayedCompany
        );
    }, [
        inputData.headline.value,
        inputData.bio.value,
        inputData.company.value,
    ]);

    const handleSave = () => {};

    const { headline, bio, company } = inputData;
    return (
        <SafeAreaView style={styles.container}>
            {showChangePasswordModal ? (
                <Modal onClose={() => setShowChangePasswordModal(false)}>
                    <ChangePassword
                        onSave={() => setShowChangePasswordModal(false)}
                    />
                </Modal>
            ) : null}
            <LabelledInput
                value={headline.value}
                label='Headline:'
                error={headline.error}
                onChangeText={(value) => {
                    setInputData((prevData) => ({
                        ...prevData,
                        headline: {
                            value,
                            error: '',
                        },
                    }));
                }}
            ></LabelledInput>
            <LabelledInput
                value={company.value}
                label='Company:'
                error={company.error}
                onChangeText={(value) => {
                    setInputData((prevData) => ({
                        ...prevData,
                        company: {
                            value,
                            error: '',
                        },
                    }));
                }}
            ></LabelledInput>
            <LabelledInput
                value={bio.value}
                label='Bio:'
                error={bio.error}
                multiline={true}
                numberOfLines={5}
                maxLength={140}
                onChangeText={(value) => {
                    setInputData((prevData) => ({
                        ...prevData,
                        bio: {
                            value,
                            error: '',
                        },
                    }));
                }}
                styles={{
                    input: {
                        height: 140,
                    },
                }}
            ></LabelledInput>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                <Button
                    onPress={handleSave}
                    title='Save changes'
                    disabled={saveDisabled}
                ></Button>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Button
                    title='Change password'
                    onPress={() => {
                        setShowChangePasswordModal(true);
                    }}
                ></Button>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Button color='red' title='Delete profile'></Button>
            </View>
        </SafeAreaView>
    );
};
