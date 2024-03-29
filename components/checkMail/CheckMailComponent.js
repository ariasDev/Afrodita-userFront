import React, {Component} from 'react'
import {
    View, 
    Text, 
    StyleSheet, 
    Image,
    TextInput,
    TouchableOpacity,
    Alert
} from 'react-native'
import ModalLoadComponent from '../modalLoad/ModalLoadComponent'
const BACKEND_SERVER = require('../../enviroment').BACKEND_SERVER
const validationsModule = require('../../utilities/validationsModule')

class CheckMailComponent extends Component{
    state = {
        email: '',
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

    async checkMail(){
        try {
            if(this.state.email === ''){
                this.showAlert('Algo salió mal', 'Ingresa tu correo')
            }
            else{
                if(validationsModule.validateEmail(this.state.email)){
                    this.setState({"modalVisibility": true})
                    let url = `${BACKEND_SERVER}/checkEmail`;
                    let response = await fetch(url, {
                        method: 'POST',
                        body: JSON.stringify({
                            "email": this.state.email,
                        }),
                        headers:{
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(res => res.json())
                    .catch(error => {
                        return{
                            "error": error
                        }
                    })
                    .then(response => response);
                    if(response.error){
                        this.setState({"modalVisibility": false})
                        this.showAlert('Algo salió mal', response.errorDescription || response.error.toString())
                    } else{
                        this.setState({"modalVisibility": false})
                        this.props.navigation.navigate("Verificar código", {"email": this.state.email})
                    }
                }else {
                    this.showAlert('Algo salió mal', 'Ingresa un correo valido')
                }
            }
            
        } catch (error) {
            this.showAlert('Algo salió mal', 'Estamos trabajando en ello')
        }
    }

    render(){
        return(
            <View style = {styles.container}>
                 <View style = {styles.logoContainer}>
                    <Image 
                        source ={require('../../assets/logo1.png') }
                        style = {styles.logo}
                     />
                </View>
                <View style = {styles.formContainer}>
                    <Text style={styles.label}>Correo</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => this.setState({email:text})}
                        placeholder="Verifica tu correo para cambiar la contraseña" 
                        placeholderTextColor="grey"
                        autoCapitalize="none"
                        autoCorrect={false}
                        visible={false}
                    />
                    <TouchableOpacity style={styles.botonVerificar} onPress = {() => this.checkMail()} >
                        <Text style={styles.textoVerificar}>Verificar correo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.registrarme} onPress = {() => this.props.navigation.navigate("Registro")}>
                        <Text style={styles.textoRegistrarme}>Registrarme</Text>
                    </TouchableOpacity>
                </View>
                <ModalLoadComponent
                    modalVisibility={this.state.modalVisibility}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1,
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
        paddingTop: 20
    },
    label: 
    {
        fontWeight: "bold"
    },
    input: { 
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 1,
        paddingLeft: 5,
        marginBottom: 20,
        borderRadius: 5,
        borderWidth: 0.7,
    }, 
    botonVerificar:{
        justifyContent: "center",
        backgroundColor: "#D500F9",
        height: 40,
        borderRadius: 5
    },
    textoVerificar: {
        color: "white",
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
    },
    registrarme: {
        height: 40,
        marginTop: 20,
        borderRadius: 5,
        borderColor: 'black', 
        borderWidth: 1.8,
        justifyContent: "center"
    },
    textoRegistrarme:{
        textAlign: "center",
        fontSize: 17,
        fontWeight: "bold",
    }
})

export default CheckMailComponent