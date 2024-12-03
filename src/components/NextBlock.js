import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NextBlock = ({ value, isCurrent }) => {
  const blockStyles = [
    styles.block,
    isCurrent ? styles.currentBlock : styles.nextBlock,
    getBlockStyle(value),
  ];

  return (
    <View style={blockStyles}>
      <Text style={[styles.text, { color: getTextColor(value) }]}>{value}</Text>
    </View>
  );
};

const getBlockStyle = (value) => {
  let backgroundColor = '#eee4da';

  switch (value) {
    case 2:
      backgroundColor = '#eee4da';
      break;
    case 4:
      backgroundColor = '#ede0c8';
      break;
    // Lägg till fler fall för andra värden om du vill
    default:
      backgroundColor = '#3c3a32';
      break;
  }

  return {
    backgroundColor,
  };
};

const getTextColor = (value) => {
  return value > 4 ? '#f9f6f2' : '#776e65';
};

const styles = StyleSheet.create({
  block: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5, // Samma radie som blocken
    marginHorizontal: 10,
  },
  currentBlock: {
    width: 50,
    height: 50,
    borderWidth: 2, // Lägg till en ram
    borderColor: '#f2b179', // Matchande färg
  },
  nextBlock: {
    width: 50,
    height: 50,
    opacity: 0.8,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
export default NextBlock;