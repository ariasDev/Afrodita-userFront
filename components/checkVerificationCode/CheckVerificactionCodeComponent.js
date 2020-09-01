import React, {Component} from 'react'
import {
    StyleSheet,
    ScrollView,
    View,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    Alert
} from 'react-native'
import ModalLoadComponent from '../modalLoad/ModalLoadComponent'
const BACKEND_SERVER = require('../../enviroment').BACKEND_SERVER

class CheckVerificationCodeComponent extends Component{
    state = {
        email: '',
        verificationCode: '',
        modalVisibility: false,
    }

    componentDidMount(){
        this.setState({'email': this.props.route.params.email})
        this.showAlert('Éxito', `Se envió un código de verificacion a tu correo`)
    }

    showAlert(title, description){
        Alert.alert(
            title,
            description,
            [
                { text: "OK", onPress: () => "OK Pressed" }
            ],
            { cancelable: false }
        );
    }

    validateEmail(email) {
        return /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email)
    }

    async checkVerificationCode () {
        try {
            if(this.state.email !=='' && this.state.verificationCode !==''){
                if(this.validateEmail(this.state.email)){
                    this.setState({"modalVisibility": true})
                    let url = `${BACKEND_SERVER}/checkValidationCode`;
                    let response = await fetch(url, {
                        method: 'POST',
                        body: JSON.stringify({
                            "email": this.state.email,
                            "verificationCode": this.state.verificationCode
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
                    }
                    else{
                        this.setState({"modalVisibility": false})
                        this.props.navigation.navigate("Cambiar contraseña", {"email": this.state.email})
                    }
                } else{
                    this.setState({"modalVisibility": false})
                    this.showAlert('Algo salió mal', 'Ingresa un correo valido')
                }
            }else {
                this.setState({"modalVisibility": false})
                this.showAlert('Algo salió mal', 'Debes diligenciar todos los campos')
            }
            
        } catch (error) {
            console.log(error);
            this.setState({"modalVisibility": false})
            this.showAlert('Algo salió mal', 'Estamos trabajando en ello')
        }
    }

    render(){
        return(
            <ScrollView style = {styles.container}>
                <View style = {styles.logoContainer}>
                    <Image 
                        source ={require('../../assets/logo1.png') }
                        style = {styles.logo}
                     />
                </View>
                <View style = {styles.formContainer}>
                    <Text style={styles.label}>Código de verificación</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => this.setState({verificationCode: text})}
                        placeholder="Ingresa el código de verificación" 
                        placeholderTextColor="grey"
                        autoCapitalize="none"
                        autoCorrect={false}
                        visible={false}
                    />
                </View>
                <TouchableOpacity style={styles.buttonConfirm} onPress = {() => this.checkVerificationCode()} >
                        <Text style={styles.textConfirm}>Verificar código</Text>
                </TouchableOpacity>
                <ModalLoadComponent
                    modalVisibility={this.state.modalVisibility}
                />
            </ScrollView>
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
        justifyContent: "center",
        paddingTop: 20
    },
    label: 
    {
        fontWeight: "bold"
    },
    input: { 
        color: 'gray',
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 1,
        paddingLeft: 5,
        marginBottom: 20,
        borderRadius: 5,
        borderWidth: 0.7,
    },
    buttonConfirm:{
        justifyContent: "center",
        backgroundColor: "#D500F9",
        height: 40,
        borderRadius: 5
    },
    textConfirm: {
        color: "white",
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
    }
})

export default CheckVerificationCodeComponent