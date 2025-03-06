import React, { useState ,useEffect,useCallback} from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Navbar from '../../../components/navbar'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";


const ResultScreen = () => {  
  const [result,setResult]=useState('')
  const [topic,setTopic]=useState('')
  const router=useRouter()

  useEffect(()=>{
    const fetchData=async()=>{
      const data1=await AsyncStorage.getItem('topic')
      if (data1)  setTopic(data1)      
      const data=await AsyncStorage.getItem('score')
      if (data) setResult(data)  
    }
    fetchData()
  },[])

  useFocusEffect(
    useCallback(() => {
      return () => {
        AsyncStorage.removeItem('topic');
        AsyncStorage.removeItem('score');
        console.log("Storage cleared: topic & score removed");
      };
    }, [])
  );


  return (
    <>
    <Navbar />
    <View style={styles.container}>
      <View style={styles.card}>
        <Image source={require("../../../assets/images/result.png")} style={styles.image} />

        {result !== null ? (
          result > 0 ? (
            <View>
              <Text style={styles.congratsText}>Congratulations!!{"\n"}You Won!!!</Text>
              <View style={styles.scoreContainer}>
                <Text style={styles.scoreText}>You scored {result} marks in {topic} Quiz</Text>
              </View>
            </View>
          ) : (
            <View>
              <Text style={styles.congratsText}>Better Luck Next Time!!</Text>
              <View style={styles.scoreContainer}>
                <Text style={styles.scoreText}>You scored 0 marks in {topic} Quiz</Text>
              </View>
            </View>
          )
        ) : (
          <Text style={styles.loadingText}>Loading...</Text>
        )}

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => router.push("/User/home")}>
            <Text style={styles.buttonText}>Go to Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => router.push("/User/profile")}>
            <Text style={styles.buttonText}>Go to Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#17a2b8",
  },
  card: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: "center",
    margin:1,
    marginLeft:'auto',
    marginRight:'auto',
    marginTop:100
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: "contain",
    marginBottom: 20,
  },
  congratsText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007bff",
    textAlign: "center",
  },
  scoreContainer: {
    marginTop: 20,
  },
  scoreText: {
    fontSize: 18,
    textAlign: "center",
  },
  loadingText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#17a2b8",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    margin:1,
    marginLeft:'auto',
    marginRight:'auto',
  
  },
  buttonText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
});

export default ResultScreen;
