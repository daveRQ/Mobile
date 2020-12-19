import React, { Component } from 'react';
import { AppLoading } from 'expo';
import { StatusBar, StyleSheet } from 'react-native';
import { Container, Content, Form, Item, Input, Label, Picker, Icon, 
  ListItem, Radio, Right, Left, DatePicker, Button, Text } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import Head2 from '../compartido/Header2';
import Barra from '../../src/personal/barra.svg';
import Mujer1 from '../../src/personal/mujer1.svg';
import Hombre1 from '../../src/personal/hombre1.svg';
import ElipseTop from '../../src/personal/elipse_top.svg';
import ElipseBotton from '../../src/personal/elipse_botton.svg';

var titulo = "AQUI ESTAMOS";


const Lapso = ({navigation}) => {
	setTimeout(function(){
		navigation.navigate("PersonalAdmi")
	}, 2000);
	return null;
}

class PersonalList extends Component {	
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
        <Lapso navigation={ this.props.navigation } />
        {/* <Head /> */}
        <Grid>
          <Row style={styles.part1}>
            <Text>    Admi Personal/Crear Personal</Text>
          </Row>

          <Row style={styles.part2}>
            <Barra width='100%' height='100%' />
          </Row>

          <Row style={styles.part3}>
            <ElipseTop width='30%' height='50%' />
          </Row>

          <Row style={styles.part4}>  
            <Text style={{color: '#D32929', fontSize: 40}}>Usuario</Text>
          </Row>
          <Row style={styles.part5}>
            <Text style={{color: '#D32929', fontSize: 40}}>Encargado</Text>
          </Row>



          <Row style={styles.part6}>
            <Hombre1 width='100%' height='100%' />
          </Row>

          <Row style={styles.part7}>
            <Text style={{color: '#000000', fontSize: 40}}>Gonzalo Ramirez</Text>
          </Row>

          <Row style={styles.part8}>
            <ElipseBotton width='30%' height='50%' />
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
    flex: 4,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  part4: {
    flex: 2,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  part5: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  part6: {
    flex: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  part7: {
    flex: 5,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  part8: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
})

export default PersonalList;
