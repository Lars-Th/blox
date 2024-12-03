import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const LevelIndicator = ({ levelsAchieved }) => {
  const levels = [32, 64, 128, 256, 512, 1024, 2048];

  return (
    <View style={styles.container}>
      {levels.map((level) => (
        <View key={level} style={styles.levelWrapper}>
          {levelsAchieved.includes(level) && (
            <Ionicons name="trophy" size={20} color="#ffd700" style={styles.icon} />
          )}
          <View
            style={[
              styles.level,
              levelsAchieved.includes(level) ? styles.levelAchieved : null,
            ]}
          >
            <Text style={styles.levelText}>{level}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  levelWrapper: {
    alignItems: 'center',
    marginHorizontal: 5,
  },
  icon: {
    marginBottom: 5,
  },
  level: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#cdc1b4',
    borderRadius: 5,
  },
  levelAchieved: {
    backgroundColor: '#f2b179',
    borderWidth: 2,
    borderColor: '#ffd700',
  },
  levelText: {
    fontSize: 16,
    color: '#776e65',
  },
});

export default LevelIndicator;