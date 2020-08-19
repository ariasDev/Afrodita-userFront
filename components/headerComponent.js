import React, { Component } from 'react';
import { TextInput, Image, View, TouchableOpacity, StyleSheet, Platform, Text } from 'react-native';

export default class App extends Component{
    state = { hidePassword: true }

  managePasswordVisibility = () =>
  {
    this.setState({ hidePassword: !this.state.hidePassword });
  }

  render()
  {
    return(
      <View style = { styles.container }>
        <View style = { styles.textBoxBtnHolder }>
          <TextInput underlineColorAndroid = "transparent" secureTextEntry = { this.state.hidePassword } style = { styles.textBox }/>
          <TouchableOpacity activeOpacity = { 0.8 } style = { styles.visibilityBtn } onPress = { this.managePasswordVisibility }>
            <Text>mostrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create(
{
  container:
  {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingTop: (Platform.OS === 'ios') ? 20 : 0
  },

  textBoxBtnHolder:
  {
    position: 'relative',
    alignSelf: 'stretch',
    justifyContent: 'center'
  },

  textBox:
  {
    fontSize: 18,
    alignSelf: 'stretch',
    height: 45,
    paddingRight: 45,
    paddingLeft: 8,
    borderWidth: 1,
    paddingVertical: 0,
    borderColor: 'grey',
    borderRadius: 5
  },

  visibilityBtn:
  {
    position: 'absolute',
    right: 3,
    height: 40,
    width: 70,
    padding: 5
  },

});
