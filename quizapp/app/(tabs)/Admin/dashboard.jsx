import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router'; 
import AdminNavbar from '../../../components/adminnavbar';

const Dashboard = () => {
  const router = useRouter(); 
  
  
  const handleNavigate = (route) => {
    router.push(route);
  };

  return (
    <View style={styles.screen}>
      <AdminNavbar />

      <ScrollView contentContainerStyle={styles.container}>
        {/* Total Questions Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Total Questions</Text>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => handleNavigate('/Admin/geographical')}>
            <Text style={styles.buttonText}>View Question</Text>
          </TouchableOpacity>
        </View>

        {/* Total Users Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Users Details</Text>
          <TouchableOpacity onPress={() => handleNavigate('/Admin/users')}>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  screen: {
    flex: 1,  
    backgroundColor: '#f8f9fa', 
  },
  container: {
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    flexWrap: 'wrap', 
    marginTop: 20,
  },
  card: {
    width: 180,  
    backgroundColor: '#fff', 
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    alignItems: 'center',
    margin: 10, 
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  count: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 10,
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
