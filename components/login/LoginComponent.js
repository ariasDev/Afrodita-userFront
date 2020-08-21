import React, {Component} from 'react'
import { 
    View, 
    StyleSheet, 
    Text, 
    TextInput, 
    Button, 
    TouchableOpacity, 
    Image, 
    KeyboardAvoidingView,
    ScrollView,
    Modal, 
    ActivityIndicator,
    Alert 
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import ModalLoadComponent from '../modalLoad/ModalLoadComponent'

const BACKEND_SERVER = require('../../enviroment').BACKEND_SERVER

export default class LoginComponent extends Component{
    state = {
        email: '',
        password: '',
        response: '',
        modalVisibility: false,
        hidePassword: true
    }

    componentDidMount(){
        this.setState({'email': ''})
        this.setState({'password': ''})
        this.setState({'response': ''})
        this.setState({'modalVisibility': false})
        this.setState({'hidePassword': true})
    }

    async loginUser(){
        if(this.state.email !== '' && this.state.password !== ''){
            this.setState({"modalVisibility": true})
            let url = `${BACKEND_SERVER}/login`;
            let response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                    "email": this.state.email,
                    "password": this.state.password
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
            }else{
                try {
                    await AsyncStorage.setItem('userData', JSON.stringify(response.userData))
                    this.setState({"modalVisibility": false})
                    this.props.navigation.reset({index: 0, routes: [{ name: 'home' }]})
                } catch (error) {
                    this.showAlert('Algo salió mal', error)
                    this.props.navigation.reset({index: 0, routes: [{ name: 'Login' }]})
                }
            }
        }else{
            this.showAlert('Algo salió mal', 'Falta tu correo y/o contraseña')
        }

    }

    managePasswordVisibility = () =>{
        this.setState({ hidePassword: !this.state.hidePassword });
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
                    <View style = { styles.textBoxBtnHolder }>
                        <TextInput  
                            secureTextEntry = { this.state.hidePassword } 
                            style = { styles.textBox }
                            placeholder="Ingresa tu contraseña" 
                            placeholderTextColor = "grey"
                            onChangeText={text => this.setState({password:text})}
                        />
                            
                        <TouchableOpacity activeOpacity = { 0.8 } style = { styles.visibilityBtn } onPress = { this.managePasswordVisibility }>
                            <Text>mostrar</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.botonLogin} onPress = {() => this.loginUser()} >
                        <Text style={styles.textoLogin}>Ingresar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.registrarme} onPress = {() => this.props.navigation.navigate("Registro")}>
                        <Text style={styles.textoRegistrarme}>Registrarme</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress = {() => this.props.navigation.navigate("Verificar correo")}>
                        <Text style={styles.forgot}>¿Olvidaste tu contraseña?</Text>
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
    textBoxBtnHolder:
    {
        position: 'relative',
        alignSelf: 'stretch',
        justifyContent: 'center'
    },

    textBox:
    {
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 1,
        paddingLeft: 5,
        marginBottom: 20,
        borderRadius: 5,
        borderWidth: 0.7,
    },

    visibilityBtn:
    {
        position: 'absolute',
        right: 3,
        height: 40,
        width: 70,
    },
    botonLogin:{
        justifyContent: "center",
        backgroundColor: "#D500F9",
        height: 40,
        borderRadius: 5
    },
    textoLogin: {
        color: "white",
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
        //fontFamily: 
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
    },
    forgot:{
        marginTop: 20,
        textAlign: "center",
        textDecorationLine: "underline"
    }
})

 