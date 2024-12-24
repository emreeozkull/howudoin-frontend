import { Text, View, StyleSheet, TextInput, Button, Image, Pressable, ScrollView} from "react-native";
import { useState } from "react";
import { navigate } from "expo-router/build/global-state/routing";
import { useNavigation, router , Link  } from "expo-router";
import { useContext, createContext, type PropsWithChildren } from 'react';
import { useAuth } from "./authContext"; 



export default function Index() {
  //const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {setAuthJWT } = useAuth();

  const requestOptions = {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    }

    function afterResponse(response:string){

    console.log("response is:" + response);
    if (response != "false"){
      setAuthJWT(response);
      router.push({pathname: "./mainPage" });
    }else{
        alert("Wrong username or password");
      }
  } 

  function pressablePressed(){
    console.log("pressable pressed");
    console.log(username, password);
    fetch("http://localhost:8080/login", requestOptions)
    .then(response => response.text())
    .then(data => afterResponse(data))
    .catch(error => console.log(error));
  }


  return (
    <View style = {myStyle.container} > 
      

        <Pressable onPress= {() => console.log("pressable image pressed") }>
          <Image style={ myStyle.logoImage } source={require("@/assets/images/partial-react-logo.png")}></Image>
        </Pressable>

        <View > 
          <Text> Username: </Text>
          <TextInput style={myStyle.roundedStyle} onChangeText={setUsername}></TextInput>

          <Text> Password: </Text>
          <TextInput style={myStyle.roundedStyle} onChangeText={setPassword}></TextInput>

          <View  style={myStyle.roundedStyle}>
            <Button title="Login" onPress={pressablePressed} ></Button>
          </View>

        </View>


      <View style = {{ padding:10 }}>
        <Link href={{pathname: "./register" }}> register</Link>
      </View>

    </View>

  );
}

function buttonClik(){
  console.log("button pressed")
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

