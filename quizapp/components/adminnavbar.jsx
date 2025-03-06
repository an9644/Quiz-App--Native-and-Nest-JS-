import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AdminNavbar = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userdetails'); // Remove user details
    // setUserDetails(null);  
    router.replace('/User/home')
  };


  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={() => router.push('/Admin/dashboard')}>
        <Text style={styles.brand}>Admin Dashboard</Text>
      </TouchableOpacity>

      <View style={styles.navItems}>
        <TouchableOpacity onPress={() => router.push('/Admin/addquestion')}>
          <Text style={styles.navText}>Add Question</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/User/home')}>
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logout}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AdminNavbar;

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#007bff', // Primary blue color
  },
  brand: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  navItems: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navText: {
    fontSize: 16,
    color: '#fff',
    marginHorizontal: 12,
  },
  logout: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffcccb', // Light red for logout
    marginLeft: 12,
  },
});
