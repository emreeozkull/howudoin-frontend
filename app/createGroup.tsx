import { StyleSheet, Text, View, Pressable } from "react-native";
import { useAuth } from "./authContext";
import React, { useEffect, useState } from "react";
import { Link } from "expo-router";




export default function Friends() {

    const [friends, setFriends] = useState([]);
    const { authJWT } = useAuth();


    const requestOptions = {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+ authJWT
        }
    
      }

    useEffect(() => {
        fetch("http://localhost:8080/friends", requestOptions)
        .then(response => response.json())
        .then(data => setFriends(data.friendList))
        .catch(error => console.log(error));
    }, []);
    
    return (
        <View style={myStyle.container}>
            <Text style={{fontSize: 15,padding: 10}}> id - username - select friend to chat </Text>
            {
                
                friends.map((friend, index) => {
                    return(
                        <View key={index} style={{flexDirection: 'row'}}>

                            <Text style={{fontSize: 15,textAlign: 'center'}}> {friend.id} -  {friend.username}  - {friend.groups} </Text>
                            <Link href={{pathname:"./chatFriend",params:{frid:friend.id}}}>Chat with friend</Link>
                        </View>
                    
                )
                })
                  
            }
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
});

