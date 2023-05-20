import React, { useEffect, useState } from 'react';
import {
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    FlatList,
    Modal,
} from 'react-native';
import { CardItem, Icon } from '../components';
import DEMO from '../assets/data/demo';
import styles, { DARK_GRAY } from '../assets/styles';
import { boolean } from 'yup';
import { Api } from '../api';

const Matches = () => {
    const [state, setState] = useState<{
        loading: boolean;
        connections: any[];
    }>({ loading: true, connections: [] });

    const [modal, setModal] = useState(null);

    const fetchConnections = async () => {
        try {
            const { specs, total } = (await Api.connections({})) as any;
            setState({
                loading: false,
                connections: specs,
            });
        } catch (e) {
            // TODO: handle error
            setState({
                ...state,
                loading: false,
            });
        }
    };

    useEffect(() => {
        fetchConnections();
    }, []);

    return (
        <ImageBackground
            // source={require('../assets/images/bg.png')}
            style={styles.bg}
        >
            <View style={styles.containerMatches}>
                <View style={styles.top}>
                    <Text style={styles.title}>Matches</Text>
                    <TouchableOpacity>
                        <Icon
                            name='ellipsis-vertical'
                            color={DARK_GRAY}
                            size={20}
                        />
                    </TouchableOpacity>
                </View>

                {modal ? (
                    <Modal
                        onRequestClose={() => {
                            setModal(null);
                        }}
                        animationType='none'
                        transparent
                    >
                        <TouchableOpacity
                            style={{
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                flexDirection: 'row',
                            }}
                            activeOpacity={1}
                            onPress={() => setModal(null)}
                        >
                            <TouchableOpacity
                                activeOpacity={1}
                                style={{
                                    width: '100%',
                                    position: 'relative',
                                    marginTop: '-30%',
                                    paddingBottom: 10,
                                }}
                            >
                                <CardItem
                                    image={modal.avatar}
                                    name={modal.name}
                                    headline={modal.headline}
                                    bio={modal.bio}
                                    displayedCompany={modal.displayedCompany}
                                    id={modal.id}
                                    hasChatLink
                                    closeModal={() => setModal(null)}
                                    // isOnline={item.isOnline}
                                />
                            </TouchableOpacity>
                        </TouchableOpacity>
                    </Modal>
                ) : null}
                <FlatList
                    numColumns={2}
                    data={state.connections}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => {
                                setModal(item);
                            }}
                        >
                            <CardItem
                                image={item.avatar}
                                name={item.name}
                                // isOnline={item.isOnline}
                                hasVariant
                            />
                        </TouchableOpacity>
                    )}
                />
            </View>
        </ImageBackground>
    );
};

export default Matches;
