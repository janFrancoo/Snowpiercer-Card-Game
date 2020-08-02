import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from "react-native";
import Swiper from "react-native-deck-swiper";
import scenerios from "../scenerios/scenerios"
import colors from "../config/colors"
import ProgressBar from 'react-native-progress/Bar'

const Card = ({ card }) => {
    return (
        <View style={styles.card}>
            <Text style={styles.textWhite}>{card.text}</Text>
        </View>
    );
};

export default function CardGameView({ navigation }) {
    console.disableYellowBox = true;
    const { width, height} = Dimensions.get('window');

    const [index, setIndex] = React.useState(0)
    const [p1, setP1] = React.useState(0.5)
    const [p2, setP2] = React.useState(0.5)
    const [p3, setP3] = React.useState(0.5)
    const [p4, setP4] = React.useState(0.5)

    const onSwiped = (idx, direction) => {
        setP1(p1 + scenerios[idx].onSwiped[direction].p1)
        setP2(p2 + scenerios[idx].onSwiped[direction].p2)
        setP3(p3 + scenerios[idx].onSwiped[direction].p3)
        setP4(p4 + scenerios[idx].onSwiped[direction].p4)
        setIndex((index + 1) % scenerios.length)
    }

    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <View style={styles.progressContainer}>
                    <ProgressBar 
                        style={styles.progressBar} 
                        width={height * 8 / 100} 
                        height={8}
                        borderRadius={15}
                        color={colors.white}
                        progress={p1}
                    />
                </View>
                <View style={styles.progressContainer}>
                    <ProgressBar 
                        style={styles.progressBar} 
                        width={height * 8 / 100} 
                        height={8}
                        borderRadius={15}
                        color={colors.white}
                        progress={p2}
                    />
                </View>
                <View style={styles.progressContainer}>
                    <ProgressBar 
                        style={styles.progressBar} 
                        width={height * 8 / 100} 
                        height={8}
                        borderRadius={15}
                        color={colors.white}
                        progress={p3}
                    />
                </View>
                <View style={styles.progressContainer}>
                    <ProgressBar 
                        style={styles.progressBar} 
                        width={height * 8 / 100} 
                        height={8}
                        borderRadius={15}
                        color={colors.white}
                        progress={p4}
                    />
                </View>
            </View>
            <View style={styles.swiperContainer}>
                <Swiper
                    cards={scenerios}
                    cardIndex={index}
                    renderCard={(card) => <Card card={card} />} 
                    onSwipedLeft={(idx) => onSwiped(idx, "left")}
                    onSwipedRight={(idx) => onSwiped(idx, "right")}
                    disableTopSwipe
                    disableBottomSwipe
                    animateCardOpacity
                    cardHorizontalMargin={width * 10 / 100}
                    stackSize={5}
                    infinite
                    backgroundColor={colors.white}
                    useViewOverflow={Platform.OS === 'ios'}
                    overlayLabels={{
                        left: {
                            title: scenerios[index].choices.left,
                            style: {
                                label: {
                                    color: colors.white,
                                    fontSize: 16
                                },
                                wrapper: {
                                    flexDirection: "column",
                                    alignItems: "flex-end",
                                    justifyContent: "flex-start",
                                    marginTop: height * 15 / 100,
                                    marginRight: width * 10 / 100
                                }
                            }
                        },
                        right: {
                            title: scenerios[index].choices.right,
                            style: {
                                label: {
                                    color: colors.white,
                                    fontSize: 16
                                },
                                wrapper: {
                                    flexDirection: "column",
                                    alignItems: "flex-start",
                                    justifyContent: "flex-start",
                                    marginTop: height * 15 / 100,
                                    marginLeft: width * 10 / 100
                                }
                            }
                        },
                    }}>
                    <Text style={styles.swiperText}>{scenerios[index].text}</Text>
                </Swiper>
            </View>
            <View style={styles.bottomContainer}>
                <TouchableOpacity style={styles.buttonLeft} onPress={() => navigation.navigate("PeopleView")}>
                    <Text style={styles.textWhite}>People</Text>
                </TouchableOpacity>
                <View style={styles.daysPanel}>
                    <Text style={styles.textWhite}>Day 0</Text>
                </View>
                <TouchableOpacity style={styles.buttonRight} onPress={() => navigation.navigate("SettingsView")}>
                    <Text style={styles.textWhite}>Settings</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.black,
        justifyContent: "flex-end"
    },
    swiperContainer: {
        flex: 0.70,
        justifyContent: "center",
        alignItems: "center"
    },
    card: {
        marginTop: "30%",
        height: "50%",
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.black
    },
    topContainer: {
        flex: 0.20,
        flexDirection: 'row'
    },
    bottomContainer: {
        flex: 0.10,
        flexDirection: 'row',
        justifyContent: "space-evenly"
    },
    textWhite: {
        color: colors.white
    },
    swiperText: {
        color: colors.black,
        textAlign: "center",
        marginTop: 20,
        fontSize: 16
    },
    progressContainer: {
        flex: 0.25,
        alignItems: "center",
        justifyContent: "center"
    },
    progressBar: {
        transform: [{ rotate: '270deg'}],
    },
    buttonLeft: {
        width: "25%",
        justifyContent: "center",
        alignItems: "center",
        borderRightColor: colors.white,
        borderWidth: 1
    },
    daysPanel: {
        width: "50%",
        justifyContent: "center",
        alignItems: "center",
        borderLeftColor: colors.white,
        borderRightColor: colors.white,
        borderWidth: 1
    },
    buttonRight: {
        width: "25%",
        justifyContent: "center",
        alignItems: "center",
        borderLeftColor: colors.white,
        borderWidth: 1
    }
});
