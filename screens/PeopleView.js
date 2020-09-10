import React from 'react'
import { StyleSheet, SafeAreaView, View, Text, Image, FlatList, TouchableOpacity, Platform } from 'react-native'
import colors from "../config/colors"
import people from "../scenerios/people"
import { useStateValue } from "../helpers/StateProvider"
import BottomNav from "./BottomNav"

export default function PeopleView({ navigation }) {

    const [{ language }, dispatch] = useStateValue();
    
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.listContainer}>
                <FlatList
                    data={language === 'en' ? people.en : people.tr}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.listItem} 
                                        onPress={() => navigation.navigate("PersonDetailView", { person: item })}
                                        key={item.id}>
                            <View style={styles.card}>
                                <Text style={styles.textTitle}>{item.title}</Text>
                                <Text style={styles.textSecondary}>{item.class}</Text>
                                <Image style={styles.badge} source={require("../assets/icon.png")}/>
                            </View>
                            <Image style={styles.avatar} source={require("../assets/icon.png")}/>
                        </TouchableOpacity>
                    )}
                    keyExtractor={card => card.id}
                    showsVerticalScrollIndicator={false}
                />
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
        paddingTop: Platform.OS === 'android' ? 25 : 0,
    },
    listContainer: {
        flex: 0.9,
        backgroundColor: colors.white,
        alignItems: "center"
    },
    bottomContainer: {
        flex: 0.1,
        justifyContent: "center"
    },
    listItem: {
        width: 340,
        height: 125,
        marginVertical: 15
    },
    card: {
        backgroundColor: colors.black,
        height: "75%",
        borderRadius: 12
    },
    avatar: {
        position: "absolute",
        width: "25%",
        height: "100%",
        borderRadius: 12
    },
    textTitle: {
        marginLeft: "27%",
        marginTop: 15,
        color: colors.white,
        fontSize: 19,
        fontWeight: "bold"
    },
    textSecondary: {
        marginLeft: "27%",
        marginTop: 5,
        color: colors.white,
        fontSize: 14
    },
    badge: {
        width: "15%",
        height: "50%",
        alignSelf: "flex-end",
        position: "absolute",
        top: "25%",
        right: "5%"
    }
})
