// src/components/GameBoard.js

import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Block from './Block';

const GameBoard = ({ onBlockPlaced, setScore, currentBlockValue }) => {
  const rows = 7; // Ändrat till 7 rader
  const columns = 5;

  const [grid, setGrid] = useState(
    Array(rows)
      .fill()
      .map(() => Array(columns).fill(null))
  );

  const [lastPlacedColumn, setLastPlacedColumn] = useState(null);
  const [blockTypes, setBlockTypes] = useState([2, 4, 8, 16, 32]);
  const [level, setLevel] = useState(1);

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
    let newGrid = grid.map((row) => row.slice());

    let placed = false;

    for (let row = rows - 1; row >= 0; row--) {
      if (newGrid[row][columnIndex] === null) {
        const nextValue = currentBlockValue;
        newGrid[row][columnIndex] = {
          value: nextValue,
        };
        placed = true;
        setLastPlacedColumn(columnIndex);
        break;
      }
    }

    if (!placed) {
      Alert.alert('Kolumnen är full!');
      return;
    }

    let result = { merged: true, grid: newGrid };
    while (result.merged) {
      result = checkForMerges(result.grid);
      newGrid = result.grid;
    }

    setGrid(newGrid);

    const maxValue = getMaxValue(newGrid);
    onBlockPlaced(maxValue);

    // Kontrollera om nivån ska uppgraderas
    if (maxValue >= 256) {
      upgradeLevel();
    }
  };

  const findMatchingNeighbors = (grid, row, col) => {
    const currentVal = grid[row][col].value;
    const matchingBlocks = [{ row, col }];
    const directions = [
      { row: 1, col: 0 },  // Under
      { row: 0, col: -1 }, // Vänster
      { row: 0, col: 1 },  // Höger
    ];

    directions.forEach((dir) => {
      const newRow = row + dir.row;
      const newCol = col + dir.col;

      if (
        newRow >= 0 && newRow < rows &&
        newCol >= 0 && newCol < columns &&
        grid[newRow][newCol] !== null &&
        grid[newRow][newCol].value === currentVal
      ) {
        matchingBlocks.push({ row: newRow, col: newCol });
      }
    });

    return matchingBlocks;
  };

  const checkForMerges = (currentGrid) => {
    let merged = false;
    let newGrid = currentGrid.map((row) => row.slice());
    let anyMerge = false;

    for (let row = rows - 1; row >= 0; row--) {
      for (let col = 0; col < columns; col++) {
        if (newGrid[row][col] !== null) {
          const matchingBlocks = findMatchingNeighbors(newGrid, row, col);

          if (matchingBlocks.length > 1) {
            merged = true;
            anyMerge = true;

            const multiplier = matchingBlocks.length;
            const newValue = newGrid[row][col].value * Math.pow(2, multiplier - 1);

            newGrid[row][col].value = newValue;

            matchingBlocks.forEach(({ row: r, col: c }) => {
              if (!(r === row && c === col)) {
                newGrid[r][c] = null;
              }
            });

            // Om det finns ett block under som matchade, droppa ned blocket en position
            if (matchingBlocks.some(b => b.row === row + 1)) {
              if (row + 1 < rows) {
                newGrid[row + 1][col] = newGrid[row][col];
                newGrid[row][col] = null;
                row++;
              }
            }

            setScore((prevScore) => prevScore + newValue);
          }
        }
      }
    }

    if (anyMerge) {
      newGrid = applyGravity(newGrid);
    }

    return { merged: anyMerge, grid: newGrid };
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

  const upgradeLevel = () => {
    setBlockTypes((prevTypes) => {
      const newTypes = prevTypes.slice(1);
      const last = prevTypes[prevTypes.length - 1];
      const newValue = last * 2;
      newTypes.push(newValue);
      return newTypes;
    });
    setLevel((prevLevel) => prevLevel + 1);

    // Radera alla block med den gamla lägsta siffran
    setGrid((prevGrid) => {
      const oldLowest = blockTypes[0];
      const newGrid = prevGrid.map((row) =>
        row.map((cell) => {
          if (cell && cell.value === oldLowest) {
            return null;
          }
          return cell;
        })
      );
      return newGrid;
    });
  };

  const createGrid = () => {
    return grid.map((rowData, rowIndex) => (
      <View key={rowIndex} style={styles.row}>
        {rowData.map((cellData, columnIndex) => (
          <TouchableOpacity
            key={`${rowIndex}-${columnIndex}`}
            style={styles.cell}
            onPress={() => addBlockToColumn(columnIndex)}
          >
            {cellData && cellData.value ? <Block value={cellData.value} /> : null}
          </TouchableOpacity>
        ))}
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      {createGrid()}
    </View>
  );
};

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
});

export default GameBoard;