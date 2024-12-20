import { Pressable, Text, View } from 'react-native';
import { Link } from 'expo-router';
import { useEffect, useState } from 'react';

import { useAuth } from './authContext';

export default function AcceptFriendRequest() {

    const authJWT = useAuth().authJWT;
    const [friendRequests, setFriendRequests] = useState([]);
    const [friendUsername, setFriendUsername] = useState('');

    useEffect(() => {
        getFriendRequests();
    }, []);

    function getFriendRequests(){
        fetch("http://localhost:8080/friends/getFriendRequests", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authJWT,
            },
        })    
        .then(response => response.json())
        .then(data =>  setFriendRequests(data))
        .catch(error => console.log(error));
    }
    function pressablePressed(friendUser:string){
        console.log("pressed: "+ friendUser);
        setFriendUsername(friendUser);
        
        fetch("http://localhost:8080/friends/accept", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authJWT,
            },
            body: friendUsername
        
        })    
        .then(response => response.text())
        .then(data =>  afterResponse(data))
        .catch(error => console.log(error));

    }
    
    function afterResponse(response:string){
        console.log("response is:" + response);
        getFriendRequests();
    }

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            
            {
                friendRequests.map((friReq,index) => {
                    return (
                    <View key={index}>
                        <Pressable onPress={() => pressablePressed(friReq)}>
                          <Text> {friReq} </Text>
                        </Pressable>
                    </View>
                    )
                })
            }



        </View>
    );
}
