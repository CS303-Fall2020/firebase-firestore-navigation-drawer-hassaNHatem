import React ,{Component}from "react";
import { Modal, View, Image, Text, Button, StyleSheet, TextInput, Alert } from "react-native";
import * as firebase from 'firebase'

class Login extends Component{
state={
   email:"",
   password:""
}

onloginpress=()=>{
firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.password).then(()=>{
    this.props.sucsess()
},(error)=>{
    Alert.alert(error.message)
})
}
    render(){
        return(<Modal
            visible={this.props.visible}
                 ><View>
            <Text>Login with Your Email</Text>
            <TextInput placeholder="email" value={this.state.email} onChangeText={(text)=>{this.setState({email:text})}}></TextInput>
            <TextInput placeholder="password" value={this.state.password} onChangeText={(text)=>{this.setState({password:text})}}></TextInput>
            <Button title="login" onPress={this.onloginpress} ></Button>
            <Button title="signup" onPress={this.props.signup}></Button>
            <Button title="forgot password ?" onPress={this.props.forgot}></Button>

            </View>
            </Modal>);
    }
}

export default Login;