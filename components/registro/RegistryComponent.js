import React, {Component} from 'react'
import {
    View, 
    Text, 
    StyleSheet, 
    TextInput, 
    TouchableOpacity, 
    ScrollView,
    Image,
    Alert
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import ModalLoadComponent from '../modalLoad/ModalLoadComponent'
const BACKEND_SERVER = require('../../enviroment').BACKEND_SERVER
const validationsModule = require('../../utilities/validationsModule')

class RegistryComponent extends Component{
    state = {
        name: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        modalVisibility: false
    }

    showAlert(title, description){
        Alert.alert(
            title,
            description,
            [
                { text: "OK", onPress: () => "OK Pressed"}
            ],
            { cancelable: false }
        );
    }

    async registry(){
        try {
            if(this.state.name !== '' && this.state.email !== '' && this.state.password !== '' && this.state.passwordConfirmation !== ''){
                if(validationsModule.validateEmail(this.state.email)){
                    if(this.state.password === this.state.passwordConfirmation){
                        if(validationsModule.validatePasswordLength(this.state.password)){
                            this.setState({"modalVisibility": true})
                            let url = `${BACKEND_SERVER}/registry`;
                            let response = await fetch(url, {
                                method: 'POST',
                                body: JSON.stringify({
                                    "fullname": this.state.name,
                                    "email": this.state.email,
                                    "password": this.state.password,
                                    "addres": 'Default'
                                }),
                                headers:{
                                    'Content-Type': 'application/json'
                                }
                            })
                            .then(res => res.json())
                            .catch(error => {
                                return {
                                    "error": error
                                }
                            })
                            .then(response => response);
                            if(response.error){
                                this.setState({"modalVisibility": false})
                                this.showAlert('Algo salió mal', response.errorDescription || response.error.toString())
                            } else{
                                try {
                                    await AsyncStorage.setItem('userData', JSON.stringify(response.userData))
                                    this.props.navigation.reset({index: 0,routes: [{ name: 'home' }],});
                                    this.setState({"modalVisibility": false})
                                    this.props.navigation.navigate("home")
                                } catch (error) {
                                    this.showAlert('Algo salió mal', 'Estamos trabajando en ello')
                                }
                            }
                        } else{
                            this.showAlert('Algo salió mal', 'La contraseña debe ser minimo de 8 caracteres')
                        }
                    }else{
                        this.showAlert('Algo salió mal', 'Las contraseñas deben coincidir ')
                    }
                }else{
                    this.showAlert('Algo salió mal', 'Ingresa un correo valido')
                }
            }
            else{
                this.showAlert('Algo salió mal', 'Debes diligenciar todos los campos')
            }
        } catch (error) {
            this.showAlert('Algo salió mal', 'Estamos trabajando en ello')
        }
    }

    render(){
        return(
            <ScrollView 
               style = {styles.container}
            >
                <View style = {styles.logoContainer}>
                    <Image 
                        source ={require('../../assets/logo1.png') }
                        style = {styles.logo}
                     />
                </View>
                <View style = {styles.formContainer}>
                <Text style={styles.label}>Nombre</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => this.setState({name:text})}
                        placeholder="Ingresa tu nombre" 
                        placeholderTextColor = "grey"
                        autoCapitalize="words"
                        autoCorrect={false}
                    />
                    <Text style={styles.label}>Correo</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => this.setState({email:text})}
                        placeholder="Ingresa tu correo electronico" 
                        placeholderTextColor = "grey"
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                    
                    <Text style={styles.label}>Contraseña</Text>
                    <TextInput
                        secureTextEntry
                        style={styles.input}
                        onChangeText={text => this.setState({password:text})}
                        value={this.state.password}
                        placeholder="Ingresa tu contraseña" 
                        placeholderTextColor = "grey"
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                    <Text style={styles.label}>Confirmar contraseña</Text>
                    <TextInput
                        secureTextEntry
                        style={styles.input}
                        onChangeText={text => this.setState({passwordConfirmation:text})}
                        placeholder="Confrima tu contraseña" 
                        placeholderTextColor = "grey"
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                    <TouchableOpacity style={styles.botonRegistrarme} onPress = {() => this.registry()} >
                        <Text style={styles.textoRegistrarme}>Registrarme</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.login} onPress = {() => this.props.navigation.navigate("Login")}>
                        <Text style={styles.textologin}>Ya tengo una cuenta</Text>
                    </TouchableOpacity>
                </View>
                <ModalLoadComponent
                    modalVisibility={this.state.modalVisibility}
                />
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingRight: 20,
        paddingLeft: 20
    },
    logoContainer: 
    {
        flex: 2,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 15
        
    },
    logo: {
        height: 80,
        width: 200
    },
    formContainer: {
        flex: 8,
        justifyContent: "center",
        paddingTop: 20
    },
    label: 
    {
        fontWeight: "bold",
    },
    input: { 
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 0.7,
        paddingLeft: 5,
        marginBottom: 20,
        borderRadius: 5
    },
    botonRegistrarme:{
        justifyContent: "center",
        backgroundColor: "#D500F9",
        height: 40,
        borderRadius: 5
    },
    textoRegistrarme: {
        color: "white",
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
    },
    login: {
        height: 40,
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 5,
        borderColor: 'black', 
        borderWidth: 1.8,
        justifyContent: "center"
    },
    textologin:{
        textAlign: "center",
        fontSize: 17,
        fontWeight: "bold",
    }
})

export default RegistryComponent