import React, { useRef, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Animated } from "react-native";
import Swiper from "react-native-deck-swiper";
import scenerios from "../scenerios/scenerios"
import colors from "../config/colors"
import lang from "../config/lang"
import ProgressBar from 'react-native-progress/Bar'
import { faHammer, faTrain, faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import AsyncStorage from '@react-native-community/async-storage'

export default function CardGameView({ navigation }) {
    console.disableYellowBox = true;
    const { width, height} = Dimensions.get('window');

    const [index, setIndex] = React.useState(0)
    const [p1, setP1] = React.useState(0.5)
    const [p2, setP2] = React.useState(0.5)
    const [p3, setP3] = React.useState(0.5)
    const [p4, setP4] = React.useState(0.5)
    const [days, setDays] = React.useState(0)

    const slideFromTopLeft = useRef(new Animated.Value(0)).current
    const [finished, setFinished] = React.useState(false)

    const onSwiped = (idx, direction) => {
        setP1(p1 + scenerios[global.language || 'en'][idx].onSwiped[direction].p1)
        setP2(p2 + scenerios[global.language || 'en'][idx].onSwiped[direction].p2)
        setP3(p3 + scenerios[global.language || 'en'][idx].onSwiped[direction].p3)
        setP4(p4 + scenerios[global.language || 'en'][idx].onSwiped[direction].p4)
        setIndex((index + 1) % scenerios[global.language || 'en'].length)

        if (scenerios[global.language || 'en'][idx].days !== "random")
            setDays(days + scenerios[global.language || 'en'][idx].days)
        else
            setDays(days + Math.floor(Math.random() * 30))
        
        storeData("days", days.toString())

        const highScore = getData("high_score")
        if (highScore === null)
            storeData("high_score", days.toString())
        else if (days > parseInt(highScore))
            storeData("high_score", days.toString())
        
        checkFullOrEmpty()
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

    const convertYear = (days) => {
        const dayText = lang[global.language || 'en'].bottomNav.day
        const yearText = lang[global.language || 'en'].bottomNav.year

        if (days < 365)
            return dayText + " " + days
        else return yearText + " " + Math.floor(days / 365) + " " + dayText + " " + days % 365
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

    const start = () => {
        return Animated.timing(slideFromTopLeft, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true
        }).start(() => setFinished(true))
    }

    const getSavedData = async () => {
        const savedDays = await getData("days")
        if (savedDays !== NaN && parseInt(savedDays) !== 0)
            setDays(parseInt(savedDays))
    }

    useEffect(() => {
        start()
        getSavedData()
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
                    cards={scenerios[global.language || 'en']}
                    cardIndex={index}
                    renderCard={(card) => <Card card={card} />} 
                    onSwipedLeft={(idx) => onSwiped(idx, "left")}
                    onSwipedRight={(idx) => onSwiped(idx, "right")}
                    disableTopSwipe
                    disableBottomSwipe
                    animateCardOpacity
                    cardHorizontalMargin={width * 10 / 100}
                    stackSize={(scenerios[global.language || 'en'].length >= 5 ? 5 : scenerios[global.language || 'en'].length)}
                    infinite
                    backgroundColor={colors.white}
                    useViewOverflow={Platform.OS === 'ios'}
                    overlayLabels={{
                        left: {
                            title: scenerios[global.language || 'en'][index].choices.left,
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
                            title: scenerios[global.language || 'en'][index].choices.right,
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
                    <Text style={styles.swiperText}>{scenerios[global.language || 'en'][index].text}</Text>
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
                <TouchableOpacity style={styles.buttonLeft} onPress={() => navigation.navigate("PeopleView")}>
                    <FontAwesomeIcon icon={ faTrain } size={ 32 } color={colors.white} />
                </TouchableOpacity>
                <View style={styles.daysPanel}>
                    <Text style={styles.textWhite}>{convertYear(days)}</Text>
                </View>
                <TouchableOpacity style={styles.buttonRight} onPress={() => navigation.navigate("SettingsView")}>
                    <FontAwesomeIcon icon={ faHammer } size={ 32 } color={colors.white} />
                </TouchableOpacity>
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
        flexDirection: 'row',
        justifyContent: "space-evenly"
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
    },
    buttonLeft: {
        width: "25%",
        justifyContent: "center",
        alignItems: "center",
        borderRightColor: colors.white,
        borderWidth: 1
    },
    daysPanel: {
        width: "50%",
        justifyContent: "center",
        alignItems: "center",
        borderLeftColor: colors.white,
        borderRightColor: colors.white,
        borderWidth: 1
    },
    buttonRight: {
        width: "25%",
        justifyContent: "center",
        alignItems: "center",
        borderLeftColor: colors.white,
        borderWidth: 1
    }
});
