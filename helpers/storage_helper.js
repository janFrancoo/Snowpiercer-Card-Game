import AsyncStorage from '@react-native-community/async-storage'

const getData = async (key) => {
    try {
        return await AsyncStorage.getItem(key)
    } catch(e) { }
}

const storeData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value)
    } catch (e) { }
}

const removeData = async (key) => {
    try {
        await AsyncStorage.removeItem(key)
    } catch(e) { }
}

module.exports = {
    getData,
    storeData,
    removeData
}
