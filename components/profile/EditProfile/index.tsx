import React, { useEffect, useState } from 'react';
import { Button, View } from 'react-native';
import { LabelledInput } from '../../atoms/LabelledInput';
import { styles } from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Modal } from '../../atoms/Modal';
import { ChangePassword } from './ChangePassword';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/reducers';
import { Api } from '../../../api';
import { useNavigation } from '@react-navigation/native';
import { DeleteProfile } from './DeleteProfile';

export const EditProfile = () => {
    const navigation = useNavigation();
    const defaultValues = useSelector((state: RootState) => state!.user!.spec);
    const initialData = Object.assign({}, defaultValues);
    const [inputData, setInputData] = useState<
        Record<string, { value: string; error: string }>
    >({
        headline: {
            value: initialData.headline || '',
            error: '',
        },
        bio: {
            value: initialData.bio || '',
            error: '',
        },
        company: {
            value: initialData.displayedCompany || '',
            error: '',
        },
    });

    const [saveDisabled, setSaveDisabled] = useState(true);
    const [showChangePasswordModal, setShowChangePasswordModal] =
        useState(false);
    const [showDeleteProfileModal, setShowDeleteProfileModal] = useState(false);

    useEffect(() => {
        const { headline, bio, company } = inputData;
        setSaveDisabled(
            headline.value === initialData.headline &&
                bio.value === initialData.bio &&
                company.value === initialData.displayedCompany
        );
    }, [
        inputData.headline.value,
        inputData.bio.value,
        inputData.company.value,
    ]);

    const handleSave = async () => {
        setSaveDisabled(true);
        try {
            const { headline, company: displayedCompany, bio } = inputData;
            await Api.update({
                headline: headline.value,
                bio: bio.value,
                displayedCompany: displayedCompany.value,
            });
            navigation.navigate('MainProfile');
        } catch (e) {
            // TODO: handle error properly
        }
        setSaveDisabled(false);
    };

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
            {showDeleteProfileModal ? (
                <Modal onClose={() => setShowDeleteProfileModal(false)}>
                    <DeleteProfile />
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
                <Button
                    color='red'
                    title='Delete profile'
                    onPress={() => {
                        setShowDeleteProfileModal(true);
                    }}
                ></Button>
            </View>
        </SafeAreaView>
    );
};
