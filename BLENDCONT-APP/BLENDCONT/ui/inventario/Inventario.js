import React, { Component } from 'react';
import { AppLoading } from 'expo';
import { StatusBar, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Container } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import Head2 from '../compartido/Header2';

import Barra from '../../src/personal/barra.svg'
import Cuerpo from '../../src/inventario/cuerpo1.svg'
import Anadirr from '../../src/inventario/anadir.svg'
import Busqueda from '../../src/inventario/busqueda.svg'
import Stock from '../../src/inventario/stock.svg'


class Inventario extends Component {
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
				<StatusBar hidden/>
				<Head2 navigation={this.props.navigation} />
				<Grid>
					<Row style={styles.part1}>
						<Text>    Inventario</Text>
					</Row>
					<Row style={styles.part2}>
						<Barra width='100%' height='100%' />
					</Row>
					<Row style={styles.part3}>
						<Cuerpo width='80%' height='90%' />
					</Row>
					{/* <Row style={styles.part4}>
						<TouchableOpacity style={{ width: '100%', height: '100%' }}
							onPress={() => this.props.navigation.navigate('Categoria')}>
							<Busqueda width='100%' height='100%' />
						</TouchableOpacity>
					</Row> */}
					<Row style={styles.part5}>
						<TouchableOpacity style={{ width: '100%', height: '100%' }}
							onPress={() => this.props.navigation.navigate('Stock_total')}>
							<Stock width='100%' height='100%' />
						</TouchableOpacity>
					</Row>
					<Row style={styles.part5}>
						<TouchableOpacity style={{ width: '100%', height: '100%' }}
							onPress={() => this.props.navigation.navigate('Anadir')}>
							<Anadirr width='100%' height='100%' />
						</TouchableOpacity>
					</Row>
					<Row style={styles.part7}>
					</Row>
				</Grid>
			</Container>
		);	
	}
}

const styles = StyleSheet.create({
    part1: {
        flex: 0.8,
        alignItems: 'flex-end'
    },
    part2: {
        flex: 1,
    },
    part3: {
        flex: 14,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    part4: {
        flex: 3.3,
        justifyContent: 'center',
        marginLeft: '5%',
        marginRight: '5%'
    },
    part5: {
        flex: 3.3,
        justifyContent: 'center',
        marginLeft: '5%',
        marginRight: '5%'
    },
    part6: {
        flex: 3.4,
        justifyContent: 'center',
        marginLeft: '5%',
        marginRight: '5%'
    },
    part7: {
        flex: 2
    }
})

export default Inventario;