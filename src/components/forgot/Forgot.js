import React ,{Component}from "react";
import { Modal, View, Image, Text, Button, StyleSheet, TextInput } from "react-native";
import * as firebase from 'firebase'

class Forgot extends Component{
state={
    email:""
}
forget=()=>{
firebase.auth().sendPasswordResetEmail(this.state.email).then(()=>{this.props.fromforgot})
}
    render(){
        return(<Modal
            visible={this.props.visible}
            onRequestClose={this.props.fromforgot}
                 ><View>
            <Text>Enter your email so we can contact you</Text>
            <TextInput placeholder="email" value={this.state.email} onChangeText={(text)=>{this.setState({email:text})}}></TextInput>
            <Button title="sumbit email" onPress={this.forget}></Button>

            </View>
            </Modal>);
    }
}

export default Forgot;