import { StyleSheet, Text, View, Pressable } from "react-native";
import { useAuth } from "./authContext";
import React, { useEffect, useState } from "react";
import { Link, useLocalSearchParams } from "expo-router";




export default function GroupDetail() {

    const [group, setGroup] = useState({});
    const [groupName, setGroupName] = useState("");
    const [userNames, setUserNames] = useState([]);

    const groupId = useLocalSearchParams().groupId;
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
        fetch("http://localhost:8080/groups/"+groupId+"/getGroupDetails", requestOptions)
        .then(response => response.json())
        .then(data => afterResponse(data))
        .catch(error => console.log(error));
    }, []);

    function afterResponse(groupDetail:any){
        //groupDetail.GroupName,groupMessages,userNames
        setGroup(groupDetail);
        setGroupName(groupDetail.GroupName);
        setUserNames(groupDetail.userNames);

    }
    
    return (
        <View style={myStyle.container}>
            <Text style={{fontSize: 15,padding: 10}}> group details </Text>
            <Text> group name - all user names - group messages</Text>
            <Text></Text>

            {                
                <Text> {groupName} - {userNames} - creatin time will be implemented </Text>
            }
            <Link href={{ pathname: "./groupMessaging", params:{groupId:groupId} }} > chat with group </Link>
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

