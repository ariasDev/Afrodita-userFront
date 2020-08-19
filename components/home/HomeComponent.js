import React, {Component} from 'react'
import {
    View, 
    Button, 
    Text, 
    StyleSheet,
    TextInput
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';


class HomeComponent extends Component{
    state = {
        userData: 'empty'
    }
    async getUserData(){
        try {
            const userData = await AsyncStorage.getItem('userData')
            this.setState({"userData": JSON.parse(userData)})
        } catch(e) {
            this.setState({"dauserDatata": e})
        }
    }
    componentDidMount(){
        this.getUserData()
    }

    render(){
        return(
            <View style={styles.container}>
                <TextInput value={JSON.stringify(this.state.userData.userName)} style={{flex:1}}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "white",
        paddingRight: 20,
        paddingLeft: 20
    }
})

export default HomeComponent