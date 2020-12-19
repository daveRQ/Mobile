import React, { Component } from 'react';
import { AppLoading } from 'expo';
import { StatusBar, StyleSheet, TouchableOpacity, Text, ToastAndroid, TextInput, View, Image, ScrollView } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import {
    Container, Content, Form, Item, Input, Label, Picker, ListItem, Radio, Right, Left, DatePicker, Button, Header, Footer, Body
}
    from 'native-base';
import { LinearGradient } from 'expo-linear-gradient'
import { Table, TableWrapper, Row as FilaTabla, Cell } from 'react-native-table-component';
import { Stars } from 'react-native-stars'
import { Icon } from 'react-native-vector-icons/MaterialCommunityIcons'

import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import Head2 from '../compartido/Header2';

import Barra from '../../src/personal/barra.svg'
import Mas from '../../src/Dia_operacional/mas.svg'
import Menos from '../../src/Dia_operacional/menos.svg'
import Agotado from '../../src/Dia_operacional/agotado.svg'
import Starllena from '../../src/Dia_operacional/starllena.svg'
import Starvacia from '../../src/Dia_operacional/starvacia.svg'


import AsyncStorage from '@react-native-community/async-storage';

//funciones de AsyncStorage
import { getItem, setItem, removeItem  } from './../StorageHelper'

//cambiar el ipHost segun el server
const {ipHost} = require('./../../ipHost')


class En_curso_dia_op extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isReady: false,
            fecha: Date(),
            token:null,
            id_restaurante:null,
            tableHead: ['PLATO', 'PRECIO', 'TOTAL\nVENDIDOS', ''],
            tableData: [],
            send: {
                id_dia_operacional: null,
                id_platillo: null
            },
            nombre_perro: undefined,
            valor_perro: undefined,
            nombre_estrella: undefined,
            valor_estrella: undefined
        };
        this.listar = this.listar.bind(this);
        this.sumar = this.sumar.bind(this);
        // removeItem("id_dia_operacional");
        this.idd = '';
    }

    async listar() {
        fetch('http://' + ipHost + '/api/diaOperacional/listarDiaOperacional', {
            method: 'POST',
            body: JSON.stringify(this.state.send),
            headers: {
                'Acccept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.result) {
                    this.setState({
                        tableData: data.platillos
                    });
                }
                else {
                    ToastAndroid.showWithGravityAndOffset(data.message, ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
                }
            });
    }

    async terminar() {
        // let val_id = setItem("id_dia_op", id_dia_op);
        // this.props.navigation.navigate("Terminar_dia_op");
        // console.log(this.state.send.)
        fetch('http://' + ipHost + '/api/diaOperacional/terminarDiaOperacional', {
            method: 'POST',
            body: JSON.stringify(this.state.send),
            headers: {
                'Acccept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if (data.message) {
                ToastAndroid.showWithGravityAndOffset(data.message, ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
                removeItem("id_dia_operacional")
                this.props.navigation.navigate('Inicio')
            }
            else {
                ToastAndroid.showWithGravityAndOffset("Error", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
            }
        });

    }

    async sumar(id_platillo) {
        this.state.send.id_platillo = id_platillo;
        
        fetch('http://' + ipHost + '/api/diaOperacional/agregarVenta', {
            method: 'POST',
            body: JSON.stringify(this.state.send),
            headers: {
                'Acccept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then(res => res.json())
        .then(data => {
            if (data.result) {
                this.state.nombre_perro = data.nombre_perro;
                this.state.valor_perro = data.valor_perro;
                this.state.nombre_estrella = data.nombre_estrella;
                this.state.valor_estrella = data.valor_estrella;
                ToastAndroid.showWithGravityAndOffset(data.message, ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
            }
            else {
                ToastAndroid.showWithGravityAndOffset("Error", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
            }
            this.listar();
        });
    }

    restar(id_platillo) {        
        this.state.send.id_platillo = id_platillo;
        
        fetch('http://' + ipHost + '/api/diaOperacional/quitarVenta', {
            method: 'POST',
            body: JSON.stringify(this.state.send),
            headers: {
                'Acccept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then(res => res.json())
        .then(data => {
            if (data.result) {
                this.state.nombre_perro = data.nombre_perro;
                this.state.valor_perro = data.valor_perro;
                this.state.nombre_estrella = data.nombre_estrella;
                this.state.valor_estrella = data.valor_estrella;
                ToastAndroid.showWithGravityAndOffset(data.message, ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
            }
            else {
                ToastAndroid.showWithGravityAndOffset("Error", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
            }
            this.listar();
        });
    }

    setear_agotado(index) {

    }

    async componentDidMount() {
        //get jwt
        getItem('jwt').then(token => {
            this.setState({ token });
        });

        //get idRestaurante y luego listar los platillos
        getItem('id_restaurante').then(id_restaurante => {
            this.setState({ id_restaurante: id_restaurante });
        });
        getItem('id_dia_operacional').then(id => {
            this.setState({ 
                send: {
                    ...this.state.send,
                    id_dia_operacional: id
                }
            });
            this.listar();
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
            // <TouchableOpacity onPress={() => this._alertIndex(index)}>
                <Row style={{ flexDirection: 'row', width: '110%', height: 30, alignContent: 'center', justifyContent: 'center', alignItems: 'center'}}>
                    <Col size={1} style={{alignItems:'center',justifyContent:'center', marginLeft:'10%'}}>
                        <TouchableOpacity style={{ width: '100%', height: '100%' }}
                            onPress={() => this.sumar(data)}>
                            <Mas width='60%' height='60%' />
                        </TouchableOpacity>                        
                    </Col>
                    <Col size={1} style={{ alignItems: 'center', justifyContent: 'center', marginLeft: '10%',marginTop:'10%'}}>
                        <TouchableOpacity style={{ width: '100%', height: '100%' }}
                            onPress={() => this.restar(data)}>
                            <Menos width='50%' height='50%' />
                        </TouchableOpacity>
                    </Col>
                    {/* <Col size={1} style={{ alignItems: 'center', justifyContent: 'center', marginLeft: '10%', marginBottom:'10%' }}>
                        <TouchableOpacity style={{ width: '100%', height: '100%' }}
                            onPress={() => this.sumar(data)}>
                            <Agotado width='150%' height='150%' />
                        </TouchableOpacity>
                    </Col> */}
                </Row>
            // </TouchableOpacity>
        );
        return (
            <Container>
                <StatusBar hidden />
                <Head2 navigation={this.props.navigation} />
                <Grid style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Row style={styles.part1}>
                        <Text>    Dia Operacional / En Curso</Text>
                    </Row>
                    <Row style={styles.part2}>
                        <Barra width='100%' height='100%' />
                    </Row>
                    <Row style={{ flex: 0.5 }}></Row>
                    <Row style={styles.part3}>
                        <Text style={styles.encabezados1}>VENTA DE PLATILLOS</Text>
                    </Row>
                    <Row style={{ flex: 0.5 }}></Row>
                    <Row style={styles.part4}>
                        <Col size={70} style={{ backgroundColor: '#23662E', borderBottomRightRadius: 10, borderTopRightRadius: 10, shadowColor: '#23662E', shadowOffset: { width: 2, height: 12 }, shadowRadius: 4, elevation: 12, }}>
                            <Row>
                                <Col size={40} style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ color: '#74F4F4' }}>FECHA</Text>
                                </Col>
                                <Col size={60}>
                                    <DatePicker rounded
                                        style={{ color: '#74F4F4' }}
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
                            </Row>
                            <Row>
                                <Col size={40} style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ color: '#FFFFFF' }}>INICIO</Text>
                                </Col>
                                <Col size={60}>
                                    <DatePicker rounded
                                        style={{ color: '#74F4F4' }}

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
                            </Row>
                        </Col>
                        <Col size={30} style={{ alignItems: 'center', justifyContent: 'center', alignContent: 'center' }}>
                            <Button rounded style={styles.button} onPress={() => this.terminar()}>
                                <Text style={{ color: 'black', fontWeight: 'bold', textAlign: 'center' }}>TERMINAR</Text>
                            </Button>
                        </Col>
                    </Row>
                    <Row style={{ flex: 0.5 }}></Row>
                    <Row style={styles.part5}>
                        <Col size={55} style={{ borderLeftColor: '#3C752E', borderRightWidth: 1, flexDirection:'row', alignItems:'center'}}>
                            <Starllena width='20%' height='35%' />
                            <Starllena width='20%' height='35%' />
                            <Starllena width='20%' height='35%' />
                            <Starllena width='20%' height='35%' />
                            <Starllena width='20%' height='35%' />
                            {/*<Stars 
                                default={2.5}
                                count={5}
                                half={true}
                                starSize={50}
                                fullStar={<Icon name={'star'} style={[styles.myStarStyle]} />}
                                emptyStar={<Icon name={'star-outline'} style={[styles.myStarStyle, styles.myEmptyStarStyle]} />}
                                halfStar={<Icon name={'star-half'} style={[styles.myStarStyle]} />}
                            />*/}
                        </Col>
                        <Col size={22.5} style={{ alignItems: 'center', justifyContent: 'center', borderLeftColor: '#3C752E', borderRightWidth: 1 }}>
                            <Text style={{ fontSize: 10, textAlign: 'center' }}>Americano</Text>
                        </Col>
                        <Col size={22.5} style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: '#CE1919', fontSize: 10, textAlign: 'center' }}>40 vendidos</Text>
                        </Col>

                    </Row>
                    <Row style={styles.part6}>
                        <Col size={55} style={{ borderLeftColor: '#3C752E', borderRightWidth: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <Starllena width='20%' height='35%' />
                            <Starllena width='20%' height='35%' />
                            <Starvacia width='20%' height='35%' />
                            <Starvacia width='20%' height='35%' />
                            <Starvacia width='20%' height='35%' />
                        </Col>
                        <Col size={22.5} style={{ alignItems: 'center', justifyContent: 'center', borderLeftColor: '#3C752E', borderRightWidth: 1 }}>
                            <Text style={{ fontSize: 10, textAlign: 'center' }}>Chaufa</Text>
                        </Col>
                        <Col size={22.5} style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: '#CE1919', fontSize: 10, textAlign: 'center' }}>10 vendidos</Text>
                        </Col>
                    </Row>
                    <Row style={{ flex: 0.5 }}></Row>
                    <Row style={styles.part7}>
                        <Col size={7.5}>

                        </Col>
                        <Col size={85}>
                            <ScrollView nestedScrollEnabled={true} contentContainerStyle={{ backgroundColor: '#FFFFFF', alignContent: 'center', flexGrow: 1 }}>
                                {/*<LinearGradient colors={['#E8B020', '#FE7153']} style={{ flex: 1,alignItems: 'center', borderRadius: 5,flexDirection:'row'}}>*/}
                                <Table borderStyle={{ borderColor: '#FFFFFF', borderWidth: 1 }}>
                                    <FilaTabla data={this.state.tableHead} style={styles.head} textStyle={styles.texthead} />
                                    {
                                        this.state.tableData.map((rowData, index) => (
                                            <TableWrapper key={index} style={styles.row}>
                                                
                                                <Cell key={rowData._id} data={rowData.nombre} textStyle={styles.text} />
                                                <Cell key={rowData._id} data={parseFloat(rowData.precio)} textStyle={styles.text} />
                                                <Cell key={rowData._id} data={rowData.vendidos} textStyle={styles.text} />
                                                <Cell key={rowData._id} data={element(rowData._id)} textStyle={styles.text} />

                                            </TableWrapper>
                                        ))
                                    }
                                </Table>
                                {/*</LinearGradient>*/}
                            </ScrollView>
                        </Col>
                        <Col size={7.5}>

                        </Col>
                    </Row>
                    <Row style={{ flex: 1 }}></Row>
                </Grid>

            </Container>
        )
    }
}

const styles = StyleSheet.create({
    part1: {
        flex: 0.8,
        alignItems: 'flex-end',
        width: '90%'
    },
    part2: {
        flex: 1,
    },
    part3: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    part4: {
        flex: 3
    },
    part5: {
        flex: 2,
        width: '85%',
        borderColor: '#3C752E',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: '1%',
    },
    part6: {
        flex: 2,
        width: '85%',
        borderColor: '#3C752E',
        borderWidth: 1,
        borderRadius: 10,
        marginTop: '1%',
    },
    part7: {
        flex: 13
    },
    encabezados1: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: 'bold',
        backgroundColor: '#57B895',
        borderRadius: 10,
        width: '85%',
        textAlign: 'center',
        padding: 5
    },
    head: { height: 40, backgroundColor: '#57B89595' },
    texthead: { margin: 5, color: '#FFF8F8', textAlign: 'center', fontSize: 7.5, justifyContent: 'center' },
    text: { margin: 5, color: 'black', textAlign: 'center', fontSize: 10, justifyContent: 'center' },
    row: { flexDirection: 'row', backgroundColor: '#57B89595', alignItems: 'center', flexDirection: 'row', justifyContent: 'center', alignContent: 'center', height:35},
    btn: { width: '80%', height: 15, backgroundColor: '#C16767', borderRadius: 5, alignContent: 'center', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginLeft: '10%', marginTop: '10%' },
    btnText: { textAlign: 'center', color: '#fff', fontSize: 10 },
    button: {
        justifyContent: 'center',
        marginTop: '5%',
        marginLeft: '7%',
        width: '80%',
        backgroundColor: '#EFC532'
    },
    myStarStyle: {
        color: 'yellow',
        backgroundColor: 'transparent',
        textShadowColor: 'black',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    myEmptyStarStyle: {
        color: 'white',
    }
})
export default En_curso_dia_op;