import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const Bg = ({ children }) => {
  return (
    <View style={styles.body}>
      {children}
    </View>
  );
};

export default Bg;

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#17a2b8',
    flex: 1, 
  },
});