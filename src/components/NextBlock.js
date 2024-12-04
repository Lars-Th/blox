// src/components/NextBlock.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getBlockStyle, getTextColor } from './blockStyles';

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

const styles = StyleSheet.create({
  block: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginHorizontal: 10,
  },
  currentBlock: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: '#f2b179',
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