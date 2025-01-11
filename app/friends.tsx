// Friends.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { Link } from 'expo-router';
import { styles } from '@/styles/styles'; // <-- Adjust the path as needed
import { useAuth } from './authContext';

interface FriendType {
  id: number;
  username: string;
  groups: string;
  avatarUrl?: string; // Example if your friend object has an avatar URL
}

export default function Friends() {
  const [friends, setFriends] = useState<FriendType[]>([]);
  const { authJWT } = useAuth();

  useEffect(() => {
    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + authJWT,
      },
    };

    fetch('https://howudoin.biletbudur.tr/friends', requestOptions)
      .then((response) => response.json())
      .then((data) => setFriends(data.friendList))
      .catch((error) => console.log(error));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Friends</Text>
      {friends.map((friend) => (
        <View key={friend.id} style={styles.listItem}>
          {/* Example if there's an avatar URL */}
          {friend.avatarUrl && (
            <Image
              source={{ uri: friend.avatarUrl }}
              style={styles.profileImage}
            />
          )}
          <Text style={styles.listItemText}>
            {friend.username} 
          </Text>
          <Link
            href={{
              pathname: './chatFriend',
              params: { frid: friend.id },
            }}
          >
            {/* You could style this <Text> or use a custom Link style */}
            <Text style={[styles.subTitle, { color: '#4F46E5' }]}>
              Chat
            </Text>
          </Link>
        </View>
      ))}
    </View>
  );
}
