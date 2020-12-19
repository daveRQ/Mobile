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



class Terminar_dia_op extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isReady: false,
            fecha: Date(),
            tableHead: ['INGREDIENTE', 'USO\nESTIMADO', 'USO REAL'],
            tableData: [['Arroz', '10.5 kilos', '10.5 kilos'], ['Arroz', '10.5 kilos', '10.5 kilos'], ['Arroz', '10.5 kilos', '10.5 kilos'], ['Arroz', '10.5 kilos', '10.5 kilos'], ['Arroz', '10.5 kilos', '10.5 kilos'], ['Arroz', '10.5 kilos', '10.5 kilos'], ['Arroz', '10.5 kilos', '10.5 kilos'], ['Arroz', '10.5 kilos', '10.5 kilos']]
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
    render() {
        if (!this.state.isReady) {
            return <AppLoading />;
        }
        const state = this.state;
        const element = (data, index) => (
            <TouchableOpacity onPress={() => this._alertIndex(index)}>
                <Row style={styles.btn}>
                    <Text style={styles.btnText}>o</Text>
                </Row>
            </TouchableOpacity>
        );
        return (
            <Container>
                <StatusBar hidden />
                <Head2 navigation={this.props.navigation} />
                <Grid style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Row style={styles.part1}>
                        <Text>    Dia Operacional / Finalizar</Text>
                    </Row>
                    <Row style={styles.part2}>
                        <Barra width='100%' height='100%' />
                    </Row>
                    <Row style={{ flex: 0.5 }}></Row>
                    <Row style={styles.part3}>
                        <Text style={styles.encabezados1}>RESUMEN GASTOS INGREDIENTES</Text>
                    </Row>
                    <Row style={{ flex: 0.5 }}></Row>
                    <Row style={styles.part4}>
                        <Col styles={{ borderWidth: 1, borderColor: '#3C752E', borderRadius: 10, backgroundColor: 'red', }}>
                            <Row size={1} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderColor: '#3C752E', borderBottomWidth: 1 }}>
                                <Text>FECHA:</Text>

                            </Row>
                            <Row size={1} size={1} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderColor: '#3C752E', borderBottomWidth: 1 }}>
                                <Col size={3}></Col>
                                <Col size={42} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F0C65B', borderRadius: 10 }}>
                                    <Text style={{ fontSize: 12, textAlign: 'center' }}>INICIO:</Text>
                                </Col>
                                <Col size={10}></Col>
                                <Col size={42} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F0C65B', borderRadius: 10 }}>
                                    <Text style={{ fontSize: 12, textAlign: 'center' }}>FIN:</Text>
                                </Col>
                                <Col size={3}></Col>
                            </Row>
                            <Row size={2}>
                                <Col size={45} style={{ borderColor: '#3C752E', borderRightWidth: 1 }}>
                                    <Row size={1} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ fontSize: 12.5, textAlign: 'center' }}>PLATO ESTRELLA</Text>
                                    </Row>
                                    <Row size={1} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ fontSize: 12.5, textAlign: 'center' }}>PLATO PERRO</Text>
                                    </Row>
                                </Col>
                                <Col size={27.5} style={{ borderColor: '#3C752E', borderRightWidth: 1 }}>
                                    <Row size={1} style={{ alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ fontSize: 11, textAlign: 'center' }}>Americano</Text>
                                    </Row>
                                    <Row size={1} style={{ alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ fontSize: 11, textAlign: 'center' }}>Chaufa</Text>
                                    </Row>
                                </Col>
                                <Col size={27.5}>
                                    <Row size={1} style={{ alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ fontSize: 11, textAlign: 'center' }}>40 vendidos</Text>
                                    </Row>
                                    <Row size={1} style={{ alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ fontSize: 11, textAlign: 'center' }}>10 vendidos</Text>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>

                    </Row>

                    <Row style={{ flex: 0.5 }}></Row>
                    <Row style={styles.part5}>
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
                    <Row style={styles.part6}>
                        <Button rounded style={styles.button}>
                            <Text style={{ color: '#FFFFFF', fontWeight: 'bold', textAlign: 'center' }}>TERMINAR</Text>
                        </Button>
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
        flex: 4,
        alignItems: 'center',
        justifyContent: 'center',
        width: '85%',
        borderColor: '#3C752E',
        borderWidth: 1,
        borderRadius: 10,
    },
    part5: {
        flex: 13
    },
    part6: {
        flex: 2,
        width: '85%',
        justifyContent: 'center',
        alignItems: 'center'
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
    texthead: { margin: 5, color: '#FFF8F8', textAlign: 'center', fontSize: 10, justifyContent: 'center' },
    text: { margin: 5, color: 'black', textAlign: 'center', fontSize: 10, justifyContent: 'center' },
    row: { flexDirection: 'row', backgroundColor: '#57B89595', alignItems: 'center', flexDirection: 'row', justifyContent: 'center', alignContent: 'center' },
    btn: { width: '80%', height: 15, backgroundColor: '#C16767', borderRadius: 5, alignContent: 'center', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginLeft: '10%', marginTop: '10%' },
    btnText: { color: '#FFFFFF', textAlign: 'center', fontWeight: 'bold', fontSize: 10 },
    button: {
        justifyContent: 'center',
        marginTop: '5%',
        marginLeft: '7%',
        width: '60%',
        backgroundColor: '#C4C4C4'
    }
})
export default Terminar_dia_op;