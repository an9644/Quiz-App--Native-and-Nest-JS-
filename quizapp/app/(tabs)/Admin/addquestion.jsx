import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView,  } from "react-native";
import AdminNavbar from "../../../components/adminnavbar";
import { Picker } from "@react-native-picker/picker";
import { Dimensions } from "react-native";
import { useRouter } from "expo-router"; 

const AdminPage = () => {
  const router = useRouter();
  // State Management
  const [selectedCategory, setSelectedCategory] = useState(""); // Store category
  const [question, setQuestion] = useState(""); // Store question text
  const [options, setOptions] = useState({ option1: "", option2: "", option3: "", option4: "" }); // Store options
  const [answer, setAnswer] = useState(""); // Store answer
  const [isSubmitting, setIsSubmitting] = useState(false); // Submission state

  // Function to handle text input changes
  const handleOptionChange = (key, value) => {
    setOptions({ ...options, [key]: value });
  };

  // Function to submit form data
  const handleSubmit = async () => {
    if (!selectedCategory || !question || !options.option1 || !options.option2 || !options.option3 || !options.option4 || !answer) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    const questionData = {
      question,
      option1: options.option1, 
      option2: options.option2,
      option3: options.option3,
      option4: options.option4,
      answer,
    };

    setIsSubmitting(true);

    try {
      const response = await fetch(`http://localhost:4040/questions/${selectedCategory}`, { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(questionData),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Failed to add question");
      }

      alert("Question added successfully!");
      setQuestion("");
      setOptions({ option1: "", option2: "", option3: "", option4: "" });
      setAnswer("");
      setSelectedCategory("");
      router.push(`/Admin/${selectedCategory}`)
    } catch (error) {
      alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <AdminNavbar />
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.formContainer}>
          <Text style={styles.title}>Add Question</Text>

          {/* Category Picker */}
          <View>
           
            <Text style={styles.label}>Category:</Text>
            <Picker
              selectedValue={selectedCategory}
              style={styles.input}
              onValueChange={(itemValue) => setSelectedCategory(itemValue)}>
              <Picker.Item label="Select a category" value="" />
              <Picker.Item label="Geographical" value="geographical" />
              <Picker.Item label="Technical" value="technical" />
              <Picker.Item label="Scientifical" value="scientifical" />
            </Picker>
          </View>

          {/* Question Input */}
          <Text style={styles.label}>Question:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter question"
            value={question}
            onChangeText={(value) => setQuestion(value)}
          />

          {/* Options */}
          <Text style={styles.label}>Options:</Text>
          <TextInput
            style={styles.input}
            placeholder="Option 1"
            value={options.option1}
            onChangeText={(value) => handleOptionChange("option1", value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Option 2"
            value={options.option2}
            onChangeText={(value) => handleOptionChange("option2", value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Option 3"
            value={options.option3}
            onChangeText={(value) => handleOptionChange("option3", value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Option 4"
            value={options.option4}
            onChangeText={(value) => handleOptionChange("option4", value)}
          />

          {/* Answer Input */}
          <Text style={styles.label}>Answer:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter answer"
            value={answer}
            onChangeText={(value) => setAnswer(value)}
          />

          {/* Submit Button */}
          <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={isSubmitting}>
            <Text style={styles.buttonText}>{isSubmitting ? "Submitting..." : "Add Question"}</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </>
  );
};

export default AdminPage;

// Styles
const windowWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f8f9fa",
    width: windowWidth < 768 ? "auto" : "30%",
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
    marginLeft: windowWidth < 768 ? 50 : 165,
    width: 150,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
