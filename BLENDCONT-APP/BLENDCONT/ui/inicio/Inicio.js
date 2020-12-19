import React, { Component } from 'react';
import { AppLoading } from 'expo';
import { StatusBar, StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Content, Form, Item, Input, Label, Picker, Icon, 
  ListItem, Radio, Right, Left, DatePicker, Button, Text } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import Proximity from 'react-native-proximity';

import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import Head1 from '../compartido/Header1';
import Inventario from '../../src/inicio/button_inventario_1';
import Personal from '../../src/inicio/button_personal_1';
import Platillo from '../../src/inicio/button_platillo_1';
import Carta from '../../src/inicio/button_carta_1';
import Diagrama from '../../src/inicio/button_diagrama_1';
import Operacional from '../../src/inicio/button_operacional_1';

var titulo = "AQUI ESTAMOS";

class Inicio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    }; 
  }

  /**
  * State of proximity sensor
  * @param {object} data
  */
  _proximityListener(data) {
    this.setState({
      proximity: data.proximity,
      distance: data.distance // Android-only 
    });
  }
  
	async componentDidMount() {
    Proximity.addListener(this._proximityListener);
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
        <Head1 />

        <Grid>
          <Row style={styles.part0} />

          <Row style={styles.part1}>
            <Col style={{justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity style={{ width: '100%', height: '100%' }}
              onPress={() => this.props.navigation.navigate('Inventario')}>
                <Inventario width='90%' height='90%' />
              </TouchableOpacity>
            </Col>
            {/* <Col style={{justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity style={{ width: '100%', height: '100%' }}
              onPress={() => this.props.navigation.navigate('PersonalAdmi')}>
                <Personal width='90%' height='90%' />
              </TouchableOpacity>
            </Col> */}
          </Row>

          <Row style={styles.part2}>
            <Col style={{justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity style={{ width: '100%', height: '100%' }}
              onPress={() => this.props.navigation.navigate('Platillo')}>
                <Platillo width='90%' height='90%' />
              </TouchableOpacity>
            </Col>
            {/* <Col style={{justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity style={{ width: '100%', height: '100%' }}>
                <Carta width='90%' height='90%' />
              </TouchableOpacity>
            </Col> */}
          </Row>

          <Row style={styles.part3}>
            <Col style={{justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity style={{ width: '100%', height: '100%' }}
              onPress={() => this.props.navigation.navigate('Dia_operacional')}>
                <Operacional width='90%' height='90%' />
              </TouchableOpacity>
            </Col>
            <Col style={{justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity style={{ width: '100%', height: '100%' }}
              onPress={() => this.props.navigation.navigate('Informes')}>
                <Diagrama width='90%' height='90%' />
              </TouchableOpacity>
            </Col>
          </Row>
          <Row style={styles.part4}>
            <Button rounded style={{backgroundColor: '#CEF3EF', width: '50%', justifyContent: 'center', 
            borderColor: '#1A9D86', borderWidth: 4 }} >
              <Text style={{color: '#0E6732'}}>Otros</Text>
            </Button>
          </Row>
        </Grid>
              
      </Container>
    );
  }
}

// SUMA FLEX = 27.8
const styles = StyleSheet.create({
  part0: {
    flex: 1,
  },
  part1: {
    flex: 6,
    marginLeft: '5%',
  },
  part2: {
    flex: 6,
    marginLeft: '5%',
  },
  part3: {
    flex: 6,
    marginLeft: '5%',
  },
  part4: {
    flex: 3,
    justifyContent: 'center'
  }
})

export default Inicio;
