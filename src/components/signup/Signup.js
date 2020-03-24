import React ,{Component}from "react";
import { Modal, View, Image, Text, Button, StyleSheet, TextInput,Alert } from "react-native";
import * as firebase from 'firebase'


class Signup extends Component{
state={
    email:"",
    password:"",
    passwordconfirm:""
}
signup=()=>{
    if(this.state.password===this.state.passwordconfirm){
    firebase.auth().createUserWithEmailAndPassword(this.state.email,this.state.password).then(()=>{
        this.props.fromsignup();
    },(error)=>{Alert.alert(error.message)})
}else{
    Alert.alert("passwords does not match");
}
}
    render(){
        return(<Modal
        onRequestClose={this.props.fromsignup}
            animationType="slide"
            visible={this.props.visible}
            
                 ><View>
            <Text>Signup</Text>
            <TextInput placeholder="email" value={this.state.email} onChangeText={(text)=>{this.setState({email:text})}}></TextInput>
            <TextInput placeholder="password" value={this.state.password} onChangeText={(text)=>{this.setState({password:text})}}></TextInput>
            <TextInput placeholder="rewrite password" value={this.state.passwordconfirm} onChangeText={(text)=>{this.setState({passwordconfirm:text})}}></TextInput>
            <Button title="signup" onPress={this.signup} ></Button>
            
            </View>
            </Modal>);
    }
}

export default Signup;