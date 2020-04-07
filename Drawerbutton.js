import React from 'react'
import {TouchableOpacity,Image,StyleSheet} from 'react-native'


const drawerbtn  = ({navigation})=>(
    <TouchableOpacity  style={styles.wrapper}
    onPress = {()=>navigation.toggleDrawer()}
    >
       
        <Image source={require('./drawer.png')}
        style={styles.icon}
        ></Image>
    </TouchableOpacity>
);


const styles = StyleSheet.create({
icon:{
    width:24,
    height:24
},
wrapper:{
    marginLeft:10
}
})
export default drawerbtn