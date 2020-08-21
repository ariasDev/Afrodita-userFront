import React, {Component} from 'react'
import {
    View, 
    Text, 
    StyleSheet, 
    TextInput, 
    TouchableOpacity, 
    ScrollView,
    Image,
    Alert,
    Modal,
    ActivityIndicator
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import ModalLoadComponent from '../modalLoad/ModalLoadComponent'
const BACKEND_SERVER = require('../../enviroment').BACKEND_SERVER

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
        if(this.state.name !== '' && this.state.email !== '' && this.state.password !== '' && this.state.passwordConfirmation !== ''){
            if(this.state.password !== this.state.passwordConfirmation){
                this.showAlert('Algo salió mal', 'Las contraseñas deben coincidir ')
            }else{
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
                .catch(error => console.error('Error:', error))
                .then(response => response);
                if(response.error){
                    this.setState({"modalVisibility": false})
                    this.showAlert(response.error, response.errorDescription)
                } else{
                    try {
                        await AsyncStorage.setItem('userData', JSON.stringify(response.userData))
                        this.props.navigation.reset({index: 0,routes: [{ name: 'home' }],});
                        this.setState({"modalVisibility": false})
                        this.props.navigation.navigate("home")
                    } catch (error) {
                        console.log(error);
                    }
                }
            }
        }
        else{
            this.showAlert('Algo salió mal', 'Debes diligenciar todos los campos')
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
        paddingTop: 30
        
    },
    logo: {
        height: 80,
        width: 200
    },
    formContainer: {
        flex: 8,
        justifyContent: "center"
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