// import React, { Component } from 'react';
// import { AppLoading } from 'expo';
// import { StatusBar, StyleSheet, TouchableOpacity, Text, ToastAndroid, TextInput, View, Image, ScrollView, Dimensions, Scree } from 'react-native';
// import { Col, Row, Grid } from 'react-native-easy-grid';
// import {
//     Container, Content, Form, Item, Input, Label, Picker, ListItem, Radio, Right, Left, DatePicker, Button, Header, Footer, Body
// }
//     from 'native-base';
// import { LinearGradient } from 'expo-linear-gradient'
// import { Table, TableWrapper, Row as FilaTabla, Cell } from 'react-native-table-component';
// import { LineChart, BarChart, PieChart, ProgressChart, ContributionGraph, StackedBarChart } from 'react-native-chart-kit'


// import Stars from 'react-native-stars';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// <View style={{ alignItems: 'center' }}>
//     <Stars
//         default={2.5}
//         count={5}
//         half={true}
//         starSize={50}
//         fullStar={<Icon name={'star'} style={styles.myStarStyle} />}
//         emptyStar={<Icon name={'star-outline'} style={[styles.myStarStyle, styles.myEmptyStarStyle]} />}
//         halfStar={<Icon name={'star-half'} style={styles.myStarStyle} />}
//     />
// </View>

// const styles = StyleSheet.create({
//     myStarStyle: {
//         color: 'yellow',
//         backgroundColor: 'transparent',
//         textShadowColor: 'black',
//         textShadowOffset: { width: 1, height: 1 },
//         textShadowRadius: 2,
//     },
//     myEmptyStarStyle: {
//         color: 'white',
//     }
// });


// {/*import React, { Component } from 'react';
// import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
// import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';

// export default class ExampleFour extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             tableHead: ['Head', 'Head2', 'Head3', 'Head4'],
//             tableData: [
//                 ['1', '2', '3', '4'],
//                 ['a', 'b', 'c', 'd'],
//                 ['1', '2', '3', '4'],
//                 ['a', 'b', 'c', 'd']
//             ]
//         }
//     }

//     _alertIndex(index) {
//         Alert.alert(`This is row ${index + 1}`);
//     }

//     render() {
//         const state = this.state;
//         const element = (data, index) => (
//             <TouchableOpacity onPress={() => this._alertIndex(index)}>
//                 <View style={styles.btn}>
//                     <Text style={styles.btnText}>button</Text>
//                 </View>
//             </TouchableOpacity>
//         );

//         return (
//             <View style={styles.container}>
//                 <Table borderStyle={{ borderColor: 'transparent' }}>
//                     <Row data={state.tableHead} style={styles.head} textStyle={styles.text} />
//                     {
//                         state.tableData.map((rowData, index) => (
//                             <TableWrapper key={index} style={styles.row}>
//                                 {
//                                     rowData.map((cellData, cellIndex) => (
//                                         <Cell key={cellIndex} data={cellIndex === 3 ? element(cellData, index) : cellData} textStyle={styles.text} />
//                                     ))
//                                 }
//                             </TableWrapper>
//                         ))
//                     }
//                 </Table>
//             </View>
//         )
//     }
// }

// const styles = StyleSheet.create({
//     container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
//     head: { height: 40, backgroundColor: '#808B97' },
//     text: { margin: 6 },
//     row: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
//     btn: { width: 58, height: 18, backgroundColor: '#78B7BB', borderRadius: 2 },
//     btnText: { textAlign: 'center', color: '#fff' }
// });*/}

// {/*import * as React from 'react';
// import { Text, View } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';

// export default function FacebookButton() {
//   return (
//     <View
//       style={{
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor: 'orange',
//       }}>
//       <LinearGradient
//         // Background Linear Gradient
//         colors={['rgba(0,0,0,0.8)', 'transparent']}
//         style={{
//           position: 'absolute',
//           left: 0,
//           right: 0,
//           top: 0,
//           height: 300,
//         }}
//       />
//       <LinearGradient
//         // Button Linear Gradient
//         colors={['#4c669f', '#3b5998', '#192f6a']}
//         style={{ padding: 15, alignItems: 'center', borderRadius: 5 }}>
//         <Text
//           style={{
//             backgroundColor: 'transparent',
//             fontSize: 15,
//             color: '#fff',
//           }}>
//           Sign in with Facebook
//         </Text>
//       </LinearGradient>
//     </View>
//   );
// }*/}
// {/*import React, { Component } from 'react'
// import {
//     Container, Content, Form, Item, Input, Label, Picker, Icon, ListItem, Radio, Right, Left, DatePicker, Button, Header, Footer, Body
// }
//     from 'native-base';

// class Prueba extends Component {
//     constructor(props) {
//         super(props)
//         this.state = { date: "2016-03-15" }
//     }

//     render() {
//         return (
//             <DatePicker
//                 style={{ width: 200 }}
//                 date={this.state.date}
//                 mode="date"
//                 placeholder="select date"
//                 format="YYYY-MM-DD"
//                 minDate="2016-05-01"
//                 maxDate="2016-06-01"
//                 confirmBtnText="Confirm"
//                 cancelBtnText="Cancel"
//                 customStyles={{
//                     dateIcon: {
//                         position: 'absolute',
//                         left: 0,
//                         top: 4,
//                         marginLeft: 0
//                     },
//                     dateInput: {
//                         marginLeft: 36
//                     }
//                     // ... You can check the source to find the other keys.
//                 }}
//                 onDateChange={(date) => { this.setState({ date: date }) }}
//             />
//         )
//     }
// }

// export default Prueba;*/}
