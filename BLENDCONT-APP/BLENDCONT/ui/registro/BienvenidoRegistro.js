import React, { Component } from 'react';
import { AppLoading } from 'expo';
import { StatusBar, StyleSheet, TouchableOpacity, Text, TextInput, View, Image } from 'react-native';
import { Container, Header, Left, Right, Body, Title, Button, Footer} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import Head from '../compartido/Header2';

import Logo from '../../src/login/logo.svg'
import HeaderFondo from '../../src/registro/header_bienvenido.svg'
import Icon_fb from '../../src/registro/icon_fb.svg'
import Icon_insta from '../../src/registro/icon_insta.svg'
import Icon_youtube from '../../src/registro/icon_youtube.svg'

class BienvenidoRegistro extends Component {
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
        {/* <Head navigation={this.props.navigation} /> */}
        <HeaderFondo width='100%' height='20%'/>
        {/* <Head /> */}
        <Grid style={styles.body}>
          <Row style={styles.part1}>
            <Logo width='100%' height='100%' style={styles.logo}/>
          </Row>
          <Row style={styles.part2}>
            <Col style={styles.colCenter}>
              <Button rounded danger
                  style={styles.buttonRed}
                  >
                  <Text 
                      style={styles.textCenter, styles.textColorWhite}>
                      Pagar Subscripción
                  </Text>
              </Button>

              <Text style={styles.hiperlink}
                  onPress={() => Linking.openURL('http://google.com')}>
                  Acerca de la app
              </Text>

              <Button rounded danger
                  style={styles.buttonRed}
                  onPress={() => this.props.navigation.navigate('Login')}>
                  <Text 
                      style={styles.textCenter, styles.textColorWhite}>
                      Siguiente
                  </Text>
              </Button>
            </Col>
          </Row>
          <Row style={styles.footer}>
            <Col style={styles.colCenter}>
              <Icon_fb width='60%' height='60%'/>
            </Col>
            <Col style={styles.colCenter}>
              <Icon_insta width='60%' height='60%'/>
            </Col>
            <Col style={styles.colCenter}>
              <Icon_youtube width='60%' height='60%'/>
            </Col>
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
    flex: 2,
    alignItems: 'center'
  },
  part2: {
    flex: 1,
    textAlign: 'center',
    alignItems: 'center'
  },
  footer: {
    flex: 1,
    marginRight: '20%',
    marginLeft: '20%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  svgFondo: {
    position: 'absolute',

    top: 0,
    left: 0,
    right: 16,
  },
  logo : {
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
    color : '#EB4511',
    marginTop : 20
  },
  textColorWhite : {
    color : 'white'
  },
  buttonRed : {
    justifyContent : 'center',
    alignSelf:'center',
    width : '60%'
  },
  


  logo : {
    flex: 2,
    width : 500,
    height : 500,
    resizeMode : 'contain',
    borderRadius : 100
  },
  textHeader : {
    textAlign: 'center',
    color : '#EB4511',
    fontSize: 50,
  },
  textColor : {
    textAlign: 'center',
    //color : '#EB4511',
    fontSize: 17,
  },
  textColorWhite : {
    textAlign: 'center',
    color : 'white',
    fontSize: 15 ,
  },
  styleInput : {
    width: '90%',
    textAlign: 'center',
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  hiperlink : {
      color: '#EB4511',
      fontSize: 17,
      textDecorationLine: 'underline',
      marginTop: '3%',
      marginBottom: '3%'
  }

})

export default BienvenidoRegistro 