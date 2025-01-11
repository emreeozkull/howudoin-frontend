// ChatFriend.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Link, useLocalSearchParams } from 'expo-router';
import { styles } from '@/styles/styles'; // <-- Adjust the path as needed
import { useAuth } from './authContext';

interface MessageType {
  senderId: number;
  messages: string;
}

export default function ChatFriend() {
  const { authJWT } = useAuth();
  const params = useLocalSearchParams();
  const friendID = params.frid as string;

  const [messageHistory, setMessageHistory] = useState<MessageType[]>([]);
  const [sendingMessage, setSendingMessage] = useState('');

  useEffect(() => {
    fetch('https://howudoin.biletbudur.tr/messages', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + authJWT,
      },
      body: JSON.stringify({
        friendID: friendID,
      }),
    })
      .then((response) => response.json())
      .then((data) => setMessageHistory(data))
      .catch((error) => console.log(error));
  }, [friendID, authJWT]);

  const pressablePressed = () => {
    console.log('Sending message:', sendingMessage);
    fetch('https://howudoin.biletbudur.tr/messages/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + authJWT,
      },
      body: JSON.stringify({
        friendID: friendID,
        message: sendingMessage,
      }),
    })
      .then((response) => response.text())
      .then((data) => {
        console.log('pressable:', data);
        // Optionally re-fetch messages or update local state:
        setMessageHistory((prev) => [
          ...prev,
          { senderId: Number(/* your user id, if you have it */ 999), messages: sendingMessage },
        ]);
        setSendingMessage('');
      })
      .catch((error) => console.log(error));
  };

  const getMessageStyle = (message: MessageType) =>
    message.senderId === Number(friendID)
      ? styles.messageTextFriend
      : styles.messageTextMe;

  return (
    <View style={styles.chatContainer}>
      <Text style={styles.title}>Chat with friend : {friendID}</Text>

      {/* Messages */}
      <View style={{ width: '100%' }}>
        {messageHistory.map((message, index) => (
          <View key={index} style={styles.messageContainer}>
            <Text style={getMessageStyle(message)}>
              {message.messages}
            </Text>
          </View>
        ))}
      </View>

      {/* Input + Send Button */}
      <View style={styles.chatInputWrapper}>
        <TextInput
          style={styles.chatTextInput}
          onChangeText={setSendingMessage}
          value={sendingMessage}
          placeholder="Type your message..."
        />
        <TouchableOpacity style={styles.sendButton} onPress={pressablePressed}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>

      {/* Links at the bottom */}
      <View style={styles.linkContainer}>
        <Link href="./friends">
          <Text style={styles.linkText}>Friends</Text>
        </Link>
        <Link href={{ pathname: './groups' }}>
          <Text style={styles.linkText}>Groups</Text>
        </Link>
      </View>
    </View>
  );
}
