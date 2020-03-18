import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity,Ico ,Image, Button } from "react-native";

class listItem extends Component{ 
  state={
    textstyle:{
      textDecorationLine:"none",
      fontSize:15
    },
    btnstyle:{
      color:"blue",
      
    },
   name:"check"
  }
  render(){
 return ( 
  <TouchableOpacity onPress={this.props.onItemPressed}>
    <View>
    <View >
  
</View>
    <View style={styles.listItem}>
      <Button  
      title={this.state.name} style={this.state.btnstyle} onPress={()=>{if(this.state.name==="check"){
        this.setState({textstyle:[{textDecorationLine:"line-through",      fontSize:15
      }],
      name:"checked",
      btnstyle:[{color:"blue"}]
      })
      }else if(this.state.name==="checked"){
        this.setState({textstyle:[{textDecorationLine:"none",      fontSize:15
      }]
      ,name:"check",
      btnstyle:[{color:"red"}]
      })
      }
    }
      }
        ></Button>
      <Image resizeMode="cover" source={this.props.placeImage} style={styles.placeImage} />
      <Text style={this.state.textstyle}>{this.props.placeName}</Text>
    </View>
    </View>
  </TouchableOpacity>
  

);
  }
}

const styles = StyleSheet.create({
  listItem: {
    width: "100%",
    marginBottom: 5,
    padding: 10,
    backgroundColor: "#eee",
    flexDirection: "row",
    alignItems: "center"
  },
  placeImage: {
      marginRight: 9,
      height: 30,
      width: 30,
      marginLeft:20
  },
 
  text:{
    textDecorationLine:"none",
    fontSize:10
  },
  container:{
    flexDirection:"column"
  }
});

export default listItem;
