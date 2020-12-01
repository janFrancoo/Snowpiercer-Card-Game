import React from 'react'
import { StyleSheet, Text, View, ScrollView, Linking, TouchableOpacity } from 'react-native'
import text from "../config/text"
import colors from "../config/colors"
import { useStateValue } from "../helpers/StateProvider"
import { privacyPolicyPartOne, privacyPolicyPartTwo } from "../config/privacy"

export default function AboutView({ navigation }) {

    const [{ language }, dispatch] = useStateValue();

    return (
        <View style={styles.container}>
            <TouchableOpacity style={{justifyContent: "center", flex: 0.25}} onPress={() => navigation.goBack(null)}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>X</Text>
                </View>
            </TouchableOpacity>
            <View style={styles.about}>
                <ScrollView>
                    <Text style={styles.text}>
                        {text[language].settings.about}
                        {privacyPolicyPartOne}
                        <Text style={{color: colors.red}} 
                            onPress={() => Linking.openURL('https://policies.google.com/privacy')}>
                            {"Google Play Services\n\n"}
                        </Text>
                        <Text style={{color: colors.red}} 
                            onPress={() => Linking.openURL('https://support.google.com/admob/answer/6128543?hl=en')}>
                            {"AdMob\n\n"}
                        </Text>
                        <Text style={{color: colors.red}} 
                            onPress={() => Linking.openURL('https://expo.io/privacy')}>
                            {"Expo\n"}
                        </Text>
                        {privacyPolicyPartTwo}
                    </Text>
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    about: {
        width: "95%",
        height: "75%",
        backgroundColor: colors.black,
        alignItems: "center",
        paddingTop: "10%",
        paddingHorizontal: "10%",
        borderRadius: 20,
        paddingBottom: "10%"
    },
    text: {
        color: colors.white,
        fontSize: 16
    },
    button: {
        backgroundColor: colors.black,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        padding: "2%"
    },
    buttonText: {
        color: colors.white,
        fontSize: 14,
    }
})
