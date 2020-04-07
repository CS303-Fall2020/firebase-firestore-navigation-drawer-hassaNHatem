import React, { Component } from "react";
import { StyleSheet, View, Button, AsyncStorage, Text, Image } from "react-native";

import PlaceInput from "./components/PlaceInput/PlaceInput";
import PlaceList from "./components/PlaceList/PlaceList";
import PlaceDetail from "./components/PlaceDetail/PlaceDetail";
import {createDrawerNavigator} from 'react-navigation-drawer'
import * as firebase from 'firebase';
import Username from './Username'
import 'firebase/firestore'


export default class Appdata extends Component {
  
  
  constructor(props){
    super(props);
    this.state = {
      places: [],
      selectedPlace: null,
      placeName:'',
      isloading:true,
    
    };
  
  }
  
  
   componentDidMount(){
    let newarr=[]
   setTimeout(()=>this.setState({isloading:false}),5000); 
   firebase.firestore().collection("users").doc(Username.UserName).collection("todos").get().then((querySnapshot)=> {
    querySnapshot.forEach(function(doc) {
     newarr=[...newarr,doc.data()]

        console.log(doc.id, " => ", doc.data());
    });
  
    this.setState({
      places:newarr
    })    
});


console.log(newarr)
console.log(this.state.places)
}
   
  
 
 
  
  addnewname = (newname)=>{
console.log(Username.placename);
console.log(Username.UserName)    
   firebase.firestore().collection("users").doc(Username.UserName).collection("todos").doc(Username.placename).update({
     "name":newname.name
   })
  
  this.setState({
    places:[...this.state.places,newname],
    places:this.state.places.splice(0,this.state.places.length)      
  })

  }
    placeNameChangedHandler = val => {
      this.setState({
        placeName: val
      });
    };
  
    placeSubmitHandler = () => {
      if (this.state.placeName.trim() === "") {
        return;
      }
  
      this.placeAddedHandler(this.state.placeName);
      this.setState({
        placeName:''
      })
    };

    checkhandler = () =>{
      
    }

  placeAddedHandler = placeName => {
  
     firebase.firestore().collection("users").doc(Username.UserName).collection("todos").doc(this.state.placeName).set({
      key: Math.random(),
      name: placeName,
      image: {
        uri:
          "https://c1.staticflickr.com/5/4096/4744241983_34023bf303_b.jpg"
      },
      title:placeName,
      checked:"check"
     })
    
  
    this.setState(prevState => {
      return {
        places: prevState.places.concat({
          key: Math.random(),
          name: placeName,
          image: {
            uri:
              "https://c1.staticflickr.com/5/4096/4744241983_34023bf303_b.jpg"
          },
          title:placeName,
          checked:"check"
        })
      };
    });
  };

  placeDeletedHandler = () => {
    firebase.firestore().collection("users").doc(Username.UserName).collection("todos").doc(Username.placename).delete()
    this.setState(prevState => {
      return {
        places: prevState.places.filter(place => {
          return place.key !== prevState.selectedPlace.key;
        }),
        selectedPlace: null
      };
    });
  };

  modalClosedHandler = () => {
    this.setState({})
    this.setState({
      
      selectedPlace: null
    });
  };

  placeSelectedHandler = key => {
    this.setState(prevState => {
      return {
        selectedPlace: prevState.places.find(place => {
          return place.key === key;
        })
      };
    
    });
    
    
  };

  render() {

    return (
      <View style={styles.container}>
        <PlaceDetail
        placename={this.state.placeName}
          addnewname={this.addnewname}
          selectedPlace={this.state.selectedPlace}
          onItemDeleted={this.placeDeletedHandler}
          onModalClosed={this.modalClosedHandler}
        />
     
        <PlaceInput placeSubmitHandler={this.placeSubmitHandler} placeNameChangedHandler={this.placeNameChangedHandler} placeName={this.state.placeName} onPlaceAdded={this.placeAddedHandler} />
        <PlaceList
       
          places={this.state.places}
          onItemSelected={this.placeSelectedHandler}
        />
        <Button title="refresh" onPress={()=>{
            let newarr=[]
            setTimeout(()=>this.setState({isloading:false}),5000); 
            firebase.firestore().collection("users").doc(Username.UserName).collection("todos").get().then((querySnapshot)=> {
             querySnapshot.forEach(function(doc) {
              newarr=[...newarr,doc.data()]
         
                 console.log(doc.id, " => ", doc.data());
             });
           
             this.setState({
               places:newarr
             })    
         });
         
          }}></Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 26,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start"
  }
});
