import React, { Component } from 'react';
import { AppLoading } from 'expo';
import { StatusBar, StyleSheet, TouchableOpacity, Text, TextInput, View, Image } from 'react-native';
import { Container, Header, Left, Right, Body, Title, Button, Footer} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import Head from '../compartido/Header2';

import Logo from '../../src/login/logo.svg'
import Email from '../../src/registro/email.svg'
import Fondo from '../../src/registro/fonco_olvidoContrasenia.svg'

class OlvidoContrasenia extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isReady: false,
		};
	}
	async componentDidMount() {
		await Font.loadAsync({
			Roboto: require('native-base/Fonts/Roboto.ttf'),
			Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
			...Ionicons.font,
		});
		this.setState({ isReady: true });
	}
	render() {
		if (!this.state.isReady) {
			return <AppLoading />;
		}
		return (
			<Container>
				<StatusBar hidden />
				<Fondo width='100%' height='100%'
					style={styles.svgFondo}
				/>
				{/* <Head navigation={this.props.navigation} /> */}
				{/* <Head /> */}
				<Grid style={styles.body}>
					<Row style={styles.part1}>
						<Logo width='80%' height='80%' style={styles.logo}/>
					</Row>
					<Row style={styles.part2}>
						<Col style={styles.colCenter1}>
							<Email width='60%' height='60%' style={styles.logo}/>
						</Col>
						<Col style={styles.colCenter2}>
							<Text 
								style={styles.textColorRed}>
								Se le envió un correo a su e-mail
							</Text>
						</Col>
					</Row>
					<Row style={styles.footer}>
						<Button rounded danger
							style={styles.buttonRed}
							onPress={() => this.props.navigation.navigate('OlvidoContraseniaEmail')}>
							<Text 
								style={styles.textCenter, styles.textColorWhite}>
								Continuar
							</Text>
						</Button>
					</Row>
				</Grid>
				{/* <Footer></Footer> */}
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	right: {
		flex: 1
	},
	left: {
		flex: 1
	},
	body: {
		textAlign: 'center',
		justifyContent: 'center',
		alignItems: 'center'
	},
	colCenter1: {
		flex: 0.4,
		alignItems: 'center'
	},
	colCenter2: {
		flex: 0.6
	},
	part1: {
		marginTop: '30%',
		flex: 1,
		alignItems: 'center'
	},
	part2: {
		flex: 1,
		textAlign: 'center',
		alignItems: 'center'
	},
	footer: {
		flex: 1
	},
	svgFondo: {
		position: 'absolute',
		marginTop: '5%',
		width: '100%',
		height: '100%',
		top: 0,
		left: 0,
		right: 16,
	},
	logo : {
		width : 180,
		height : 180,
		resizeMode : 'contain',
		borderRadius : 100
	},
	textInput : {
		borderWidth : 1,
		borderColor : '#EB4511',
		padding : 5,
		width : '80%',
		textAlign: 'center',
		marginTop : 20,
		borderRadius: 10,
	},
	textCenter : {
		textAlign: 'center',
	},
	textColorWhite : {
		color : 'white'
	},
	buttonRed : {
		justifyContent : 'center',
		alignSelf:'center',
		marginTop : 50,
		width : '60%'
	},
	textColorRed : {
		textAlign: 'center',
		color : '#EB4511',
		fontSize: 20,
		marginRight: 40
	}  
})

export default OlvidoContrasenia