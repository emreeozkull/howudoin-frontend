import { View, Text, TextInput, Alert } from "react-native";
import { StyleSheet } from "react-native";
import {useState} from 'react';
import { Button } from "react-native";
import { router } from "expo-router";

export default function register(){

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    function pressablePressed(){
        fetch("https://howudoin.biletbudur.tr/register", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => afterResponse(data))
        .catch(error => {
            console.error("Error:", error);
            Alert.alert("Connection Error", "Unable to connect to the server. Please try again later.");
        });
    }

    function afterResponse(data:string){
      console.log(data);
      if (data == "user registered"){
        Alert.alert("user registered");
        router.back();
      }
      else{
        Alert.alert("user not registered");
      }
    }
    

    return (
        <View style = {myStyle.container}>
     

     
             <View > 
               <Text> Username: </Text>
               <TextInput style={myStyle.roundedStyle} onChangeText={setUsername}></TextInput>
     
               <Text> Password: </Text>
               <TextInput style={myStyle.roundedStyle} onChangeText={setPassword}></TextInput>
     
               <View  style={myStyle.roundedStyle}>
                 <Button title="register" onPress={pressablePressed} ></Button>
               </View>
     
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
    backgroundColor: "#e5e5e5",
    padding: 10,
    margin: 5,
    borderRadius: 40,
    width: 250,
  },
});