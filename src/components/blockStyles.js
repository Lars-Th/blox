// src/components/blockStyles.js

export const getBlockStyle = (value) => {
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

export const getTextColor = (value) => {
  return value > 4 ? '#f9f6f2' : '#776e65';
};