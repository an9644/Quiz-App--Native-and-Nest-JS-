import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

const Navbar = () => {
  const [userDetails, setUserDetails] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const getUserDetails = async () => {
      const storedUser = await AsyncStorage.getItem('userdetails');
      if (storedUser) {
        setUserDetails(JSON.parse(storedUser));
      }
    };
    getUserDetails();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userdetails'); 
    setUserDetails(null);  
    router.replace('/User/home')
  };

  return (
    <View style={styles.view}>
      <TouchableOpacity onPress={() => router.push('/User/home')}>
        <Text style={styles.text}>Home</Text>
      </TouchableOpacity>
      <View style={{ width: 16 }} />
        <TouchableOpacity onPress={() => router.push('/User/profile')}>
          <Text style={styles.text}>Profile</Text>
        </TouchableOpacity>
      <View style={{ width: 16 }} />
      {userDetails?.userType === 'admin' && (
        <TouchableOpacity onPress={() => router.push('/Admin/dashboard')}>
          <Text style={styles.text}>Admin</Text>
        </TouchableOpacity>
      )}
      <View style={{ width: 16 }} />
      {userDetails ? (
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.text}>Logout</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => router.push('/Ver/login')}>
          <Text style={styles.text}>Login</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Navbar;

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});