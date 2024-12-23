import { StyleSheet, Text, View, Pressable } from "react-native";
import { useAuth } from "./authContext";
import React, { useEffect, useState } from "react";
import { Link } from "expo-router";




export default function Groups() {

    const [groups, setGroups] = useState([]);
    const { authJWT } = useAuth();


    const requestOptions = {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+ authJWT
        }
    
      }

    useEffect(() => {
        fetch("http://localhost:8080/groups", requestOptions)
        .then(response => response.json())
        .then(data => setGroups(data))
        .catch(error => console.log(error));
    }, []);
    
    return (
        <View style={myStyle.container}>
            <Text style={{fontSize: 15,padding: 10, margin:20}}> group name - group details - chat with group </Text>
            {
                
                groups.map((group:any, index) => {
                    return(
                        <View key={index} style={{flexDirection: 'row', margin:5,}}>

                            <Text style={{fontSize: 15,textAlign: 'center'}}> {group.GroupName}   </Text>
                            <Link href={{pathname: "./groupDetail", params: {groupId: group.id} }}> Group details </Link>
                            <Link href={{pathname:"./groupMessaging", params: {groupId: group.id} }}> chat </Link>
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

