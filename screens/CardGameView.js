import React, { useRef, useEffect } from "react";
import { StyleSheet, View, Text, Dimensions, Animated } from "react-native";
import Swiper from "react-native-deck-swiper";
import scenerios from "../scenerios/scenerios"
import colors from "../config/colors"
import ProgressBar from 'react-native-progress/Bar'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import AsyncStorage from '@react-native-community/async-storage'
import { useStateValue } from "../helpers/StateProvider"
import BottomNav from "./BottomNav"
import { Audio } from "expo-av"

export default function CardGameView({ navigation }) {
    console.disableYellowBox = true;
    const { width, height} = Dimensions.get('window');

    const soundEffectCardSwipe = useRef(new Audio.Sound()).current
    const soundEffectCardShuffle = useRef(new Audio.Sound()).current
    const [{ language, music, volume, days }, dispatch] = useStateValue();
    
    const [index, setIndex] = React.useState(0)
    const [p1, setP1] = React.useState(0.5)
    const [p2, setP2] = React.useState(0.5)
    const [p3, setP3] = React.useState(0.5)
    const [p4, setP4] = React.useState(0.5)

    const slideFromTopLeft = useRef(new Animated.Value(0)).current
    const [finished, setFinished] = React.useState(false)

    const onSwiped = (idx, direction) => {
        if (volume) {
            try {
                soundEffectCardSwipe.replayAsync()
            } catch (err) { console.log(err) }
        }

        setP1(p1 + scenerios[language][idx].onSwiped[direction].p1)
        setP2(p2 + scenerios[language][idx].onSwiped[direction].p2)
        setP3(p3 + scenerios[language][idx].onSwiped[direction].p3)
        setP4(p4 + scenerios[language][idx].onSwiped[direction].p4)
        setIndex((index + 1) % scenerios[language].length)

        if (scenerios[language][idx].days !== "random")
            dispatch({
                type: 'changeDays',
                newDays: days + scenerios[language][idx].days
            })
        else
            dispatch({
                type: 'changeDays',
                newDays: days + Math.floor(Math.random() * 30)
            })
        
        storeData("days", days.toString())

        const highScore = getData("high_score")
        if (highScore === null)
            storeData("high_score", days.toString())
        else if (days > parseInt(highScore))
            storeData("high_score", days.toString())
        
        // checkFullOrEmpty()
    }

    const checkFullOrEmpty = () => {
        const progresses = [p1, p2, p3, p4]

        progresses.forEach((p, idx) => {
            if (p >= 1) {
                storeData("days", "0")
                navigation.replace("GameOverView", { e: { p: idx, q: "full" }})
            } else if (p <= 0) {
                storeData("days", "0")
                navigation.replace("GameOverView", { e: { p: idx, q: "empty" } })
            }
        })
    }

    const getData = async (key) => {
        try {
            return await AsyncStorage.getItem(key)
        } catch(e) { console.log(e) }
    }

    const storeData = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, value)
        } catch (e) { console.log(e) }
    }

    const Card = ({ card }) => {
        return (
            <View style={styles.card}>
                { 
                    // card.image 
                }
                <FontAwesomeIcon icon={ faUserSecret } size={ 256 } color={colors.white} />
            </View>
        );
    }

    const AnimatedCard = ({ from }) => {
        return (
            <Animated.View
                style={{
                    transform: [{
                        translateX: slideFromTopLeft.interpolate({
                            inputRange: [0, 1],
                            outputRange: [from, 0]
                        }),
                        translateY: slideFromTopLeft.interpolate({
                            inputRange: [0, 1],
                            outputRange: [from, 0]
                        })
                    }],
                    height: "55%",
                    width: "80%",
                    borderRadius: 12,
                    backgroundColor: colors.black,
                    position: "absolute",
                    top: "27%"
            }} />
        );
    }

    const loadSwipeSound = async () => {
        try {
            await soundEffectCardSwipe.loadAsync(require("../assets/sound/effect/swipe_sound.mp3"))
        } catch(err) { console.log(err) }
    }

    const loadAndPlayShuffleSound = async () => {
        try {
            await soundEffectCardShuffle.loadAsync(require("../assets/sound/effect/card_deck_sound.mp3"))
            if (volume)
                await soundEffectCardShuffle.playAsync()
        } catch(err) { console.log(err) }
    }

    const start = async () => {
        loadAndPlayShuffleSound()

        return Animated.timing(slideFromTopLeft, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true
        }).start(async () => {
            setFinished(true)
            try {
                await music.loadAsync(require("../assets/sound/music/background_music.mp3"), { isLooping: true })
                await music.playAsync()
            } catch(err) { console.log(err) }
        })
    }

    useEffect(() => {
        loadSwipeSound()
        start()
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <View style={styles.progressContainer}>
                    <ProgressBar 
                        style={styles.progressBar} 
                        width={height * 8 / 100} 
                        height={8}
                        borderRadius={15}
                        color={colors.white}
                        progress={p1}
                    />
                </View>
                <View style={styles.progressContainer}>
                    <ProgressBar 
                        style={styles.progressBar} 
                        width={height * 8 / 100} 
                        height={8}
                        borderRadius={15}
                        color={colors.white}
                        progress={p2}
                    />
                </View>
                <View style={styles.progressContainer}>
                    <ProgressBar 
                        style={styles.progressBar} 
                        width={height * 8 / 100} 
                        height={8}
                        borderRadius={15}
                        color={colors.white}
                        progress={p3}
                    />
                </View>
                <View style={styles.progressContainer}>
                    <ProgressBar 
                        style={styles.progressBar} 
                        width={height * 8 / 100} 
                        height={8}
                        borderRadius={15}
                        color={colors.white}
                        progress={p4}
                    />
                </View>
            </View>
            <View style={styles.swiperContainer}>
                { finished && <Swiper
                    cards={scenerios[language]}
                    cardIndex={index}
                    renderCard={(card) => <Card card={card} />} 
                    onSwipedLeft={(idx) => onSwiped(idx, "left")}
                    onSwipedRight={(idx) => onSwiped(idx, "right")}
                    disableTopSwipe
                    disableBottomSwipe
                    animateCardOpacity
                    cardHorizontalMargin={width * 10 / 100}
                    stackSize={(scenerios[language].length >= 5 ? 5 : scenerios[language].length)}
                    infinite
                    backgroundColor={colors.white}
                    useViewOverflow={Platform.OS === 'ios'}
                    overlayLabels={{
                        left: {
                            title: scenerios[language][index].choices.left,
                            style: {
                                label: {
                                    color: colors.white,
                                    fontSize: 16
                                },
                                wrapper: {
                                    flexDirection: "column",
                                    alignItems: "flex-end",
                                    justifyContent: "flex-start",
                                    marginTop: height * 15 / 100,
                                    marginRight: width * 10 / 100
                                }
                            }
                        },
                        right: {
                            title: scenerios[language][index].choices.right,
                            style: {
                                label: {
                                    color: colors.white,
                                    fontSize: 16
                                },
                                wrapper: {
                                    flexDirection: "column",
                                    alignItems: "flex-start",
                                    justifyContent: "flex-start",
                                    marginTop: height * 15 / 100,
                                    marginLeft: width * 10 / 100
                                }
                            }
                        },
                    }}>
                    <Text style={styles.swiperText}>{scenerios[language][index].text}</Text>
                </Swiper> }
                { !finished && <AnimatedCard from={-600} /> }
                { !finished && <AnimatedCard from={-800} /> }
                { !finished && <AnimatedCard from={-1000} /> }
                { !finished && <AnimatedCard from={-1200} /> }
                { !finished && <AnimatedCard from={-1400} /> }
                { !finished && <AnimatedCard from={-1600} /> }
                { !finished && <AnimatedCard from={-1800} /> }
                { !finished && <AnimatedCard from={-2000} /> }
                { !finished && <AnimatedCard from={-2200} /> }
            </View>
            <View style={styles.bottomContainer}>
                <BottomNav navigation={navigation} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.black,
        justifyContent: "flex-end"
    },
    swiperContainer: {
        flex: 0.70,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.white
    },
    card: {
        marginTop: "30%",
        height: "50%",
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.black
    },
    topContainer: {
        flex: 0.20,
        flexDirection: 'row'
    },
    bottomContainer: {
        flex: 0.10,
        justifyContent: "center"
    },
    textWhite: {
        color: colors.white
    },
    swiperText: {
        color: colors.black,
        textAlign: "center",
        marginTop: 20,
        fontSize: 16
    },
    progressContainer: {
        flex: 0.25,
        alignItems: "center",
        justifyContent: "center"
    },
    progressBar: {
        transform: [{ rotate: '270deg'}],
    }
});
