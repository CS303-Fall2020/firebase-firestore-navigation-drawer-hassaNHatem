import React, { Component } from "react";
import { View, Image, Text, Button, StyleSheet, TextInput, Alert, TouchableOpacity } from "react-native";
import * as firebase from 'firebase';
import Username from './Username';

class Login extends Component {
   state = {
      email: "",
      password: ""
   }
  
      OnLoginPress=()=>{
      
        
         firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.password).then(()=>{
            Username.UserName=this.state.email;
          
            this.setState({
                email:"",
                password:""
            })
          
            this.props.navigation.navigate('Appdata')
        },(error)=>{
            Alert.alert(error.message)
        })
        }
      
      SignUpOnPress=()=>{

         this.props.navigation.navigate('SignUp')

      }
      ForgotPasswordOnPress=()=>{
         
         this.props.navigation.navigate('ForgotPassword')

      }
      


      render(){
         return(
        
                      
                     
                      <View style={styles.ButtonsStyle}>
             <Text >Login with Your Email</Text>
             <TextInput style={styles.textInputStyle} placeholder="email" value={this.state.email} onChangeText={(text)=>{this.setState({email:text})}}></TextInput>
             
             <TextInput style={styles.textInputStyle} secureTextEntry={true} placeholder="password" value={this.state.password}  onChangeText={(text)=>{this.setState({password:text})}}></TextInput>
             <TouchableOpacity onPress={this.OnLoginPress}>
             <Text style = {styles.text}>
             login
             </Text>
          </TouchableOpacity>
          <TouchableOpacity  onPress={this.SignUpOnPress}>
             <Text style = {styles.text}>
             signup
             </Text>
          </TouchableOpacity>
          <TouchableOpacity   onPress={this.ForgotPasswordOnPress}>
             <Text style = {styles.text}>
             Forgot password ?
             </Text>
          </TouchableOpacity>
             
 
             </View>
            
             );
     }
}

export default Login;

const styles = StyleSheet.create({
   ButtonsStyle: {
      marginTop: 20


   },
   HeaderStyle: {
      backgroundColor: 'orange'
      , padding: 10
   },
   headertext: {
      textAlign: "left",
      fontSize: 30
      , color: 'white'
   },
   textInputStyle: {
      marginTop: 20,
      marginLeft: 20,
      marginRight: 20,

   },
   text: {
      borderWidth: 1,
      padding: 10,
      margin: 10,
      borderColor: 'black',
      backgroundColor: 'red'
   }
});