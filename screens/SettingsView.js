import React from 'react'
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity, Alert, Image, Platform, Linking } from 'react-native'
import colors from "../config/colors"
import SelectInput from '@tele2/react-native-select-input'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faMusic, faVolumeUp, faVolumeMute, faLanguage, faGamepad } from '@fortawesome/free-solid-svg-icons'
import text from "../config/text"
import { useStateValue } from "../helpers/StateProvider"
import BottomNav from "./BottomNav"
import { storeData } from "../helpers/storage_helper"

export default function SettingsView({ navigation }) {

    const [{ language, music, musicStatus, volume }, dispatch] = useStateValue();

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
            <View style={styles.headerContainer}>
                <TouchableOpacity style={styles.goBackBtn} onPress={() => navigation.goBack(null)}>
                    <Image style={styles.goBackImage} source={require("../assets/icon.png")}/>
                </TouchableOpacity>
                <Text style={styles.titleText}>{text[language].settings.labels.settings}</Text>
            </View>
            <View style={styles.settingsContainer}>     
                <View style={styles.settingsItem}>
                    <TouchableOpacity style={styles.settingsItemTouchable} onPress={async () => { 
                        musicStatus ? music.stopAsync() : music.playAsync()
                        
                        dispatch({
                            type: 'changeMusicStatus',
                            newMusicStatus: !musicStatus
                        })

                        storeData("music", !musicStatus ? "true" : "false")
                    }}>
                        <FontAwesomeIcon icon={ faMusic } size={ 32 } color={musicStatus ? colors.black : colors.gray} />
                        <View style={styles.settingsText}>
                            <Text style={styles.settingsItemTitle}>{text[language].settings.labels.music}</Text>
                            <Text>{musicStatus ? text[language].settings.labels.enabled : text[language].settings.labels.disabled}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.settingsItem}>
                    <TouchableOpacity style={styles.settingsItemTouchable} onPress={() => {
                        dispatch({
                            type: 'changeVolumeStatus',
                            newVolumeStatus: !volume
                        })

                        storeData("volume", !volume ? "true" : "false")
                    }}>
                        <FontAwesomeIcon icon={ volume ? faVolumeUp : faVolumeMute } size={ 32 } color={colors.black} />
                        <View style={styles.settingsText}>
                            <Text style={styles.settingsItemTitle}>{text[language].settings.labels.sound}</Text>
                            <Text>{volume ? text[language].settings.labels.enabled : text[language].settings.labels.disabled}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={[styles.settingsItem, {flexDirection: "row", height: 85, borderBottomColor: colors.black }]}>
                    <FontAwesomeIcon icon={ faLanguage } size={ 32 } color={colors.black} />
                    <View style={styles.settingsText}>
                        <Text style={styles.settingsItemTitle}>{text[language].settings.labels.language}</Text>
                        <SelectInput
                            options={[{ value: 'en', label: 'English' }, { value: 'tr', label: 'Türkçe' }]}
                            value={language}
                            containerStyle={{width: "90%", backgroundColor: 'transparent' }}
                            innerContainerStyle={{borderBottomWidth: 0}}
                            valueStyle={{ color: colors.black }}
                            labelStyle={{ color: colors.black }}
                            onChange={(value) => {
                                storeData("lang", value)

                                dispatch({
                                    type: 'changeLang',
                                    newLanguage: value
                                })
                            }}
                        />
                    </View>
                </View>
                <View style={[styles.settingsItem, {flexDirection: "row", height: 85, borderBottomColor: colors.black }]}>
                    <View style={[styles.settingsText, { flex: 0.75 }]}>
                        <Text style={styles.settingsItemTitle}>{text[language].settings.labels.startOver}</Text>
                        <Text>{text[language].settings.labels.startOverText}</Text>
                    </View>
                    <TouchableOpacity style={{justifyContent: "center", flex: 0.25}} onPress={() => startOverAlert()}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>{text[language].settings.labels.startOverBtn}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={[styles.settingsItem, {flexDirection: "row", height: 85, borderBottomColor: colors.black }]}>
                    <FontAwesomeIcon icon={ faGamepad } size={ 32 } color={colors.black} />
                    <View style={[styles.settingsText, { flex: 0.75 }]}>
                        <Text style={styles.settingsItemTitle}>{text[language].settings.labels.moreGames}</Text>
                        <Text>{text[language].settings.labels.moreGamesText}</Text>
                    </View>
                    <TouchableOpacity style={{justifyContent: "center", flex: 0.25}} 
                        onPress={() => Linking.openURL("market://details?id=com.janfranco.snowpiercer")}
                    >
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>{text[language].settings.labels.moreGamesBtn}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{justifyContent: "center", height: 70, width: "80%"}} 
                    onPress={() => navigation.navigate("AboutView")}
                >
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>{text[language].settings.labels.about}</Text>
                    </View>
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
        backgroundColor: "transparent",
        paddingTop: Platform.OS === 'android' ? 25 : 0
    },
    headerContainer: {
        flex: 0.05,
        backgroundColor: colors.black
    },
    settingsContainer: {
        flex: 0.85,
        backgroundColor: colors.white,
        alignItems: "center",
        paddingTop: "5%"
    },
    settingsItem: {
        width: "80%",
        paddingVertical: "3%",
        borderBottomWidth: 1,
        borderBottomColor: colors.grayOpacity
    },
    settingsItemTouchable: {
        flexDirection: "row"
    },
    settingsText: {
        marginLeft: "5%"
    },
    settingsItemTitle: {
        fontSize: 18
    },
    pickerContainer: {
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: 85
    },
    bottomContainer: {
        flex: 0.1,
        justifyContent: "center"
    },
    titleText: {
        color: colors.white,
        alignSelf: "center",
        fontWeight: "bold",
        fontSize: 20
    },
    goBackBtn: {
        position: "absolute",
        top: -5,
        left: 15,
        borderColor: "red",
        borderWidth: 2
    },
    goBackImage: {
        width: 40,
        height: 25
    },
    button: {
        backgroundColor: colors.black,
        height: "60%",
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center"
    },
    buttonText: {
        color: colors.white,
        fontSize: 14,
    }
})
