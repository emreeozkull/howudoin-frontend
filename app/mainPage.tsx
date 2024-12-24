import { View, Text } from 'react-native';
import { Link } from 'expo-router';
import { useAuth } from './authContext';
import { styles } from '@/styles/styles';  // Adjust path if needed

export default function MainPage() {
  const { authJWT } = useAuth();

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Main Menu</Text>

      {/* Links Container */}
      <View
        style={{
          backgroundColor: '#ffffff',
          padding: 16,
          borderRadius: 8,
          width: '90%',

          // Optional shadow
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 2,
        }}
      >
        <Text style={[styles.subTitle, { marginBottom: 12, textAlign: 'center' }]}>
          Navigation
        </Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' }}>
          {/* Link 1 */}
          <View style={{ margin: 8 }}>
            <Link href="./friends">
              <Text style={styles.linkText}>Friends</Text>
            </Link>
          </View>

          {/* Link 2 */}
          <View style={{ margin: 8 }}>
            <Link href="./addNewFriend">
              <Text style={styles.linkText}>Add New Friend</Text>
            </Link>
          </View>

          {/* Link 3 */}
          <View style={{ margin: 8 }}>
            <Link href="./acceptFriendRequest">
              <Text style={styles.linkText}>Friend Requests</Text>
            </Link>
          </View>

          {/* Link 4 */}
          <View style={{ margin: 8 }}>
            <Link href="./createGroup">
              <Text style={styles.linkText}>Create Group</Text>
            </Link>
          </View>

          {/* Link 5 */}
          <View style={{ margin: 8 }}>
            <Link href="./groups">
              <Text style={styles.linkText}>Groups</Text>
            </Link>
          </View>
        </View>
      </View>
    </View>
  );
}
