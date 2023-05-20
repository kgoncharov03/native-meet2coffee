import React from 'react';
import { Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import Icon from './Icon';
import { CardItemT } from '../types';
import styles, {
    DISLIKE_ACTIONS,
    FLASH_ACTIONS,
    LIKE_ACTIONS,
    STAR_ACTIONS,
    WHITE,
} from '../assets/styles';
import { useNavigation } from '@react-navigation/native';

export const CardItem = ({
    bio,
    headline,
    displayedCompany,
    hasActions,
    onLike,
    onDislike,
    hasVariant,
    hasChatLink,
    id,
    image,
    isOnline,
    matches,
    name,
    closeModal,
}: CardItemT) => {
    // Custom styling
    const fullWidth = Dimensions.get('window').width;

    const navigation = useNavigation();

    const imageStyle = [
        {
            borderRadius: 8,
            width: hasVariant ? fullWidth / 2 - 30 : fullWidth - 80,
            height: hasVariant ? 170 : 350,
            margin: hasVariant ? 0 : 20,
        },
    ];

    const nameStyle = [
        {
            paddingTop: hasVariant ? 5 : 10,
            paddingBottom: 5,
            color: '#363636',
            fontSize: hasVariant ? 15 : 30,
        },
    ];

    return (
        <View style={styles.containerCardItem}>
            {/* IMAGE */}
            <Image source={{ uri: image }} style={imageStyle} />

            {/* MATCHES */}
            {matches && (
                <View style={styles.matchesCardItem}>
                    <Text style={styles.matchesTextCardItem}>
                        <Icon name='heart' color={WHITE} size={13} /> {matches}%
                        Match!
                    </Text>
                </View>
            )}

            {/* NAME */}
            <Text style={nameStyle}>{name}</Text>

            {/* DESCRIPTION */}
            {(bio || headline || displayedCompany) && (
                <View style={styles.aboutSection}>
                    <View style={styles.aboutBlock}>
                        <Text style={styles.blockIcon}>💼</Text>
                        <Text style={styles.blockText}>{headline}</Text>
                    </View>
                    <View style={styles.aboutBlock}>
                        <Text style={styles.blockIcon}>👔</Text>
                        <Text style={styles.blockText}>{displayedCompany}</Text>
                    </View>
                    <View style={{ ...styles.aboutBlock, marginBottom: 0 }}>
                        <Text style={styles.blockIcon}>📌</Text>
                        <Text style={styles.blockText}>{bio}</Text>
                    </View>
                </View>
            )}

            {/* STATUS */}
            {/* {!description && (
                <View style={styles.status}>
                    <View style={isOnline ? styles.online : styles.offline} />
                    <Text style={styles.statusText}>
                        {isOnline ? 'Online' : 'Offline'}
                    </Text>
                </View>
            )} */}
            {hasChatLink ? (
                <View style={styles.actionsCardItem}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            console.log('!!! id:', id);
                            navigation.navigate('Chat', {
                                screen: 'MessageList',
                                params: {
                                    id,
                                },
                            });
                            closeModal && closeModal();
                        }}
                    >
                        <Icon name='chatbox' color={LIKE_ACTIONS} size={25} />
                    </TouchableOpacity>
                </View>
            ) : null}

            {/* ACTIONS */}
            {hasActions && (
                <View style={styles.actionsCardItem}>
                    <TouchableOpacity style={styles.miniButton}>
                        <Icon name='star' color={STAR_ACTIONS} size={14} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={onLike}>
                        <Icon name='heart' color={LIKE_ACTIONS} size={25} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={onDislike}>
                        <Icon name='close' color={DISLIKE_ACTIONS} size={25} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.miniButton}>
                        <Icon name='flash' color={FLASH_ACTIONS} size={14} />
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};
