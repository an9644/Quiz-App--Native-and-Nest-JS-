import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const Intro = () => {
  const router = useRouter(); 

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Welcome to{'\n'}World Quiz App</Text>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/User/home')}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Intro;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#17a2b8', 
  },
  card: {
    backgroundColor: 'white',
    padding: 40,
    marginHorizontal: 20,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#17a2b8', // Bootstrap info color
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5, // Shadow for Android
    alignItems: 'center',
    width:'60%',
    height:'40%',
    marginBottom:'15%'
  },
  title: {
    fontSize: 44,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#000',
    marginTop:'7%'
  },
  button: {
    backgroundColor: '#17a2b8',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});
