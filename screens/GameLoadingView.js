import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, Animated } from 'react-native'
import colors from "../config/colors"
import text from "../config/text"
import { useStateValue } from "../helpers/StateProvider"
import AsyncStorage from '@react-native-community/async-storage'
import { Audio } from "expo-av"

export default function GameLoadingView({ navigation }) {

    const [{ language }, dispatch] = useStateValue();
    const [disableButton, setDisable] = useState(true);

    const getSettings = async () => {
        const savedDays = await getData("days")
        if (savedDays !== NaN && parseInt(savedDays) !== 0)
            dispatch({
                type: 'changeDays',
                newDays: parseInt(savedDays)
            })
        
        const savedLang = await getData("lang")
        if (savedLang !== null)
            dispatch({
                type: 'changeLang',
                newLanguage: savedLang
            })

        const savedVolume = await getData("volume")
        if (savedVolume !== null)
            dispatch({
                type: 'changeVolumeStatus',
                newVolumeStatus: savedVolume === "true" ? true : false
            })

        const savedMusic = await getData("music")
        if (savedMusic !== null)
            dispatch({
                type: 'changeMusicStatus',
                newMusicStatus: savedMusic === "true" ? true : false
            })
    }

    const getData = async (key) => {
        try {
            return await AsyncStorage.getItem(key)
        } catch(e) { console.log(e) }
    }

    const fade = useRef(new Animated.Value(0)).current
    const buttonFade = useRef(new Animated.Value(0)).current
    const growHorizontal = useRef(new Animated.Value(0)).current
    const growVertical = useRef(new Animated.Value(0)).current

    const trainLoadAnimation = () => {
        Animated.sequence([
            Animated.parallel([
                Animated.timing(fade, {
                    toValue: 1,
                    duration: 8000 ,
                    useNativeDriver: false
                }),
                Animated.timing(growHorizontal, {
                    toValue: 1,
                    duration: 8000,
                    useNativeDriver: false
                }),
                Animated.timing(growVertical, {
                    toValue: 1,
                    duration: 8000,
                    useNativeDriver: false
                })
            ]),
            Animated.timing(buttonFade, {
                toValue: 1,
                duration: 2000,
                useNativeDriver: false
            })
        ]).start(() => setDisable(false));
    };

    const soundEffectTrainComing = useRef(new Audio.Sound()).current

    const loadAndPlayTrainComingSound = async () => {
        try {
            await soundEffectTrainComing.loadAsync(require("../assets/sound/effect/train_coming.mp3"))
            await soundEffectTrainComing.playAsync()
        } catch(err) { console.log(err) }
    }

    useEffect(() => {
        getSettings()
        loadAndPlayTrainComingSound()
        trainLoadAnimation()
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.animatedContainer}>
                <Animated.View style={[styles.animated, { 
                    opacity: fade, 
                    width: growHorizontal.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['60%', '120%']
                    }),
                    height: growVertical.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['40%', '120%']
                    }) 
                }]}>
                    <Image source={require("../assets/images/train_loading.png")} style={styles.loadingImage} resizeMode={"center"} />
                </Animated.View>
            </View>
            <Animated.View style={[styles.bottomContainer, { opacity: buttonFade }]}>
                <TouchableOpacity style={styles.nextButton} onPress={() => navigation.replace("CardGameView")} disabled={disableButton}>
                    <Text style={styles.buttonText}>{text[language].loadingScreen.buttonText}</Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.black,
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    animatedContainer: {
        justifyContent: "center",
        alignItems: "center",
        flex: 0.9,
        width: "100%"
    },
    animated: {
        justifyContent: "center",
        alignItems: "center"
    },
    bottomContainer: {
        flex: 0.1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    nextButton: {
        width: "70%",
        height: "50%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.white,
        borderRadius: 10
    },
    buttonText: {
        color: colors.black,
        fontSize: 20
    },
    loadingImage: {
        width: "100%",
        height: "100%"
    }
})
