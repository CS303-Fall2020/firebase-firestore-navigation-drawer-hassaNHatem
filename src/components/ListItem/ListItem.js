import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity,Ico ,Image, Button } from "react-native";
import * as firebase from 'firebase';
import Username from '../../Username'

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

  componentDidMount(){
    console.log(this.props.title)
    firebase.firestore().collection("users").doc(Username.UserName).collection("todos").doc(this.props.title).get().then((doc)=>{
      this.setState({
    name:doc.data().checked
      })
     })
    if(this.state.name==="checked"){
      this.setState({textstyle:[{textDecorationLine:"line-through",      fontSize:15
    }],
  
    btnstyle:[{color:"blue"}]
   
    
    })

    
    }else if(this.state.name==="check"){
      this.setState({textstyle:[{textDecorationLine:"none",      fontSize:15
    }]
    ,
    btnstyle:[{color:"red"}]
   
    })
   
    }
  
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
    
      btnstyle:[{color:"blue"}],
      name:"checked"
      
      })
firebase.firestore().collection("users").doc(Username.UserName).collection("todos").doc(this.props.title).update({
  checked:"checked"
})
      Username.checked = "checked"
      }else if(this.state.name==="checked"){
        this.setState({textstyle:[{textDecorationLine:"none",      fontSize:15
      }]
      ,
      btnstyle:[{color:"red"}],
      name:"check"
      })
      firebase.firestore().collection("users").doc(Username.UserName).collection("todos").doc(this.props.title).update({
        checked:"check"
      })
      Username.checked = "check"
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
