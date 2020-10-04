import React, { useRef } from 'react'
import { StyleSheet, Text, Image, View, Animated, TouchableOpacity } from 'react-native'
import colors from "../config/colors"
import gameOver from "../scenerios/gameOver"
import { resetProgress } from "../helpers/scenerio_helper"
import text from "../config/text"
import { useStateValue } from "../helpers/StateProvider"
import { Audio } from "expo-av"

export default function GameOverView({ route, navigation }) {
    const [{ language, music }, dispatch] = useStateValue()

    const fade = useRef(new Animated.Value(0)).current
    const buttonFade = useRef(new Animated.Value(0)).current
    const soundEffectGameOver = useRef(new Audio.Sound()).current

    const loadGameOverSound = async () => {
        await music.stopAsync()

        try {
            await soundEffectGameOver.loadAsync(require("../assets/sound/effect/game_over.mp3"))
            await soundEffectGameOver.replayAsync()
        } catch(err) { console.log(err) }
    }

    const loadAnimation = () => {
        Animated.sequence([
            Animated.timing(fade, {
                toValue: 1,
                duration: 8000 ,
                useNativeDriver: false
            }),
            Animated.timing(buttonFade, {
                toValue: 1,
                duration: 2000,
                useNativeDriver: false
            })
        ]).start()
    }

    const startOver = () => {
        resetProgress()

        navigation.reset({
            index: 0,
            routes: [{ name: 'GameLoadingView' }],
        })
    }

    return (
        <View style={styles.container}>
            <View style={styles.animatedContainer}>
                <Animated.View style={[styles.animated, { opacity: fade }]}>
                    <Image source={require("../assets/images/train_loading.png")} 
                            resizeMode={"center"}
                            onLoad={() => {
                                loadGameOverSound()
                                loadAnimation()
                            }} />
                </Animated.View>
            </View>
            <Animated.View style={[styles.bottomContainer, { opacity: buttonFade }]}>
                <Text style={styles.textWhite}>{gameOver[route.params.e.p][route.params.e.q].text}</Text>
                <TouchableOpacity style={styles.nextButton} onPress={() => startOver()}>
                    <Text style={styles.buttonText}>{text[language].settings.startOver.title}</Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.black,
        flex: 1,
        alignItems: "center"
    },
    animatedContainer: {
        justifyContent: "center",
        alignItems: "center",
        flex: 0.85,
        width: "100%"
    },
    bottomContainer: {
        flex: 0.15,
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    animated: {
        justifyContent: "center",
        alignItems: "center"
    },
    nextButton: {
        width: "70%",
        height: "35%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.white,
        borderRadius: 10
    },
    buttonText: {
        color: colors.black,
        fontSize: 20
    },
    textWhite: {
        color: colors.white
    }
})
