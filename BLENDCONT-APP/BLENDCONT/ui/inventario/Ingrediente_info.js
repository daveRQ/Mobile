import React, { Component } from 'react';
import { AppLoading } from 'expo';
import { StatusBar, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import {
    Container, Content, Form, Item, Input, Label, Picker, Icon, ListItem, Radio, Right, Left, DatePicker, Button, Header, Footer, Body
}
    from 'native-base';
import { LinearGradient} from 'expo-linear-gradient'

import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import Head2 from '../compartido/Header2';

import Barra from '../../src/personal/barra.svg'

class Ingrediente_info extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isReady: false,
            dataEnviar: { id_producto: '' }
        };
        var producto;
        var ingresoProductos;

        this.getData = this.getData.bind(this);
        this.getData();
    }

    getData(e) {
        fetch('http://192.168.0.112:3000/api/inventario/ingresoProducto', {
            method: 'POST',
            body: JSON.stringify(this.state.dataEnviar),
            headers: {
                'Acccept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(data => {
                producto = data.resultProducto;
                ingresoProductos = data.resultIngresoProducto;
            });
        {/*e.preventDefault();*/}
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
        return (
            <Container>
                <StatusBar hidden />
                <Head2 navigation={this.props.navigation} />
                <Grid style={{justifyContent:'center'}}>
                    <Row style={styles.part1}>
                        <Text>    Inventario / Stock total / Ingrediente</Text>
                    </Row>
                    <Row style={styles.part2}>
                        <Barra width='100%' height='100%' />
                    </Row>
                    <Row style={styles.part3}>
                        <LinearGradient colors={['#E8B020', '#FE7153']} style={{ alignItems: 'center', padding: 5, borderRadius: 5, width:'85%' }}>
                            <Text style={styles.encabezados1}>Ingrediente</Text>
                        </LinearGradient>
                    </Row>
                    <Row style={styles.caja1}>
                        <Content style={{flex:1}}>
                            <Form style={{ flex: 1 }}>
                                <Row style={styles.interior_caja1}>
                                    <Col>
                                        <Text style={styles.textIzq}>NOMBRE</Text>
                                    </Col>
                                    <Col>
                                        <Text style={styles.textoDer}>Fresa</Text>
                                    </Col>
                                </Row>
                                <Row style={styles.interior_caja1}>
                                    <Col>
                                        <Text style={styles.textIzq}>CATEGORÍA</Text>
                                    </Col>
                                    <Col>
                                        <Text style={styles.textoDer}>Fruta</Text>
                                    </Col>
                                </Row>
                                <Row style={styles.interior_caja1}>
                                    <Col>
                                        <Text style={styles.textIzq}>UNIDAD</Text>
                                    </Col>
                                    <Col>
                                        <Text style={styles.textoDer}>1</Text>
                                    </Col>
                                </Row>
                                <Row style={styles.interior_caja1}>
                                    <Col>
                                        <Text style={styles.textIzq}>CANTIDAD TOTAL</Text>
                                    </Col>
                                    <Col>
                                        <Text style={styles.textoDer}>5</Text>
                                    </Col>
                                </Row>
                                <Row style={styles.interior_caja1}>
                                    <Col>
                                        <Text style={styles.textIzq}>COSTO PROMEDIO</Text>
                                    </Col>
                                    <Col>
                                        <Text style={styles.textoDer}>10</Text>
                                    </Col>
                                </Row>
                                
                            </Form>
                        </Content>
                    </Row>
                    {/*--------------------------------------------------------------------------------------------------------------------------------------------------*/}
                    <Row style={styles.part4}>
                        <LinearGradient colors={['#A28CE0', '#AECBE7']} style={{ alignItems: 'center', padding: 5, borderRadius: 5, width: '85%' }}>
                            <Text style={styles.encabezados1}>Información</Text>
                        </LinearGradient>
                    </Row>
                    <Row style={styles.caja2}>
                        <Content style={{ flex: 1 }}>
                            <Form style={{ flex: 1 }}>
                                <Row style={{ flex: 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', alignContent: 'center'}}>
                                    <Col style={{flex:1}}>
                                        <Text style={styles.textcaja2}>Fecha de entrega</Text>
                                    </Col>
                                    <Col style={{ flex: 1, borderRadius: 10, backgroundColor: '#FFFFFF', alignItems: 'center', margin: 5, marginStart: '20%', marginLeft: '10%', alignContent: 'center'}}>
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
                                            onDateChange={() => {this.setDate }}
                                            disabled={false}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col style={{justifyContent:'center'}}>
                                        <Text style={styles.textcaja2}>COSTO x unidad</Text>
                                        <Text style={styles.textmuestra}>10</Text>
                                    </Col>
                                    <Col style={{ justifyContent: 'center' }}>
                                        <Text style={styles.textcaja2}>CANTIDAD</Text>
                                        <Text style={styles.textmuestra}>10</Text>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col style={{ justifyContent: 'center' }}>
                                        <Text style={styles.textcaja2}>CADUCIDAD</Text>
                                        <Row style={{ flex: 1, borderRadius: 10, backgroundColor: '#FFFFFF', alignItems: 'center', margin: 5, marginStart: '20%', alignContent: 'center' }}>
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
                                        </Row>
                                    </Col>
                                    <Col style={{ justifyContent: 'center' }}>
                                        <Text style={styles.textcaja2}>PROVEEDOR</Text>
                                        <Text style={styles.textmuestra}>Gloria</Text>
                                    </Col>
                                </Row>
                            </Form>
                        </Content>
                        
                    </Row>
                    <Row style={{flex:2}}></Row>
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
        flex: 1,
    },
    part3: {
        flex: 1.5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    encabezados1: {
        color: "white",
        fontSize: 16,
        fontWeight: 'bold'
    },
    part4: {
        flex: 1.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textIzq: {
        color: "#FFFFFF",   
        fontSize: 12,     
        textAlign: 'left',
        marginStart: '20%',
        borderRightWidth: 1.5,
        borderColor: '#FFFFFF'
    },
    textoDer: {
        color: 'black',
        fontSize: 12,
        textAlign: 'left',
        backgroundColor: '#FED2AA',
        borderRadius: 5,
        marginRight: '10%',
        marginTop: '1%',
        marginLeft: '8%',
        marginBottom: '1%',
        paddingLeft: '10%',
    },
    caja1: {
        width: '85%',
        height: '65%',
        flex: 3,
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: "#ECA781",
        borderRadius: 3,
        borderWidth: 4,
        borderColor: '#ECA781',
        marginStart: '7.5%',
    },
    interior_caja1: {
        flex: 1.5,
        borderColor: '#FFFFFF',
        borderWidth:1.5,
    },
    caja2: {
        width: '85%',
        height: '50%',
        flex: 3,
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '10%',
        borderRadius: 3,
        borderWidth: 4,
        borderColor: '#A28CE0',
        marginStart: '7.5%',
        flex: 4.5,
        backgroundColor:'#A28CE0'
    },
    textcaja2: {
        color: "#FFFFFF",
        fontSize: 13,
        textAlign: 'left',
        marginStart: '20%',
    },
    textmuestra: {
        color: "black",
        fontSize: 13,
        textAlign: 'center',
        marginStart: '20%',
        marginEnd: '10%',
        backgroundColor: '#FFFFFF',
        borderRadius: 5
    }
})

export default Ingrediente_info;