// src/components/NewBlock.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NewBlock = ({ value }) => {
  const blockStyles = [
    styles.block,
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
    case 8:
      backgroundColor = '#f2b179';
      break;
    case 16:
      backgroundColor = '#f59563';
      break;
    case 32:
      backgroundColor = '#f67c5f';
      break;
    case 64:
      backgroundColor = '#f65e3b';
      break;
    case 128:
      backgroundColor = '#edcf72';
      break;
    case 256:
      backgroundColor = '#edcc61';
      break;
    case 512:
      backgroundColor = '#edc850';
      break;
    case 1024:
      backgroundColor = '#edc53f';
      break;
    case 2048:
      backgroundColor = '#edc22e';
      break;
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
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default NewBlock;