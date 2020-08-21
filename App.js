import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack'
import React, { useState } from "react";
import { Button, Text, StyleSheet, StatusBar, View, SafeAreaView } from "react-native";

import HeaderComponent from './components/headerComponent'
import LoginComponent from './components/login/LoginComponent'
import RegistryComponent from './components/registro/RegistryComponent'
import HomeComponent from './components/home/HomeComponent'
import CheckMailComponent from './components/checkMail/CheckMailComponent'
import ChangePasswordComponent from './components/changePassword/ChangePasswordComponent'


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{
          
        }}
        initialRouteName = "Login" 
      >
        <Stack.Screen 
          name="Login" 
          component={LoginComponent} 
        />
        <Stack.Screen 
          name="Registro" 
          component={RegistryComponent} 
        />
        <Stack.Screen 
          name="home" 
          component={HomeComponent} 
        />
        <Stack.Screen 
          name="Verificar correo" 
          component={CheckMailComponent} 
        />
        <Stack.Screen 
          name="Cambiar contraseña" 
          component={ChangePasswordComponent} 
        />
        <Stack.Screen 
          name="test" 
          component={HeaderComponent} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default App;