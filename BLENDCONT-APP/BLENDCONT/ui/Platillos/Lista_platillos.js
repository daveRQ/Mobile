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
import { getItem, setItem } from './../StorageHelper'

//cambiar el ipHost segun el server
const {ipHost} = require('./../../ipHost')

class Lista_platillos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isReady: false,
            token: null,
            id_restaurante: null,
            tableHead: ['PLATILLO', 'COSTO', 'PRECIO', 'GANANCIA', 'VENTA\nTOTAL', ' '],
            tableData: []
        };

        this.listar = this.listar.bind(this);
    }

    async listar(){
        fetch('http://'+ipHost+'/api/platillo/listar/',{
          method: 'POST',
          body: '{"id_restaurante":"'+this.state.id_restaurante+'"}',
          headers: {
            'Acccept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': this.state.token
          }
        })
          .then(res => res.json())
          .then(data => {
            if(data.result){
                this.setState({
                    tableData: data.platillos
                });
            }
            else{
                ToastAndroid.showWithGravityAndOffset(data.message, ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
            }      
        });
    }

    redirigir_verPlatillo(id_platillo) {  
        let val_id = setItem("id_platillo", id_platillo);
        this.props.navigation.navigate('Ver_platillo');
    }

    async componentDidMount() {
        //get jwt
        getItem('jwt').then(token => {
            this.setState({ token });
        });

        //get idRestaurante y luego listar los platillos
        getItem('id_restaurante').then(id_restaurante => {
            this.setState({ id_restaurante });
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
        const element = (index) => (
            <TouchableOpacity onPress={() => this.redirigir_verPlatillo(index)}>
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
                        <Text>    Platillos / Lista Platillos</Text>
                    </Row>
                    <Row style={styles.part2}>
                        <Barra width='100%' height='100%' />
                    </Row>
                    
                    <Row style={styles.part3}>
                        <Text style={styles.encabezados1}>LISTA DE PLATILLOS</Text>
                    </Row>   
                    <Row style={{flex:0.5}}></Row>
                    <Row style={styles.part4}>
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
                                                    <Cell key={rowData._id} data={rowData.costo_actual} textStyle={styles.text} />
                                                    <Cell key={rowData._id} data={rowData.precio_actual} textStyle={styles.text} />
                                                    <Cell key={rowData._id} data={rowData.precio_actual - rowData.costo_actual} textStyle={styles.text} />
                                                    <Cell key={rowData._id} data={rowData.total_vendidos} textStyle={styles.text} />
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
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    part4: {
        flex: 14
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
    texthead: { margin: 5, color: '#FFFFFF', textAlign: 'center', fontSize: 7.5, justifyContent: 'center'},
    text: { margin: 5, color: '#FFFFFF', textAlign: 'center', fontSize: 10, justifyContent:'center'},
    row: { flexDirection: 'row', backgroundColor:'#F1AC5A', alignItems: 'center', flexDirection:'row', justifyContent: 'center', alignContent: 'center'},
    btn: { width: '80%', height: 15, backgroundColor: '#C16767', borderRadius: 5 , alignContent:'center', justifyContent:'center', alignItems:'center', flexDirection:'row', marginLeft:'10%', marginTop:'10%'},
    btnText: { textAlign: 'center', color: '#fff', fontSize: 10 }
})
export default Lista_platillos;