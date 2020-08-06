import React, { useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import colors from "../config/colors"
import text from "../config/text"
import { useStateValue } from "../helpers/StateProvider"
import AsyncStorage from '@react-native-community/async-storage'

export default function GameLoadingView({ navigation }) {

    const [{ language }, dispatch] = useStateValue();

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

    useEffect(() => {
        getSettings()
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.textWhite}>{text[language].loadingScreen.loadingText}</Text>
            <TouchableOpacity style={styles.nextButton} onPress={() => navigation.replace("CardGameView")}>
                <Text style={styles.textBlack}>{text[language].loadingScreen.buttonText}</Text>
            </TouchableOpacity>
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
    textWhite: {
        color: colors.white
    },
    textBlack: {
        color: colors.black
    },
    nextButton: {
        width: "50%",
        padding: 10,
        alignItems: "center",
        backgroundColor: colors.white,
        marginTop: 50,
        borderRadius: 10
    }
})
