import AsyncStorage from '@react-native-community/async-storage';


export async function setItem(item, selectedValue) {
    try {
        await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
        console.log('AsyncStorage error: ' + error.message);
    }
}

export async function getItem(item) {
    try {
        var value = await AsyncStorage.getItem(item)
        return value
    } catch (error) {
        console.log('AsyncStorage error: ' + error.message);
    }
}

export async function removeItem(item) {
    try {
        var value = await AsyncStorage.removeItem(item)
        return value
    } catch (error) {
        console.log('AsyncStorage error: ' + error.message);
    }
}

export async function setObject(item, selectedValue) {
    try {
        object = JSON.stringify(selectedValue)
        await AsyncStorage.setItem(item, object);
    } catch (error) {
        console.log('AsyncStorage error: ' + error.message);
    }
}

export async function getObject(item) {
    try {
        var value = await AsyncStorage.getItem(item)
        value = JSON.parse(value)
        return value
    } catch (error) {
        console.log('AsyncStorage error: ' + error.message);
    }
}