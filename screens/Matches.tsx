import React, { useEffect, useState } from 'react';
import {
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    FlatList,
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

    console.log(state.connections);
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

                <FlatList
                    numColumns={2}
                    data={state.connections}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity>
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
