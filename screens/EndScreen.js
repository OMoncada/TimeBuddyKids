import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function EndScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>⏳ Time’s Up!</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.replace('Home')}
      >
        <Text style={styles.buttonText}>Back to Start</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c69c6d',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#3b2415',
    marginBottom: 40
  },
  button: {
    backgroundColor: '#3b2415',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 20
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600'
  }
});
