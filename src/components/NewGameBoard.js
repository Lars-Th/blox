// src/components/NewGameBoard.js

import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import NewBlock from './NewBlock';

const NewGameBoard = ({ currentBlockValue, onBlockPlaced, setScore, navigation }) => {
  const rows = 7;
  const columns = 5;

  const createEmptyGrid = () => {
    return Array(rows)
      .fill(null)
      .map(() => Array(columns).fill(null));
  };

  const [grid, setGrid] = useState(createEmptyGrid());

  const placeBlock = (grid, columnIndex, blockValue) => {
    const newGrid = grid.map((row) => row.slice());

    for (let row = rows - 1; row >= 0; row--) {
      if (newGrid[row][columnIndex] === null) {
        newGrid[row][columnIndex] = blockValue;
        return newGrid;
      }
    }

    // Om kolumnen är full
    Alert.alert('Kolumnen är full!');
    return null;
  };

  const getConnectedCells = (grid, startRow, startCol, value, visited) => {
    const queue = [{ row: startRow, col: startCol }];
    const connectedCells = [];

    while (queue.length > 0) {
      const { row, col } = queue.shift();

      if (
        row >= 0 &&
        row < rows &&
        col >= 0 &&
        col < columns &&
        !visited[row][col] &&
        grid[row][col] === value
      ) {
        visited[row][col] = true;
        connectedCells.push({ row, col });

        // Lägg till grannar i kön
        queue.push({ row: row - 1, col }); // Upp
        queue.push({ row: row + 1, col }); // Ner
        queue.push({ row, col: col - 1 }); // Vänster
        queue.push({ row, col: col + 1 }); // Höger
      }
    }

    return connectedCells;
  };

  const mergeBlocks = (grid) => {
    const newGrid = grid.map((row) => row.slice());
    let merged = false;

    const visited = Array(rows)
      .fill(null)
      .map(() => Array(columns).fill(false));

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < columns; col++) {
        if (newGrid[row][col] !== null && !visited[row][col]) {
          const value = newGrid[row][col];
          const connectedCells = getConnectedCells(newGrid, row, col, value, visited);

          if (connectedCells.length > 1) {
            merged = true;

            // Räkna ut det nya värdet
            const newValue = value * connectedCells.length;

            // Rensa de gamla cellerna
            connectedCells.forEach(({ row, col }) => {
              newGrid[row][col] = null;
            });

            // Placera det nya blocket längst ned i kolumnen
            const targetCol = col;
            let targetRow = rows - 1;
            while (targetRow >= 0 && newGrid[targetRow][targetCol] !== null) {
              targetRow--;
            }

            if (targetRow >= 0) {
              newGrid[targetRow][targetCol] = newValue;

              // Uppdatera poängen
              setScore((prevScore) => prevScore + newValue);
            } else {
              // Spelet över
              Alert.alert('Spelet är över!');
              return { grid: newGrid, merged };
            }
          }
        }
      }
    }

    return { grid: newGrid, merged };
  };

  const applyGravity = (grid) => {
    const newGrid = grid.map((row) => row.slice());

    for (let col = 0; col < columns; col++) {
      let emptyRow = rows - 1;
      for (let row = rows - 1; row >= 0; row--) {
        if (newGrid[row][col] !== null) {
          if (emptyRow !== row) {
            newGrid[emptyRow][col] = newGrid[row][col];
            newGrid[row][col] = null;
          }
          emptyRow--;
        }
      }
    }

    return newGrid;
  };

  const processBoard = (grid) => {
    let newGrid = grid;
    let merged;

    do {
      const mergeResult = mergeBlocks(newGrid);
      newGrid = mergeResult.grid;
      merged = mergeResult.merged;

      if (merged) {
        newGrid = applyGravity(newGrid);
      }
    } while (merged);

    return newGrid;
  };

  const addBlockToColumn = (columnIndex) => {
    const newGrid = placeBlock(grid, columnIndex, currentBlockValue);

    if (newGrid) {
      const processedGrid = processBoard(newGrid);
      setGrid(processedGrid);

      const maxValue = getMaxValue(processedGrid);
      onBlockPlaced(maxValue);
    }
  };

  const getMaxValue = (grid) => {
    let max = 0;
    grid.forEach((row) => {
      row.forEach((cell) => {
        if (cell !== null && cell > max) {
          max = cell;
        }
      });
    });
    return max;
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
            {cellData !== null ? (
              <NewBlock value={cellData} />
            ) : null}
          </TouchableOpacity>
        ))}
      </View>
    ));
  };

  return <View style={styles.container}>{createGrid()}</View>;
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#BBADA0',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 50,
    height: 50,
    margin: 5,
    backgroundColor: '#CDC1B4',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
});

export default NewGameBoard;