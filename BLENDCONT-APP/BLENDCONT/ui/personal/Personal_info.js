import React, { Component } from 'react';
import { AppLoading } from 'expo';
import { StatusBar, StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import {
    Container, Content, Form, Item, Input, Label, Picker, Icon, ListItem, Radio, Right, Left, DatePicker, Button, Text} 
    from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import Head2 from '../compartido/Header2';
import Barra from '../../src/personal/barra.svg'
import Cuerpo from '../../src/personal/personal_info/elipse.svg'

class Personal_info extends Component{
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
        this.setState({isReady: true});
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
        if(!this.state.isReady){
            return<AppLoading />;
        }
        return (
            <Container>
                <StatusBar hidden />
                <Head2 navigation={this.props.navigation} />
                <Grid>
                    <Row style={styles.part1}>
                        <Text>  Admi Personal/info</Text>
                    </Row>
                    <Row style={styles.part2}>
                        <Barra width='100%' height='100%' />
                    </Row>
                    <Row style={styles.part3}>
                        <Text style={styles.caja}>Encargado</Text>
                    </Row>
                    <Row style={styles.part4}>
                        <Text style={{ color: 'black', fontSize: 15 }}>Gonzalo Ramirez</Text>
                    </Row>
                    <Row style={styles.part5}>
                        <Content>
                            <Form>
                                <Row>
                                    <Col style={{flex:2}}>
                                        <Cuerpo width='105%' height='105%' />
                                    </Col>
                                    <Col style={{flex:3}}>
                                        <Col style={{flex:1}}>
                                            <Item regular style={styles.buttons}>
                                                <Input placeholder='Nombre Completo' placeholderTextColor= '#9D5716' />
                                            </Item>
                                        </Col>
                                        <Col style={{flex: 1}}>
                                            <Item regular style={styles.buttons}>
                                                <Input placeholder='Apellido Paterno' placeholderTextColor='#9D5716' />
                                            </Item>
                                        </Col>
                                        <Col style={{flex: 1}}>
                                            <Item regular style={styles.buttons}>
                                                <Input placeholder='Apellido Materno' placeholderTextColor='#9D5716' />
                                            </Item>
                                        </Col>
                                        <Col style={{flex: 1}}>
                                            <DatePicker rounded
                                                defaultDate={new Date(2000, 4, 4)}
                                                minimumDate={new Date(1979, 1, 1)}
                                                maximumDate={new Date(2020, 12, 31)}
                                                locale={"en"}
                                                timeZoneOffsetInMinutes={undefined}
                                                modalTransparent={false}
                                                animationType={"slide"}
                                                androidMode={"default"}
                                                placeHolderText="Fecha de Nacimiento"
                                                textStyle={{ color: "black" }}
                                                placeHolderTextStyle={{ color: "#9D5716" }}
                                                onDateChange={this.setDate}
                                                disabled={false}
                                            />
                                        </Col>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col style={{ flex: 2}}>
                                        <Col style={{ flex: 1 }}>
                                            <Item regular style={styles.buttons}>
                                                <Input placeholder='Sexo' placeholderTextColor='#9D5716' />
                                            </Item>
                                        </Col>
                                        <Col style={{ flex: 1 }}>
                                            <Item regular style={styles.buttons}>
                                                <Input placeholder='Nro DNI' placeholderTextColor='#9D5716' />
                                            </Item>
                                        </Col>
                                        <Col style={{ flex: 1 }}>
                                            <Item regular style={styles.buttons}>
                                                <Input placeholder='Celular' placeholderTextColor='#9D5716' />
                                            </Item>
                                        </Col>
                                    </Col>
                                    <Col style={{ flex: 3}}>
                                        <Col style={{ flex: 1 }}>
                                            <Item regular style={styles.buttons}>
                                                <Input placeholder='Dirección' placeholderTextColor='#9D5716' />
                                            </Item>
                                        </Col>
                                        <Col style={{ flex: 1 }}>
                                            <Item regular style={styles.buttons}>
                                                <Input placeholder='Email' placeholderTextColor='#9D5716' />
                                            </Item>
                                        </Col>
                                        <Col style={{ flex: 1 }}>
                                            <Item regular style={styles.buttons}>
                                                <Input placeholder={"CONTRASEÑA\n_______________"} placeholderTextColor='#9D5716' />
                                            </Item>
                                        </Col>
                                    </Col>
                                </Row>
                                <Col>
                                    <Item regular style={styles.buttons}>
                                        <Input placeholder='Curriculum' placeholderTextColor='#9D5716' />
                                    </Item>
                                </Col>
                                <Col style={styles.blank}>

                                </Col>
                            </Form>
                        </Content>
                    </Row>

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
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    caja: {
        marginTop: 16,
        paddingVertical: 3,
        paddingHorizontal: 100,
        borderWidth: 4,
        borderColor: "darkorange",
        borderRadius: 10,
        backgroundColor: "darkorange",
        color: "white",
        textAlign: "center",
        fontSize: 17,
        fontWeight: "bold",
    },
    part4: {
        flex: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    part5: {
        flex: 18.5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    buttons: {
        backgroundColor: '#C4C4C4',
        marginLeft: '4%',
        marginRight: '2%',
        marginTop: '2%',
        marginBottom: '2%'
    },
    blank: {
        flex: 1.0
    }
})

export default Personal_info;