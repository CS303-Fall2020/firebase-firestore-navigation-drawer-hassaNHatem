import React ,{Component}from "react";
import { Modal, View, Image, Text, Button, StyleSheet, TextInput } from "react-native";
import PLaceList from '../PlaceList/PlaceList'
import Username from '../../Username'



export default class placeDetail  extends Component {
  state={
    newname:''
  }

returnnewname=()=>{

  return this.state.newname;
}

  changestate=()=>{
    this.setState({
      newname:this.props.selectedPlace.name
    })
  }
  
  
  render(){
    
   
    let modalContent = null;

  if (this.props.selectedPlace) {
    
   
   Username.placename = this.props.selectedPlace.title
   console.log(this.props.selectedPlace)
    modalContent = (
      <View>
        <Image source={this.props.selectedPlace.image} style={styles.placeImage} />
        <TextInput style={styles.placeName} value={this.props.selectedPlace.name}  onChangeText={(val)=>{
          this.props.selectedPlace.name=val
          this.setState({newname:val})}}></TextInput>
      </View>
      
    );
    
  }
  
  return (
    <Modal
      onRequestClose={this.props.onModalClosed}
      visible={this.props.selectedPlace !== null}
      animationType="slide"
    >
    
      <View style={styles.modalContainer}>
        {modalContent}
        <View>
          <Button title="save" onPress={()=>this.props.addnewname({key:this.props.selectedPlace.key,name:this.state.newname,image:this.props.selectedPlace.image})}></Button>
          <Button title="Delete" color="red" onPress={this.props.onItemDeleted} />
          <Button title="Close" onPress={this.props.onModalClosed} />
        </View>
      </View>
      
    </Modal>
  );
};
}
const styles = StyleSheet.create({
  modalContainer: {
    margin: 22
  },
  placeImage: {
    width: "100%",
    height: 200
  },
  placeName: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 28
  }
});


