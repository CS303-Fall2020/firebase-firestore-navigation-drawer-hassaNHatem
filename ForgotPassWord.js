import React, { Component } from "react";
import { Modal, View, Image, Text, Button, StyleSheet, TextInput, Alert, TouchableOpacity } from "react-native";
import * as firebase from 'firebase';

class ForgotPassWord extends Component {
   state = {
      email: "",
      password: ""
   }

   OnPressSumbit=()=>{

      firebase.auth().sendPasswordResetEmail(this.state.email).then(()=>{
         this.props.fromforgot;
         Alert.alert("please chek your mail and follow the instrctions");
     
     },(error)=>{Alert.alert(error.message)}
     )
   
   }

   LoginOnPress=()=>{

      this.props.navigation.navigate('Login')
   
   }
    SignUpOnPress=()=>{
   
      this.props.navigation.navigate('SignUp')
   
   }
   render(){
      return(
     
     
      <View style={styles.ButtonsStyle}>
         <Text>Enter your email so we can contact you</Text>
         <TextInput style={styles.textInputStyle} placeholder="email" value={this.state.email} onChangeText={(text) => { this.setState({ email: text }) }}></TextInput>
         <TouchableOpacity onPress={this.forget}>
            <Text style={styles.text}>
               sumbit email
      </Text>
         </TouchableOpacity>
         <TouchableOpacity onPress={this.LoginOnPress}>
            <Text style={styles.text}>
               Go To Login
       </Text>
         </TouchableOpacity>
         <TouchableOpacity onPress={this.SignUpOnPress}>
            <Text style={styles.text}>
               Go To sign in
            </Text>
         </TouchableOpacity>



      </View>
);
}
}

export default ForgotPassWord;

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