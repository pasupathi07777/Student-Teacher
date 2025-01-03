import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';

const Profile = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        <Image
          style={styles.avatar}
          source={{uri: 'https://via.placeholder.com/150'}} // Default placeholder image
        />
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.details}>Student ID: S12345</Text>
        <Text style={styles.details}>Email: johndoe@example.com</Text>
        <Text style={styles.details}>Class: 10th Grade</Text>
        <Text style={styles.details}>Section: A</Text>
      </View>

      {/* Bio Section */}
      <View style={styles.bioContainer}>
        <Text style={styles.bioHeading}>Bio</Text>
        <Text style={styles.bioText}>
          John is a bright student excelling in Mathematics and Science. He has
          a keen interest in coding and robotics.
        </Text>
      </View>

      {/* Conversations Section */}
      <View style={styles.conversationContainer}>
        <Text style={styles.sectionHeading}>Conversations</Text>
        <View style={styles.messageBox}>
          <Text style={styles.messageText}>
            Teacher: Please complete your assignment by Monday.
          </Text>
        </View>
        <View style={styles.messageBox}>
          <Text style={styles.messageText}>
            John: Sure, I will submit it on time!
          </Text>
        </View>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Add New Message</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  details: {
    fontSize: 16,
    color: '#666',
    marginVertical: 2,
  },
  bioContainer: {
    marginVertical: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
  bioHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  bioText: {
    fontSize: 16,
    color: '#555',
    lineHeight: 22,
  },
  conversationContainer: {
    marginVertical: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  messageBox: {
    marginVertical: 5,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  messageText: {
    fontSize: 14,
    color: '#333',
  },
  actionButton: {
    marginTop: 15,
    paddingVertical: 12,
    backgroundColor: '#42a5f5',
    borderRadius: 10,
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});
