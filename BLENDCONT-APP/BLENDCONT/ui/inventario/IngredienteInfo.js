import React, { Component } from 'react';
import { AppLoading } from 'expo';
import { StatusBar, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Container } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import Head2 from '../compartido/Header2';

import Barra from '../../src/personal/barra.svg';

class IngredienteInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isReady: false,
			dataEnviar: { id_producto: '' }
		};
		var producto;
		var ingresoProductos;

		this.getData = this.getData.bind(this);
		this.getData();
	}

	getData(e) {
		fetch('http://192.168.0.112:3000/api/inventario/ingresoProducto', {
			method: 'POST',
			body: JSON.stringify(this.state.dataEnviar),
			headers: {
				'Acccept': 'application/json',
				'Content-Type': 'application/json',
			}
		})
			.then(res => res.json())
			.then(data => {
				producto = data.resultProducto;
				ingresoProductos = data.resultIngresoProducto;
			});
		e.preventDefault();
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
				<Head2 navigation={this.props.navigation} />
				<Grid>
					<Row style={styles.part1}>
						<Text>    Inventario / Stock total / Ingrediente</Text>
					</Row>
					<Row style={styles.part2}>
						<Barra width='100%' height='100%' />
					</Row>
					<Row style={styles.part3}>
						<Text style={styles.encabezados1}>Ingrediente</Text>
					</Row>
					<Row style={styles.caja1}>
						<Col style={{flex: 1}}>
							<Text style={styles.textizq}> NOMBRE</Text>
						</Col>
						<Col style={{ flex: 1 }}>
							<Text style={styles.textizq}> CATEGORIA</Text>
						</Col>
						<Col style={{ flex: 1 }}>
							<Text style={styles.textizq}> UNIDAD</Text>
						</Col>
						<Col style={{ flex: 1 }}>
							<Text style={styles.textizq}> CANTIDAD TOTAL</Text>
						</Col>
						<Col style={{ flex: 1 }}>
							<Text style={styles.textizq}> ULTIMO COSTO</Text>
						</Col>
					</Row>
					<Row style={styles.part4}>
						<Text style={styles.encabezados2}>Información</Text>
					</Row>
					<Row style={styles.caja2}>
							
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
		flex: 2.5,
		alignItems: 'center',
		justifyContent: 'center',
	},
	encabezados1: {
		color: "white",
		fontSize: 15,
		fontWeight: 'bold',
		backgroundColor: "#E8B020",
		textAlign: 'center',
		marginLeft: '4%',
		marginRight: '2%',
		marginTop: '2%',
		marginBottom: '2%',
		paddingVertical: 4,
		paddingHorizontal: 133,
	},
	part4: {
		flex: 2.5,
		alignItems: 'center',
		justifyContent: 'center',
	},
	encabezados2: {
		color: "white",
		fontSize: 15,
		fontWeight: 'bold',
		backgroundColor: "#A28CE0",
		textAlign: 'center',
		marginLeft: '4%',
		marginRight: '2%',
		marginTop: '2%',
		marginBottom: '2%',
		paddingVertical: 4,
		paddingHorizontal: 133,
	},
	textizq: {
		color: "white",   
		fontSize: 12,     
		backgroundColor: "#ECA781",
		marginLeft: '4%',
		marginRight: '2%',
		marginTop: '2%',
		marginBottom: '2%',
		textAlign: 'center',
	},
	caja1: {
		flex: 6,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 10,
		paddingVertical: 3,
		paddingHorizontal: 8,
		backgroundColor: "#ECA781",
		marginLeft: '4%',
		marginRight: '2%',
		marginTop: '2%',
		marginBottom: '2%',        
	},
	caja2: {

	}   
})

export default IngredienteInfo;