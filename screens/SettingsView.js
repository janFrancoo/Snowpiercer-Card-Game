import React from 'react'
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity, Alert, Platform } from 'react-native'
import colors from "../config/colors"
import SelectInput from '@tele2/react-native-select-input'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faMusic, faVolumeUp, faVolumeMute, faHammer, faTrain } from '@fortawesome/free-solid-svg-icons'
import lang from "../config/lang"

export default function SettingsView({ navigation }) {

    const [language, setLanguage] = React.useState('en')
    const [music, setMusic] = React.useState(true)
    const [volume, setVolume] = React.useState(true)

    global.music = music
    global.volume = volume

    const startOverAlert = () => {
        Alert.alert(
            lang[global.language || 'en'].settings.startOver.title,
            lang[global.language || 'en'].settings.startOver.message,
            [{
                text: lang[global.language || 'en'].settings.startOver.cancel,
                style: "cancel"
            },
            { text: lang[global.language || 'en'].settings.startOver.ok, onPress: () => startOver() }],
            { cancelable: false }
        );
    }

    const startOver = () => {
        console.log("starting over...")
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.settingsContainer}>
                <Text style={styles.labels}>{lang[global.language || 'en'].settings.labels.selectLang}</Text>
                <View style={styles.pickerContainer}>
                    <SelectInput
                        options={[{ value: 'en', label: 'English' }, { value: 'tr', label: 'Türkçe' }]}
                        value={global.language || 'en'}
                        containerStyle={{width: "80%", height: "100%", backgroundColor: 'transparent' }}
                        valueStyle={{ color: colors.white }}
                        labelStyle={{ color: colors.white }}
                        onChange={(value) => { global.language = value; setLanguage(value) }}
                    />
                </View>
                <View style={styles.soundContainer}>
                    <View style={styles.musicCheck}>
                        <Text style={styles.textWhite}>{lang[global.language || 'en'].settings.labels.enableMusic}</Text>
                        <TouchableOpacity onPress={() => { setMusic(!music); global.music = music }}>
                            <FontAwesomeIcon icon={ faMusic } size={ 32 } color={music ? colors.white : colors.gray} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.soundCheck}>
                        <Text style={styles.textWhite}>{lang[global.language || 'en'].settings.labels.enableSound}</Text>
                        <TouchableOpacity onPress={() => { setVolume(!volume); global.volume = volume }}>
                            <FontAwesomeIcon icon={ volume ? faVolumeUp : faVolumeMute } size={ 32 } color={colors.white} />
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity style={styles.button} onPress={() => startOverAlert()}>
                    <Text syle={styles.textWhite}>{lang[global.language || 'en'].settings.labels.startOverBtn}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("AboutView")}>
                    <Text syle={styles.textWhite}>{lang[global.language || 'en'].settings.labels.aboutBtn}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.bottomContainer}>
                <TouchableOpacity style={styles.buttonLeft} onPress={() => navigation.navigate("PeopleView")}>
                    <FontAwesomeIcon icon={ faTrain } size={ 32 } color={colors.white} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.daysPanel} onPress={() => navigation.navigate("CardGameView")}>
                    <Text style={styles.textWhite}>{lang[global.language || 'en'].bottomNav.middleButton}</Text>
                </TouchableOpacity>
                <View style={styles.buttonRight}>
                    <FontAwesomeIcon icon={ faHammer } size={ 32 } color={colors.white} />
                </View>
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
        flexDirection: 'row',
        justifyContent: "space-evenly"
    },
    buttonLeft: {
        width: "25%",
        justifyContent: "center",
        alignItems: "center",
        borderRightColor: colors.white,
        borderTopColor: colors.white,
        borderWidth: 1
    },
    daysPanel: {
        width: "50%",
        justifyContent: "center",
        alignItems: "center",
        borderLeftColor: colors.white,
        borderRightColor: colors.white,
        borderTopColor: colors.white,
        borderWidth: 1
    },
    buttonRight: {
        width: "25%",
        justifyContent: "center",
        alignItems: "center",
        borderLeftColor: colors.white,
        borderTopColor: colors.white,
        borderWidth: 1
    },
    labels: {
        marginLeft: "10%",
        color: colors.white
    },
    textWhite: {
        color: colors.white
    }
})
