import React, {Component} from 'react';
import { StyleSheet } from 'react-native';
import { Container, Header, Button, Left, Body, Right, Title } from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { SimpleLineIcons } from '@expo/vector-icons';

import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';


class Header1 extends Component {	
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
    return (
      <Header style={{backgroundColor: '#f02215'}}>
        <Left style={styles.left}>
          <Button transparent>
            <SimpleLineIcons name="menu" size={24} color="white" />
          </Button>
        </Left>
        <Body style={styles.body}>
          <Title>Picanteria Cary</Title>
        </Body>
        <Right style={styles.right}>
          <Button transparent>
            <FontAwesome5 name="question" size={24} color="white" />
          </Button>
        </Right>
      </Header>
    );
  }
}

const styles = StyleSheet.create({
  left: {
    flex: 1
  },
  body: {
    flex: 5,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  right: {
    flex: 1
  }
})

export default Header1;