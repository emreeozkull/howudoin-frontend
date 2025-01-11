
import { Pressable, StyleSheet, Text, View, Image, TextInput, Button, Alert } from "react-native"; 

import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { useAuth } from "./authContext";

export default function AddNewFriend() {

    const [friendUsername, setFriendUsername] = useState('');
    const { authJWT } = useAuth();

    function pressablePressed(){
      console.log("pressed: "+ friendUsername);
      
        fetch("https://howudoin.biletbudur.tr/friends/add", {
          method: "POST",
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + authJWT,
          },
          body: friendUsername
      })
      .then(response => response.text())
      .then(data => afterResponse(data))
      .catch(error => console.log(error));
    }
    function afterResponse(data:string) {
        if (data != ""){
            Alert.alert("Friend request sent");
        }
        else{
            Alert.alert("Friend request failed");
        }
    }

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <View style = {myStyle.container} > 
                  

            
                    <View > 
                      <Text> Friend Username: </Text>
                      <TextInput style={myStyle.roundedStyle} onChangeText={setFriendUsername}></TextInput>



                      <View  style={myStyle.roundedStyle}>
                        <Button title="send friend request" onPress={pressablePressed} ></Button>
                      </View>
            
                    </View>
            
                </View>
            

            
            <View style={{margin:60}}>
                <Link  href="./friends">friends</Link>
                <Link  href={{pathname: "./groups" }}>groups</Link>
            </View>

            
       
        </View>
    );
}


const myStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  roundedStyle : {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    padding: 10,
    margin: 10,
    width: 200
  }
});