import React, { Component } from 'react';
import { StatusBar, ImageBackground, StyleSheet, View, Button } from 'react-native';

import Listoim from '../../src/personal/listo.svg';

function Listo({ navigation }) {
    // render() {
    return (
        <ImageBackground source={require('../../src/personal/listo.jpg')} style={styles.fondo}>
            <StatusBar hidden />
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    fondo: {
        flex: 1,
    }
})

export default Listo;