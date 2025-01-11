// Groups.tsx
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { Link } from 'expo-router';
import { useAuth } from './authContext';
import { styles } from '@/styles/styles'; // Adjust path as needed

interface GroupType {
  id: number;
  GroupName: string;
}

export default function Groups() {
  const [groups, setGroups] = useState<GroupType[]>([]);
  const { authJWT } = useAuth();

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + authJWT,
      },
    };

    fetch('https://howudoin.biletbudur.tr/groups', requestOptions)
      .then((response) => response.json())
      .then((data) => setGroups(data))
      .catch((error) => console.log(error));
  }, [authJWT]);

  return (
    <View style={styles.groupContainer}>
      <Text style={styles.groupHeading}>
        Group Name - Group Details - Chat with Group
      </Text>

      {groups.map((group, index) => (
        <View key={index} style={styles.groupListItem}>
          <Text style={styles.groupListText}>{group.GroupName}</Text>
          <View style={{ flexDirection: 'row' }}>
            <Link
              href={{ pathname: './groupDetail', params: { groupId: group.id } }}
              style={{ marginRight: 12 }}
            >
              <Text style={{ color: '#4F46E5' }}>Details</Text>
            </Link>
            <Link
              href={{ pathname: './groupMessaging', params: { groupId: group.id } }}
            >
              <Text style={{ color: '#4F46E5' }}>Chat</Text>
            </Link>
          </View>
        </View>
      ))}
    </View>
  );
}
