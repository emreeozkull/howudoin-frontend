// GroupMessaging.tsx
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { useAuth } from './authContext';
import { styles } from '@/styles/styles'; // <-- Adjust path as needed

interface GroupMessage {
  sender: string;
  message: string;
}

export default function GroupMessaging() {
  const params = useLocalSearchParams();
  const groupId = params.groupId as string;
  const { authJWT } = useAuth();

  const [groupMessages, setGroupMessages] = useState<GroupMessage[]>([]);
  const [sendMessage, setSendMessage] = useState('');

  useEffect(() => {
    fetch(`https://howudoin.biletbudur.tr/groups/${groupId}/messages`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + authJWT,
      },
    })
      .then((response) => response.json())
      .then((data) => setGroupMessages(data))
      .catch((error) => console.log(error));
    // Optionally, include a dependency array if you want to limit re-fetching
  }, [groupId, authJWT]);

  function sendMessageToServer() {
    console.log('Sending message: ', sendMessage);
    fetch(`https://howudoin.biletbudur.tr/groups/${groupId}/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + authJWT,
      },
      body: JSON.stringify({
        sender: 'U5', // or dynamically use the user ID if available
        message: sendMessage,
      }),
    })
      .then((response) => response.text())
      .then((data) => {
        console.log('Server response:', data);

        // Update local state so it shows immediately, or re-fetch
        setGroupMessages((prev) => [
          ...prev,
          { sender: 'U5', message: sendMessage },
        ]);
        setSendMessage('');
      })
      .catch((error) => console.log(error));
  }

  // Helper function to differentiate "my" messages vs. "others"
  function getMessageStyle(sender: string) {
    return sender === 'U5' ? styles.messageBubbleMe : styles.messageBubble;
  }

  return (
    <View style={styles.chatContainer}>
      {/* A title or heading for your group chat */}
      <Text style={styles.chatTitle}>Group ID: {groupId} Chat</Text>

      {/* Messages */}
      {groupMessages.map((msg, index) => (
        <View key={index} style={styles.messageContainer}>
          {/* Optionally show the sender */}
          {msg.sender !== 'U5' && (
            <Text style={styles.messageSender}>{`From: ${msg.sender}`}</Text>
          )}

          {/* Bubble style depends on who is sending */}
          <Text style={getMessageStyle(msg.sender)}>{msg.message}</Text>
        </View>
      ))}

      {/* Chat Input + Send Button */}
      <View style={styles.chatInputWrapper}>
        <TextInput
          style={styles.chatTextInput}
          placeholder="Type a message..."
          value={sendMessage}
          onChangeText={setSendMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessageToServer}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
