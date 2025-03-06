import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import AdminNavbar from '../../../components/adminnavbar';
import { useRouter } from 'expo-router';

const Technical = () => {
  const router = useRouter();
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await fetch('http://localhost:4040/questions/scientifical');
      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };
  const handleDelete=async(questionId)=>{
    try {
      const res=await fetch(`http://localhost:4040/questions/geographical/${questionId}`,{
        method:"DELETE",        
      })

      if(res.ok){
        alert("Question Deleted Successfully")
      }else{
        alert("Failed to delete question")
      }
    } catch (error) {
      console.log('Error deleting question:', error);      
    }
  }

  return (
    <View style={styles.page}>
      <AdminNavbar />

      {/* Buttons */}
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/Admin/geographical')}>
          <Text style={styles.text}>Geographical</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/Admin/technical')}>
          <Text style={styles.text}>Technical</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/Admin/scientifical')}>
          <Text style={styles.text}>Scientific</Text>
        </TouchableOpacity>
      </View>

      {/* Questions Table */}
      <View style={styles.tableContainer}>
        <Text style={styles.tableTitle}>Scientifical Questions</Text>

        {/* Table Header */}
        <View style={styles.tableRow}>
          <Text style={[styles.headerText, styles.flex2]}>Question</Text>
          <Text style={[styles.headerText, styles.flex2]}>Options</Text>
          <Text style={[styles.headerText, styles.flex1]}>Answer</Text>
          <Text style={[styles.headerText, styles.flex1]}>Update</Text>
          <Text style={[styles.headerText, styles.flex1]}>Delete</Text>
        </View>

        {/* Table Data */}
        <FlatList
            data={questions}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <View style={styles.tableRow}>
                <Text style={[styles.cell, styles.flex2]}>{item.question}</Text>
                <Text style={[styles.cell, styles.flex2]}>
                  {item.option1} {'\n'}
                  {item.option2} {'\n'}
                  {item.option3} {'\n'}
                  {item.option4}
                </Text>
                <Text style={[styles.cell, styles.flex1]}>{item.answer}</Text>
                <TouchableOpacity style={[styles.button, styles.flex1]}
                  onPress={() => router.push({ pathname: "/Admin/update", params: { id: item._id, category: "geographical", question: item.question, option1: item.option1, option2: item.option2, option3: item.option3, option4: item.option4, answer: item.answer } })}>
                  <Text style={styles.text}>Update</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(item._id)} style={styles.button1}>
                  <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            )}
          />
      </View>
    </View>
  );
};

export default Technical;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 10,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  button: {
    width: 120,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007bff',
    borderRadius: 10,
    margin: 5,
  },
  button1: {
    width: 120,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    borderRadius: 10,
    margin: 5,
  },
  text: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tableContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 2, 
    width: '90%',
    alignSelf: 'center',
  },
  tableTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginRight:15
  },
  cell: {
    textAlign: 'center',
  },
  flex1: {
    flex: 1,
  },
  flex2: {
    flex: 2,
  },
});
