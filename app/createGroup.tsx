// createGroup.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Pressable, Button } from 'react-native';
import { Link } from 'expo-router';
import { useAuth } from './authContext';
import { styles } from '@/styles/styles'; // <-- import your shared styles

export default function CreateGroup() {
  const [userNames, setUserNames] = useState<string[]>([]);
  const [groupName, setGroupName] = useState('');
  const { authJWT } = useAuth();
  const [friends, setFriends] = useState<any[]>([]);

  // Fetch friend list
  useEffect(() => {
    fetch('https://howudoin.biletbudur.tr/friends', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + authJWT,
      },
    })
      .then((response) => response.json())
      .then((data) => setFriends(data.friendList))
      .catch((error) => console.log(error));
  }, [authJWT]);

  // Create group request options
  const requestOptions = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + authJWT,
    },
    body: JSON.stringify({
      GroupName: groupName,
      userNames: userNames,
    }),
  };

  function pressablePressed() {
    console.log('usernames in create:', userNames);
    fetch('https://howudoin.biletbudur.tr/groups/create', requestOptions)
      .then((response) => response.text())
      .then((data) => console.log('groups create pressable: ', data))
      .catch((error) => console.log(error));
  }

  function pressableSetUserNames(friendUsername: string) {
    console.log('pressed: ' + friendUsername);
    setUserNames((prev) => [...prev, friendUsername]);
  }

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Create Group</Text>
      
      {/* Group Name Input */}
      <Text style={styles.subTitle}>Group Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter a group name"
        onChangeText={setGroupName}
        value={groupName}
      />

      {/* Select Users */}
      <Text style={styles.subTitle}>Select Users:</Text>
      {friends.map((friend, index) => (
        <Pressable
          key={index}
          style={styles.friendPressable}
          onPress={() => pressableSetUserNames(friend.username)}
        >
          <Text style={styles.listItemText}>{friend.username}</Text>
        </Pressable>
      ))}

      {/* Create Group Button */}
      <View style={{ marginTop: 20 }}>
        <Pressable style={styles.sendButton} onPress={pressablePressed}>
          <Text style={styles.sendButtonText}>Create Group</Text>
        </Pressable>
      </View>
    </View>
  );
}
