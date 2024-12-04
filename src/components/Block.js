// src/components/Block.js

import React, { useEffect, useRef } from 'react';
import { Animated, Text, StyleSheet } from 'react-native';
import { getBlockStyle, getTextColor } from './blockStyles';
import Svg, { Rect, Defs, RadialGradient, Stop } from 'react-native-svg';

const Block = React.memo(({ value, isNew, showGlow }) => {
  if (value === null || value === undefined || isNaN(value)) {
    return null;
  }

  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true,
    }).start();
  }, []);

  const blockStyles = [
    styles.block,
    getBlockStyle(value),
    { transform: [{ scale: scaleAnim }] },
  ];

  return (
    <Animated.View style={blockStyles}>
      {showGlow && (
        <Svg style={styles.glow} width="100%" height="100%">
          <Defs>
            <RadialGradient id="grad" cx="50%" cy="50%" rx="50%" ry="50%">
              <Stop offset="0%" stopColor="rgba(255, 215, 0, 0.8)" />
              <Stop offset="100%" stopColor="transparent" />
            </RadialGradient>
          </Defs>
          <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad)" />
        </Svg>
      )}
      <Text style={[styles.text, { color: getTextColor(value) }]}>{value}</Text>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  block: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    position: 'relative',
    overflow: 'hidden',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  glow: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 48,
    height: 48,
  },
});

export default Block;