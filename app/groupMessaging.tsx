import { useLocalSearchParams } from "expo-router";
import {useEffect, useState} from "react"; 
import {View, TextInput, Button, Text} from "react-native"; 
import {useAuth} from "./authContext";


export default function GroupMessaging(){

    const params = useLocalSearchParams();
    const groupId = params.groupId
    const { authJWT } = useAuth();

    const [groupMessages, setGroupMessages] = useState([]);
    const [groupName, setGroupName] = useState("");
    const [sendMessage, setSendMessage] = useState("");

    useEffect(() => {
            fetch("http://localhost:8080/groups/" + groupId + "/messages", {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + authJWT 
                }
            })
            .then(response => response.json())
            .then(data => setGroupMessages(data))
        }
    ) 

    function sendMessageToServer(){
        console.log("inside send message to server and message: ", sendMessage) // for debug
        fetch("http://localhost:8080/groups/" + groupId + "/send", {
                method:"POST",
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + authJWT 
                },
                body: JSON.stringify( {
                    sender: "U5", 
                    message: sendMessage
                })
            })
        .then(response => response.text())
        .then(response => console.log(response))
        .catch(error => console.log(error))
    }


    return (

        <View> 

            {
                groupMessages.map((groupMessage, index) => {
                   return (<View key={index} style={{padding:15}}>
                        <Text> {groupMessage.message}   -from {groupMessage.sender} </Text>
                   </View>
                   )
                })
            }

            <View style= {{marginTop:150}}>
                <TextInput onChangeText={setSendMessage} style={{
                    backgroundColor: "#e5e5e5",
                    padding: 10,
                    margin: 10,
                    marginTop: 100,
                    marginLeft: 80,
                    borderRadius: 40,
                    width: 250,
                    alignContent: "center",
                    alignItems: "center"
                }}>  
                </TextInput>

                <Button title="send" onPress={sendMessageToServer}> </Button>

            </View>
            
        </View>
         

    );



}