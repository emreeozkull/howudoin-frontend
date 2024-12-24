import React, { useEffect, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useAuth } from './authContext';
import { styles } from '@/styles/styles'; // <-- Adjust the path if needed

export default function AcceptFriendRequest() {
  const { authJWT } = useAuth();
  const [friendRequests, setFriendRequests] = useState<string[]>([]);
  const [friendUsername, setFriendUsername] = useState('');

  useEffect(() => {
    getFriendRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getFriendRequests() {
    fetch('http://localhost:8080/friends/getFriendRequests', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + authJWT,
      },
    })
      .then((response) => response.json())
      .then((data: string[]) => setFriendRequests(data))
      .catch((error) => console.log(error));
  }

  function pressablePressed(friendUser: string) {
    console.log('pressed:', friendUser);
    setFriendUsername(friendUser);

    fetch('http://localhost:8080/friends/accept', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + authJWT,
      },
      body: friendUser,
    })
      .then((response) => response.text())
      .then((data) => afterResponse(data))
      .catch((error) => console.log(error));
  }

  function afterResponse(response: string) {
    console.log('response is:', response);
    // Refresh friend requests after accepting
    getFriendRequests();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pending Friend Requests</Text>

      {friendRequests.map((friReq, index) => (
        <View key={index} style={styles.listItem}>
          <Pressable
            style={{ flex: 1 }}
            onPress={() => pressablePressed(friReq)}
          >
            <Text style={styles.listItemText}>{friReq}</Text>
          </Pressable>
        </View>
      ))}
    </View>
  );
}
