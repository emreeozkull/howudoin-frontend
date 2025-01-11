import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { Link, useLocalSearchParams } from 'expo-router';
import { useAuth } from './authContext';
import { styles } from '@/styles/styles';  // <-- Adjust the path if needed

interface GroupDetailType {
  GroupName: string;
  userNames: string[];
  creationDate: string;
}

export default function GroupDetail() {
  const [groupName, setGroupName] = useState('');
  const [userNames, setUserNames] = useState<string[]>([]);
  const [creationDate, setCreationDate] = useState('');

  const { groupId } = useLocalSearchParams();
  const { authJWT } = useAuth();

  useEffect(() => {
    fetch(`https://howudoin.biletbudur.tr/groups/${groupId}/getGroupDetails`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + authJWT,
      },
    })
      .then((response) => response.json())
      .then((data) => afterResponse(data))
      .catch((error) => console.log(error));
  }, [groupId, authJWT]);

  function afterResponse(groupDetail: GroupDetailType) {
    setGroupName(groupDetail.GroupName);
    setUserNames(groupDetail.userNames);
    setCreationDate(groupDetail.creationDate);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Group Details</Text>
      <Text style={styles.subTitle}>
        Group Name - All User Names - Creation Time
      </Text>

      {/* Group info */}
      <Text style={styles.subTitle}>
        {groupName} - {userNames.join(', ')} - {creationDate}
      </Text>

      {/* Link to group chat */}
      <Link href={{ pathname: './groupMessaging', params: { groupId } }}>
        <Text style={styles.linkText}>Chat with Group</Text>
      </Link>
    </View>
  );
}