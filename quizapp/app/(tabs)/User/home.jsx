import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import Navbar from '../../../components/navbar';
import Bg from '../../../components/bg';
import geo from '../../../assets/images/geo.jpg';
import tech from '../../../assets/images/tech.jpg';
import science from '../../../assets/images/science.jpg';
import { useRouter } from 'expo-router';
import { Dimensions } from 'react-native';


const Home = () => {
  const router = useRouter(); 
  return (
    <Bg>
      <Navbar />
      <ScrollView>
      <View style={styles.container}>
          <View style={styles.card}>
              <Image source={geo} style={styles.img} imageStyle={{ opacity: 0.5 }} />
              <Text style={styles.title}>Geographical Questions</Text>
              <TouchableOpacity style={styles.button} onPress={() => router.push('/User/question')} activeOpacity={0.7}>
                  <Text style={styles.buttonText}>Start Now!!</Text>
                </TouchableOpacity>
          </View>
          <View style={styles.card}>
              <Image source={tech} style={styles.img} imageStyle={{ opacity: 0.5 }} />
              <Text style={styles.title}>Technical   Questions</Text>
              <TouchableOpacity style={styles.button} onPress={() => router.push('/User/question')} activeOpacity={0.7}>
                <Text style={styles.buttonText}>Start Now!!</Text>
              </TouchableOpacity>
          </View>
          <View style={styles.card}>
              <Image source={science} style={styles.img} imageStyle={{ opacity: 0.5 }}/>
              <Text style={styles.title}>Scientifical Questions</Text>
              <TouchableOpacity style={styles.button} onPress={() => router.push('/User/question')} activeOpacity={0.7}>
                <Text style={styles.buttonText}>Start Now!!</Text>
              </TouchableOpacity>
          </View>
      </View>
      </ScrollView>      
    </Bg>
  );
};
const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flexDirection: windowWidth < 768 ? 'column' : 'row',
    justifyContent: 'space-around',
    flexWrap: windowWidth < 768 ? 'nowrap' : 'wrap',
  },
  card: {
   width: windowWidth < 768 ? '90%' : '23%',
    height: windowWidth < 768 ? 300 : 600,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    margin: 20,
    marginTop: 100,
  },
  title: {
    fontSize: windowWidth< 768 ? 28 :24,
    fontWeight: 'bold',
    color: 'white',
    position: 'absolute',
    top: 250,
    marginLeft:15,
    textAlign: 'center'
  },
  img: {
    width: '90%',
    height: '85%',
    resizeMode: 'cover',
    borderRadius: 10,
    marginTop:'20px'

  },
  
  // Media query for small screens
  '@media (max-width: 768px)': {
    img: {
      width: '60%',
      height: '90%',
      marginTop:'20px'
    },
    container: {
      flexDirection: 'column',
    },
    card: {
      width: '90%',
      height: 300,
      margin: 20
    },
  },
  
  // Media query for large screens
  '@media (min-width: 1024px)': {
    img: {
      width: '80%',
      height: '80%'
    },
  },
    button: {
      width: '60%', // Increased button width
      height: 40,
      backgroundColor: '#17a2b8',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 20,
      marginTop: 15
    },
  buttonText: {
    color: 'white',
    fontSize: 16
  }
});

export default Home;