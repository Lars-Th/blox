import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ImageBackground } from 'react-native';
import GameBoard from '../components/GameBoard';
import NextBlock from '../components/NextBlock';
import LevelIndicator from '../components/LevelIndicator';
import Ionicons from 'react-native-vector-icons/Ionicons';

const GameScreen = ({ navigation }) => {
  const [score, setScore] = useState(0);
  const [levelsAchieved, setLevelsAchieved] = useState([]);

  const [currentBlockValue, setCurrentBlockValue] = useState(generateBlockValue());
  const [nextBlockValue, setNextBlockValue] = useState(generateBlockValue());

  const handleBlockPlaced = (newMaxValue) => {
    setCurrentBlockValue(nextBlockValue);
    setNextBlockValue(generateBlockValue());

    // Uppdatera uppnådda nivåer
    const levelsToCheck = [32, 64, 128, 256, 512, 1024, 2048];
    if (levelsToCheck.includes(newMaxValue) && !levelsAchieved.includes(newMaxValue)) {
      setLevelsAchieved([...levelsAchieved, newMaxValue]);
    }
  };

  return (
    <ImageBackground
      source={require('../assets/backgroundGame.jpg')} // Bakgrundsbild
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.topBar}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.navigate('MenuScreen')}
          >
            <Ionicons name="arrow-back-circle-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={styles.scoreText}>{score} points</Text>
        <View style={styles.dropContainer}>
          <NextBlock value={currentBlockValue} isCurrent />
          <NextBlock value={nextBlockValue} />
        </View>
        <View style={styles.dropContainer}>
          <GameBoard
            currentBlockValue={currentBlockValue}
            onBlockPlaced={handleBlockPlaced}
            setScore={setScore}
            navigation={navigation}
          />
        </View>
        <View style={styles.dropContainer}>
          <LevelIndicator levelsAchieved={levelsAchieved} />
        </View>
      </View>
    </ImageBackground>
  );
};

const generateBlockValue = () => {
  return Math.random() < 0.9 ? 2 : 4;
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 50,
    paddingHorizontal: 20,
  },
  iconButton: {
    padding: 10,
  },
  scoreText: {
    fontSize: 16,
    fontWeight: '300', // Ändrat här
    color: '#fff',
    marginVertical: 10,
    textAlign: 'center',
  },
  dropContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  backButton: {
    position: 'absolute',
    top: 0,
    left: 20,
    backgroundColor: '#FFA500',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    zIndex: 1,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default GameScreen;