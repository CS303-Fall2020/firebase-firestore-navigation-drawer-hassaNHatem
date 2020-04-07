import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
//import Home from './screens/Home'
import ForgotPassWord from './ForgotPassWord'
import Login from './Login'
import SignUp from './SignUp'
import {  createAppContainer,createSwitchNavigator } from "react-navigation";
import {createStackNavigator} from "react-navigation-stack";
//import FireBase from './FireBase/FireBase';
import * as firebase from 'firebase';
import Appdata from './Appdata'
import {createDrawerNavigator} from 'react-navigation-drawer'
import Drawernav from './Drawernav'
import Drawerbutton from './Drawerbutton'
import Profile from './Profile'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
     };
  
     firebase.initializeApp({
      apiKey: "AIzaSyCD1DX3is4GnYOON6WEVohJFxtQi6y69Vc",
      authDomain: "todos-1928e.firebaseapp.com",
      databaseURL: "https://todos-1928e.firebaseio.com",
      projectId: "todos-1928e",
      storageBucket: "todos-1928e.appspot.com",
      messagingSenderId: "798233200108",
      appId: "1:798233200108:web:245640581bea931d48ecc9",
      measurementId: "G-J0288P5FMF"
    });
      }

      
   
      
  render(){
  return (
    <AppContainer />
  );
}
}
const AppNavigator = createStackNavigator({
  Login: {
    screen: Login
  },
  SignUp: {
    screen: SignUp,
    navigationOptions:{
      headerLeft:null
    }
  },
  ForgotPassword: {
    screen: ForgotPassWord,
    navigationOptions:{
      headerLeft:null
    }
  },
  profile:{
    screen:Profile
  },
  Appdata:{
    screen : Drawernav,
    navigationOptions:({navigation})=>({
      title:'My App',
      headerLeft:<Drawerbutton navigation={navigation}/>
      
    }
    )
  }
  
});




/*
const Appdatanav = createDrawerNavigator({
  Appdata:{
    screen:Appdata
  },
  login:{
    screen:Login
  }
},
{
  initialRouteName: 'login',
})
const MainNavigation = createSwitchNavigator({
  AuthStack: AppNavigator,
  HomeDrawer:Appdatanav // You will use this.props.navigation.replace('HomeDrawer') after login process.
})
*/
const AppContainer = createAppContainer(AppNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
