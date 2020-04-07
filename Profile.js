import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import username from './Username'

class Profile extends Component{

    render(){
        return(
        <Text>welcome {username.UserName}</Text>
        )
    }
}
export default Profile