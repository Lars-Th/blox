import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const GameOverScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Game Over!</Text>
      {/* Visa spelarens poäng här */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MainMenu')}>
        <Text style={styles.buttonText}>Till Huvudmeny</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 48,
      fontWeight: 'bold',
      color: '#ff0000',
      marginBottom: 40,
    },
    button: {
      backgroundColor: '#FFA500',
      paddingVertical: 15,
      paddingHorizontal: 60,
      borderRadius: 10,
      marginBottom: 20,
    },
    buttonText: {
      fontSize: 24,
      color: '#FFFFFF',
      fontWeight: 'bold',
    },
  });

export default GameOverScreen;