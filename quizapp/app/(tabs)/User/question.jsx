import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

const Question = () => {
  const { topic } = useLocalSearchParams();
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [username, setUsername] = useState('');
  const [finalScore, setFinalScore] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const data = await AsyncStorage.getItem('userdetails');
      if (data) {
        const user = JSON.parse(data);
        setUsername(user.username);
      }
    };
    fetchData();
    fetchQuestions(topic);    
  }, [topic]);

  useEffect(() => {
    if (currentIndex === questions.length - 1) {
      console.log(" Final Score Before Sending:", score);
      updateScore(username, topic, score);
    }
  }, [score]); 
  

  const fetchQuestions = async (category) => {
    try {
      const response = await fetch(`http://localhost:4040/questions/${category}`);
      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const handleAnswerCheck = (selectedOption) => {
    setSelectedAnswer(selectedOption);
  
    setScore((prevScore) => {
      const isCorrect = selectedOption === questions[currentIndex]?.answer;
      return prevScore + (isCorrect ? 1 : 0);
    });
  
    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex((prevIndex) => prevIndex + 1);
        setSelectedAnswer(null);
      } else {
        // Ensure the latest score is updated before sending
        setScore((prevScore) => {
          console.log(" Final Score Before Sending:", prevScore);
          updateScore(username, topic, prevScore);
  
          // Navigate to result page after updating score
          setTimeout(() => {
            router.push("/User/result");
          }, 2000);
          
          return prevScore;
        });
      }
    }, 2000);
  };
   

  const updateScore = async (username, topic, prevScore) => {
    try {
      const response = await fetch(`http://localhost:4040/score/update/${username}/${topic}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ score }),
      });
  
      const data = await response.json();
      console.log(" Score Update Response:", data);
  
      if (response.ok) {
        await AsyncStorage.setItem("topic", topic);
    await AsyncStorage.setItem("score", score.toString());
        router.push('/User/result');
      } else {
        console.log("Score update failed:", data);
      }
    } catch (error) {
      console.log(" Error updating score:", error);
    }
  };
  
  

  
  const handleButtonStyle = (option) => { 
    if (!selectedAnswer) 
      return styles.answerButton; 
    if (option === questions[currentIndex]?.answer) 
      return styles.correctAnswer; 
    if (option === selectedAnswer) 
      return styles.wrongAnswer; 
    return styles.answerButton; 
  };

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.questionTitle}>Question {currentIndex + 1}</Text>
        <Text style={styles.topicText}>{topic} - Quiz</Text>
      </View>

      <View style={styles.questionBox}>
        {questions.length > 0 && (
          <Text style={styles.questionText}>{questions[currentIndex]?.question}</Text>
        )}
        {questions.length > 0 &&
          ['option1', 'option2', 'option3', 'option4'].map((opt, index) => {
            const optionText = questions[currentIndex]?.[opt];
            if (!optionText) return null;
            return (
              <TouchableOpacity
                key={index}
                style={handleButtonStyle(optionText)}
                onPress={() => handleAnswerCheck(optionText)}
                disabled={selectedAnswer}
              >
                <Text style={styles.answerText}>{optionText}</Text>
              </TouchableOpacity>
            );
          })}
        {/* <TouchableOpacity style={styles.nextButton}  disabled={!selectedAnswer}>
          <Text style={styles.nextButtonText}>
            {currentIndex < questions.length - 1 ? 'Next' : 'Finish'}
          </Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  headingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    backgroundColor: '#17a2b8',
  },
  questionTitle: { fontSize: 27, fontWeight: 'bold' },
  topicText: { fontSize: 20, color: 'white', paddingBottom: 5, paddingTop: 5, fontWeight: 'bold' },
  questionBox: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    height: 450,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  questionText: { fontSize: 18, marginBottom: 20, margin: 5, marginLeft: 12, marginTop: 30 },
  answerButton: {
    width: '60%',
    height: 40,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#000',
  },
  correctAnswer: {
    backgroundColor: 'green',
    width: '60%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  wrongAnswer: {
    backgroundColor: 'red',
    width: '60%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  answerText: { fontSize: 16, color: 'black' },
  nextButton: {
    width: '20%',
    height: 40,
    backgroundColor: '#17a2b8',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20,
  },
  nextButtonText: { fontSize: 18, color: 'white' },
});

export default Question;
