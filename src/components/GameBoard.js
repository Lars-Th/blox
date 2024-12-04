// src/components/GameBoard.js

import React, { useState, useRef, useImperativeHandle, forwardRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, Animated, Text } from 'react-native';
import Block from './Block';

const GameBoard = forwardRef(({ onBlockPlaced, setScore, currentBlockValue }, ref) => {
  const rows = 7;
  const columns = 5;

  const [grid, setGrid] = useState(
    Array(rows)
      .fill()
      .map(() => Array(columns).fill(null))
  );

  const [history, setHistory] = useState([]);
  const [animations, setAnimations] = useState([]);
  const [chainMultiplier, setChainMultiplier] = useState(1);

  // Exponera undoMove via ref
  useImperativeHandle(ref, () => ({
    undoMove,
  }));

  const undoMove = () => {
    if (history.length > 0) {
      const previousGrid = history[history.length - 1];
      setGrid(previousGrid);
      setHistory((prevHistory) => prevHistory.slice(0, -1));
    } else {
      Alert.alert('Inga fler drag att ångra!');
    }
  };

  const applyGravity = (currentGrid) => {
    const newGrid = currentGrid.map((row) => row.slice());

    for (let col = 0; col < columns; col++) {
      let pointer = rows - 1;
      for (let row = rows - 1; row >= 0; row--) {
        if (newGrid[row][col] !== null) {
          if (row !== pointer) {
            newGrid[pointer][col] = newGrid[row][col];
            newGrid[row][col] = null;
          }
          pointer--;
        }
      }
    }

    return newGrid;
  };

  const addBlockToColumn = (columnIndex) => {
    // Spara nuvarande tillstånd i historiken
    setHistory((prevHistory) => [...prevHistory, grid.map((row) => row.slice())]);

    let newGrid = grid.map((row) => row.slice());

    let placed = false;

    for (let row = 0; row < rows; row++) {
      if (newGrid[row][columnIndex] === null) {
        const nextValue = currentBlockValue;
        newGrid[row][columnIndex] = {
          value: nextValue,
          isNew: true,
        };
        placed = true;
        break;
      }
    }

    if (!placed) {
      Alert.alert('Kolumnen är full!');
      return;
    }

    let merging = true;
    let localChainMultiplier = 1;

    while (merging) {
      newGrid = applyGravity(newGrid);
      const result = checkForMerges(newGrid);
      newGrid = result.grid;
      merging = result.merged;

      if (merging) {
        localChainMultiplier++;
      }
    }

    setChainMultiplier(localChainMultiplier);
    setGrid(newGrid);

    const maxValue = getMaxValue(newGrid);
    onBlockPlaced(maxValue);
  };

  const checkForMerges = (currentGrid) => {
    let merged = false;
    let newGrid = currentGrid.map((row) => row.slice());

    const visited = Array(rows)
      .fill()
      .map(() => Array(columns).fill(false));

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < columns; col++) {
        if (newGrid[row][col] !== null && !visited[row][col]) {
          const matchingBlocks = findConnectedBlocks(newGrid, row, col, visited);

          if (matchingBlocks.length > 1) {
            merged = true;

            const newValue =
              newGrid[row][col].value * Math.pow(2, matchingBlocks.length - 1);

            // Lägg till animation för sammanslagning
            setAnimations((prev) => [
              ...prev,
              { type: 'merge', blocks: matchingBlocks },
            ]);

            // Radera alla matchande block
            matchingBlocks.forEach(({ row: r, col: c }) => {
              newGrid[r][c] = null;
            });

            // Placera det nya blocket längst ned i kolumnen
            const targetCol = col;
            let targetRow = rows - 1;
            while (targetRow >= 0 && newGrid[targetRow][targetCol] !== null) {
              targetRow--;
            }
            if (targetRow >= 0) {
              newGrid[targetRow][targetCol] = { value: newValue };
            } else {
              // Om kolumnen är full, placera blocket på högsta möjliga position
              newGrid[0][targetCol] = { value: newValue };
            }

            setScore((prevScore) => prevScore + newValue);
          }
        }
      }
    }

    return { merged, grid: newGrid };
  };

  const findConnectedBlocks = (grid, row, col, visited) => {
    const stack = [{ row, col }];
    const value = grid[row][col].value;
    const matchingBlocks = [];

    while (stack.length > 0) {
      const { row: r, col: c } = stack.pop();

      if (
        r >= 0 &&
        r < rows &&
        c >= 0 &&
        c < columns &&
        !visited[r][c] &&
        grid[r][c] !== null &&
        grid[r][c].value === value
      ) {
        visited[r][c] = true;
        matchingBlocks.push({ row: r, col: c });

        // Kolla alla riktningar
        stack.push({ row: r + 1, col: c }); // Ner
        stack.push({ row: r - 1, col: c }); // Upp
        stack.push({ row: r, col: c - 1 }); // Vänster
        stack.push({ row: r, col: c + 1 }); // Höger
      }
    }

    return matchingBlocks;
  };

  const getMaxValue = (currentGrid) => {
    let max = 0;
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < columns; col++) {
        if (currentGrid[row][col] !== null && currentGrid[row][col].value > max) {
          max = currentGrid[row][col].value;
        }
      }
    }
    return max;
  };

  const createGrid = () => {
    return grid.map((rowData, rowIndex) => (
      <View key={rowIndex} style={styles.row}>
        {rowData.map((cellData, columnIndex) => {
          let showGlow = false;
          // Kontrollera om blocket matchar aktuell nivå för att visa glödande ram
          if (cellData && cellData.value && cellData.value === 256) {
            showGlow = true;
          }

          return (
            <TouchableOpacity
              key={`${rowIndex}-${columnIndex}`}
              style={styles.cell}
              onPress={() => addBlockToColumn(columnIndex)}
            >
              {cellData && cellData.value ? (
                <Block
                  value={cellData.value}
                  isNew={cellData.isNew}
                  showGlow={showGlow}
                />
              ) : null}
            </TouchableOpacity>
          );
        })}
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      {createGrid()}
      {/* Visa kedjereaktionsmultiplikatorn */}
      {chainMultiplier > 1 && (
        <Text style={styles.chainText}>x{chainMultiplier}</Text>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    // Anpassa vid behov
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 50,
    height: 50,
    margin: 5,
    backgroundColor: '#cdc1b4',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  chainText: {
    position: 'absolute',
    top: '50%',
    alignSelf: 'center',
    fontSize: 48,
    color: 'yellow',
    fontWeight: 'bold',
    textShadowColor: 'black',
    textShadowRadius: 10,
  },
});

export default GameBoard;