import React from 'react'
import { StyleSheet, SafeAreaView, View, Text, Image, ImageBackground, ScrollView, TouchableOpacity, Platform } from 'react-native'
import colors from "../config/colors"
import BottomNav from "./BottomNav"
import { characterImages } from '../helpers/character_images'

export default function PersonDetailView({ navigation, route }) {
    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground style={styles.profileBackground} source={characterImages[route.params.person.image].uri} blurRadius={4} >
                <TouchableOpacity style={styles.goBackBtn} onPress={() => navigation.goBack(null)}>
                    <Image style={styles.goBackImage} source={require("../assets/icon.png")}></Image>
                </TouchableOpacity>
                <Image style={styles.profileAvatar} source={characterImages[route.params.person.image].uri}/>
                <Text style={styles.textTitle}>{route.params.person.title}</Text>
                <Text style={styles.textSecondary}>{route.params.person.class}</Text>
            </ImageBackground>
            <View style={styles.description}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={styles.textDesc}>{route.params.person.text}</Text>
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
        backgroundColor: colors.white,
        paddingTop: Platform.OS === 'android' ? 25 : 0
    },
    profileBackground: {
        flex: 0.4,
        alignItems: "center",
        borderBottomStartRadius: 16,
        borderBottomEndRadius: 16,
        overflow: "hidden",
    },
    profileAvatar: {
        height: "50%",
        width: "25%",
        marginTop: "10%",
        borderRadius: 10
    },
    description: {
        flex: 0.6,
        paddingTop: "10%",
        paddingHorizontal: "10%"
    },
    bottomContainer: {
        flex: 0.1,
        justifyContent: "center"
    },
    textTitle: {
        color: colors.white,
        fontWeight: "bold",
        fontSize: 24,
        marginTop: 10
    },
    textSecondary: {
        color: colors.white,
        fontSize: 18,
        marginTop: 5
    },
    textDesc: {
        color: colors.black,
        fontSize: 20,
        marginBottom: "10%",
        fontStyle: "italic",
        lineHeight: 35
    },
    goBackBtn: {
        position: "absolute",
        top: "5%",
        left: "8%",
        borderColor: "red",
        borderWidth: 2
    },
    goBackImage: {
        width: 20,
        height: 15
    }
})
