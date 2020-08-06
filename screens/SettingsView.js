import React, { useState } from 'react'
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity, Alert, Platform } from 'react-native'
import colors from "../config/colors"
import SelectInput from '@tele2/react-native-select-input'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faMusic, faVolumeUp, faVolumeMute } from '@fortawesome/free-solid-svg-icons'
import text from "../config/text"
import { useStateValue } from "../helpers/StateProvider"
import BottomNav from "./BottomNav"

export default function SettingsView({ navigation }) {

    const [{ language, music, volume }, dispatch] = useStateValue();
    const [musicStatus, setMusicStatus] = useState(true);

    const startOverAlert = () => {
        Alert.alert(
            text[language].settings.startOver.title,
            text[language].settings.startOver.message,
            [{
                text: text[language].settings.startOver.cancel,
                style: "cancel"
            },
            { text: text[language].settings.startOver.ok, onPress: () => startOver() }],
            { cancelable: false }
        );
    }

    const startOver = () => {
        console.log("starting over...")
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.settingsContainer}>
                <Text style={styles.labels}>{text[language].settings.labels.selectLang}</Text>
                <View style={styles.pickerContainer}>
                    <SelectInput
                        options={[{ value: 'en', label: 'English' }, { value: 'tr', label: 'Türkçe' }]}
                        value={language}
                        containerStyle={{width: "80%", height: "100%", backgroundColor: 'transparent' }}
                        valueStyle={{ color: colors.white }}
                        labelStyle={{ color: colors.white }}
                        onChange={(value) => dispatch({
                            type: 'changeLang',
                            newLanguage: value
                        })}
                    />
                </View>
                <View style={styles.soundContainer}>
                    <View style={styles.musicCheck}>
                        <Text style={styles.textWhite}>{text[language].settings.labels.enableMusic}</Text>
                        <TouchableOpacity onPress={async () => { 
                            if (musicStatus)
                                music.stopAsync()
                            else
                                music.playAsync()
                            
                            setMusicStatus(!musicStatus) 
                        }}>
                            <FontAwesomeIcon icon={ faMusic } size={ 32 } color={musicStatus ? colors.white : colors.gray} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.soundCheck}>
                        <Text style={styles.textWhite}>{text[language].settings.labels.enableSound}</Text>
                        <TouchableOpacity onPress={() => dispatch({
                            type: 'changeVolumeStatus',
                            newVolumeStatus: !volume
                        })}>
                            <FontAwesomeIcon icon={ volume ? faVolumeUp : faVolumeMute } size={ 32 } color={colors.white} />
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity style={styles.button} onPress={() => startOverAlert()}>
                    <Text syle={styles.textWhite}>{text[language].settings.labels.startOverBtn}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("AboutView")}>
                    <Text syle={styles.textWhite}>{text[language].settings.labels.aboutBtn}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.bottomContainer}>
                <BottomNav navigation={navigation} topColor={true} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.black,
        paddingTop: Platform.OS === 'android' ? 25 : 0
    },
    settingsContainer: {
        flex: 0.9,
        marginTop: "10%"
    },
    pickerContainer: {
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: 85
    },
    soundContainer: {
        width: "100%",
        height: 150,
        marginTop: "5%",
        flexDirection: 'row'
    },
    musicCheck: {
        flex: 0.5,
        alignItems: "center",
        justifyContent: "space-evenly"
    },
    soundCheck: {
        flex: 0.5,
        alignItems: "center",
        justifyContent: "space-evenly"
    },
    button: {
        width: "80%",
        height: "8%",
        marginTop: "5%",
        backgroundColor: colors.white,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10
    },
    bottomContainer: {
        flex: 0.1,
        justifyContent: "center"
    },
    labels: {
        marginLeft: "10%",
        color: colors.white
    },
    textWhite: {
        color: colors.white
    }
})
