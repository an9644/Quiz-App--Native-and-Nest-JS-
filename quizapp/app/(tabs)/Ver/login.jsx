import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Bg from '../../../components/bg'
import { useRouter } from 'expo-router';
import { Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
    const router = useRouter(); 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async() => {
      try {
        if (!username || !password) {
          alert('Please enter both username and password');
          return;
        }
    
        const res= await fetch('http://localhost:4040/auth/login',{
          method: 'POST',
          headers: {  
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, password})    
        });
  
        if(!res.ok){
          // console.log(error);
          alert("Invalid credential") 
          return;            
        }else{
          const data = await res.json();
          await AsyncStorage.setItem('userdetails', JSON.stringify(data));
          router.push('/User/home');
          alert("Login Sucessful!!")      
        }
      } catch (error) {
        console.log('Login Error:', error); 
        alert(error)      }
  };

  return (
   <Bg>
     <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
          <View style={styles.accountContainer}>
          <Text style={styles.account}>Already have an Account? </Text>
          <TouchableOpacity onPress={() => router.push('/Ver/signup')}>
            <Text style={styles.ab}>signup</Text>
          </TouchableOpacity>
        </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
   </Bg>
  );
};

const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    width:windowWidth < 768 ?'65%':'35%',
    height:windowWidth < 768 ? '50%' :'40%',
    margin:20,
    marginTop:windowWidth < 768 ? 150 : 280,
    marginLeft: 'auto',
    marginRight: 'auto',
      alignSelf: 'center',
    borderRadius:10
  },
  ab:{
    color:'#17a2b8'
  }, 
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    margin:1,
    marginTop:8
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
  },
  button: {
    width: '30%',
    height: 40,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    margin:10
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  account:{
    // flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    fontWeight: 'bold'

  
  }
});

export default Login;