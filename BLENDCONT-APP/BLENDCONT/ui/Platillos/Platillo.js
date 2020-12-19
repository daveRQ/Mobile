import React, { Component } from 'react';
import { AppLoading } from 'expo';
import { StatusBar, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Container } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import Head2 from '../compartido/Header2';

import Barra from '../../src/personal/barra.svg'
import Platillos_ from '../../src/Platillos/Platillos.svg'
import Anadir_ from '../../src/Platillos/anadir.svg'
import Lista_ from '../../src/Platillos/lista.svg'


class Platillo extends Component {
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
                        <Text>    Platillos</Text>
                    </Row>
                    <Row style={styles.part2}>
                        <Barra width='100%' height='100%' />
                    </Row>
                    <Row style={styles.part3}>
                        <Platillos_ width='80%' height='90%' />
                    </Row>
                    <Row style={styles.part4}>
                        <Col>
                            <TouchableOpacity style={{ width: '100%', height: '100%' }}
                                onPress={() => this.props.navigation.navigate('Anadir_platillo')}>
                                <Anadir_ width='100%' height='100%' />
                            </TouchableOpacity>
                        </Col>
                        <Col>
                            <TouchableOpacity style={{ width: '100%', height: '100%' }}
                                onPress={() => this.props.navigation.navigate('Lista_platillos')}>
                                <Lista_ width='100%' height='100%' />
                            </TouchableOpacity>
                        </Col>
                    </Row>
                    <Row style={styles.part5}>
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
        flex: 1,
    },
    part3: {
        flex: 11,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    part4: {
        flex: 11,
        justifyContent: 'center',
        marginLeft: '5%',
        marginRight: '5%'
    },
    part5: {
        flex: 4
    }
})

export default Platillo;