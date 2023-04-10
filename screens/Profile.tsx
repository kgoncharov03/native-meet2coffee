import React from 'react';
import {
    ScrollView,
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
} from 'react-native';
import { Icon, ProfileItem } from '../components';
import DEMO from '../assets/data/demo';
import styles, { WHITE } from '../assets/styles';

import { useContext } from 'react';
import { apiClient } from '../api/client';
import { useSelector } from 'react-redux';
import { User } from '../api/typings';
import { RootState } from '../redux/reducers';
import { Api } from '../api';

const Profile = () => {
    const user = useSelector((state: RootState) => state.user);
    const handleLogOut = async () => {
        await Api.logout();
    };

    const { name, avatar, headline, bio, displayedCompany, manualGeo } =
        user!.spec;

    return (
        <ImageBackground
            source={require('../assets/images/bg.png')}
            style={styles.bg}
        >
            <ScrollView style={styles.containerProfile}>
                <ImageBackground source={{ uri: avatar }} style={styles.photo}>
                    <View style={styles.top}>
                        <TouchableOpacity>
                            <Icon
                                name='chevron-back'
                                size={20}
                                color={WHITE}
                                style={styles.topIconLeft}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <Icon
                                name='ellipsis-vertical'
                                size={20}
                                color={WHITE}
                                style={styles.topIconRight}
                            />
                        </TouchableOpacity>
                    </View>
                </ImageBackground>

                <ProfileItem
                    matches={'80'}
                    name={name}
                    location={manualGeo}
                    info1={headline}
                    info2={bio}
                />

                <View style={styles.actionsProfile}>
                    <TouchableOpacity style={styles.circledButton}>
                        <Icon
                            name='ellipsis-horizontal'
                            size={20}
                            color={WHITE}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.roundedButton}
                        onPress={handleLogOut}
                    >
                        <Text style={styles.textButton}>Log Out</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </ImageBackground>
    );
};

export default Profile;
