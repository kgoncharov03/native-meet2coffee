import React, { useEffect, useRef, useState } from 'react';
import { View, ImageBackground, ActivityIndicator, Text } from 'react-native';
import CardStack, { Card } from 'react-native-card-stack-swiper';
import { City, Filters, CardItem } from '../components';
import styles from '../assets/styles';
import { unique } from '../utils/unique';
import { Api } from '../api';
import { Reaction } from '../typings/swipes';

const Home = () => {
    const [loading, setLoading] = useState<boolean>(true);

    const [matches, setMatches] = useState<any[]>([]);
    const [pending, setPending] = useState<boolean>(false);
    const swiper = useRef<CardStack | null>(null);
    const [empty, setEmpty] = useState(false);
    // const [swipedUsers, setSwipedUsers] = useState<Set<string>>(new Set());

    const fetchMatches = async () => {
        try {
            setPending(true);
            const data = await Api.matches({});
            const { specs } = data;
            if (specs.length == 0) {
                setPending(false);
                return;
            }
            setMatches((matches) => {
                return unique(
                    [
                        // Оставляем первые дву карточки (показанную карточку и ту, которая следующая за ней), чтобы избежать проблем с их отображением, если пользователь начал свайп
                        ...matches.slice(),
                        ...specs,
                    ],
                    'id'
                );
            });
        } catch (e) {
            // TODO: handle error properly
        }
        setPending(false);
    };

    const makeSwipe = (id: string, reaction: Reaction) => {
        Api.swipe({ id, reaction });
        if (!pending) {
            fetchMatches();
        }
    };

    useEffect(() => {
        setLoading(true);
        fetchMatches().then(() => {
            setLoading(false);
        });
    }, []);

    console.log('!!! matches.length:', matches.length);

    return (
        <ImageBackground
            source={require('../assets/images/bg.png')}
            style={styles.bg}
        >
            <View style={styles.containerHome}>
                <View style={styles.top}>
                    <City />
                    <Filters />
                </View>
                {loading ? (
                    <View
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexGrow: 1,
                        }}
                    >
                        <ActivityIndicator></ActivityIndicator>
                    </View>
                ) : (
                    <CardStack
                        onSwipedLeft={(idx) => {
                            makeSwipe(matches[idx].id, Reaction.Like);
                        }}
                        onSwipedRight={(idx) => {
                            makeSwipe(matches[idx].id, Reaction.Dislike);
                        }}
                        verticalSwipe={false}
                        renderNoMoreCards={() => {
                            return (
                                <View
                                    style={{
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        height: '100%',
                                    }}
                                >
                                    <Text>
                                        {pending
                                            ? 'Loading new cards'
                                            : 'No more cards for swiping'}
                                    </Text>
                                </View>
                            );
                        }}
                        ref={swiper}
                    >
                        {matches.map((item) => (
                            <Card key={item.id}>
                                <CardItem
                                    hasActions
                                    onLike={() => {
                                        swiper?.current?.swipeLeft();
                                    }}
                                    onDislike={() => {
                                        swiper?.current?.swipeRight();
                                    }}
                                    image={item.avatar}
                                    name={item.name}
                                    description={item.bio}
                                />
                            </Card>
                        ))}
                    </CardStack>
                )}
            </View>
        </ImageBackground>
    );
};

export default Home;
