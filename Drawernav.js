import React, { Component } from "react";
import { View, Image, Text, Button, StyleSheet, TextInput, Alert, TouchableOpacity ,ScrollView,SafeAreaView} from "react-native";
import {  createAppContainer,createSwitchNavigator } from "react-navigation";
import * as firebase from 'firebase'
import Login from './Login'
import { createDrawerNavigator,DrawerItems } from "react-navigation-drawer";
import Appdata from "./Appdata";
import Profile from "./Profile";

const Drawernav = (props) => (
    <ScrollView>
      <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
      <DrawerItems {...props} />
      </SafeAreaView>
      <Button
        style={styles.logoutButton}
        title="Logout"
        onPress={() =>{
            firebase.auth().signOut();
            props.navigation.navigate('Login')} }/>
    </ScrollView>
  );
  
  export default createDrawerNavigator({
    Appdata:{
        screen:Appdata
    },
    Profile:{
        screen:Profile
    }
  }, {
    // other settings
    contentComponent: Drawernav
  });
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
    },
    logoutButton: {
      backgroundColor: 'red',
      position: 'absolute',
      bottom: 0
    }
  });

/*
const drawernav = createDrawerNavigator({
    Appdata:{
        screen:Appdata
    },
    Login:{
        screen:Login
    },
    
    

},
{
    contentComponent:  ()=> <Button title="signout" onPress={
        ()=>{firebase.auth().signOut().then(()=>{
          this.props.navigation.navigate('Login')
        })}
        }></Button>
}
)

export default drawernav 
*/