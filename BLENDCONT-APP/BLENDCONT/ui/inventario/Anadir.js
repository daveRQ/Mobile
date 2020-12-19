import React, { Component } from 'react';
import { AppLoading } from 'expo';
import { StatusBar, StyleSheet, TouchableOpacity, Text, ToastAndroid, TextInput, View, Image } from 'react-native';
import {
    Container, Content, Form, Item, Input, Label, Picker, Icon, ListItem, Radio, Right, Left, DatePicker, Button, Header, Footer, Body
}
    from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import Head2 from '../compartido/Header2';
import Barra from '../../src/personal/barra.svg'

import AsyncStorage from '@react-native-community/async-storage';

//funciones de AsyncStorage
import { getItem, setItem, removeItem  } from './../StorageHelper'

//cambiar el ipHost segun el server
const {ipHost} = require('./../../ipHost')

class Anadir extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isReady: false,
            id_restaurante: null,
            fecha: Date(),
            producto: {
                nombre: '',
                categoria: '',
                unidad: '',
                cantidad: '',
                cst_unidad: '',
                proveedor: '',
                id_restaurante: ''
            }
        };
        this.listofun = this.listofun.bind(this);
    }

    listofun(e) {
        fetch('http://' + ipHost + '/api/inventario/ingresoProducto', {
            method: 'POST',
            body: JSON.stringify(this.state.producto),
            headers: {
                'Acccept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': this.state.token
            }
        })
            .then(res => res.json())
            .then(data => {
                ToastAndroid.showWithGravityAndOffset(
                    data.message,
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                );
                this.props.navigation.navigate('Inventario');
            });
        e.preventDefault();
    }
    
    handleChange_nombre(value) {
        this.setState({
            producto: {
                ...this.state.producto,
                nombre: value
            }
        });
    }
    handleChange_categoria(value) {
        this.setState({
            producto: {
                ...this.state.producto,
                categoria: value
            }
        });
    }
    handleChange_unidad(value) {
        this.setState({
            producto: {
                ...this.state.producto,
                unidad: value
            }
        });
    }
    handleChange_cantidad(value) {
        this.setState({
            producto: {
                ...this.state.producto,
                cantidad: value
            }
        });
    }
    handleChange_cst_unidad(value) {
        this.setState({
            producto: {
                ...this.state.producto,
                cst_unidad: value
            }
        });
    }
    handleChange_proveedor(value) {
        this.setState({
            producto: {
                ...this.state.producto,
                proveedor: value
            }
        });
    }
    handleChange_id_inventario(value) {
        this.setState({
            producto: {
                ...this.state.producto,
                id_inventario: value
            }
        });
    }

    async componentDidMount() {
        //get jwt
        getItem('jwt').then(token => {
            this.setState({ token });
        });

        //get idRestaurante y luego listar los platillos
        getItem('id_restaurante').then(id_restaurante => {
            this.setState({ 
                id_restaurante: id_restaurante,
                producto: {
                    ...this.state.platillo,
                    id_restaurante: id_restaurante
                }
            });
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
                <Grid>
                    <Row style={styles.part1}>
                        <Text>  Productos alimentarios/Añadir</Text>
                    </Row>
                    <Row style={styles.part2}>
                        <Barra width='100%' height='100%' />
                    </Row>
                    <Row style={styles.part3}>
                        <Text style={styles.encabezados1} numberOfLines={1}>ELEGIR</Text>
                    </Row>
                    <Row style={styles.part4}>
                        <Col style={{flex:1}}></Col>
                        <Col style={{ flex: 1, borderRadius: 10, backgroundColor: '#EBB15F', alignItems: 'center'}}>
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
                        <Col style={{ flex: 1 }}></Col>
                        
                    </Row>
                    <Row style={styles.part5}>
                        <Content>
                            <Form>
                                <Row style={{flex: 2, flexDirection: 'row', alignItems: 'center'}}>
                                    <Col style={{ flex: 1 }}>
                                        <Text style={styles.textoizq}>NOMBRE</Text>
                                    </Col>
                                    <Col style={{ flex: 2 }}>
                                        <TextInput name="nombre" value={this.state.producto.nombre} onChangeText={text => this.handleChange_nombre(text)} placeholder="" style={styles.textinput}></TextInput>
                                    </Col>
                                </Row>
                                <Row style={{ flex: 2, flexDirection: 'row', alignItems: 'center' }}>
                                    <Col style={{ flex: 1 }}>
                                        <Text style={styles.textoizq}>CATEGORÍA</Text>
                                    </Col>
                                    <Col style={{ flex: 2 }}>
                                        <TextInput name="categoria" value={this.state.producto.categoria} onChangeText={text => this.handleChange_categoria(text)} placeholder="" style={styles.textinput}></TextInput>
                                    </Col>
                                </Row>
                                <Row style={{ flex: 2, flexDirection: 'row', alignItems: 'center' }}>
                                    <Col style={{ flex: 1 }}>
                                        <Text style={styles.textoizq}>UNIDAD</Text>
                                    </Col>
                                    <Col style={{ flex: 2 }}>
                                        <TextInput name="unidad" value={this.state.producto.unidad} onChangeText={text => this.handleChange_unidad(text)} placeholder="" style={styles.textinput}></TextInput>
                                    </Col>
                                </Row>
                                <Row style={{ flex: 2, flexDirection: 'row', alignItems: 'center' }}>
                                    <Col style={{ flex: 1 }}>
                                        <Text style={styles.textoizq}>CANTIDAD</Text>
                                    </Col>
                                    <Col style={{ flex: 2 }}>
                                        <TextInput name="cantidad" value={this.state.producto.cantidad} onChangeText={text => this.handleChange_cantidad(text)} placeholder="" style={styles.textinput}></TextInput>
                                    </Col>
                                </Row>
                                <Row style={{ flex: 2, flexDirection: 'row', alignItems: 'center' }}>
                                    <Col style={{ flex: 1 }}>
                                        <Text style={styles.textoizq}>COSTO X{"\n"}UNIDAD</Text>
                                    </Col>
                                    <Col style={{ flex: 2 }}>
                                        <TextInput name="costo" value={this.state.producto.costo} onChangeText={text => this.handleChange_cst_unidad(text)} placeholder="" style={styles.textinput}></TextInput>
                                    </Col>
                                </Row>
                                {/*<Row style={{ flex: 2, flexDirection: 'row', alignItems: 'center' }}>
                                    <Col style={{ flex: 1 }}>
                                        <Text style={styles.textoizq}>CADUCIDAD</Text>
                                    </Col>
                                    <Col style={{ flex: 2 }}>
                                        <TextInput name="caducidad" value={this.state.producto.caducidad} onChangeText={text => this.handleChange_caducidad(text)} placeholder="" style={styles.textinput}></TextInput>
                                    </Col>
                                </Row>*/}
                                <Row style={{ flex: 2, flexDirection: 'row', alignItems: 'center' }}>
                                    <Col style={{ flex: 1 }}>
                                        <Text style={styles.textoizq}>PROVEEDOR</Text>
                                    </Col>
                                    <Col style={{ flex: 2 }}>
                                        <TextInput name="proveedor" value={this.state.producto.proveedor} onChangeText={text => this.handleChange_proveedor(text)} placeholder="" style={styles.textinput}></TextInput>
                                    </Col>
                                </Row>
                            </Form>
                        </Content>
                    </Row>
                    <Row style={styles.part6}>
                        <Button rounded style={styles.buttonlisto} onPress={this.listofun}>
                            <Text style={styles.textolisto}>Listo</Text>
                        </Button>
                    </Row>
                    <Row style={{flex:2}}>

                    </Row>
                </Grid>

            </Container>
        );
    }
}

// SUMA FLEX = 27.8
const styles = StyleSheet.create({
    part1: {
        flex: 0.8,
        alignItems: 'flex-end'
    },
    part2: {
        flex: 1
    },
    part3: {
        flex: 2,
        alignItems: 'center',
    },
    part4: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    part5: {
        flex: 10
    },
    part6: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center'
    },
    encabezados1: {
        color: "white",
        fontSize: 14,
        fontWeight: 'bold',
        backgroundColor: "#F09643",
        textAlign: 'center',
        marginLeft: '4%',
        marginRight: '2%',
        marginTop: '2%',
        marginBottom: '2%',
        paddingVertical: 4,
        paddingHorizontal: 133,
        padding: 10,
        overflow: 'hidden'
    },
    textoizq: {
        color: "black",
        borderBottomLeftRadius: 1,
        fontWeight: 'bold',
        marginStart: '30%',
        marginRight: '1%',
        marginTop: '2%',
        marginBottom: '2%',
        borderBottomColor: '#F09643',
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderLeftColor: '#F09643',
        paddingLeft: 2
    },
    textinput: {
        color: 'black',
        borderWidth: 1,
        borderColor: '#F09643',
        backgroundColor: '#F09643',
        padding: 2,
        width: '75%',
        marginStart: '10%',
        textAlign: 'center',
        marginEnd: '15%',
        borderRadius: 10,
        marginTop: '2%',
    },
    textolisto: {
        color: "white",
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    buttonlisto: {
        justifyContent: 'center',
        marginTop: '5%',
        width: '60%',
        backgroundColor: '#C4C4C4'
    },
    datePickerStyle: {
        width: 200,
        marginTop: 20,
        color: 'red'
    },
})

export default Anadir;