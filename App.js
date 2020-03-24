import React, { Component } from "react";
import { StyleSheet, View, Button, AsyncStorage, Text, Image } from "react-native";
import Login from './src/components/login/Login'
import PlaceInput from "./src/components/PlaceInput/PlaceInput";
import PlaceList from "./src/components/PlaceList/PlaceList";
import PlaceDetail from "./src/components/PlaceDetail/PlaceDetail";
import pic from "./src/assets/b.jpg"
import Signup from './src/components/signup/Signup'
import Forgot from "./src/components/forgot/Forgot";
import Apikeys from './constants/Apikeys'
import * as firebase from 'firebase'
export default class App extends Component {
  
  
  constructor(props){
    super(props);
    this.state = {
      places: [],
      selectedPlace: null,
      placeName:'',
      isloading:true,
      login:true,
      signup:false,
      forgot:false
    };
    

    firebase.initializeApp(Apikeys.FirebaseConfig)
  }
  
  componentWillMount(){
   setTimeout(()=>this.setState({isloading:false}),5000); 
    try{
  this.fitchdata();  
    }catch{
       var arr = []

      arr =  [...arr,...AsyncStorage.getItem('todos').then((res) => res)]
      this.state({
        places:arr
    })
    }
}
   
  fitchdata = async ()=>{
  const result   =await fetch('https://jsonplaceholder.typicode.com/todos?userId=1&fbclid=IwAR0IAhx-wpyj5R2fjxRQ7clV1uX4B1LydA1qzLaM88W58bw4hQF-VExRF1k')
  const json = await result.json();
  let newarr = [];
  newarr = [...newarr,...json.map(el=>{ return {key:Math.random(),name:el.title,image: {
    uri:
      "https://c1.staticflickr.com/5/4096/4744241983_34023bf303_b.jpg"
  
    }
  }})]
  AsyncStorage.setItem("todos",JSON.stringify(newarr))
  
  this.setState({
    places:[...this.state.places,...json.map(el=>{ return {key:Math.random(),name:el.title,image: {
      uri:
        "https://c1.staticflickr.com/5/4096/4744241983_34023bf303_b.jpg"
    
      }
    }})]
    
  })
  
  
  } 
  toforgotpassword=()=>{
    this.setState({
login:false,
signup:false,
forgot:true
    })
  }
fromsignup=()=>{
  this.setState({
    login:true,
    signup:false,
    forgot:false
  })
}
signup=()=>{
    this.setState({
      login:false,
      signup:true
    })
  }
  sucsess=()=>{
    this.setState({
      forgot:false,
      login:false,
      signup:false
    })
  }
  fromforgot=()=>{
    this.setState({
      forgot:false,
      login:true,
      signup:false
    })
  }
  addnewname = (newname)=>{
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



  placeAddedHandler = placeName => {
    this.setState(prevState => {
      return {
        places: prevState.places.concat({
          key: Math.random(),
          name: placeName,
          image: {
            uri:
              "https://c1.staticflickr.com/5/4096/4744241983_34023bf303_b.jpg"
          }
        })
      };
    });
  };

  placeDeletedHandler = () => {
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
if(this.state.isloading){
  return <View> 
  <Text>splash</Text>
  <Image source={pic}  />
  </View>
}
    return (
      <View style={styles.container}>
        <Login sucsess={this.sucsess} signup={this.signup} forgot={this.toforgotpassword} visible={this.state.login}></Login>
        <Signup fromsignup={this.fromsignup} visible={this.state.signup}></Signup>
        <Forgot visible={this.state.forgot} fromforgot={this.fromforgot}></Forgot>
        <PlaceDetail
          addnewname={this.addnewname}
          selectedPlace={this.state.selectedPlace}
          onItemDeleted={this.placeDeletedHandler}
          onModalClosed={this.modalClosedHandler}
        />
        <Button title="signout" onPress={
        ()=>{firebase.auth().signOut().then(()=>{
          this.setState({
            login:true
          })
        })}
        }></Button>
        <PlaceInput placeSubmitHandler={this.placeSubmitHandler} placeNameChangedHandler={this.placeNameChangedHandler} placeName={this.state.placeName} onPlaceAdded={this.placeAddedHandler} />
        <PlaceList
       
          places={this.state.places}
          onItemSelected={this.placeSelectedHandler}
        />
        <Button title="refresh" onPress={()=>{
          this.setState({
            places:[]
          })
          this.fitchdata()}}></Button>
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
