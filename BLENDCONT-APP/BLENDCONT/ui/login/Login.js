import React, { Component } from 'react';
import { AppLoading } from 'expo';
import { StatusBar, StyleSheet, TouchableOpacity, Text, ToastAndroid,TextInput, View, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Container, Header, Left, Right, Body,Title, Button, Footer} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import Head from '../compartido/Header2';

import Logo from '../../src/login/logo.svg';
import Fondo from '../../src/login/fondo.svg';

//funciones de AsyncStorage
import { getItem, setItem, removeItem  } from './../StorageHelper'

//cambiar el ipHost segun el server
const {ipHost} = require('./../../ipHost')

class Login extends Component {
	constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      restaurante: {
        nombre: '',
        contrasenia: ''
      }
    };
    
    this.login = this.login.bind(this);
  }

  async login(e) {
    fetch('http://' + ipHost + '/api/authRoutes/login',{
      method: 'POST',
      body: JSON.stringify(this.state.restaurante),
      headers: {
        'Acccept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.result) {
           //set jwt
          let value = setItem('jwt', data.token);
          //set id restaurante

          let res = data.restaurante._id.toString();
          setItem("id_restaurante", res);
          getItem("id_restaurante").then(item => {console.log(item)})

          ToastAndroid.showWithGravityAndOffset(data.message, ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
          this.props.navigation.navigate('Inicio');
        }
        else {
          ToastAndroid.showWithGravityAndOffset(data.message, ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
        }
      });
    e.preventDefault();
  }

  handleChange_nombre(value){
    this.setState({
      restaurante: {       
        ...this.state.restaurante,
         nombre: value  
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
    //eliminar elementos que pudieron quedar almacenados en la ultima sesion
    /*removeItem("jwt");
    removeItem("platillo");*/
    

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
        <Fondo width='100%' height='160%'
          style={styles.svgFondo}
        />
        {/* <Head navigation={this.props.navigation} /> */}
        {/* <Head /> */}
        <Grid style={styles.body}>
          <Row style={styles.part1}>
            <Logo width='90%' height='90%' style={styles.logo}/>
          </Row>
          <Row style={styles.part2}>
            <Col style={styles.colCenter}>
              <TextInput name="nombre" value={this.state.restaurante.nombre} onChangeText={text => this.handleChange_nombre(text)} placeholder="NOMBRE DEL RESTAURANTE" placeholderTextColor="#EB4511"
                style={styles.textInput}>
              </TextInput>
              <TextInput name="contrasenia" value={this.state.restaurante.contrasenia}   onChangeText={text => this.handleChange_contrasenia(text)} placeholder="CONTRASEÑA" secureTextEntry={true} placeholderTextColor="#EB4511"
                style={styles.textInput}>
              </TextInput>

              <Button rounded danger
                style={styles.buttonRed}
                onPress={this.login}>
                <Text 
                  style={styles.textCenter, styles.textColorWhite}>
                  Ingresar
                </Text>
              </Button>

              <Col>
                <Row>
                  <Button transparent onPress={() => this.props.navigation.navigate('OlvidoContrasenia')}>
                    <Text style={styles.textCenter, styles.textColorRed}>
                      Olvidé mi contraseña
                    </Text>
                  </Button>
                </Row>
                <Row style={{alignContent: 'center', justifyContent: 'center'}}>
                  <Button transparent onPress={() => this.props.navigation.navigate('RegistrarRestaurante')}>
                    <Text style={styles.textCenter, styles.textColorRed}>
                      Registrarse
                    </Text>
                  </Button>
                </Row>
              </Col>
              
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
    flex: 1,
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
    color : '#EB4511',
  },
  textColorWhite : {
    color : 'white'
  },
  buttonRed : {
    justifyContent : 'center',
    alignSelf:'center',
    marginTop : 50,
    width : '60%'
  }
  
})

export default Login