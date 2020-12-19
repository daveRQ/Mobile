import React, { Component } from 'react';
import { AppLoading } from 'expo';
import { StatusBar, StyleSheet, TouchableOpacity, Text, ToastAndroid, TextInput, View, Image, ScrollView , Dimensions} from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import {
    Container, Content, Form, Item, Input, Label, Picker, Icon, ListItem, Radio, Right, Left, DatePicker, Button, Header, Footer, Body
}
    from 'native-base';
import { LinearGradient } from 'expo-linear-gradient'
import { Table, TableWrapper, Row as FilaTabla, Cell } from 'react-native-table-component';
import {LineChart,BarChart,PieChart,ProgressChart,ContributionGraph,StackedBarChart} from 'react-native-chart-kit'

import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import Head2 from '../compartido/Header2';

import Barra from '../../src/personal/barra.svg'

const line = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
        {
            data: [20, 45, 28, 80, 99, 43],
            strokeWidth: 2, // optional
        },
    ],
};


class Chart1 extends Component {
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
                <Grid style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Row style={styles.part1}>
                        <Text>    Dia Operacional / Finalizar</Text>
                    </Row>
                    <Row style={styles.part2}>
                        <Barra width='100%' height='100%' />
                    </Row>
                    <Row style={{ flex: 0.5 }}></Row>
                    <Row style={{flex:14}}>
                        <View>
                            <Text>
                                Bezier Line Chart
                            </Text>
                            <LineChart
                                data={line}
                                width={Dimensions.get('window').width} // from react-native
                                height={220}
                                yAxisLabel={'$'}
                                chartConfig={{
                                    backgroundColor: '#e26a00',
                                    backgroundGradientFrom: '#fb8c00',
                                    backgroundGradientTo: '#ffa726',
                                    decimalPlaces: 2, // optional, defaults to 2dp
                                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                    style: {
                                        borderRadius: 16
                                    }
                                }}
                                bezier
                                style={{
                                    marginVertical: 8,
                                    borderRadius: 16
                                }}
                            />
                        </View>
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
export default Chart1;