import React, { Component } from 'react';
import { AppLoading } from 'expo';
import { StatusBar, StyleSheet, TouchableOpacity, Text, ToastAndroid, TextInput, View, Image, ScrollView } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import {
    Container, Content, Form, Item, Input, Label, Picker, Icon, ListItem, Radio, Right, Left, DatePicker, Button, Header, Footer, Body
}
    from 'native-base';
import { LinearGradient } from 'expo-linear-gradient'

import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import Head2 from '../compartido/Header2';

import Barra from '../../src/personal/barra.svg'

//funciones de AsyncStorage
import { getItem, setItem, setObject, getObject, removeItem } from './../StorageHelper'

//cambiar el ipHost segun el server
const {ipHost} = require('./../../ipHost')


class Anadir_platillo2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isReady: false,
            fecha: Date(),
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

        this.crearPlatillo = this.crearPlatillo.bind(this);
    }

    crearPlatillo() {
        fetch('http://'+ipHost+'/api/platillo/registrarPlatillo/',{
            method: 'POST',
            body: JSON.stringify(this.state.platillo),
            headers: {
                'Acccept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': this.state.token
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.result) {
                    //eliminar platillo almacenado
                    removeItem("platillo");

                    ToastAndroid.showWithGravityAndOffset(data.message, ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50 );
                    this.props.navigation.navigate('Anadir_platillo');
                }
                else {
                    ToastAndroid.showWithGravityAndOffset(data.message, ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50 );
                }
            });
    }
    
    handleChange_nombre(value) {
        this.setState({
            platillo: {
                ...this.state.platillo,
                nombre: value
            }
        });
    }
    
    handleChange_raciones(value) {
        this.setState({
            platillo: {
                ...this.state.platillo,
                para_cuantos: parseInt(value)
            }
        });
    }
    handleChange_costo_actual(value) {
        this.setState({
            platillo: {
                ...this.state.platillo,
                costo_actual: parseFloat(value)
            }
        });
    }
    handleChange_precio_actual(value) {
        this.setState({
            platillo: {
                ...this.state.platillo,
                precio_actual: parseFloat(value)
            }
        });
    }
    handleChange_categoria(value) {
        this.setState({
            platillo: {
                ...this.state.platillo,
                categoria: value
            }
        });
    }
    handleChange_t_prepar(value) {
        this.setState({
            platillo: {
                ...this.state.platillo,
                tmp_preparacion: parseFloat(value)
            }
        });
    }

    async componentDidMount() {
        //get jwt
        getItem('jwt').then(token => {
            this.setState({ token });
        });

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
                        <Text>    Platillos / Añadir Platillo</Text>
                    </Row>
                    <Row style={styles.part2}>
                        <Barra width='100%' height='100%' />
                    </Row>
                    <Row style={styles.part3}>
                        <Text style={styles.encabezados1}>Agregue los datos faltantes del platillo</Text>
                    </Row>
                    <Row style={{flex:1}}>

                    </Row>
                    <Row style={styles.part4}>
                        <Col size={2}></Col>
                        <Col size={4} style= {{ borderRadius: 10, backgroundColor: '#EBB15F', alignItems: 'center'}}>
                            <DatePicker rounded
                                style={styles.datePickerStyle}
                                defaultDate={new Date()}
                                minimumDate={new Date(2020, 1, 1)}
                                maximumDate={new Date(2020, 12, 31)}
                                locale={"en"}
                                timeZoneOffsetInMinutes={undefined}
                                modalTransparent={false}
                                animationType={"slide"}
                                androidMode={"default"}
                                onDateChange={() => { this.state.fecha = this.setDate }}
                                disabled={true}
                            />
                        </Col>
                        <Col size={2}></Col>
                    </Row>
                    <Row style={{flex:1}}></Row>
                    <Row style={styles.part5}>
                        <Col size= {10}></Col>
                        <Col size={37} style={styles.cajaizq}>
                            <Row size={1}>
                                <Text style={{fontWeight:'bold'}}>NOMBRE</Text>
                            </Row>
                            <Row size={1}>
                                <Text style={{ fontWeight: 'bold' }}>RACIONES</Text>
                            </Row>
                            <Row size={1}>
                                <Text style={{ fontWeight: 'bold' }}>COSTO ACTUAL</Text>
                            </Row>
                            <Row size={1}>
                                <Text style={{ fontWeight: 'bold' }}>PRECIO ACTUAL</Text>
                            </Row>
                            <Row size={1}>
                                <Text style={{ fontWeight: 'bold' }}> CATEGORIA</Text>
                            </Row>
                            <Row size={1}>
                                <Text style={{ fontWeight: 'bold' }}>TIEMPO{"\n"}PREPARACION</Text>
                            </Row>
                        </Col>
                        <Col size={6}></Col>
                        <Col size={37} style={styles.cajader}>
                            <Row size={1}>
                                <TextInput name="nombre" value={this.state.platillo.nombre} onChangeText={text => this.handleChange_nombre(text)} placeholder="" style={styles.textinput}></TextInput>
                            </Row>
                            <Row size={1}>
                                <TextInput keyboardType={'numeric'}  name="para_cuantos" value={this.state.platillo.para_cuantos} onChangeText={text => this.handleChange_raciones(text)} placeholder="" style={styles.textinput}></TextInput>
                            </Row>
                            <Row size={1}>
                                <TextInput keyboardType={'numeric'}  name="costo_actual" value={this.state.platillo.costo_actual} onChangeText={text => this.handleChange_costo_actual(text)} placeholder="" style={styles.textinput}></TextInput>
                            </Row>
                            <Row size={1}>
                                <TextInput keyboardType={'numeric'}  name="precio_actual" value={this.state.platillo.precio_actual} onChangeText={text => this.handleChange_precio_actual(text)} placeholder="" style={styles.textinput}></TextInput>
                            </Row>
                            <Row size={1}>
                                <TextInput name="categoria" value={this.state.platillo.categoria} onChangeText={text => this.handleChange_categoria(text)} placeholder="" style={styles.textinput}></TextInput>
                            </Row>
                            <Row size={1}>
                                <TextInput keyboardType={'numeric'}  name="tmp_preparacion" value={this.state.platillo.tmp_preparacion} onChangeText={text => this.handleChange_t_prepar(text)} placeholder="" style={styles.textinput}></TextInput>
                            </Row>
                        </Col>
                        <Col size= {10}></Col>
                    </Row>
                    <Row style={styles.part6}>
                        <Button rounded style={styles.button} onPress={this.crearPlatillo}>
                            <Text style={{color:'white', fontWeight:'bold', textAlign:'center'}}>CREAR PLATILLO</Text>
                        </Button>
                    </Row>
                    <Row style={{flex: 3}}></Row>
                    
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
        flex: 1.5,
        alignItems: 'center',
        justifyContent: 'center',

    },
    part4: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    part5: {
        flex: 10
    },
    part6:{
        flex: 1,
        alignItems:'center',
        justifyContent:'center'
    },

    cajaizq: {
        backgroundColor: '#93D488',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '4%',
        borderRadius: 10,
    },
    cajader: {
        backgroundColor: '#93D488',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '4%',
        borderRadius: 10,
    },
    encabezados1: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: 'bold',
        backgroundColor: '#29C28B',
        borderRadius: 10,
        width: '85%',
        textAlign: 'center',
        padding: 5
    },
    textinput: {
        color: 'black',
        backgroundColor: '#FAEFE6',
        width: '80%',
        height: '50%',
        textAlign: 'center',
        borderRadius: 10,
    },
    button:{
        justifyContent: 'center',
        marginTop: '5%',
        width: '60%',
        backgroundColor: '#C4C4C4'
    }
})
export default Anadir_platillo2;