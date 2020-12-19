import React, { Component } from 'react';
import { AppLoading, LinearGradient } from 'expo';
import { StatusBar, StyleSheet, TouchableOpacity, Text, ToastAndroid, TextInput, Image, ScrollView} from 'react-native';
import {
    Container, Content, Form, Item, Input, Label, Picker, Icon, ListItem, Radio, Right, Left, DatePicker, Button, Header, Footer, Body
}
    from 'native-base';
import { Col, Row as Fila, Grid } from 'react-native-easy-grid';
import { Table, TableWrapper, Row as FilaTabla, Cell } from 'react-native-table-component';

import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import Head2 from '../compartido/Header2';
import Barra from '../../src/personal/barra.svg'

import AsyncStorage from '@react-native-community/async-storage';

//funciones de AsyncStorage
import { getItem, setItem, removeItem  } from './../StorageHelper'
import { DrawerActions } from '@react-navigation/native';

//cambiar el ipHost segun el server
const {ipHost} = require('./../../ipHost')

class Stock_total extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isReady: false,
            token: null,
            id_restaurante: null,
            // tableHead: ['Nombre', 'Unidad', 'Cantidad', 'Detalles'],
            tableHead: ['Nombre', 'Unidad', 'Cantidad'],
            //tableData: [['nombre1', '1', '10', '4'], ['nombre2', '2', '20', '4'], ['nombre1', '1', '10', '4'], ['nombre1', '1', '10', '4'], ['nombre1', '1', '10', '4'], ['nombre1', '1', '10', '4'], ['nombre1', '1', '10', '4'], ['nombre1', '1', '10', '4'], ['nombre1', '1', '10', '4'], ['nombre1', '1', '10', '4'], ['nombre4', '1', '10', '4'], ['nombre1', '1', '10', '4'], ['nombre3', '1', '10', '4'],
            //['nombre1', '1', '10', '4'], ['nombre2', '2', '20', '4'], ['nombre1', '1', '10', '4'], ['nombre1', '1', '10', '4'], ['nombre1', '1', '10', '4'], ['nombre1', '1', '10', '4'], ['nombre1', '1', '10', '4'], ['nombre1', '1', '10', '4'], ['nombre1', '1', '10', '4'], ['nombre1', '1', '10', '4'], ['nombre4', '1', '10', '4'], ['nombre1', '1', '10', '4'], ['nombre3', '1', '10', '4']],
            tableData: [],
            rango: {
                fch_ini: new Date(2019, 1, 1),
                fch_fin: new Date(2021, 1, 1),
                id_restaurante: ''
            }
        };
        var arrayIngredientes = [];
        this.listar = this.listar.bind(this);
    }

    async listar(e) {
        fetch('http://' + ipHost + '/api/inventario/stockTotal', {
            method: 'POST',
            body: JSON.stringify(this.state.rango),
            headers: {
                'Acccept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(data => {
            if(data.result){
                this.setState({
                    tableData: data.result
                });

            }
            else{
                ToastAndroid.showWithGravityAndOffset("correcto", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
            }
        });
        {/*e.preventDefault();*/ }
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
        //get jwt
        getItem('jwt').then(token => {
            this.setState({ token });
        });

        //get idRestaurante y luego listar los platillos
        getItem('id_restaurante').then(id_restaurante => {
            this.setState({
                id_restaurante: id_restaurante,
                rango: {
                    ...this.state.rango,
                    id_restaurante: id_restaurante
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
    _alertIndex(index) {
        Alert.alert(`This is row ${index + 1}`);
    }

    render() {
        if (!this.state.isReady) {
            return <AppLoading />;
        }
        const state = this.state;
        const element = (data, index) => (
            <TouchableOpacity onPress={() => this._alertIndex(index)}>
                <Fila style={styles.btn}>
                    <Text style={styles.btnText}>Detalles</Text>
                </Fila>
            </TouchableOpacity>
        );
        return (
            <Container>
                <Head2 navigation={this.props.navigation} />
                <Grid>
                    <Fila style={styles.part1}>
                        <Text> Inventario / Stock total</Text>
                    </Fila>
                    <Fila style={styles.part2}>
                        <Barra width='100%' height='100%' />
                    </Fila>
                    <Fila style={styles.part3}>
                        <Fila style={{flexDirection:'row', alignItems:'center'}}>
                            <Col>
                                <Text style={styles.textizq}>Fecha Inicio</Text>
                            </Col>
                            <Col style={{ flex: 1, borderRadius: 10, backgroundColor: '#FFFFFF', alignItems: 'center', margin:10, marginStart: '15%', alignContent: 'center',padding:-5 }}>
                                <DatePicker rounded
                                    style={styles.datePickerStyle}
                                    defaultDate={new Date(2019, 1, 1)}
                                    minimumDate={new Date(2020, 1, 1)}
                                    maximumDate={new Date(2020, 12, 31)}
                                    locale={"en"}
                                    timeZoneOffsetInMinutes={undefined}
                                    modalTransparent={false}
                                    animationType={"slide"}
                                    androidMode={"default"}
                                    onDateChange={() => { this.setDate }}
                                    disabled={false}
                                    custom
                                />
                            </Col>
                        </Fila>
                        <Fila style={{ flexDirection: 'row', alignItems:'center'}}>
                            <Col>
                                <Text style={styles.textizq}>Fecha Fin</Text>
                            </Col>
                            <Col style={{ flex: 1, borderRadius: 10, backgroundColor: '#FFFFFF', alignItems: 'center', margin: 10, marginStart: '15%', alignContent: 'center', padding: -5  }}>
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
                                    onDateChange={() => { this.setDate }}
                                    disabled={false}
                                />
                            </Col>
                        </Fila>
                    </Fila>

                    <Col style={styles.tabla}>
                        {/* <ScrollView>
                            <Table borderStyle={{ borderColor: '#FFFFFF', borderWidth: 1 }}>
                                <FilaTabla data={state.tableHead} style={styles.head} textStyle={styles.text} />
                                {
                                    state.tableData.map((rowData, index) => (
                                        <TableWrapper key={index} style={styles.row}>
                                            {
                                                rowData.map((cellData, cellIndex) => (
                                                    <Cell key={cellIndex} data={cellIndex === 3 ? element(cellData, index) : cellData} textStyle={styles.text} />
                                                ))
                                            }
                                        </TableWrapper>
                                    ))
                                }
                            </Table>
                        </ScrollView> */}

                        <ScrollView nestedScrollEnabled={true} contentContainerStyle={{ backgroundColor: '#FFFFFF', alignContent: 'center', flexGrow: 1 }}>
                            <Table borderStyle={{ borderColor: '#FFFFFF', borderWidth: 1 }}>
                                <FilaTabla data={state.tableHead} style={styles.head} textStyle={styles.texthead} />
                                {
                                    this.state.tableData.map((rowData, index) => (
                                        <TableWrapper key={index} style={styles.row}>
                                            <Cell key={rowData._id} data={rowData.nombre} textStyle={styles.text} />
                                            <Cell key={rowData._id} data={rowData.unidad} textStyle={styles.text} />
                                            <Cell key={rowData._id} data={parseFloat(rowData.stock_actual)} textStyle={styles.text} />
                                            {/* rowData.map((cellData, cellIndex) => (
                                                <Cell key={cellIndex} data={cellIndex === 3 ? element(cellData, index) : cellData} textStyle={styles.text} />
                                            )) */}
                                        </TableWrapper>
                                    ))
                                }
                            </Table>
                        </ScrollView>
                    </Col>
                    <Fila style={{flex:1}}></Fila>
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
        flex: 1.5
    },
    part3: {
        flex: 2.5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E84E4E',
        width:'85%',
        marginStart: '7.5%',
        borderRadius: 10,
        flexDirection:'column'
    },
    tabla: {
        flex: 12,
        width: '85%',
        marginStart:'7.5%',
        marginTop: '7.5%'
    },
    textizq:{
        color: "#FFFFFF",
        fontSize: 14,
        textAlign: 'left',
        marginStart: '20%',
    },
    head: { height: 40, backgroundColor: '#F0AC78' },
    text: { margin: 6 ,color:'black', textAlign:'center'},
    row: { flexDirection: 'row', backgroundColor: '#E7C653', alignItems: 'center'},
    btn: { width: 70, height: 20, backgroundColor: '#F0AC78', borderRadius: 4, alignContent: 'center', alignItems: 'center', textAlign:'center'},
    btnText: { textAlign: 'center', color: '#fff', paddingLeft:4 },
    datePickerStyle: {backgroundColor:'pink', fontWeight:'bold'}
})

export default Stock_total