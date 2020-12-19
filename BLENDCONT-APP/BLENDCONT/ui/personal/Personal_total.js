import React, { Component } from 'react';
import { AppLoading } from 'expo';
import { StatusBar, StyleSheet, TouchableOpacity, View, Image, Alert } from 'react-native';
import {
    Container, Content, Form, Item, Input, Label, Picker, Icon, ListItem, Radio, Right, Left, DatePicker, Button, Text
}
    from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import Head2 from '../compartido/Header2';
import Barra from '../../src/personal/barra.svg'
import Personas from '../../src/personal/personal_total/personas.svg'

class Personal_total extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isReady: false,
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

    onValueChange1(value: string) {
        this.setState({
            selected1: value
        });
    }
    onValueChange2(value: string) {
        this.setState({
            selected2: value
        });
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
                        <Text>  Admi Personal/Total del Personal</Text>
                    </Row>
                    <Row style={styles.part2}>
                        <Barra width='100%' height='100%' />
                    </Row>
                    <Row style={styles.part3}>
                        <Col style={{ flex: 2 }}>
                            <Personas width='70%' height='70%' alignItems='flex-end'/>
                        </Col>
                        <Col style={{ flex: 2 }}>
                            <Text style={styles.caja1}>
                                N° TOTAL DE PERSONAL{"\n"}
                                <Text style={styles.caja2}>50</Text>
                            </Text>
                        </Col>
                    </Row>
                    <Row style={styles.part4}>
                        <Col style={{ flex: 1 }}>
                            <Text style={styles.encabezados}>01</Text>
                        </Col>
                        <Col style={{ flex: 7 }}>
                            <Text style={styles.encabezados}>Encargado</Text>
                        </Col>
                    </Row>
                    <Row style={styles.part5}>
                        <Content>
                            <Col style={{ flex: 2, flexDirection:'row', justifyContent: 'space-between'}}>
                                <Button small rounded block style={{ alignSelf: null, backgroundColor:'#FF4B6C', width:'30%'}}
                                onPress={() => this.props.navigation.navigate('PersonalInfo')}>
                                    <Text>Info</Text>
                                </Button>
                                <Button small rounded block style={{ alignSelf: null, backgroundColor: '#FAC256', width: '35%' }}
                                onPress={() => this.props.navigation.navigate('PersonalInfoFunciones')}>
                                    <Text>Funciones</Text>
                                </Button>
                                <Button small rounded block style={{ alignSelf: null, backgroundColor: '#FA4747', width: '30%' }}
                                onPress={() => this.props.navigation.navigate('PersonalEditar')}>
                                    <Text>Editar</Text>
                                </Button>
                            </Col>
                        </Content>
                    </Row>
                    <Row style={styles.part4}>
                        <Col style={{ flex: 1 }}>
                            <Text style={styles.encabezados}>02</Text>
                        </Col>
                        <Col style={{ flex: 7 }}>
                            <Text style={styles.encabezados}>Mozo 1</Text>
                        </Col>
                    </Row>
                    <Row style={styles.part5}>
                        <Content>
                            <Col style={{ flex: 2, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Button small rounded block style={{ alignSelf: null, backgroundColor: '#FF4B6C', width: '30%' }} 
                                onPress={() => this.props.navigation.navigate('PersonalInfo')}>
                                    <Text>Info</Text>
                                </Button>
                                <Button small rounded block style={{ alignSelf: null, backgroundColor: '#FAC256', width: '35%' }}
                                onPress={() => this.props.navigation.navigate('PersonalInfoFunciones')}>
                                    <Text>Funciones</Text>
                                </Button>
                                <Button small rounded block style={{ alignSelf: null, backgroundColor: '#FA4747', width: '30%' }}
                                onPress={() => this.props.navigation.navigate('PersonalEditar')}>
                                    <Text>Editar</Text>
                                </Button>
                            </Col>
                        </Content>
                    </Row>
                    <Row style={styles.part6}>

                    </Row>
                </Grid>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    part1: {
        flex: 1.8,
        alignItems: 'flex-end'
    },
    part2: {
        flex: 2.5
    },
    part3: {
        flex: 7,
        alignItems: 'center',
        justifyContent: 'center',
    },
    caja1: {
        marginTop: 10,
        paddingVertical: 3,
        paddingHorizontal: 10,
        borderWidth: 4,
        borderColor: "darkorange",
        backgroundColor: "white",
        color: "darkorange",
        textAlign: "center",
        fontSize: 10,
    },
    caja2: {
        color: "darkorange",
        textAlign: "center",
        fontSize: 25,
        fontWeight: "bold",
    },
    encabezados: {
        backgroundColor: "#C4C4C4",
        color: "white",
        textAlign: "left",
        fontSize: 13,
    },
    part4: {
        flex: 2.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    part5: {
        flex: 3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    part6: {
        flex: 9,
    }
})

export default Personal_total;
