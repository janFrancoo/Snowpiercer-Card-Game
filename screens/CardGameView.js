import React, { useRef, useEffect } from "react";
import { StyleSheet, View, Text, Dimensions, Image, Animated } from "react-native";
import Swiper from "react-native-deck-swiper";
import scenerios from "../scenerios/scenerios"
import colors from "../config/colors"
import text from "../config/text"
import MaskedView from '@react-native-community/masked-view'
import { useStateValue } from "../helpers/StateProvider"
import BottomNav from "./BottomNav"
import { Audio } from "expo-av"
import { getData, storeData, removeData } from "../helpers/storage_helper"
import people from "../scenerios/people"
import { characterImages } from '../helpers/character_images'
import { getScenerioIndexById } from "../helpers/scenerio_helper"
import ReactInterval from "react-interval"

export default function CardGameView({ navigation }) {
    console.disableYellowBox = true;
    const { width, height} = Dimensions.get('window');
    let specialEventInterval

    const soundEffectCardSwipe = useRef(new Audio.Sound()).current
    const soundEffectCardShuffle = useRef(new Audio.Sound()).current
    const [{ language, music, musicStatus, volume, days }, dispatch] = useStateValue();
    
    const [index, setIndex] = React.useState(0)
    const [p1, setP1] = React.useState(0.5)
    const [p2, setP2] = React.useState(0.5)
    const [p3, setP3] = React.useState(0.5)
    const [p4, setP4] = React.useState(0.5)
    const [secret, setSecret] = React.useState(0)
    const [tailorRebel, setTailorRebel] = React.useState(0)
    const [nightCarRebel, setNightCarLRebel] = React.useState(0)
    const [cardQueue, setCardQueue] = React.useState([])
    const [specialEvent, setSpecialEvent] = React.useState("")
    const cardLimit = 79

    const slideFromTopLeft = useRef(new Animated.Value(0)).current
    const p1bar = useRef(new Animated.Value(0.5)).current
    const p2bar = useRef(new Animated.Value(0.5)).current
    const p3bar = useRef(new Animated.Value(0.5)).current
    const p4bar = useRef(new Animated.Value(0.5)).current
    const textFade = useRef(new Animated.Value(0)).current
    const [finished, setFinished] = React.useState(false)

    const onSwiped = (idx, direction) => {
        if (volume) {
            try {
                soundEffectCardSwipe.replayAsync()
            } catch (err) { }
        }

        setP1(p1 + scenerios[language][index].onSwiped[direction].p1)
        setP2(p2 + scenerios[language][index].onSwiped[direction].p2)
        setP3(p3 + scenerios[language][index].onSwiped[direction].p3)
        setP4(p4 + scenerios[language][index].onSwiped[direction].p4)

        const addSecret = scenerios[language][index].onSwiped[direction].secret
        const addTailorRebel = scenerios[language][index].onSwiped[direction].tailorRebel
        const addNightCarRebel = scenerios[language][index].onSwiped[direction].nightCarRebel

        setSecret(addSecret != -100 ? secret + addSecret : addSecret)
        setTailorRebel(addTailorRebel != -100 ? tailorRebel + addTailorRebel : addTailorRebel)
        setNightCarLRebel(addNightCarRebel != -100 ?  nightCarRebel + addNightCarRebel : addNightCarRebel)

        if (scenerios[language][index].onSwiped[direction].nextCard != "random") {
            const addCards = []
            for (let i=0; i<scenerios[language][index].onSwiped[direction].nextCard.after; i++)
                addCards.push(Math.floor(Math.random() * cardLimit))
            addCards.push(getScenerioIndexById(scenerios[language][index].onSwiped[direction].nextCard.id))
            setCardQueue([...cardQueue, ...addCards])
        }

        if (cardQueue.length == 0)
            setIndex(Math.floor(Math.random() * cardLimit))
        else {
            const newQueue = cardQueue.slice()
            const newIndex = newQueue.shift()
            setCardQueue(newQueue)
            setIndex(newIndex)
        }

        Animated.parallel([
            Animated.timing(p1bar, {
                toValue: p1 + scenerios[language][index].onSwiped[direction].p1,
                duration: 500,
                useNativeDriver: false
            }),
            Animated.timing(p2bar, {
                toValue: p2 + scenerios[language][index].onSwiped[direction].p2,
                duration: 500,
                useNativeDriver: false
            }),
            Animated.timing(p3bar, {
                toValue: p3 + scenerios[language][index].onSwiped[direction].p3,
                duration: 500,
                useNativeDriver: false
            }),
            Animated.timing(p4bar, {
                toValue: p4 + scenerios[language][index].onSwiped[direction].p4,
                duration: 500,
                useNativeDriver: false
            })
        ]).start()

        let newDays = days + Math.floor(Math.random() * 30)

        dispatch({
            type: 'changeDays',
            newDays: days + Math.floor(Math.random() * 30)
        })
        
        storeData("days", newDays.toString())
        storeData("p1", p1.toString())
        storeData("p2", p2.toString())
        storeData("p3", p3.toString())
        storeData("p4", p4.toString())
        storeData("secret", secret.toString())
        storeData("tailorRebel", tailorRebel.toString())
        storeData("nightCarRebel", nightCarRebel.toString())

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
                resetProgress()
                navigation.replace("GameOverView", { e: { p: idx, q: "full" }})
            } else if (p <= 0) {
                resetProgress()
                navigation.replace("GameOverView", { e: { p: idx, q: "empty" } })
            }
        })

        if (specialEvent == "") {
            if (secret >= 100) {
                setSpecialEvent("secret")
    
                const addCards = []
                for (let i=0; i<10; i++)
                    addCards.push(Math.floor(Math.random() * cardLimit))
                addCards.push(getScenerioIndexById("1011"))
                setCardQueue([...cardQueue, ...addCards])
    
                specialEventAnimation("start")
            } else if (tailorRebel >= 100) {
                setSpecialEvent("tailorRebel")
    
                const addCards = []
                for (let i=0; i<12; i++)
                    addCards.push(Math.floor(Math.random() * cardLimit))
                addCards.push(getScenerioIndexById("1014"))
                setCardQueue([...cardQueue, ...addCards])
    
                specialEventAnimation("start")
            } else if (nightCarRebel >= 100) {
                setSpecialEvent("nightCarRebel")
    
                const addCards = []
                for (let i=0; i<8; i++)
                    addCards.push(Math.floor(Math.random() * cardLimit))
                addCards.push(getScenerioIndexById("1013"))
                setCardQueue([...cardQueue, ...addCards])
    
                specialEventAnimation("start")
            }
        }

        if (secret == -100 || tailorRebel == -100 || nightCarRebel == -100) {
            setSpecialEvent("")
            specialEventAnimation("stop")
        }
    }

    const specialEventAnimation = (command) => {
        if (command == "start") {
            specialEventInterval = setInterval(() => {                
                Animated.sequence([
                    Animated.timing(textFade, {
                        toValue: 1,
                        duration: 500 ,
                        useNativeDriver: false
                    }),
                    Animated.timing(textFade, {
                        toValue: 0,
                        duration: 500,
                        useNativeDriver: false
                    })
                ]).start()
            }, 1500)
        } else {
            clearInterval(specialEventInterval)
        }
    }

    const specialEventDecreaseProgress = () => {
        setP1(p1 - 0.01)
        setP2(p2 - 0.01)
        setP3(p3 - 0.01)
        setP4(p4 - 0.01)

        Animated.parallel([
            Animated.timing(p1bar, {
                toValue: p1 - 0.01,
                duration: 500,
                useNativeDriver: false
            }),
            Animated.timing(p2bar, {
                toValue: p2 - 0.01,
                duration: 500,
                useNativeDriver: false
            }),
            Animated.timing(p3bar, {
                toValue: p3 - 0.01,
                duration: 500,
                useNativeDriver: false
            }),
            Animated.timing(p4bar, {
                toValue: p4 - 0.01,
                duration: 500,
                useNativeDriver: false
            })
        ]).start()
    }

    const resetProgress = () => {
        removeData("days")
        removeData("p1")
        removeData("p2")
        removeData("p3")
        removeData("p4")
        removeData("secret")
        removeData("tailorRebel")
        removeData("nightCarRebel")
    }

    const Card = ({ card }) => {
        return (
            <View style={styles.card}>
                <Image source={characterImages[people[language][parseInt(scenerios[language][index].person)].image].uri} 
                    resizeMode="cover" style={styles.cardImage} />
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

    const loadProgress = async() => {
        const savedP1 = await getData("p1")
        if (savedP1 !== null) {
            setP1(parseFloat(savedP1))
            p1bar.setValue(parseFloat(savedP1))
        }
        
        const savedP2 = await getData("p2")
        if (savedP2 !== null) {
            setP1(parseFloat(savedP2))
            p2bar.setValue(parseFloat(savedP2))
        }
        
        const savedP3 = await getData("p3")
        if (savedP1 !== null) {
            setP3(parseFloat(savedP3))
            p3bar.setValue(parseFloat(savedP3))
        }
        
        const savedP4 = await getData("p4")
        if (savedP4 !== null) {
            setP1(parseFloat(savedP4))
            p4bar.setValue(parseFloat(savedP4))
        }

        const savedSecret = await getData("secret")
        if (savedSecret !== null)
            setSecret(parseInt(savedSecret))

        const savedTailorRebel = await getData("tailorRebel")
        if (savedTailorRebel !== null)
            setSecret(parseInt(savedTailorRebel))

        const savedNightCarRebel = await getData("nightCarRebel")
        if (savedNightCarRebel !== null)
            setSecret(parseInt(savedNightCarRebel))
    }

    const loadSwipeSound = async () => {
        try {
            await soundEffectCardSwipe.loadAsync(require("../assets/sound/effect/swipe_sound.mp3"))
        } catch(err) { }
    }

    const loadAndPlayShuffleSound = async () => {
        try {
            await soundEffectCardShuffle.loadAsync(require("../assets/sound/effect/card_deck_sound.mp3"))
            if (volume)
                await soundEffectCardShuffle.playAsync()
        } catch(err) { }
    }

    const start = async () => {
        loadAndPlayShuffleSound()

        return Animated.timing(slideFromTopLeft, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true
        }).start(async () => {
            setFinished(true)
            if (musicStatus) {
                try {
                    await music.loadAsync(require("../assets/sound/music/background_music.mp3"), { isLooping: true })
                    await music.playAsync()
                } catch(err) { }
            }
        })
    }

    useEffect(() => {
        setIndex(Math.floor(Math.random() * cardLimit))
        loadProgress()
        loadSwipeSound()
        start()
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <View style={styles.progressContainer}>
                    <MaskedView style={styles.maskedView} maskElement={
                        <View style={styles.progressImageContainer}>
                            <Image style={styles.progressImage} source={require("../assets/images/progress/energy.png")} />
                        </View>
                    }>
                        <Image style={[styles.progressImage, { position: "absolute" }]} source={require("../assets/images/progress/energy.png")} />
                        <Animated.View style={[styles.mask, { height: p1bar.interpolate({
                            inputRange: [0, 1],
                            outputRange: ["45%", "82%"]
                        }) }]} />
                    </MaskedView>
                    <MaskedView style={styles.maskedView} maskElement={
                        <View style={styles.progressImageContainer}>
                            <Image style={styles.progressImage} source={require("../assets/images/progress/food.png")} />
                        </View>
                    }>
                        <Image style={[styles.progressImage, { position: "absolute" }]} source={require("../assets/images/progress/food.png")} />
                        <Animated.View style={[styles.mask, { height: p2bar.interpolate({
                            inputRange: [0, 1],
                            outputRange: ["50%", "76%"]
                        }) }]} />
                    </MaskedView>
                    <MaskedView style={styles.maskedView} maskElement={
                        <View style={styles.progressImageContainer}>
                            <Image style={styles.progressImage} source={require("../assets/images/progress/forces.png")} />
                        </View>
                    }>
                        <Image style={[styles.progressImage, { position: "absolute" }]} source={require("../assets/images/progress/forces.png")} />
                        <Animated.View style={[styles.mask, { height: p3bar.interpolate({
                            inputRange: [0, 1],
                            outputRange: ["45%", "85%"]
                        }) }]} />
                    </MaskedView>
                    <MaskedView style={styles.maskedView} maskElement={
                        <View style={styles.progressImageContainer}>
                            <Image style={styles.progressImage} source={require("../assets/images/progress/classes.png")} />
                        </View>
                    }>
                        <Image style={[styles.progressImage, { position: "absolute" }]} source={require("../assets/images/progress/classes.png")} />
                        <Animated.View style={[styles.mask, { height: p4bar.interpolate({
                            inputRange: [0, 1],
                            outputRange: ["45%", "80%"]
                        }) }]} />
                    </MaskedView>
                </View>
                <Animated.View style={[styles.specialEventView, { opacity: textFade }]}>
                    <Text style={styles.specialEventText}>
                        { specialEvent != "" && text[language].inGame.specialEvents[specialEvent] }
                    </Text>
                </Animated.View>
                <ReactInterval timeout={2000} enabled={specialEvent != ""}
                    callback={() => specialEventDecreaseProgress()} />
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
        alignItems: "center",
    },
    progressContainer: {
        flex: 0.9,
        flexDirection: 'row',
        justifyContent: "center",
        paddingTop: "5%"
    },
    specialEventView: {
        marginBottom: "2%"
    },
    specialEventText: {
        color: colors.red,
        fontSize: 14,
        fontWeight: "bold"
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
    maskedView: { 
        flex: 1, 
        flexDirection: 'row', 
        height: '100%'
    },
    progressImageContainer: {
        backgroundColor: 'transparent',
        flex: 1
    },
    progressImage: { 
        width: "100%", 
        height: "75%" 
    },
    mask: { 
        flex: 1,
        backgroundColor: colors.white,
        alignSelf: "flex-end"
    },
    cardImage: {
        borderRadius: 12,
        alignSelf: 'center',
        height:'100%', 
        width:'100%'
    }
});
