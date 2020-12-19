import React, { Component } from 'react';
import { AppLoading } from 'expo';
import { StatusBar, StyleSheet, TouchableOpacity,ToastAndroid, Text, TextInput, View, Image } from 'react-native';
import { Container, Header, Left, Right, Body, Title, Button, Footer, Item, Input, Label} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import Head from '../compartido/Header2';

import Logo from '../../src/login/logo.svg'
import HeaderFondo from '../../src/registro/header_registrarRestaurante.svg'

//cambiar el ipHost segun el server
const {ipHost} = require('./../../ipHost')

class RegistrarRestaurante extends Component {
	constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      restaurante: {
        nombre: '',
        contrasenia: '',
        telefono: '',
        correo: '',
        ruc: '',
        direccion: ''
      }
    };
    this.registrar = this.registrar.bind(this);
  }

  async registrar(){
    fetch('http://'+ipHost+'/api/restaurante/registrarRestaurante/',{
      method: 'POST',
      body: JSON.stringify(this.state.restaurante),
      headers: {
        'Acccept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        if(data.result){
          ToastAndroid.showWithGravityAndOffset(data.message, ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
          this.props.navigation.navigate('BienvenidoRegistro')
        }
        else{
          ToastAndroid.showWithGravityAndOffset(data.message, ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
        }      
      });
  }

  handleChange_nombre(value){
    this.setState({
      restaurante: {       
        ...this.state.restaurante,
         nombre: value  
      }
    });
  }

  handleChange_telefono(value){
    this.setState({
      restaurante: {       
        ...this.state.restaurante,
        telefono: value  
      }
    });
  }

  handleChange_direccion(value){
    this.setState({
      restaurante: {       
        ...this.state.restaurante,
        direccion: value  
      }
    });
  }
  
  handleChange_correo(value){
    this.setState({
      restaurante: {       
        ...this.state.restaurante,
        correo: value  
      }
    });
  }

  handleChange_ruc(value){
    this.setState({
      restaurante: {       
        ...this.state.restaurante,
        ruc: value  
      }
    });
  }

  handleChange_contrasenia(value){
    this.setState({
      restaurante: {       
        ...this.state.restaurante,
        contrasenia: value  
      }
    });
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
        {/* <HeaderFondo width='100%' height='30%'/> */}
        {/* <HeaderFondo /> */}
        {/* <Head /> */}
        <Grid style={styles.body}>
          <Col style={styles.colCenter}>
            <Row style={styles.part1}>
              <Col style={styles.colCenter}>
                <Item floatingLabel
                  style={styles.textInputContainer}>
                    <Label style={styles.textColorLabel}>Nombre restaurante</Label>
                    <Input style={styles.textColor} value={this.state.restaurante.nombre} onChangeText={text => this.handleChange_nombre(text)}/>
                </Item>
              </Col>
              <Col style={styles.colCenter}>
                <Item floatingLabel style={styles.textInputContainer}>
                    <Label style={styles.textColorLabel}>Número teléfono</Label>
                    <Input style={styles.textColor} value={this.state.restaurante.telefono} onChangeText={text => this.handleChange_telefono(text)}/>
                </Item>
              </Col>
            </Row>
            <Row style={styles.part2}>
              <Col style={styles.colCenter}>
                <Item floatingLabel style={styles.textInputContainer}>
                    <Label style={styles.textColorLabel}>Dirección del restaurante</Label>
                    <Input style={styles.textColor} value={this.state.restaurante.direccion} onChangeText={text => this.handleChange_direccion(text)}/>
                </Item>

                <Item floatingLabel style={styles.textInputContainer}>
                    <Label style={styles.textColorLabel}>Correo Electrónico</Label>
                    <Input style={styles.textColor} value={this.state.restaurante.correo} onChangeText={text => this.handleChange_correo(text)}/>
                </Item>   

                <Item floatingLabel style={styles.textInputContainer}>
                  <Label style={styles.textColorLabel}>Contraseña</Label>
                  <Input style={styles.textColor} value={this.state.restaurante.contrasenia} onChangeText={text => this.handleChange_contrasenia(text)}/>
                </Item>

                <Item floatingLabel style={styles.textInputContainer}>
                  <Label style={styles.textColorLabel}>RUC</Label>
                  <Input style={styles.textColor} value={this.state.restaurante.ruc} onChangeText={text => this.handleChange_ruc(text)}/>
                </Item>

                <Button rounded danger
                  style={styles.buttonRed}
                  onPress={this.registrar}>
                  <Text 
                    style={styles.textCenter, styles.textColorWhite}>
                    Siguiente
                  </Text>
                </Button>
                <Button rounded danger
                  style={styles.buttonRed}
                  onPress={() => this.props.navigation.navigate('Login')}>
                  <Text 
                    style={styles.textCenter, styles.textColorWhite}>
                    Atrás
                  </Text>
                </Button>
              </Col>
            </Row>
          </Col>
          <Row style={styles.footer}>
          </Row>
        </Grid>
        {/* <Footer></Footer> */}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '5%',
    marginLeft: '5%',
  },
  colCenter: {
    alignItems: 'center'
  },
  part1: {
    marginTop: '2%',
    flex: 0.9,
  },
  part2: {
    flex: 3.3,
    textAlign: 'center'
  },
  footer: {
    flex: 1
  },
  svgFondo: {
    position: 'absolute',

    top: 0,
    left: 0,
    right: 16,
  },
  
  logo : {
    flex: 1,
    width : 180,
    height : 180,
    resizeMode : 'contain',
    borderRadius : 100
  },
  textInputContainer : {
    marginTop : 5,
    backgroundColor : '#EDB547',
    borderRadius: 10,
  },
  textInput : {
    borderWidth : 1,
    borderColor : '#EB4511',
    padding : 5,
    width : '80%',
    textAlign: 'center',
    marginTop : 5
  },
  textHeader : {
    textAlign: 'center',
    color : '#f3c54c',
    fontSize: 30,
  },
  textColor : {
    textAlign: 'center',
    color : 'white',
    fontSize: 17
  },
  textColorLabel: {
    fontSize: 15,
    textAlign: 'center',
    color : 'white',
  },
  textColorWhite : {
    textAlign: 'center',
    color : 'white',
    fontSize: 15 ,
  },
  textColorLabel: {
    fontSize: 15,
    textAlign: 'center',
    color : 'white',
  },
  buttonRed : {
    justifyContent : 'center',
    alignSelf:'center',
    marginTop : 15,
    width : '60%'
  },
})

export default RegistrarRestaurante