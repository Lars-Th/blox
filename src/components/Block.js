// src/components/Block.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { getBlockStyle, getTextColor } from './blockStyles';

const Block = React.memo(({ value }) => {
  if (value === null || value === undefined || isNaN(value)) {
    return null;
  }

  const blockStyles = [
    styles.block,
    getBlockStyle(value),
  ];

  return (
    <Animatable.View
      animation="fadeIn"
      duration={300}
      style={blockStyles}
    >
      <Text style={[styles.text, { color: getTextColor(value) }]}>{value}</Text>
    </Animatable.View>
  );
});

const styles = StyleSheet.create({
  block: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Block;