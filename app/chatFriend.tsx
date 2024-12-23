import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { useAuth } from "./authContext";


export default function ChatFriend() {

    const { authJWT } = useAuth();  

    const params = useLocalSearchParams();
    const friendID = params.frid;
    console.log("friend id: " + friendID);

    const [messageHistory, setMessageHistory] = useState([]);

    

    useEffect(() => {
        fetch("http://localhost:8080/messages", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authJWT,
            },
            body: JSON.stringify({
                friendID: friendID
            })
        })
        .then(response => response.json())
        .then(data => afterResponse(data))
        .catch(error => console.log(error));
    })


    const [sendingMessage, setSendingMessage] = useState('');

    function pressablePressed(){
        console.log("pressable pressed");
        console.log("sending message: " + sendingMessage);
        fetch("http://localhost:8080/messages/send", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authJWT,
            },
            body: JSON.stringify({
                friendID: friendID,
                message: sendingMessage
            })
        })
        .then(response => response.text())
        .then(data => console.log("pressable: ",data))
        .catch(error => console.log(error));

    }

    function afterResponse(data:any){
        //console.log("useEffect response is:", data);
        setMessageHistory(data);
    }

    function getMessageText(message, friendID) {
        if (message.senderId === friendID) {
          return `${message.messages} -friend`;
        } else {
          return `${message.messages} -me`;
        }
      }


    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontSize: 20,textAlign: 'center'}}>chat with your friend</Text>
            <Text style={{fontSize: 20,textAlign: 'center'}}></Text>

            
            {
                messageHistory.map((message, index) => (
                    <Text key={index}>
                    {getMessageText(message, friendID)}
                    </Text>
                ))
            }
            

            <View > 
                
                <TextInput style={myStyle.roundedStyle} onChangeText={setSendingMessage}></TextInput>

                <View  style={myStyle.roundedStyle}>
                <Button title="send" onPress={pressablePressed} ></Button>
                </View>
    
            </View>
            
     


            <View style={{  justifyContent: 'space-between', padding: 50, margin: 20 }}>

                <Link href="./friends" style={{ color: 'blue', textDecoration: 'none', margin: 5}}>
                    friends
                </Link>
                <Link
                    href={{ pathname: './groups' }}
                    style={{ color: 'blue', textDecoration: 'none' , margin: 5}}
                >
                    groups
                </Link>

            </View>


        </View>
    );
}

const myStyle = StyleSheet.create({
    container: {
      flex: 0.86,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    separator: {
      marginVertical: 20,
      height: 1,
      width: '10%',
    },
    roundedStyle : {
      backgroundColor: "#e5e5e5",
      padding: 10,
      margin: 5,
      borderRadius: 40,
      width: 250,
    },
  
    logoImage:{
      width: 90,
      height: 90,
      borderRadius: 40,
      margin: 30
    },
  
    sideBySide:{
      flexDirection: "row",
    }
  
  });
  