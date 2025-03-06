import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, Alert, ActivityIndicator, ScrollView } from 'react-native';
import Navbar from '../../../components/adminnavbar';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:4040/score/all`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error.message);
      Alert.alert("Error", "Failed to fetch user data.");
    }
    setLoading(false);
  };

  const deleteData = async (username) => {
    Alert.alert(
      "Delete User",
      "Are you sure you want to delete this user?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: async () => {
            try {
              const response = await fetch(`http://localhost:4040/${username}`, {
                method: "DELETE",
              });

              if (!response.ok) {
                throw new Error("Failed to delete user.");
              }

              Alert.alert("Success", "User deleted successfully!");
              fetchData(); // Refresh user list
            } catch (error) {
              console.error("Error deleting user:", error.message);
              Alert.alert("Error", "Failed to delete user.");
            }
          },
          style: "destructive",
        },
      ]
    );
  };

  return (
    <>
      <Navbar />
      <View style={{ flex: 1, padding: 10 }}>
        <Text style={styles.title}>Active Users</Text>

        {/* Table Headings */}
        <View style={styles.tableRow}>
          <Text style={styles.headerText}>Username</Text>
          <Text style={styles.headerText}>Geographical</Text>
          <Text style={styles.headerText}>Technical</Text>
          <Text style={styles.headerText}>Scientifical</Text>
          <Text style={styles.headerText}>Action</Text>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="blue" style={{ marginTop: 20 }} />
        ) : users.length > 0 ? (
          <ScrollView>
            {users.map((item) => (
              <View key={item.username} style={styles.tableRow}>
                <Text style={styles.cell}>{item.username}</Text>
                <Text style={styles.cell}>{item.geographical}</Text>
                <Text style={styles.cell}>{item.technical}</Text>
                <Text style={styles.cell}>{item.scientifical}</Text>
                <Button title="Delete" color="red" onPress={() => deleteData(item.username)} />
              </View>
            ))}
          </ScrollView>
        ) : (
          <Text style={{ textAlign: 'center', marginTop: 20 }}>No users found.</Text>
        )}
      </View>
    </>
  );
};

export default UserList;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 40,
    marginTop:50,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 5,
    borderBottomWidth: 1,
    backgroundColor: '#f1f1f1',
    marginBottom: 5,
    paddingHorizontal: 10,
    width:'60%',
    margin:5,
    marginLeft:'20%'
  },
  headerText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    flex: 1,
  },
  cell: {
    flex: 1,
    fontSize: 14,
    textAlign: 'center',
  },
});
