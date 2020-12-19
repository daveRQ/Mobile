import React, { Component } from 'react';
import { AppLoading } from 'expo';
import { StatusBar, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Container} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import Head2 from '../compartido/Header2';

import Barra from '../../src/personal/barra.svg'
import PersonalGeneral from '../../src/personal/personal_general.svg'
import CrearEquipo from '../../src/personal/crear_equipo.svg'
import TotalPersonal from '../../src/personal/total_personal.svg'


class PersonalAdmi extends Component {
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
    var inter = 'PersonalAdmi'
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
            <Text>    Admi Personal</Text>
          </Row>
          <Row style={styles.part2}>
            <Barra width='100%' height='100%' />
          </Row>
          <Row style={styles.part3}>
            <PersonalGeneral width='80%' height='90%' />
          </Row>
          <Row style={styles.part4}>
            <TouchableOpacity style={{ width: '100%', height: '100%' }} 
            onPress={() => this.props.navigation.navigate('PersonalCrear')}>
              <CrearEquipo width='100%' height='100%' />
            </TouchableOpacity>
          </Row>
          <Row style={styles.part5}>
            <TouchableOpacity style={{ width: '100%', height: '100%' }}
            onPress={() => this.props.navigation.navigate('PersonalTotal')}>
              <TotalPersonal width='100%' height='100%' />
            </TouchableOpacity>
          </Row>
          <Row style={styles.part6}>
          </Row>
        </Grid>
        {/* <Footer></Footer> */}
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
    flex: 14,
    alignItems: 'flex-end',
    justifyContent: 'center',
    // backgroundColor: 'blue'
  },
  part4: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  part5: {
    flex: 5,
    justifyContent: 'center',
    marginLeft: '5%',
    // backgroundColor: 'blue'
  },
  part6: {
    flex: 2
  }
})

export default PersonalAdmi;

