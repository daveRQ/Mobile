import React, { Component } from 'react';
import { AppLoading } from 'expo';
import { StatusBar, StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import {
    Container, Content, Form, Item, Input, Label, Picker, Icon, ListItem, Radio, Right, Left, DatePicker, Button, Text, CheckBox, Body
}
    from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import Head2 from '../compartido/Header2';
import Barra from '../../src/personal/barra.svg'
import Cuerpo from '../../src/personal/personal_info/elipse2.svg'

class Personal_info_funciones extends Component {
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
                        <Text>  Admi Personal/Funciones</Text>
                    </Row>
                    <Row style={styles.part2}>
                        <Barra width='100%' height='100%' />
                    </Row>
                    <Row style={styles.part3}>
                        <Col>
                            <Cuerpo width='100%' height='100%' />
                        </Col>
                        <Col style={{flexDirection: 'column'}}>
                            <Text style={styles.encabezados}>Nombre y Apellido</Text>
                            <Text style={styles.encabezados}>Puesto Laboral</Text>
                        </Col>
                    </Row>
                    <Row style={styles.part4}>
                        <Text style={styles.encabezados2}>Funciones</Text>
                    </Row>
                    <Row style={styles.part5}>
                        <Content>
                            <ListItem>
                                <CheckBox checked={true} style={{ borderColor: '#C60C0C' }}/>
                                <Body>
                                    <Text style={styles.checks}>  Gestionar Inventarios</Text>
                                </Body>
                            </ListItem>
                            <ListItem>
                                <CheckBox style={{ borderColor: '#C60C0C' }}/>
                                <Body>
                                    <Text style={styles.checks}>  Gestionar Platillos</Text>
                                </Body>
                            </ListItem>
                            <ListItem>
                                <CheckBox style={{ borderColor: '#C60C0C' }}/>
                                <Body>
                                    <Text style={styles.checks}>  Gestionar Inventarios</Text>
                                </Body>
                            </ListItem>
                            <ListItem>
                                <CheckBox style={{ borderColor: '#C60C0C' }}/>
                                <Body>
                                    <Text style={styles.checks}>  Gestionar de Personal</Text>
                                </Body>
                            </ListItem>
                            <ListItem>
                                <CheckBox style={{ borderColor: '#C60C0C' }}/>
                                <Body>
                                    <Text style={styles.checks}>  Gestionar Cartas/Menus</Text>
                                </Body>
                            </ListItem>
                            <ListItem>
                                <CheckBox style={{ borderColor: '#C60C0C' }}/>
                                <Body>
                                    <Text style={styles.checks}>  Acceso a Diagramas</Text>
                                </Body>
                            </ListItem>
                            <ListItem>
                                <CheckBox style={{ borderColor:'#C60C0C'}}/>
                                <Body>
                                    <Text style={styles.checks}>  Iniciar y Cerrar Dia Operacional</Text>
                                </Body>
                            </ListItem>
                            <ListItem>
                                <CheckBox style={{ borderColor: '#C60C0C' }}/>
                                <Body>
                                    <Text style={styles.checks}>  Editar Dia Operacional</Text>
                                </Body>
                            </ListItem>
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
        flex: 6,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        paddingVertical: 3,
        paddingHorizontal: 8,
        backgroundColor: "#F8C283",
        marginLeft: '4%',
        marginRight: '2%',
        marginTop: '2%',
        marginBottom: '2%',
    },
    encabezados: {
        backgroundColor: "#C4C4C4",
        color: "white",
        paddingVertical: 4,
        paddingHorizontal: 20,
        borderRadius: 10,
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'center',
        marginLeft: '4%',
        marginRight: '2%',
        marginTop: '2%',
        marginBottom: '2%',
    },
    encabezados2: {
        color: "white",
        fontSize: 15,
        fontWeight: 'bold',
        backgroundColor: "darkorange",
        textAlign: 'center',
        marginLeft: '4%',
        marginRight: '2%',
        marginTop: '2%',
        marginBottom: '2%',
        paddingVertical: 4,
        paddingHorizontal: 133,
    },
    part4: {
        flex: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checks: {
        color: "#C60C0C",
        fontSize: 12,
        textAlign: 'left',
        borderColor: '#C60C0C',
        borderWidth: 1.5,
    },
    part5: {
        flex: 17,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
})

export default Personal_info_funciones;