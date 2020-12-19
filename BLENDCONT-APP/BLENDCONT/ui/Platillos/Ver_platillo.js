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
import Preparacion from '../../src/Platillos/preparacion'


//funciones de AsyncStorage
import { getItem, setItem } from './../StorageHelper'

//cambiar el ipHost segun el server
const {ipHost} = require('./../../ipHost')

class Ver_platillo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isReady: false,
            fecha: Date(),
            token: null,
            id_platillo: null,
            tableHead: ['INGREDIENTE', 'UNIDAD', 'CANTIDAD'],
            tableData: [],
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

        this.getPlatillo = this.getPlatillo.bind(this);
    }

    getPlatillo() {
        fetch('http://'+ipHost+'/api/platillo/platilloPorID/',{
            method: 'POST',
            body: '{"id_platillo":"'+this.state.id_platillo+'"}',
            headers: {
                'Acccept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': this.state.token
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.result) {
                    this.setState({platillo: data.platillo})
                }
                else {
                    ToastAndroid.showWithGravityAndOffset(data.message, ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50 );
                }
            });
    }

    async componentDidMount() {
        //get jwt
        getItem('jwt').then(token => {
            this.setState({ token });
        });

        //get id_platillo y luego listar los ingredientes
        getItem('id_platillo').then(id_platillo => {
            this.setState({ id_platillo });
            this.getPlatillo();
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
        const state = this.state;
        const element = (data, index) => (
            <TouchableOpacity onPress={() => this._alertIndex(index)}>
                <Row style={styles.btn}>
                    <Text style={styles.btnText}>Detalles</Text>
                </Row>
            </TouchableOpacity>
        );
        return (
            <Container>
                <StatusBar hidden />
                <Head2 navigation={this.props.navigation} />
                <Grid style={{ justifyContent: 'center' }}>
                    <Row style={styles.part1}>
                        <Text>    Platillos / Ver Platillo</Text>
                    </Row>
                    <Row style={styles.part2}>
                        <Barra width='100%' height='100%' />
                    </Row>
                    <Col style={{flex:20}}>
                            <Row style={styles.part3}>
                                <Text style={styles.encabezados1}>{this.state.platillo.nombre}</Text>
                            </Row>
                            <Row style={{ height: '2%' }}></Row>
                            <Row style={styles.part4}>
                                <Col size={2}></Col>
                                <Col size={4} style={{ borderRadius: 10, backgroundColor: '#EBB15F', alignItems: 'center' }}>
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

                                        disabled={true}
                                    />
                                </Col>
                                <Col size={2}></Col>
                            </Row>
                            <Row style={{height:'2%'}}></Row>

                            <Row style={styles.part5}>
                                <Col size={10}></Col>
                                <Col size={50} style={styles.cajaizq}>
                                    <Row size={1}>
                                        <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>RACIONES</Text>
                                    </Row>
                                    <Row size={1}>
                                        <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>COSTO ACTUAL</Text>
                                    </Row>
                                    <Row size={1}>
                                        <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>PRECIO ACTUAL</Text>
                                    </Row>
                                    <Row size={1}>
                                        <Text style={{ fontWeight: 'bold', textAlign: 'center' }}> CATEGORIA</Text>
                                    </Row>
                                    <Row size={1}>
                                        <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>TIEMPO PREP.</Text>
                                    </Row>
                                </Col>
                                <Col size={6}></Col>
                                <Col size={50} style={styles.cajader}>
                                    <Row size={1}>
                                        <Text style={styles.textoutput}>{this.state.platillo.para_cuantos}</Text>
                                    </Row>
                                    <Row size={1}>
                                        <Text style={styles.textoutput}>{this.state.platillo.costo_actual}</Text>
                                    </Row>
                                    <Row size={1}>
                                        <Text style={styles.textoutput}>{this.state.platillo.precio_actual}</Text>
                                    </Row>
                                    <Row size={1}>
                                        <Text style={styles.textoutput}>{this.state.platillo.categoria}</Text>
                                    </Row>
                                    <Row size={1}>
                                        <Text style={styles.textoutput}>{this.state.platillo.tmp_preparacion}</Text>
                                    </Row>
                                </Col>
                                <Col size={10}></Col>
                            </Row>
                            
                            <Row style={styles.part6}>
                                <Text style={styles.encabezados1}>INFORMACIÓN</Text>
                            </Row>
                            
                            <Row style={styles.tabla}>
                                <ScrollView nestedScrollEnabled={true}>
                                    <Table borderStyle={{ borderColor: '#FFFFFF', borderWidth:1}}>
                                        <FilaTabla data={this.state.tableHead} style={styles.head} textStyle={styles.text} />
                                        {
                                            this.state.platillo.ingredientes.map((rowData, index) => (
                                                <TableWrapper key={index} style={styles.row}>
                                                    <Cell key={rowData._id} data={rowData.nombre} textStyle={styles.text} />
                                                    <Cell key={rowData._id} data={rowData.unidad} textStyle={styles.text} />
                                                    <Cell key={rowData._id} data={rowData.cantidad} textStyle={styles.text} />
                                                </TableWrapper>
                                            ))
                                        }
                                    </Table>
                                </ScrollView>

                            </Row>
                            <Row style={{ height: '2%' }}></Row>
                            <Row style={styles.part7}>
                                <Preparacion width='85%' height='85%'/>
                            </Row>
                            <Row style={styles.part8}>
                                <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>{this.state.platillo.preparacion}</Text>
                            </Row>
                            {/*<Row style={styles.part8}>
                                <Col style={{alignItems:'center', justifyContent:'center',alignContent:'center', flexDirection:'row', marginBottom: '5%'}}>
                                    <Button rounded style={styles.button}>
                                        <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>CREAR PLATILLO</Text>
                                    </Button>
                                </Col>
                                <Col style={{ alignItems: 'center', justifyContent: 'center', alignContent: 'center', flexDirection: 'row', marginBottom: '5%'}}>
                                    <Button rounded style={styles.button}>
                                        <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>CREAR PLATILLO</Text>
                                    </Button>
                                </Col>
                                
                            </Row>*/}
                    </Col>
                    
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
        alignItems: 'center',
        justifyContent: 'center',
        height: '5%'   
    },
    part4: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '5%' 
    },
    part5: {
        height: '25%' 
    },
    part6: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '10%' 
    },
    tabla: {
        width: '85%',
        marginStart: '7.5%',
        height: '22%'  
    },
    part7: {
        height: '12%',
        width: '100%',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    part8: {
        height: '20%', 
        alignContent: 'center',
        justifyContent: 'center',
    },

    cajaizq: {
        backgroundColor: '#DEC777',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '4%',
        borderRadius: 10,
    },
    cajader: {
        backgroundColor: '#ECCA51',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '4%',
        borderRadius: 10,
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
    head: { height: 40, backgroundColor: '#F1AC5A' },
    text: { margin: 6, color: '#FFFFFF', textAlign: 'center' },
    row: { flexDirection: 'row', backgroundColor: '#F1AC5A', alignItems: 'center' },
    textoutput: {
        color: 'black',
        backgroundColor: '#FAEFE6',
        width: '80%',
        height: '75%',
        textAlign: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    button: {
        justifyContent: 'center',
        marginTop: '5%',
        width: '60%',
        backgroundColor: '#C4C4C4'
    }
})
export default Ver_platillo;