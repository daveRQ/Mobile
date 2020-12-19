import React, { Component } from 'react';
import { AppLoading } from 'expo';
import { StatusBar, StyleSheet, TouchableOpacity, Text, TextInput, View, Image } from 'react-native';
import { Container, Header, Left, Right, Body, Title, Button, Footer} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import Head from '../compartido/Header2';

import Fondo from '../../src/registro/fondo_cambiarContrasenia.svg'
import Button_cambiarContrasenia from '../../src/registro/button_cambiarContrasenia.svg'

class OlvidoContraseniaEmail extends Component {
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
        <Fondo width='100%' height='100%'
          style={styles.svgFondo}
        />
        {/* <Head navigation={this.props.navigation} /> */}
        {/* <Head /> */}
        <Grid style={styles.body}>
          <Row style={styles.part1}>
            
          </Row>
          <Row style={styles.part2}>
            <Col style={styles.colCenter}>
              <Text 
                style={styles.textColor}>
                Ingrese código Blend Cont
              </Text>
              <TextInput placeholder="Código" placeholderTextColor="white"
                style={styles.textInput}>
              </TextInput>

              <Text 
                style={styles.textColor}>
                Ingrese código email
              </Text>
              <TextInput placeholder="Código email" placeholderTextColor="white"
                style={styles.textInput}>
              </TextInput>

              {/*<TouchableOpacity style={{ width: '80%', height: '63%' }} onPress={() => this.props.navigation.navigate('PersonalCrear')}>
                <Button_cambiarContrasenia width='90%' height='90%'
                  style={styles.svgFondo}
                />
              </TouchableOpacity>*/}
              
              <Button rounded danger
                style={styles.buttonRed}
                onPress={() => this.props.navigation.navigate('OlvidoCambiarContrasenia')}>
                <Text 
                  style={[styles.textCenter, styles.textColorCenter]}>
                  Verificar
                </Text>
              </Button>
            </Col>
          </Row>
          <Row style={styles.footer}>
          </Row>
        </Grid>
        {/* <Footer></Footer> */}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  right: {
    flex: 1
  },
  left: {
    flex: 1
  },
  body: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  colCenter: {
    alignItems: 'center'
  },
  part1: {
    marginTop: '5%',
    flex: 0.7,
    alignItems: 'center'
  },
  part2: {
    flex: 1,
    textAlign: 'center',
    alignItems: 'center'
  },
  footer: {
    flex: 1
  },
  svgFondo: {
    position: 'absolute',

    top: 0,
    left: 0,
    right: 16,
    width: '100vw',
    height: '100vh',
    backgroundColor: '#F45F56'
  },
  logo : {
    width : 180,
    height : 180,
    resizeMode : 'contain',
    borderRadius : 100
  },
  textInput : {
    borderWidth : 1,
    borderColor : '#EB4511',
    padding : 5,
    width : '80%',
    textAlign: 'center',
    marginTop : 20,
    borderRadius: 10,
  },
  textCenter : {
    textAlign: 'center',
  },
  textColorRed : {
    color : 'white',
    marginTop : 20
  },
  buttonRed : {
    justifyContent : 'center',
    alignSelf:'center',
    marginTop : 50,
    width : '60%'
  },



  buttonRed : {
    justifyContent : 'center',
    alignSelf:'center',
    marginTop : 30,
    width : '50%',
    /*borderWidth : 1,
    borderColor : '#A91A11',*/
  },
  logo : {
    flex: 1,
    width : 180,
    height : 180,
    resizeMode : 'contain',
    borderRadius : 100
  },
  textInput : {
    borderWidth : 1,
    borderColor : 'white',
    padding : 5,
    width : '80%',
    textAlign: 'center',
    marginTop : 5,
    borderRadius: 10,
  },
  textColor : {
    textAlign: 'center',
    color : 'white',
    fontSize: 20,
    marginTop: 20
  },
  textColorCenter : {
    textAlign: 'center',
    color : 'white',
    fontSize: 17 ,
  }
  
})

export default OlvidoContraseniaEmail