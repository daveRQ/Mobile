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
import DP from '../../src/Dia_operacional/cuerpo.svg'
import En_curso from '../../src/Dia_operacional/en_curso.svg'
import Crear from '../../src/Dia_operacional/crear.svg'


import AsyncStorage from '@react-native-community/async-storage';

//funciones de AsyncStorage
import { getItem, setItem, removeItem  } from './../StorageHelper'

//cambiar el ipHost segun el server
const {ipHost} = require('./../../ipHost')



class Dia_operacional extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isReady: false,
            token: null,
            id_restaurante: null,
            id_dia_operacional: undefined
        };
        this.listofun = this.listofun.bind(this);
    }

    async listofun(e) {

        if (!this.state.id_dia_operacional)
        {
            fetch('http://' + ipHost + '/api/diaOperacional/crearDiaOperacional', {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Acccept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
                .then(res => res.json())
                .then(data => {
                    setItem("id_dia_operacional", data.id);
                    this.setState({
                        id_dia_operacional: data.id,
                    });            
                    ToastAndroid.showWithGravityAndOffset(
                        data.result,
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM,
                        25,
                        50
                    );
                });
        }
        else {
            ToastAndroid.showWithGravityAndOffset(
                "No se puede crear",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
            );
        }
        {/*e.preventDefault();*/ }
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
            });            
        });

        getItem('id_dia_operacional').then(id => {
            console.log(id)
            if (id) {
                this.setState({
                    id_dia_operacional: id,
                });            
            }
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
        return (
            <Container>
                <StatusBar hidden />
                <Head2 navigation={this.props.navigation} />
                <Grid style={{ justifyContent: 'center' }}>
                    <Row style={styles.part1}>
                        <Text>    Dia Operacional</Text>
                    </Row>
                    <Row style={styles.part2}>
                        <Barra width='100%' height='100%' />
                    </Row>

                    <Row style={styles.part3}>
                        <DP width='80%' height='90%' />
                    </Row>
                    <Row style={{ flex: 0.5 }}></Row>
                    <Row style={styles.part4}>
                        <Col>
                            <TouchableOpacity style={{ width: '100%', height: '100%' }}
                                onPress={this.listofun}>
                                <Crear width='100%' height='100%' />
                            </TouchableOpacity>
                        </Col>
                        <Col style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <TouchableOpacity style={{ width: '100%', height: '100%' }}
                                onPress={() => this.props.navigation.navigate('En_curso')}>
                                <En_curso width='100%' height='100%' />
                            </TouchableOpacity>
                        </Col>
                    </Row>
                    <Row style={styles.part5}></Row>
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
        flex: 10,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    part4: {
        flex: 12,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginLeft: '5%',
        marginRight: '5%'
    },
    part5: {
        flex: 4
    }
})
export default Dia_operacional;
