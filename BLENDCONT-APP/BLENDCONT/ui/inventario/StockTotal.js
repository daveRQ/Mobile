import React, { Component } from 'react';
import { AppLoading, LinearGradient } from 'expo';
import { StatusBar, StyleSheet, TouchableOpacity, Text, ToastAndroid, TextInput, View, Image } from 'react-native';
import {
    Container, Content, Form, Item, Input, Label, Picker, Icon, ListItem, Radio, Right, Left, DatePicker, Button, Header, Footer, Body
}
    from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Table, TableWrapper, Cell } from 'react-native-table-component';

import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import Head2 from '../compartido/Header2';
import Barra from '../../src/personal/barra.svg'

class StockTotal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isReady: false,
			rango: {
				fch_ini: '',
				fch_fin: ''
			}
		};
		
		var arrayIngredientes = [];
		this.getData = this.getData.bind(this);
		this.getData();
	}

	getData(e) {
		fetch('http://192.168.0.112:3000/api/inventario/ingresoProducto', {
			method: 'POST',
			body: JSON.stringify(this.state.rango),
			headers: {
				'Acccept': 'application/json',
				'Content-Type': 'application/json',
			}
		})
			.then(res => res.json())
			.then(data => {
				arrayIngredientes = data.result;
				ToastAndroid.showWithGravityAndOffset(
					data.producto.length,
					ToastAndroid.LONG,
					ToastAndroid.BOTTOM,
					25,
					50
				);
			});
		e.preventDefault();
	}

	handleChange_fch_ini(value) {
		this.setState({
			producto: {
				...this.state.rango,
				fch_ini: value
			}
		});
	}
	handleChange_fch_fin(value) {
		this.setState({
			producto: {
				...this.state.rango,
				fch_fin: value
			}
		});
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
		
		const Headtabla = ['Nombre', 'Unidad', 'Cantidad', 'Detalles'];
		const Datostabla = [['nombre1', '1', '10', '4'], ['nombre2', '2', '20', '4']];
		return (
			<Container>
				<StatusBar hidden />
				<Head2 navigation={this.props.navigation} />
				<Grid>
					<Row style={styles.part1}>
						<Text> Inventario / Stock total</Text>
					</Row>
					<Row style={styles.part2}>
						<Barra width='100%' height='100%' />
					</Row>
					<Row style={styles.fechas}>
						<Col style={{ flex: 2 }}>
							<Text style={styles.col1}>Fecha Inicio</Text>
							<Text style={styles.col1}>Fecha Fin</Text>
						</Col>
						<Col style={{ flex: 3 }}>
							<Text style={styles.col2}>Fecha</Text>
						</Col>
					</Row>
					<Row style={styles.part3}>
						{/* <LinearGradient
							colors={['#F89797', '#F3A484', '#EDB56B', '#E7C456']}
							style={{ flex: 8 }}
						>
							<Table>
								<Row data={Headtabla} style={styles.head} textStyle={styles.text} />
								<Row data={Datostabla} style={styles.row} textStyle={styles.text} />
							</Table>
						</LinearGradient> */}

					</Row>
				</Grid>
			</Container>
		);
	};
}


const styles = StyleSheet.create({
	body: {
		textAlign: 'center',
		justifyContent: 'center',
		alignItems: 'center'
	},
	part1: {
		flex: 1.8,
		alignItems: 'flex-end'
	},
	part2: {
		flex: 2.5
	},
	part3: {
		flex: 15,
		alignItems: 'center',
		justifyContent: 'center',
	},
	head: {
		textAlign: 'center',
		justifyContent: 'center',
	},
	row: {
		textAlign: 'center',
		justifyContent: 'center',
	},
	text: {
		color: "white",
		fontSize: 9,
		textAlign: 'center',
		marginLeft: '4%',
		marginRight: '2%',
		marginTop: '2%',
		marginBottom: '2%',
		paddingVertical: 4
	}
})

export default StockTotal;