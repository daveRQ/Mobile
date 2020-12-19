import React, { Component } from 'react';
import { StatusBar, ImageBackground, StyleSheet, View, Button } from 'react-native';
import { Audio } from 'expo-av';

import Elipse from  '../../src/inicio/elipse.svg';
import Letras from '../../src/inicio/letras.svg';


const Lapso = ({navigation}) => {
	setTimeout(function(){
		navigation.navigate("Login")
	}, 2000);
	return null;
}

var ite = 0;

function Intro({ navigation }) {

	const [sound, setSound] = React.useState();

	async function playSound() {
		if (ite == 0) {
			console.log('Loading Sound');
			const { sound } = await Audio.Sound.createAsync(
			require('../../music/inicio.mp3')
			);
			setSound(sound);
	
			console.log('Playing Sound');
			await sound.playAsync(); 
			ite = 1;
		}
	}

	React.useEffect(() => {
		return sound
		? () => {
			console.log('Unloading Sound');
			sound.unloadAsync(); }
		: undefined;
	}, [sound]);

	playSound()

	return (
		<ImageBackground source={require('../../src/inicio/fondo.jpg')} style={styles.fondo}>
			<StatusBar hidden />
			<View style={styles.container}>
				<Elipse />
				<Letras width='150' style={styles.letras}/>
			</View>
			<Lapso navigation={ navigation }  />
		</ImageBackground>
    )
}

const styles = StyleSheet.create({
	fondo: {
		flex: 1,		
	},
	container: {
		flex: 1,
		// position: 'relative',
		justifyContent: 'center',
		alignItems: 'center',
	},
	letras: {
		flex: 1,
		position: 'absolute',
	}
})

export default Intro;
