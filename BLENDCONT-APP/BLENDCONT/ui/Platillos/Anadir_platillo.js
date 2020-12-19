import React, { Component } from 'react';
import { AppLoading } from 'expo';
import { StatusBar, StyleSheet, TouchableOpacity, Text, ToastAndroid, TextInput, View, Image, ScrollView} from 'react-native';
import { Col, Row, Grid} from 'react-native-easy-grid';
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
import { getItem, setItem, setObject, getObject, removeItem  } from './../StorageHelper'

//cambiar el ipHost segun el server
const {ipHost} = require('./../../ipHost')

class Anadir_platillo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isReady: false,
            token: null,
            id_restaurante: null,
            ingrediente: {
                nombre: '',
                unidad: '',
                cantidad: '',
            },
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
            },
            tableHead: ['INGREDIENTE', 'UNIDAD', 'CANTIDAD', ''],
        };

        this.agregarIngrediente = this.agregarIngrediente.bind(this);
        this.borrarIngrediente = this.borrarIngrediente.bind(this);
        this.redirigir_agregarPreparacion = this.redirigir_agregarPreparacion.bind(this);
        this.redirigir_anadir_platillo2 = this.redirigir_anadir_platillo2.bind(this);
    }

    agregarIngrediente() {
        fetch('http://'+ipHost+'/api/inventario/ProductoPorNombre/',{
            method: 'POST',
            body: JSON.stringify(this.state.ingrediente),
            headers: {
                'Acccept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': this.state.token
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.result) {
                    let ingrediente = {
                        id_ingrediente: data.producto._id,
                        nombre: this.state.ingrediente.nombre,
                        unidad: this.state.ingrediente.unidad,
                        cantidad: this.state.ingrediente.cantidad,
                    }
                    this.state.platillo.ingredientes.push(ingrediente);

                    //borrar el estado que tiene el producto
                    this.setState({
                        ingrediente: {
                            nombre: '',
                            unidad: '',
                            cantidad: '',
                        }
                    });

                    ToastAndroid.showWithGravityAndOffset(data.message, ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50 );
                }
                else {
                    ToastAndroid.showWithGravityAndOffset(data.message, ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50 );
                }
                window.location.reload(false);
            });
    }
    borrarIngrediente(index){
        this.state.platillo.ingredientes.splice(index, 1);
        this.setState({
            platillo: {
                ...this.state.platillo
            }
        });
    }

    redirigir_agregarPreparacion() {  
        setObject("platillo", this.state.platillo);
        this.props.navigation.navigate('Preparacion_platillo');
    }

    redirigir_anadir_platillo2() {
        setObject("platillo", this.state.platillo);
        this.props.navigation.navigate('Anadir_platillo2');
    }

    handleChange_PlatilloNombre(value) {
        this.setState({
            platillo: {
                ...this.state.platillo,
                nombre: value
            }
        });
    }
    handleChange_IngredienteNombre(value) {
        this.setState({
            ingrediente: {
                ...this.state.producto,
                nombre: value
            }
        });
    }
    handleChange_IngredienteUnidad(value) {
        this.setState({
            ingrediente: {
                ...this.state.ingrediente,
                unidad: value
            }
        });
    }
    handleChange_IngredienteCantidad(value) {
        this.setState({
            ingrediente: {
                ...this.state.ingrediente,
                cantidad: parseFloat(value)
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
                platillo:{
                    ...this.state.platillo,
                    id_restaurante: id_restaurante
                }
            });
            // console.log(this.state.id_restaurante);
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
        const state = this.state;
        const element = (index) => (
            <TouchableOpacity onPress={() => this.borrarIngrediente(index)}>
                <Row style={styles.btn}>
                    <Text style={styles.btnText}>QUITAR</Text>
                </Row>
            </TouchableOpacity>
        );
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
                    <Col style={styles.part2_1}>
                            <Row style={styles.part3}>
                                <TextInput name="nombre" value={this.state.platillo.nombre} onChangeText={text => this.handleChange_PlatilloNombre(text)} placeholder="NOMBRE DEL PLATILLO" style={styles.encabezados1}></TextInput>
                            </Row>
                            <Row style={styles.part4}>
                                <Col>
                                    <Row>
                                        <Col style={styles.part5}>
                                            <TextInput name="nombre" value={this.state.ingrediente.nombre} onChangeText={text => this.handleChange_IngredienteNombre(text)} placeholder=" NOMBRE DE INGREDIENTE" style={styles.textinput}></TextInput>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col style={styles.part5}>
                                            <TextInput name="unidad" value={this.state.ingrediente.unidad} onChangeText={text => this.handleChange_IngredienteUnidad(text)} placeholder=" UNIDAD" style={styles.textinput}></TextInput>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col style={styles.part5}>
                                            <TextInput keyboardType={'numeric'} name="cantidad" value={this.state.ingrediente.cantidad} onChangeText={text => this.handleChange_IngredienteCantidad(text)} placeholder=" CANTIDAD" style={styles.textinput}></TextInput>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            
                            
                            <Row >
                                <Button rounded style={styles.buttonan} onPress={this.agregarIngrediente}>
                                    <Text style={styles.textoAnadir}>AÑADIR</Text>
                                </Button>
                            </Row>
                            <Row style={styles.part6}>
                                <Text style={styles.encabezados2}>LISTA DE INGREDIENTES</Text>
                            </Row>
                            <Row style={styles.tabla}>
                                <ScrollView style={styles.part9} nestedScrollEnabled={true}>
                                    <Table borderStyle={{ borderColor: '#FFFFFF', borderWidth: 1 }}>
                                        <FilaTabla data={this.state.tableHead} style={styles.head} textStyle={styles.text} />
                                        {
                                            this.state.platillo.ingredientes.map((rowData, index) => (
                                                <TableWrapper key={index} style={styles.row}>
                                                    <Cell key={rowData._id} data={rowData.nombre} textStyle={styles.text} />
                                                    <Cell key={rowData._id} data={rowData.unidad} textStyle={styles.text} />
                                                    <Cell key={rowData._id} data={rowData.cantidad} textStyle={styles.text} />
                                                    <Cell key={rowData._id} data={element(index)} textStyle={styles.text} />
                                                </TableWrapper>
                                            ))
                                        }
                                    </Table>
                                </ScrollView>
                            </Row>
                            <Row style={styles.part7}>
                                <Button rounded style={styles.buttonan2} onPress={this.redirigir_agregarPreparacion}>
                                    <Text style={styles.textoAnadir}>AÑADIR{"\n"}PREPARACIÓN</Text>
                                </Button>
                            </Row>
                            <Row style={styles.part8}>
                                <Button rounded style={styles.buttonan} onPress={this.redirigir_anadir_platillo2}>
                                    <Text style={styles.textoAnadir}>SIGUIENTE</Text>
                                </Button>
                            </Row>

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
    part2_1: {
        flex: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    part3: {
    },
    part4: {
        height: '15%',
    },
    part5: {
        flex: 2,
        justifyContent: 'center', 
        alignItems: 'center'
    },
    part6: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    part7: {
    },
    part8: {
    },
    part9: {
    },
    tabla: {
        width: '85%',
        //marginTop: '0.5%',
        height: '30%'
    },
    head: { height: 40, backgroundColor: '#F1AC5A' },
    text: { margin: 6, color: '#FFFFFF', textAlign: 'center', fontSize: 10},
    row: { flexDirection: 'row', backgroundColor: '#F1AC5A', alignItems: 'center' },
    btn: { width: '80%', height: 15, backgroundColor: '#C16767', borderRadius: 5, alignContent: 'center', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' },
    btnText: { textAlign: 'center', color: '#fff', fontSize: 9 },
    encabezados1: {
        color: "black",
        fontSize: 16,
        fontWeight: 'bold',
        backgroundColor: '#29C28B',
        borderRadius: 10,
        width: '85%',
        textAlign: 'center',
        padding:5,
        marginBottom: '2%'
    },
    textinput: {
        color: '#FFFFFF',
        backgroundColor: '#339B5D',
        padding: 2,
        width: '80%',
        textAlign: 'left',
        borderRadius: 10,
    },
    buttonan:{
        justifyContent: 'center',
        marginTop: '2%',
        width: '60%',
        backgroundColor: '#C4C4C4'
    },
    buttonan2: {
        justifyContent: 'center',
        marginTop: '2%',
        width: '60%',
        backgroundColor: '#DDB3B3'
    },
    textoAnadir:{
        color: "white",
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    encabezados2: {
        color: "black",
        fontSize: 16,
        fontWeight: 'bold',
        backgroundColor: '#F97146',
        borderRadius: 10,
        width: '85%',
        textAlign: 'center',
        padding: 5
    },
})
export default Anadir_platillo;