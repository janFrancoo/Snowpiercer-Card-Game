import React from 'react'
import { StyleSheet, SafeAreaView, View, Text, Image, ScrollView, Platform } from 'react-native'
import colors from "../config/colors"
import BottomNav from "./BottomNav"

export default function PersonDetailView({ navigation, route }) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.detailContainer}>
                <Image
                    style={styles.personImage}
                    source={require("../assets/icon.png")}
                />
                <Text style={styles.personTitle}>{route.params.person.title}</Text>
                <ScrollView style={styles.scrollText}>
                    <Text style={styles.personText}>{route.params.person.text}</Text>
                </ScrollView>
            </View>
            <View style={styles.bottomContainer}>
                <BottomNav navigation={navigation} />
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
    detailContainer: {
        flex: 0.9,
        backgroundColor: colors.white,
        alignItems: "center"
    },
    personImage: {
        marginTop: "10%"
    },
    personTitle: {
        marginTop: "10%",
        fontSize: 20,
        fontWeight: "bold"
    },
    scrollText:{
        marginTop: "5%",
        marginHorizontal: "5%",
        marginBottom: "2%"
    },
    personText: {
        fontSize: 16,
        fontStyle: "italic"
    },
    bottomContainer: {
        flex: 0.1,
        justifyContent: "center"
    },
    textWhite: {
        color: colors.white
    }
})
