import { StyleSheet, Text, View, ScrollView, ActivityIndicator, Image } from 'react-native';
import React,{useState,useEffect} from 'react'
import Navbar from '../../../components/navbar'
import { Dimensions } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const profile = () => {
  const [loading, setLoading] = useState(true);
  const [username,setUsername]=useState(null)
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('userdetails');
        const user = JSON.parse(storedUser);

        if (user && user.username) {
          setUsername(user.username);

          // Fetch user score from backend
          const response = await fetch(`http://localhost:4040/score/${user.username}`);
          const data = await response.json();

          if (response.ok) {
            setUserData(data); // Store the fetched quiz scores
          } else {
            console.error('Error fetching user score:', data.message);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <Navbar />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.username}>Username: {username || "Loading..."}</Text>

          {loading ? (
            <ActivityIndicator size="large" color="#17a2b8" style={{ marginTop: 20 }} />
          ) : userData ? (
            <View style={styles.quizContainer}>
              {userData.geographical > 0 && (
                <View style={[styles.quizBox, { backgroundColor: "#6c757d" }]}>
                  <Text style={styles.quizTitle}>Geographical Quiz</Text>
                  <Image source={require ('../../../assets/images/medal.png')} style={styles.medal} />
                  <Text style={styles.score}>Score: {userData.geographical}</Text>
                </View>
              )}

              {userData.technical > 0 && (
                <View style={[styles.quizBox, { backgroundColor: "#28a745" }]}>
                  <Text style={styles.quizTitle}>Technical Quiz</Text>
                  <Image source={require("../../../assets/images/medal.png")} style={styles.medal} />
                  <Text style={styles.score}>Score: {userData.technical}</Text>
                </View>
              )}

              {userData.scientifical > 0 && (
                <View style={[styles.quizBox, { backgroundColor: "#007bff" }]}>
                  <Text style={styles.quizTitle}>Scientific Quiz</Text>
                  <Image source={require("../../../assets/images/medal.png")} style={styles.medal} />
                  <Text style={styles.score}>Score: {userData.scientifical}</Text>
                </View>
              )}
            </View>
          ) : (
            <Text style={styles.loadingText}>No quiz data available</Text>
          )}
        </View>
      </ScrollView>
    </>
  );
};
const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 50,
    backgroundColor: "#17a2b8",
  },
  card: {
    width:windowWidth < 768 ? "90%": "40%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: "center",
    // margin:1,
    // marginLeft:'auto',
    // marginRight:'auto'
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  quizContainer: {
    width: "100%",
    alignItems: "center",
  },
  quizBox: {
    width: "90%",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    marginBottom: 15,
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  quizTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  medal: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  score: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  loadingText: {
    fontSize: 16,
    color: "#6c757d",
    marginTop: 20,
  },
});

export default profile;



