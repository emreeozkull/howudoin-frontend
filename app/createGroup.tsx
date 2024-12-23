import { StyleSheet, Text, View, Pressable, TextInput, Button } from "react-native";
import { useAuth } from "./authContext";
import React, { useEffect, useState } from "react";
import { Link } from "expo-router";




export default function createGroup() {

    const [userNames, setUserNames] = useState([]);
    const [groupName, setGroupName] = useState("");
    const { authJWT } = useAuth();



    const [friends, setFriends] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/friends", {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ authJWT
          }
      
        })
        .then(response => response.json())
        .then(data => setFriends(data.friendList))
        .catch(error => console.log(error));
    }, []);


    const requestOptions = {
    

        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+ authJWT
        },
        body: JSON.stringify({
            GroupName: groupName,
            userNames: userNames
        })
    
    }
    
    function pressablePressed(){
        console.log("usernames in create:", userNames)
        fetch("http://localhost:8080/groups/create", requestOptions)
        .then(response => response.text())
        .then(data => console.log("groups create pressable: ",data))
        .catch(error => console.log(error));
    }

    function pressableSetUserNames(friendUsername:string){
        console.log("pressed: "+ friendUsername);
      setUserNames(userNames.concat([friendUsername]));
    }

    return (
        <View style={myStyle.container}>

            <View > 
                <Text> group name: </Text>
                <TextInput style={myStyle.roundedStyle} onChangeText={setGroupName}></TextInput>
    
                <Text>select user names: </Text>

                  {
                      
                      friends.map((friend, index) => {
                          return(
                              <View key={index} style={{flexDirection: 'row'}}>
            
                              <Pressable style={myStyle.roundedStyle} onPress={() => pressableSetUserNames(friend.username)} >
                                    <Text style={{fontSize: 15,textAlign: 'center'}}> {friend.username} </Text>
                               </Pressable>


                              </View>
                          )
                      })
                  }

    
                <View  style={myStyle.roundedStyle}>
                <Button title="create group" onPress={pressablePressed} ></Button>
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

