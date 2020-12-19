import React, { Component } from 'react';
import { AppLoading } from 'expo';
import { StatusBar, StyleSheet, TouchableOpacity, Text, TextInput, View, Image } from 'react-native';
import { Container, Header, Left, Right, Body, Title, Button, Footer,List, ListItem, Item, Input, Label,Radio, DatePicker} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import Head from '../compartido/Header2';

import Logo from '../../src/login/logo.svg'
import HeaderFondo from '../../src/registro/header_registrarDuenio.svg'

class RegistrarDuenio extends Component {
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
        {/* <HeaderFondo width='100%' height='30%'/> */}
        {/* <Head /> */}
        <Grid style={styles.body}>
          <Row style={styles.part1}>
             <Item floatingLabel
                style={styles.textInputContainer}>
                <Label style={styles.textColorLabel}>Nombre Completo</Label>
                <Input style={styles.textColor}/>
            </Item>
          </Row>
          <Row style={styles.part1}>
            <Col style={styles.colCenter}>
                <Item floatingLabel
                  style={styles.textInputContainer}>
                        <Label style={styles.textColorLabel}>Apellido paterno</Label>
                        <Input style={styles.textColor}/>
                  </Item>
            </Col>
            <Col style={styles.colCenter}>
                <Item floatingLabel
                  style={styles.textInputContainer}>
                      <Label style={styles.textColorLabel}>Apellido materno</Label>
                      <Input style={styles.textColor}/>
                </Item>
            </Col>
          </Row>
          <Row style={styles.part1}>
            <Col style={styles.colCenter}>
                <Item floatingLabel
                  style={styles.textInputContainer}>
                        <Label style={styles.textColorLabel}>Tipo de Documento</Label>
                        <Input style={styles.textColor}/>
                  </Item>
            </Col>
            <Col style={styles.colCenter}>
                <Item floatingLabel
                  style={styles.textInputContainer}>
                      <Label style={styles.textColorLabel}>Nro de Documento</Label>
                      <Input style={styles.textColor}/>
                </Item>
            </Col>
          </Row>
          <Row style={styles.part1}>
            <Col style={styles.colCenter}>
              <Item floatingLabel style={styles.textInputContainer}>
                  <Label style={styles.textColorLabel}>Número de celular</Label>
                  <Input style={styles.textColor}/>
              </Item>
            </Col>
          </Row>
          <Row style={[styles.part2,styles.textInputContainer]}>
              <Row>
               <Label 
                  style={styles.textColorLabel}>
                  Sexo
                </Label>
              </Row>
              <Row>
                <Col style={styles.colCenter}>
                      <Radio selected={false} />
                      <Text style={[styles.textColorLabel]}>Femenino</Text>
                </Col>
                <Col style={styles.colCenter}>
                      <Radio selected={true} />
                      <Text style={[styles.textColorLabel]}>Masculino</Text>
                </Col>
              </Row>
          </Row>
          <Row style={[styles.part3,styles.textInputContainer]}>
              <Col style={styles.colCenter}>
                <Label style={styles.textColorLabel}>Fecha de nacimiento</Label>
                <DatePicker
                  defaultDate={new Date(2018, 4, 4)}
                  textStyle={styles.textColorLabelBig}
                >  
                </DatePicker>
              </Col>
            </Row>
            <Row style={styles.part4}>
              <Col style={styles.colCenter}>
                <Button rounded danger
                  style={styles.buttonRed}
                  onPress={() => this.props.navigation.navigate('BienvenidoRegistro')}>
                  <Text 
                    style={styles.textCenter, styles.textColorWhite}>
                    Siguiente
                  </Text>
                </Button>
                <Button rounded danger
                  style={styles.buttonRed}
                  onPress={() => this.props.navigation.navigate('RegistrarRestaurante')}>
                  <Text 
                    style={styles.textCenter, styles.textColorWhite}>
                    Atras
                  </Text>
                </Button>
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
    alignItems: 'center',
    marginRight: '5%',
    marginLeft: '5%',
  },
  colCenter: {
    alignItems: 'center'
  },
  part1: {
    marginTop: '2%',
    flex: 0.4,
    alignItems: 'center'
  },
  part2: {
    flex: 0.7,
    textAlign: 'center',
    alignItems: 'center',
    marginTop: '1%'
  },
  part3: {
    flex: 0.6,
    textAlign: 'center',
    alignItems: 'center',
    marginTop: '1%'
  },
  part4: {
    flex: 1.4,
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
    flex: 1,
    width : 180,
    height : 180,
    resizeMode : 'contain',
    borderRadius : 100
  },




  buttonRed : {
    justifyContent : 'center',
    alignSelf:'center',
    marginTop : 15,
    width : '60%'
  },
  logo : {
    flex: 1,
    width : 180,
    height : 180,
    resizeMode : 'contain',
    borderRadius : 100
  },
  textInputContainer : {
    backgroundColor : '#ec7d7d',
    borderRadius: 10,
  },
  textHeader : {
    textAlign: 'center',
    color : '#EB4511',
    fontSize: 30,
  },
  textColor : {
    textAlign: 'center',
    color : 'white',
    fontSize: 17
  },
  textColorWhite : {
    textAlign: 'center',
    color : 'white',
    fontSize: 15 ,
  },
  rowView : {
    width: '90%',
    marginRight: 'auto',
    marginLeft: 'auto',
    flexDirection : 'row',
    justifyContent: 'space-between',
  },
  colView : {
    flex: 1,
    flexDirection: 'column'
  },
  centerContainer: {
    textAlign: 'center',
  },
  containerStyleInput : {
    width: '90%',
    textAlign: 'center',
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: 5,
  },
  line : {
    borderBottomColor: '#EB4511',
    borderBottomWidth: 4,
    marginRight: 'auto',
    marginLeft: 'auto',
    marginBottom: 20,
    width: "90%"
  },
  textColorLabel: {
    fontSize: 15,
    textAlign: 'center',
    color : 'white',
  },
  textColorLabelBig: {
    fontSize: 20,
    textAlign: 'center',
    color : 'white',
  },
  radioButton:{
    paddingBottom: 10,
    alignItems: 'center'
  }
})

export default RegistrarDuenio