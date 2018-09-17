/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};

var input_style = {
  width: 500,
  margin: 5,

  fontSize: 30,
  fontStyle: "italic",
  fontWeight: "100",
  
  

 // maxLength: 10,
 //  editable: false,
  color: '#ffffff',
  height: 100,
  textAlign: 'center',
  backgroundColor: '#336699',
  // placeholder: 'placeholder',
  // placeholderTextColor: '#776699',
  // returnKeyType: "done",
 //  keyboardType: "password",
  //  value: 'value',
  // defaultValue: 'defaultValue',
};


export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>

      <Text onPress={()=>{console.log('onPress1')}} style={{fontWeight: 'bold'}}>
        I am bold
        <Text onPress={()=>{console.log('onPress2')}} style={{color: 'red'}}>
          and red
        </Text>
      </Text>

       {/* <Text>
        There is a blue square
        <View style={{width: 50, height: 50, backgroundColor: 'steelblue'}} />
        in between my text.
      </Text> */}

            {/* <TextInput
                style={input_style}
                multiline={true}
                ref="textview"
                onFocus={(o)=>{
                  console.log('onFocus');
                  console.log(o);
                }}
                onEndEditing={(o)=>{
                  console.log('onEndEditing');
                  console.log(o);
                }}
            >{"TextInputTextInputTextInputTextInputTextInputTextInputTextInputTextInputTextInput"}</TextInput>
            <TextInput
                style={input_style}
                multiline={false}
                onFocus={()=>{
                  console.log('onFocus');
                }}
                onEndEditing={(o)=>{
                  console.log('onEndEditing');
                  console.log(o);
                }}
                ref="textfield"
                >{"TextInputTextInputTextInputTextInputTextInputTextInputTextInputTextInputTextInput"}</TextInput> */}


        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
