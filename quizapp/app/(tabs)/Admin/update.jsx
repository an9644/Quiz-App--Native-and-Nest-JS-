import React, { useEffect, useState } from "react";
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, Alert, LogBox } from "react-native";
import { Picker } from "@react-native-picker/picker";
import AdminNavbar from "../../../components/adminnavbar";
import { Dimensions } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

const Update = () => {
  const router = useRouter(); 
  const { id, category, question, option1, option2, option3, option4, answer } = useLocalSearchParams();

  const [updatedCategory, setUpdatedCategory] = useState("Technical"); // Hardcoded
  const [updatedQuestion, setUpdatedQuestion] = useState("");
  const [updatedOptions, setUpdatedOptions] = useState({
    option1: "",
    option2: "",
    option3: "",
    option4: "",
  });
  const [updatedAnswer, setUpdatedAnswer] = useState("");
  
  // Ensure state updates when parameters are available
  useEffect(() => {
    if (category) setUpdatedCategory(category);
    // console.log(category);    
    if (question) setUpdatedQuestion(question);
    if (option1 || option2 || option3 || option4) {
      setUpdatedOptions({
        option1: option1 || "",
        option2: option2 || "",
        option3: option3 || "",
        option4: option4 || "",
      });
    }
    if (answer) setUpdatedAnswer(answer);
  }, [category, question, option1, option2, option3, option4, answer]);
  
  

    const handleUpdate = async () => {
      try {
        const response = await fetch(`http://localhost:4040/questions/${updatedCategory}/${id}`, {  
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            question: updatedQuestion,
            option1: updatedOptions.option1,
            option2: updatedOptions.option2,
            option3: updatedOptions.option3,
            option4: updatedOptions.option4,
            answer: updatedAnswer,
          }),
        });
  
        if (response.ok) {
          alert("Question updated successfully!");
          router.push(`/Admin/${updatedCategory}`);  
        } else {
          alert("Error updating question.");
        }
      } catch (error) {
        console.error("Error updating question:", error);
      }
  };
  
      
  console.log(updatedCategory);    

  return (
    <>
      <AdminNavbar />
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.formContainer}>
          <Text style={styles.title}>Update Question</Text>

          {/* Category Picker */}
          <View key={updatedCategory}>  
          <Text style={styles.label}>Category:</Text>
                <Picker
                  selectedValue={updatedCategory} enabled={false}
                  style={styles.input} >
                  <Picker.Item label="Geographical" value="Geographical" />
                  <Picker.Item label="Technical" value="Technical" />
                  <Picker.Item label="Scientific" value="Scientific" />
                </Picker>
              </View>

          {/* Question Input */}
          <Text style={styles.label}>Question:</Text>
          <TextInput style={styles.input} placeholder="Enter question" value={updatedQuestion} onChangeText={setUpdatedQuestion} />

          {/* Options */}
          <Text style={styles.label}>Options:</Text>
          <TextInput style={styles.input} placeholder="Option 1" value={updatedOptions.option1} onChangeText={(text) => setUpdatedOptions({ ...updatedOptions, option1: text })} />
          <TextInput style={styles.input} placeholder="Option 2" value={updatedOptions.option2} onChangeText={(text) => setUpdatedOptions({ ...updatedOptions, option2: text })}/>
          <TextInput style={styles.input} placeholder="Option 3" value={updatedOptions.option3} onChangeText={(text) => setUpdatedOptions({ ...updatedOptions, option3: text })} />
          <TextInput style={styles.input} placeholder="Option 4" value={updatedOptions.option4} onChangeText={(text) => setUpdatedOptions({ ...updatedOptions, option4: text })}
         />

          {/* Answer Input */}
          <Text style={styles.label}>Answer:</Text>
          <TextInput style={styles.input} placeholder="Enter answer" value={updatedAnswer} onChangeText={setUpdatedAnswer} />

          {/* Submit Button */}
          <TouchableOpacity style={styles.button} onPress={handleUpdate} >
            <Text style={styles.buttonText}>
                {/* {loading ? "Updating..." : "Update Question"} */}
                Update 
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </>
  );
};

export default Update;

// Styles
const windowWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f8f9fa",
    width: windowWidth < 768 ? "auto" : "90%",
    height: windowWidth < 768 ? 550 : 750,
    paddingTop: 20,
    margin: 20,
    marginLeft: "auto",
    marginRight: "auto",
    alignSelf: "center",
  },
  formContainer: {
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    marginLeft: 20,
    marginTop: 10,
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    marginLeft: 50,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 10,
    marginLeft:'auto',
    marginRight:'auto',
    width: 150,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
