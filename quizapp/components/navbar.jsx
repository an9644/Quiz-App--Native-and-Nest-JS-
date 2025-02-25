import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const Navbar = () => {
  const [userDetails, setUserDetails] = useState('');
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('userdetails');
    if (storedUser) {
      setUserDetails(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem('userdetails');
    navigation.navigate('Login');
  };

  return (
    <View style={styles.view}>
      <TouchableOpacity onPress={() =>  router.push('/User/home')}>
        <Text style={styles.text}>Home</Text>
      </TouchableOpacity>
      <View style={{ width: 16 }} />
      <TouchableOpacity onPress={() =>  router.push('/User/profile')}>
        <Text style={styles.text}>Profile</Text>
      </TouchableOpacity>
      <View style={{ width: 16 }} />
      {userDetails.usertype === 'admin' && (
        <TouchableOpacity onPress={() =>  router.push('/Admin/dashbord')}>
          <Text style={styles.text}>Admin</Text>
        </TouchableOpacity>
      )}
      <View style={{ width: 16 }} />
      <TouchableOpacity onPress={() =>  router.push('/Ver/login')}>
        <Text style={styles.text}>Login</Text>
      </TouchableOpacity>
      <View style={{ width: 16 }} />
      <TouchableOpacity onPress={handleLogout}>
        <Text style={styles.text}>Logout</Text>
      </TouchableOpacity>
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