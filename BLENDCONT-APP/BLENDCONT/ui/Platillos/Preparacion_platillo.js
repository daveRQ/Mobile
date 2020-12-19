import React, { Component } from 'react';
import { AppLoading } from 'expo';
import { StatusBar, StyleSheet, TouchableOpacity, Text, ToastAndroid, TextInput, View, Image, ScrollView } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import {
    Container, Content, Form, Item, Input, Label, Picker, Icon, ListItem, Radio, Right, Left, DatePicker, Button, Header, Footer, Body
}
    from 'native-base';
import { LinearGradient } from 'expo-linear-gradient'
import { Table, TableWrapper, Row as FilaTabla, Cell } from 'react-native-table-component';

import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import Head2 from '../compartido/Header2';

import Barra from '../../src/personal/barra.svg'

//funciones de AsyncStorage
import { getItem, setItem, setObject, getObject } from './../StorageHelper'

//cambiar el ipHost segun el server
const {ipHost} = require('./../../ipHost')


class Preparacion_platillo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isReady: false,
            platillo: {
                nombre: "", 
                preparacion: "",  
                para_cuantos: "", 
                tmp_preparacion: 0, 
                costo_actual: 0, 
                precio_actual: 0,  
                categoria: "", 
                fch_creacion: Date(), 
                total_vendidos: 0,
                //id_registrador,
                id_restaurante: "", 
                ingredientes: []
            }
        };

        this.redirigir_anadir_platillo = this.redirigir_anadir_platillo.bind(this);
    }

    redirigir_anadir_platillo() {
        setObject("platillo", this.state.platillo);
        this.props.navigation.navigate('Anadir_platillo');
    }

    handleChange_preparacion(value) {
        this.setState({
            platillo: {
                ...this.state.platillo,
                preparacion: value
            }
        });
    }

    async componentDidMount() {
        //verificar si existe un platillo que se encuentra en proceso de creacion
        getObject('platillo').then(platillo => {
            if(platillo){
                this.setState({ platillo })
            }
        });

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
                <Grid style={{ justifyContent: 'center' }}>
                    <Row style={styles.part1}>
                        <Text>    Platillos / Añadir platillo</Text>
                    </Row>
                    <Row style={styles.part2}>
                        <Barra width='100%' height='100%' />
                    </Row>
                    <Row style={{flex:0.5}}>
                    </Row>
                    <Row style={styles.part3}>
                        <Col size={7.5}></Col>
                        <Col size={85} style={{ backgroundColor: '#F59337', flexDirection: 'column'}}>
                            <Row size={2} style={{justifyContent:'center', alignItems:'center'}} ><Text style={{textAlign:'center', fontWeight:'bold', fontSize: 15}}>PREPARACIÓN</Text></Row>
                            <Row size={8} style={{flexDirection:'column', alignItems:'center', justifyContent: 'center'}}>
                                <TextInput name="preparacion" value={this.state.platillo.preparacion} onChangeText={text => this.handleChange_preparacion(text)} placeholder="Redactar Preparación" style={styles.textinput}></TextInput>
                            </Row>
                        </Col>
                        <Col size={7.5}></Col>   
                    </Row>
                    <Row style={styles.part4}>
                        <Button rounded style={styles.button} onPress={this.redirigir_anadir_platillo}>
                            <Text style={{color:'white', fontWeight:'bold', textAlign:'center'}}>Volver</Text>
                        </Button>
                    </Row>
                </Grid>

            </Container>
        )
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
        flex: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    part4:{
        flex: 5,
        alignItems:'center',
        justifyContent:'center'
    },
    encabezados1: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: 'bold',
        backgroundColor: '#EE8E35',
        borderRadius: 10,
        width: '85%',
        textAlign: 'center',
        padding: 5
    },
    textinput: {
        color: 'black',
        textAlign: 'center',
        fontSize: 10,
        height:'90%',
        width:'85%'
    },
    button:{
        justifyContent: 'center',
        marginTop: '5%',
        width: '60%',
        backgroundColor: '#C4C4C4'
    }
})
export default Preparacion_platillo;