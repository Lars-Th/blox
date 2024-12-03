import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Block from './Block';

const GameBoard = ({ currentBlockValue, onBlockPlaced, setScore, navigation }) => {
  const rows = 7;
  const columns = 5;

  const [grid, setGrid] = useState(
    Array(rows)
      .fill()
      .map(() => Array(columns).fill(null))
  );

  const applyGravity = (grid) => {
    const newGrid = grid.map((row) => row.slice());
  
    for (let col = 0; col < columns; col++) {
      let pointer = rows - 1;
      for (let row = rows - 1; row >= 0; row--) {
        if (newGrid[row][col] !== null) {
          if (row !== pointer) {
            newGrid[pointer][col] = newGrid[row][col];
            newGrid[row][col] = null;
            console.log(`Flyttar block från (${row}, ${col}) till (${pointer}, ${col})`);
          }
          pointer--;
        }
      }
    }
  
    return newGrid;
  };

  const addBlockToColumn = (columnIndex) => {
    let newGrid = grid.map((row) => row.slice()); // Kopiera grid
  
    let placed = false;
  
    for (let row = rows - 1; row >= 0; row--) {
      if (newGrid[row][columnIndex] === null) {
        newGrid[row][columnIndex] = {
          value: currentBlockValue,
        };
        placed = true;
        console.log(`Block med värde ${currentBlockValue} placerat på (${row}, ${columnIndex})`);
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
  };

  const checkForMerges = (grid) => {
    let merged = false;
    let newGrid = grid.map((row) => row.slice()); // Skapa en kopia av grid
    let anyMerge = false;
  
    do {
      merged = false;
      const visited = new Set();
  
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
          const cell = newGrid[row][col];
  
          if (cell !== null && !visited.has(`${row},${col}`)) {
            const value = cell.value;
            const connectedBlocks = findConnectedBlocks(newGrid, row, col, value, visited);
  
            if (connectedBlocks.length > 1) {
              // Sammanslagning behövs
              merged = true;
              anyMerge = true;
  
              console.log(`Sammanslagning vid (${row}, ${col}) med värde ${value}`);
              console.log('Involverade block:', connectedBlocks);
  
              // Ta bort alla gamla block
              connectedBlocks.forEach(({ row: r, col: c }) => {
                newGrid[r][c] = null;
              });
  
              // Placera det nya blocket på den lägsta raden i kolumnen
              const dropColumn = col;
              let targetRow = rows - 1;
  
              // Hitta nästa lediga plats från botten
              while (targetRow >= 0 && newGrid[targetRow][dropColumn] !== null) {
                targetRow--;
              }
  
              if (targetRow >= 0) {
                const newValue = value * connectedBlocks.length;
  
                newGrid[targetRow][dropColumn] = {
                  value: newValue,
                };
  
                console.log(`Nytt block med värde ${newValue} placerat på (${targetRow}, ${dropColumn})`);
  
                // Uppdatera poängen
                setScore((prevScore) => prevScore + newValue);
              } else {
                // Spelet över - ingen plats att placera det nya blocket
                Alert.alert('Spelet är över!');
                return { merged: false, grid: newGrid };
              }
            }
          }
        }
      }
  
      if (merged) {
        // Låt blocken falla ner
        newGrid = applyGravity(newGrid);
      }
    } while (merged);
  
    return { merged: anyMerge, grid: newGrid };
  };

  const findConnectedBlocks = (grid, startRow, startCol, value, visited) => {
    const stack = [{ row: startRow, col: startCol }];
    const connectedBlocks = [];

    while (stack.length > 0) {
      const { row, col } = stack.pop();
      const key = `${row},${col}`;

      if (visited.has(key)) continue;
      visited.add(key);

      if (
        grid[row][col] !== null &&
        grid[row][col].value === value
      ) {
        connectedBlocks.push({ row, col });
        console.log(`Besöker block (${row}, ${col}) med värde ${value}`);

        const neighbors = getNeighbors(row, col);
        neighbors.forEach((neighbor) => {
          const neighborKey = `${neighbor.row},${neighbor.col}`;
          if (!visited.has(neighborKey)) {
            stack.push(neighbor);
          }
        });
      }
    }

    return connectedBlocks;
  };

  const getNeighbors = (row, col) => {
    const neighbors = [];

    // Kolla upp
    if (row > 0) neighbors.push({ row: row - 1, col });
    // Kolla ner
    if (row < rows - 1) neighbors.push({ row: row + 1, col });
    // Kolla vänster
    if (col > 0) neighbors.push({ row, col: col - 1 });
    // Kolla höger
    if (col < columns - 1) neighbors.push({ row, col: col + 1 });

    return neighbors;
  };

  const getMaxValue = (grid) => {
    let max = 0;
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < columns; col++) {
        if (grid[row][col] !== null && grid[row][col].value > max) {
          max = grid[row][col].value;
        }
      }
    }
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
            {cellData && cellData.value ? (
              <Block value={cellData.value} />
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
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 10,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 50,
    height: 50,
    margin: 5,
    backgroundColor: '#1C1C1C',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
});

export default GameBoard;