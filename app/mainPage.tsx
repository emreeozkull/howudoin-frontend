import { StyleSheet, Text, View } from "react-native";
import {router, useLocalSearchParams, Link} from "expo-router";
import { useSearchParams } from "expo-router/build/hooks";
import { useContext, createContext, type PropsWithChildren } from 'react';
import { useAuth } from "./authContext";



export default function MainPage() {
    //const myAuth = router.params;
    const { authJWT } = useAuth();
    
    console.log("in mainPage main function: " + authJWT);
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{fontSize: 20,textAlign: 'center'}}></Text>
            <Link href="./friends">friends</Link>
            <Link href={{pathname: "./addNewFriend" }}>add new friend</Link> 
            <Link href={{pathname: "./acceptFriendRequest" }}>friend requests</Link> 
            <Text></Text>
            <Link href={{pathname: "./createGroup" }}>create group</Link>
            <Link href={{pathname: "./groups" }}>groups</Link>
        </View>
    );
}
