// src/screens/GameScreen.js

import React, { useState, useRef } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ImageBackground } from 'react-native';
import GameBoard from '../components/GameBoard';
import NextBlock from '../components/NextBlock';
import LevelIndicator from '../components/LevelIndicator';
import Ionicons from 'react-native-vector-icons/Ionicons';

const GameScreen = ({ navigation }) => {
  const [score, setScore] = useState(0);
  const [levelsAchieved, setLevelsAchieved] = useState([]);

  const levelsToCheck = [256, 512, 1024, 2048];

  const [currentBlockValue, setCurrentBlockValue] = useState(generateBlockValue());
  const [nextBlockValue, setNextBlockValue] = useState(generateBlockValue());

  const gameBoardRef = useRef(null);

  function generateBlockValue() {
    const blockTypes = [2, 4, 8, 16, 32];
    const randomValue = blockTypes[Math.floor(Math.random() * blockTypes.length)];
    return randomValue;
  }

  const handleBlockPlaced = (newMaxValue) => {
    setCurrentBlockValue(nextBlockValue);
    setNextBlockValue(generateBlockValue());

    // Uppdatera uppnådda nivåer
    if (levelsToCheck.includes(newMaxValue) && !levelsAchieved.includes(newMaxValue)) {
      setLevelsAchieved([...levelsAchieved, newMaxValue]);
    }
  };

  const handleUndo = () => {
    if (gameBoardRef.current) {
      gameBoardRef.current.undoMove();
    }
  };

  return (
    <ImageBackground
      source={require('../assets/backgroundGame.jpg')}
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
          <Text style={styles.scoreText}>{score} poäng</Text>
        </View>
        {/* Visa nästa block */}
        <View style={styles.dropContainer}>
          <NextBlock value={currentBlockValue} isCurrent />
          <NextBlock value={nextBlockValue} />
        </View>
        {/* Ångra-knapp */}
        <TouchableOpacity style={styles.undoButton} onPress={handleUndo}>
          <Text style={styles.undoButtonText}>Ångra</Text>
        </TouchableOpacity>
        <View style={styles.gameBoardContainer}>
          <GameBoard
            ref={gameBoardRef}
            currentBlockValue={currentBlockValue}
            onBlockPlaced={handleBlockPlaced}
            setScore={setScore}
            navigation={navigation}
          />
        </View>
        {/* Nivåindikator */}
        <Text style={styles.levelText}>Nivå: {levelsAchieved.length + 1}</Text>
        <View style={styles.levelIndicatorContainer}>
          <LevelIndicator levelsAchieved={levelsAchieved} />
        </View>
      </View>
    </ImageBackground>
  );
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 50,
    paddingHorizontal: 20,
  },
  iconButton: {
    padding: 10,
  },
  scoreText: {
    fontSize: 16,
    fontWeight: '300',
    color: '#fff',
    marginVertical: 10,
    textAlign: 'center',
  },
  dropContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  gameBoardContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  levelText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
  levelIndicatorContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  undoButton: {
    backgroundColor: '#f2b179',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
    marginVertical: 10,
  },
  undoButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default GameScreen;