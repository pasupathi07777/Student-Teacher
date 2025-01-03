import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

const Notifications = () => {
  const notifications = [
    {
      id: 1,
      type: 'Post',
      message: 'Your post on "React Native Basics" has been approved.',
      date: '2025-01-01',
    },
    {
      id: 2,
      type: 'Live',
      message:
        'Join the live session: "Advanced React Native" at 5:00 PM today.',
      date: '2025-01-02',
    },
    {
      id: 3,
      type: 'Post',
      message:
        'Your post on "Node.js Introduction" has received a new comment.',
      date: '2025-01-03',
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Notifications</Text>

      {/* Loop through notifications */}
      {notifications.map(notification => (
        <View key={notification.id} style={styles.notificationContainer}>
          <View style={styles.notificationHeader}>
            <Text style={styles.notificationType}>{notification.type}</Text>
            <Text style={styles.notificationDate}>{notification.date}</Text>
          </View>
          <Text style={styles.notificationMessage}>{notification.message}</Text>
          <TouchableOpacity style={styles.viewButton}>
            <Text style={styles.viewButtonText}>View</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  notificationContainer: {
    backgroundColor: '#fff',
    marginBottom: 15,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  notificationType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#42a5f5',
  },
  notificationDate: {
    fontSize: 14,
    color: '#777',
  },
  notificationMessage: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  viewButton: {
    paddingVertical: 10,
    backgroundColor: '#42a5f5',
    borderRadius: 5,
    alignItems: 'center',
  },
  viewButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
