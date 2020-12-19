import React, { Component, useState } from 'react';
import { AppLoading } from 'expo';
import { StatusBar, StyleSheet, TouchableOpacity, Text, ToastAndroid, TextInput, View, Image, ScrollView} from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import {
    Container, Content, Form, Item, Input, Label, Picker, Icon, ListItem, Radio, Right, Left, DatePicker, Button, Header, Footer, Body, CheckBox
}
    from 'native-base';
import { LinearGradient } from 'expo-linear-gradient'
import { Table, TableWrapper, Row as FilaTabla, Cell } from 'react-native-table-component';

import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import Head2 from '../compartido/Header2';

import Barra from '../../src/personal/barra.svg'



class Crear_dia_op extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isReady: false,
            fecha: Date(),
            isSelected: false,
            tableHead: ['NOMBRE', 'COSTO', 'PRECIO DE\nVENTA', ''],
            tableData: [['Americano', '40.0', '50.0', 'gaaaa'], ['Americano', '40.0', '50.0', 'gaaaa'], ['Americano', '40.0', '50.0', 'gaaaa'], ['Americano', '40.0', '50.0', 'gaaaa'], ['Americano', '40.0', '50.0', 'gaaaa'], ['Americano', '40.0', '50.0', 'gaaaa']]
        };
    }

    async componentDidMount() {
        await Font.loadAsync({
            Roboto: require('native-base/Fonts/Roboto.ttf'),
            Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
            ...Ionicons.font,
        });
        this.setState({ isReady: true });
    }

    checkBoxHandler(index) {
        this.setState({isSelected:!this.state.isSelected})
    }

    render() {
        if (!this.state.isReady) {
            return <AppLoading />;
        }
        const state = this.state;

        const element = (data, index) => (
             local=false,
            <TouchableOpacity onPress={() => {this.local=!this.local}}>
                <Row style={{ width: '80%', height: 20,  alignContent: 'center', justifyContent: 'center', alignItems: 'center' }}>
                    <CheckBox checked={this.local} color="#C60C0C80"/>
                </Row>
            </TouchableOpacity>
        );

        return (
            <Container>
                <StatusBar hidden />
                <Head2 navigation={this.props.navigation} />
                <Grid style={{ justifyContent: 'center' }}>
                    <Row style={styles.part1}>
                        <Text>    Dia Operacional / Crear</Text>
                    </Row>
                    <Row style={styles.part2}>
                        <Barra width='100%' height='100%' />
                    </Row>
                    <Row style={{ flex: 0.5 }}></Row>
                    <Row style={styles.part3}>
                        <Text style={styles.encabezados1}>SELECCION PLATILLOS A ELEGIR</Text>
                    </Row>
                    <Row style={{ flex: 0.5 }}></Row>
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
                                                {
                                                    rowData.map((cellData, cellIndex) => (
                                                        <Cell key={cellIndex} data={cellIndex === 3 ? element(cellData, index) : cellData} textStyle={styles.text} />
                                                    ))
                                                }
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
                    <Row style={styles.part5}>
                        <Button rounded style={styles.button}>
                            <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>CREAR</Text>
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
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    part4: {
        flex: 14
    },
    part5: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center'
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
    head: { height: 40, backgroundColor: '#D7844685' },
    texthead: { margin: 5, color: '#FFF8F8', textAlign: 'center', fontSize: 7.5, justifyContent: 'center' },
    text: { margin: 5, color: 'black', textAlign: 'center', fontSize: 10, justifyContent: 'center' },
    row: { flexDirection: 'row', backgroundColor: '#D7844665', alignItems: 'center', flexDirection: 'row', justifyContent: 'center', alignContent: 'center' },
    btn: { width: '80%', height: 15, backgroundColor: '#C16767', borderRadius: 5, alignContent: 'center', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginLeft: '10%', marginTop: '10%' },
    btnText: { textAlign: 'center', color: '#fff', fontSize: 10 },
    button: {
        justifyContent: 'center',
        marginTop: '5%',
        width: '40%',
        backgroundColor: '#C4C4C4'
    }
})
export default Crear_dia_op;