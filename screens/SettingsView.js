import React from 'react'
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity, Alert, Platform } from 'react-native'
import colors from "../config/colors"
import SelectInput from '@tele2/react-native-select-input'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faMusic, faVolumeUp, faVolumeMute, faHammer, faTrain } from '@fortawesome/free-solid-svg-icons'

export default function SettingsView({ navigation }) {

    const [language, setLanguage] = React.useState('English')
    const [music, setMusic] = React.useState(true)
    const [volume, setVolume] = React.useState(true)

    const startOverAlert = () => {
        Alert.alert(
            "Start Over",
            "All your progress will be lost, are you sure?",
            [{
                text: "Cancel",
                style: "cancel"
            },
            { text: "OK", onPress: () => startOver() }],
            { cancelable: false }
        );
    }

    const startOver = () => {
        console.log("starting over...")
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.settingsContainer}>
                <Text style={styles.labels}>Select language</Text>
                <View style={styles.pickerContainer}>
                    <SelectInput
                        options={[{ value: 'English', label: 'English' }, { value: 'Türkçe', label: 'Türkçe' }]}
                        value={language}
                        containerStyle={{width: "80%", height: "100%", backgroundColor: 'transparent' }}
                        valueStyle={{ color: colors.white }}
                        labelStyle={{ color: colors.white }}
                        onChange={(value) => setLanguage(value)}
                    />
                </View>
                <View style={styles.soundContainer}>
                    <View style={styles.musicCheck}>
                        <Text style={styles.textWhite}>Enable music</Text>
                        <TouchableOpacity onPress={() => setMusic(!music)}>
                            <FontAwesomeIcon icon={ faMusic } size={ 32 } color={music ? colors.white : colors.gray} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.soundCheck}>
                        <Text style={styles.textWhite}>Enable sound</Text>
                        <TouchableOpacity onPress={() => setVolume(!volume)}>
                            <FontAwesomeIcon icon={ volume ? faVolumeUp : faVolumeMute } size={ 32 } color={colors.white} />
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity style={styles.startOverBtn} onPress={() => startOverAlert()}>
                    <Text syle={styles.textWhite}>Start Over</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.bottomContainer}>
                <TouchableOpacity style={styles.buttonLeft} onPress={() => navigation.navigate("PeopleView")}>
                    <FontAwesomeIcon icon={ faTrain } size={ 32 } color={colors.white} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.daysPanel} onPress={() => navigation.navigate("CardGameView")}>
                    <Text style={styles.textWhite}>Day 0</Text>
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
    startOverBtn: {
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
