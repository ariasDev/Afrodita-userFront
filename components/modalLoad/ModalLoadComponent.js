import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Modal,
    ActivityIndicator,
    Text
} from 'react-native'

class ModalLoadComponent extends Component{
    render(){
        return(
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.props.modalVisibility}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                    <Text style={styles.modalText}>Cargando</Text>
                    <ActivityIndicator size="large" color="#D500F9" />
                    </View>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
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

export default ModalLoadComponent