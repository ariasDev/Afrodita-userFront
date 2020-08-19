import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Alert,
    Modal,
    ActivityIndicator
} from 'react-native'
const BACKEND_SERVER = require('../../enviroment').BACKEND_SERVER

class ChangePasswordComponent extends Component{
    state = {
        email: 'email',
        password: '',
        passwordConfirmation: '',
        hidePassword: true,
        hidePasswordConfirmation: true,
        modalVisibility: false
    }

    componentDidMount(){
        this.setState({'email': this.props.route.params.email})
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

    changeConfirmationAlert(){
        Alert.alert(
            "Exito",
            "La contraseña fue cambiada, ya puedes iniciar sesión",
            [
                { text: "OK", onPress: () => this.props.navigation.reset({index: 0, routes: [{ name: 'Login' }]}) }
            ],
            { cancelable: false }
        );
    }

    managePasswordVisibility = () =>{
        this.setState({ hidePassword: !this.state.hidePassword });
    }

    managePasswordConfirmationVisibility = () =>{
        this.setState({ hidePasswordConfirmation: !this.state.hidePasswordConfirmation });
    }

    async changePassword(){
        if(this.state.password !== '' && this.state.passwordConfirmation !== ''){
            if(this.state.password === this.state.passwordConfirmation){
                this.setState({"modalVisibility": true})
                let url = `${BACKEND_SERVER}/changePassword`;
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
                    this.showAlert('Algo salió mal', response.errorDescription)
                } else{
                    this.setState({"modalVisibility": false})
                    this.changeConfirmationAlert()
                }
            } else {
                this.showAlert('Algo salió mal', 'Las contraseñas no coinciden')
            }
        } else{
            this.showAlert('Algo salió mal', 'Debes diligenciar los campos de contraseña')
        }
    }

    render(){
        return(
            <ScrollView style={styles.container}>
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
                        value={this.state.email}
                        placeholder="Ingresa tu correo electronico" 
                        placeholderTextColor="grey"
                        autoCapitalize="none"
                        autoCorrect={false}
                        visible={false}
                        editable={false}
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
                    <Text style={styles.label}>Comfirmar contraseña</Text>
                    <View style = { styles.textBoxBtnHolder }>
                        <TextInput  
                            secureTextEntry = { this.state.hidePasswordConfirmation } 
                            style = { styles.textBox }
                            placeholder="Comfirma tu contraseña" 
                            placeholderTextColor = "grey"
                            onChangeText={text => this.setState({passwordConfirmation:text})}
                        />
                        <TouchableOpacity activeOpacity = { 0.8 } style = { styles.visibilityBtn } onPress = { this.managePasswordConfirmationVisibility }>
                            <Text>mostrar</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.buttonConfirm} onPress = {() => this.changePassword()} >
                        <Text style={styles.textConfirm}>Cambiar contraseña</Text>
                    </TouchableOpacity>
                </View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisibility}
                    >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                        <Text style={styles.modalText}>Cargando</Text>
                        <ActivityIndicator size="large" color="#D500F9" />
                        </View>
                    </View>
                </Modal>
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
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      }
})

export default ChangePasswordComponent