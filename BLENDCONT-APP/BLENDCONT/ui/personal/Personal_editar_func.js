import React, { Component } from 'react';
import { AppLoading } from 'expo';
import { StatusBar, StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import { Container, Content, Form, Item, Input, Label, Picker, Icon, 
  Text, DatePicker, Button } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import Head2 from '../compartido/Header2';
import Barra from '../../src/personal/barra.svg'
import Mujer1 from '../../src/personal/mujer1.svg'
import Hombre1 from '../../src/personal/hombre1.svg'

var titulo = "AQUI ESTAMOS";

class Personal_editar_func extends Component {	
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
        {/* <Head /> */}
        <Grid>
          <Row style={styles.part1}>
            <Text>    Admi Personal/Crear Personal</Text>
          </Row>

          <Row style={styles.part2}>
            <Barra width='100%' height='100%' />
          </Row>

          <Row style={styles.part3}>
            <Hombre1 width='100%' height='100%' />
          </Row>

          <Row style={styles.part4}>
            <Content>
              <Form>
                <Row>
                  <Col style={{flex: 2}}>
                    <Item regular style={styles.buttons}>
                      <Input placeholder='Nombres' />
                    </Item>
                  </Col>
                  <Col style={{flex: 1, alignItems: 'center', justifyContent: 'center',
                    backgroundColor: '#F3D2B3', margin: '1%'}}>
                    <Item picker>
                      <Picker
                        mode="dropdown"
                        iosIcon={<Icon name="arrow-down" />}
                        style={{ width: undefined }}
                        placeholder="Select your SIM"
                        placeholderStyle={{ color: "#bfc6ea" }}
                        placeholderIconColor="#007aff"
                        selectedValue={this.state.selected1}
                        onValueChange={this.onValueChange1.bind(this)}
                        >
                        <Picker.Item label="DNI" value="key0" />
                        <Picker.Item label="Pasaporte" value="key1" />
                        <Picker.Item label="Carnet Extranjería" value="key2" />
                      </Picker>
                    </Item>
                  </Col>
                  <Col style={{flex: 1, marginTop: '0.5%'}}>
                    <Item regular style={{backgroundColor: '#F4C2C2', marginTop: '2%', marginRight: '7%'}}>
                      <Input placeholder="Numero" />
                    </Item>
                  </Col>
                </Row>
                <Row>
                  <Col style={{flex: 7}}>
                    <Item regular style={styles.buttons}>
                      <Input placeholder='Apellido Paterno' />
                    </Item>
                  </Col>
                  <Col style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
                    <Label>Sexo:</Label>
                  </Col>
                  <Col style={{flex: 5, alignItems: 'center', justifyContent: 'center',
                    backgroundColor: '#F3D2B3', margin: '1%', marginRight: '2%'}}>
                    <Item picker>
                      <Picker
                        mode="dropdown"
                        iosIcon={<Icon name="arrow-down" />}
                        style={{ width: undefined }}
                        placeholder="Select your SIM"
                        placeholderStyle={{ color: "#bfc6ea" }}
                        placeholderIconColor="#007aff"
                        selectedValue={this.state.selected2}
                        onValueChange={this.onValueChange2.bind(this)}
                        >
                        <Picker.Item label="Hombre" value="key0" />
                        <Picker.Item label="Mujer" value="key1" />
                      </Picker>
                    </Item>
                  </Col>
                </Row>
                <Row>
                  <Col style={{flex: 2.13}}>
                    <Item regular style={styles.buttons}>
                      <Input placeholder='Apellido Materno' />
                    </Item>
                  </Col>
                  <Col style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Label>Nacimiento</Label>
                  </Col>
                  <Col style={{flex: 1.13, justifyContent: 'center', alignItems: 'center', 
                  backgroundColor: '#F3D2B3', marginVertical: '1%', marginRight: '2%'}}>
                    <DatePicker rounded
                      defaultDate={new Date(2000, 4, 4)}
                      minimumDate={new Date(1979, 1, 1)}
                      maximumDate={new Date(2020, 12, 31)}
                      locale={"en"}
                      timeZoneOffsetInMinutes={undefined}
                      modalTransparent={false}
                      animationType={"slide"}
                      androidMode={"default"}
                      placeHolderText="Fecha"
                      textStyle={{ color: "black" }}
                      placeHolderTextStyle={{ color: "gray" }}
                      onDateChange={this.setDate}
                      disabled={false}
                      />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Item regular style={styles.buttons}>
                      <Input placeholder="Numero Celular" />
                    </Item>
                  </Col>
                  <Col>
                    <Item regular style={styles.buttons}>
                      <Input placeholder="Dirección" />
                    </Item>              
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Item regular style={styles.buttons}>
                      <Input placeholder='Puesto Laboral' />
                    </Item>
                  </Col>
                  <Col>
                    <Item regular style={styles.buttons}>
                      <Input placeholder="Curriculum" />
                    </Item>
                  </Col>
                </Row>
              </Form>
            </Content>
          </Row>

          <Row style={styles.part5}>
            <Content>
              <Form>
                <Row>
                  <Col style={{flex: 1}}>
                  </Col>
                  <Col style={{flex: 4}}>
                    <Item regular style={{backgroundColor: '#F3D2B3', marginBottom: '1%'}}>
                      <Input placeholder='Email' />
                    </Item>
                    <Item regular style={{backgroundColor: '#F3D2B3', marginTop: '1%'}}>
                      <Input placeholder='Contraseña' />
                    </Item>
                    <Row style={{justifyContent: 'center', alignItems: 'center', padding: '2%'}}>
                      <Button style={{backgroundColor: '#ECB787', width: '50%', justifyContent: 'center'}}
                        onPress={() => this.props.navigation.navigate('PersonalList')}>
                        <Text>Funciones</Text>
                      </Button>
                    </Row>
                  </Col>
                  <Col style={{flex: 1}}>
                  </Col>
                </Row>
              </Form>
            </Content>
          </Row>
        </Grid>
              
      </Container>
    );
  }
}

// SUMA FLEX = 27.8
const styles = StyleSheet.create({
  part1: {
    flex: 0.8,
    alignItems: 'flex-end'
  },
  part2: {
    flex: 1,
  },
  part3: {
    flex: 8,
    alignItems: 'flex-end',
    justifyContent: 'center',
    // backgroundColor: 'blue'
  },
  part4: {
    flex: 11.5,
    alignItems: 'flex-end',
    justifyContent: 'center',
    // backgroundColor: 'red'
  },
  part5: {
    flex: 6.5,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'gray'
  },
  buttons: {
    backgroundColor: '#F3D2B3',
    marginLeft: '4%',
    marginRight: '2%',
    marginTop: '2%',
    marginBottom: '2%',
  }
})

export default Personal_editar_func;
